"use client";
import NextImage from "next/image";
import NextLink from "next/link";
import styles from "@/src/app/styles/home.module.css";

import {
  useAddHackathonMutation,
  useGetHackathonsQuery,
} from "@/state/services/hackathon-api";
import {
  Avatar,
  Box,
  Button,
  Flex,
  Heading,
  Tag,
  TagLabel,
  Text,
  Image,
  LinkBox,
  LinkOverlay,
  WrapItem,
  Wrap,
  HStack,
} from "@chakra-ui/react";
import { Link } from "@chakra-ui/next-js";
import { MdDoDisturb } from "react-icons/md";
import HackathonList from "./components/HackathonList";
import { Hackathon } from "@/const";
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
          bg={"whiteAlpha.900"}
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
            <Button
              borderRadius={"base"}
              as={NextLink}
              href={"/hackathons"}
              colorScheme="purple"
              mr={4}
              variant={"ghost"}
            >
              Log In
            </Button>

            <Button
              borderRadius={"base"}
              as={NextLink}
              href={"/hackathons"}
              colorScheme="purple"
            >
              Sign Up
            </Button>
          </Box>
        </Flex>
        <Flex
          bg={"whiteAlpha.800"}
          mx={"auto"}
          maxW={"var(--page-width)"}
          p={{ lg: "1xl", sm: 4 }}
          mt={6}
          w={"100%"}
          pt={6}
          minH={{ lg: "400", base: 600 }}
          bgPos={"center"}
          bgSize={"contain"}
          bgRepeat={"no-repeat"}
          pos={"relative"}
          bgImage={{
            lg: "url(/images/desktop-illustration-morning.png)",
            base: "/images/mobile-illustration-morning.png",
          }}
        >
          <Box pt={4} maxW={{ lg: 500, base: 450 }}>
            <Heading>The home for hackathons</Heading>
            <Text
              my={6}
              fontSize={{ lg: "2xl", base: "md" }}
              color={"gray.500"}
            >
              Build products, practice skills, learn technologies, win prizes,
              and grow your network.
            </Text>
            <Button
              borderRadius={"base"}
              size={{ lg: "lg", base: "md", md: "lg" }}
              colorScheme="purple"
            >
              Join the community
            </Button>
          </Box>
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

        <Box my={8}  bg={'whiteAlpha.800'} px={4} py={6}>
          <Flex align={'center'}>

<Heading mb={6}>Hackathons For You</Heading>
<Button href={'/hackathons'} colorScheme="purple" as={NextLink} variant={'ghost'}>See All</Button>
          </Flex>
         
<HackathonList hackathons={hackathons as Hackathon[]} loading={isLoading} />
                  
        </Box>
      </Box>
    </main>
  );
}
