"use client";
import { useGetHackathonQuery } from "@/state/services/hackathon-api";

import {
  Box,
  Flex,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import Navbar from "../../components/Navbar";
import { useRouter } from "next/navigation";
import { useState } from "react";
import isEmpty from "just-is-empty";
import MarkdownRenderer from "../../components/MarkdownRenderer";

const markdown = `A paragraph with *emphasis* and **strong importance**.
# Heading 1
## Heading 2
### Heading 3
#### Heading 4
##### Heading 5
###### Heading 6
> A block quote with ~strikethrough~ and a URL: [a link here](https://reactjs.org).

* Lists
* [ ] todo
* [x] done

A table:

| Fruit        | Color     | Taste     |
|--------------|-----------|-----------|
| Apple        | Red       | Sweet     |
| Banana       | Yellow    | Sweet     |
| Orange       | Orange    | Citrusy   |
| Grapes       | Purple    | Sweet     |
| Watermelon   | Green     | Juicy     |
| Pineapple    | Yellow    | Tangy     |
| Strawberry   | Red       | Sweet     |


| Fruit        | Color     | Taste     |
|--------------|-----------|-----------|
| Apple        | Red       | Sweet     |
| Banana       | Yellow    | Sweet     |
| Orange       | Orange    | Citrusy   |
| Grapes       | Purple    | Sweet     |
| Watermelon   | Green     | Juicy     |
:::
`

const tabs = ["overview", "projects", "participants"];
export default function HackathonPage() {
  const { slug } = useParams();
  const pathname = usePathname();
  const query = useSearchParams();
  const currentTab = query.get("tab");
  let tabInUrlIndex = tabs.findIndex((t) => t === currentTab);
  tabInUrlIndex= tabInUrlIndex<0?0:tabInUrlIndex;
  const [tabIndex, setTabIndex] = useState(tabInUrlIndex);

  const { data, isLoading, error } = useGetHackathonQuery(
    slug as string,
  );
  const hackathon = data?.data;
  console.log({ hackathon, error });

  const router = useRouter();

  function changeTab(tab: string, index: number = 0) {
    router.replace(`${pathname}?tab=${tab}`);

    setTabIndex(index);
  }
  return (
    <Box
      maxW={"var(--page-width)"}
      mx={"auto"}
      mt={{
        lg: "calc(var(--navbar-height) + 0.5rem)",
        base: "calc(var(--navbar-height) + 1rem)",
      }}
    >
      <Navbar />
      <Flex
        h={ 150}
        bg={"purple.700"}
        mt={8}
        p={{lg:6,base:4}}
        align={"center"}
        justify={"center"}
      >
        <Heading color={"white"} textAlign={"center"}
        //  fontSize={{base:'2xl',md:'3xl',lg:'4xl'}}
        size={'2xl'}
        >
          {hackathon?.title}
        </Heading>
      </Flex>
      <Box>
        <Tabs variant={"unstyled"} defaultIndex={tabIndex}>
          <TabList bg={"purple.700"} pl={4} overflowX={'auto'}>
            {tabs.map((tab, index) => (
              <Tab flexShrink={0} key={'tab-'+index}
                _selected={{
                  bg: "white",
                  color: "purple.600",
                  borderTopLeftRadius: "lg",
                  borderTopRightRadius: "lg",
                }}
                color={"white"}
                onClick={() => changeTab(tab, index)}
                textTransform={"capitalize"}
              >
                {tab} {tab==='participants' && `(${hackathon?._count?.participants||0 })`}
              </Tab>
            ))}
          </TabList>

          <TabPanels bg={"white"} minH={450}>
            <TabPanel>
              <Box my={4}>

              {hackathon?.subtitle}
              </Box>
              
            <MarkdownRenderer markdown={hackathon?.description as string}/>
            
            </TabPanel>
            <TabPanel>projects tabs

              {isEmpty(hackathon?.projects) && 'No Projects yet for this hackathon.'
              
              }
            </TabPanel>
            <TabPanel>participants tabs</TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Box>
  );
}
