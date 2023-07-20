'use client';
import Image from 'next/image';
import NextLink from 'next/link'
import styles from '@/src/app/styles/home.module.css';

import {
    useAddHackathonMutation,
    useGetHackathonsQuery,
} from '@/state/services/hackathon-api';
import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react';
import { Link} from '@chakra-ui/next-js'
// import { Box, Flex } from '@chakra-ui/react';
export default function Home() {
 
    const { data, isLoading } = useGetHackathonsQuery();
    const hackathons = data?.data;
    const [addHack, { data: newData, isLoading: isAdding }] =
        useAddHackathonMutation();
    

    console.log({ isLoading, data });
    return (
      <main className={styles.main}>
        <Box p={"4"} pt={16}>
          <Flex
            boxShadow={"md"}
            className={styles.navbar}
            justify={"space-between"}
            p={4}
            align={"center"}
            pos={"fixed"}
            w={"100%"}
            top={0}
            left={0}
            zIndex={"banner"}
            bg={"white"}
          >
            <Box>
              <Flex gap={8}>
                <Box>
                  <Text>App logo</Text>
                </Box>

                <Link href={"#"}>Host a hackathon</Link>
              </Flex>
            </Box>
            <Box>
            <Button borderRadius={'base'} as={NextLink} href={'/hackathons'} colorScheme='purple' mr={4} variant={'ghost'}>
                Log In
              </Button>
             
              <Button borderRadius={'base'} as={NextLink} href={'/hackathons'} colorScheme='purple'>
                Sign Up
              </Button>
            </Box>
          </Flex>
          <Flex>
            <Box pt={6} maxW={500}>
              <Heading>The home for hackathons</Heading>
              <Text my={6}>
                Build products, practice skills, learn technologies, win prizes,
                and grow your network.
              </Text>
              <Button borderRadius={"base"} size={"lg"} colorScheme="purple">
                Join the community
              </Button>
            </Box>
            <Box></Box>
          </Flex>

         
          {/* <Button
          onClick={() => {
            addHack({
              title: "Then Also Another hackathon by TiDB",
              userId: "171cf73a-e9b6-4948-b00d-3ef4fa82bd8a",
              description: "Another Hackathon Description",
              currency: "USD",
              price: 75000,
              startDate: new Date(),
              endDate: new Date(new Date().setDate(30)),
            });
          }}
        >
          add hack
        </Button>
        {isAdding ? (
          "adding"
        ) : (
          <Text>
            {newData?.title} {newData?.id}
          </Text>
        )} */}
        </Box>
      </main>
    );
}
