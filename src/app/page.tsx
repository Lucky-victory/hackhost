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
import HackathonList from "./components/HackathonList";
import { Hackathon } from "@/const";
import Footer from "./components/Footer";
import { useSession } from "next-auth/react";
import Navbar from "./components/Navbar";

export default function Home() {
  const sess = useSession();
  
  const { data, isLoading } = useGetHackathonsQuery();

  const hackathons = data?.data;
  const [addHack, { data: newData, isLoading: isAdding }] =
    useAddHackathonMutation();

  console.log({ isLoading, data });
  return (
    <main className={styles.main}>
      <Box
        p={{ lg: "4", base: 2 }}
        mt={{
          lg: "calc(var(--navbar-height) - 2rem)",
          base: "calc(var(--navbar-height) - 1rem)",
        }}
      >

        <Navbar />
        <Flex
          bg={"whiteAlpha.800"}
          mx={"auto"}
          maxW={"var(--page-width)"}
          mt={6}
          w={"100%"}
          minH={{ lg: "400", base: 450 }}
          bgPos={"bottom center"}
          bgSize={"contain"}
          bgRepeat={"no-repeat"}
          pos={"relative"}
          bgImage={{
            lg: "url(/images/desktop-illustration-morning.png)",
            base: "/images/mobile-illustration-morning.png",
          }}
        >
          <Box p={{ lg: "1xl", base: 4 }} maxW={{ lg: 500, base: 500 }}>
            <Heading fontSize={{ lg: "4xl", base: "3xl" }}>
              The home for hackathons
            </Heading>
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

        <Box my={8} bg={"whiteAlpha.800"} px={{ lg: 4, base: 2 }} py={6}>
          <Box maxW={860}>
            <Flex
              mb={{ lg: 6, base: 4 }}
              align={"center"}
              justify={"space-between"}
            >
              <Heading fontSize={{ lg: "4xl", base: "2xl" }}>
                Hackathons For You
              </Heading>
              <Button
                href={"/hackathons"}
                colorScheme="purple"
                as={NextLink}
                variant={"ghost"}
                bg={"transparent!important"}
              >
                See All
              </Button>
            </Flex>

            <HackathonList
              hackathons={hackathons as Hackathon[]}
              loading={isLoading}
            />
          </Box>
        </Box>
      </Box>

      <Footer />
    </main>
  );
}
