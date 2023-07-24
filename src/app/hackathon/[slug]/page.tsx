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

const tabs = ["overview", "projects", "participants"];
export default function HackathonPage() {
  const { slug } = useParams();
  const pathname = usePathname();
  const query = useSearchParams();
  const currentTab = query.get("tab");
  const tabInUrlIndex = tabs.findIndex((t) => t === currentTab);
  const [tabIndex, setTabIndex] = useState(tabInUrlIndex || 0);
  const { data, isLoading, endpointName, error } = useGetHackathonQuery(
    slug as string,
  );
  const hackathon = data?.data;
  console.log({ hackathon, error, endpointName });

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
        base: "calc(var(--navbar-height) - 1rem)",
      }}
    >
      <Navbar />
      <Flex
        h={{ lg: 150 }}
        bg={"purple.700"}
        mt={8}
        align={"center"}
        justify={"center"}
      >
        <Heading color={"white"} textAlign={"center"}>
          {hackathon?.title}
        </Heading>
      </Flex>
      <Box>
        <Tabs variant={"unstyled"} defaultIndex={tabIndex}>
          <TabList bg={"purple.700"} pl={4}>
            {tabs.map((tab, index) => (
              <Tab
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
                {tab} {tab==='participants' && `(${hackathon?._count?.participants})`}
              </Tab>
            ))}
          </TabList>

          <TabPanels bg={"white"} minH={300}>
            <TabPanel>{hackathon?.description}</TabPanel>
            <TabPanel>projects tabs

              {isEmpty(hackathon?.projects) && 'No projects yet for this hackathon'
              
              }
            </TabPanel>
            <TabPanel>participants tabs</TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Box>
  );
}
