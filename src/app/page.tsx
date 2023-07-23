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
import Footer from "./components/Footer";
// import { Box, Flex } from '@chakra-ui/react';
export default function Home() {
  const { data, isLoading } = useGetHackathonsQuery();
  const hackathons = data?.data;
  const [addHack, { data: newData, isLoading: isAdding }] =
    useAddHackathonMutation();

  console.log({ isLoading, data });
  return (
    <main className={styles.main}>
      <Box p={{lg:"4",base:2}} mt={{lg:'calc(var(--navbar-height) - 2rem)',base:'calc(var(--navbar-height) - 1rem)'}}>
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
        backdropFilter={'auto'}
          backdropBlur={'md'}
          h={{base:'var(--navbar-height)'}}
          overflow={'hidden'}
          bg={'whiteAlpha.700'}
        >
          <Box>
            <Flex gap={8}>
              <Box>
                <Text>App logo</Text>
              </Box>

              <Link href={"#"}>Host a hackathon</Link>
            </Flex>
          </Box>
          <Box align={'center'} as={Flex} wrap={'wrap'} gap={4}>
            <Button
              borderRadius={"base"}
              as={NextLink}
              href={"/api/auth/signin"}
              colorScheme="purple"
              
              variant={"ghost"}
            >
              Log In
            </Button>

            <Button
              borderRadius={"base"}
              as={NextLink}
              href={"/api/auth/signout"}
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
          <Box 
          p={{ lg: "1xl", base: 4 }}
           maxW={{ lg: 500, base: 500 }}>
            <Heading fontSize={{lg:'4xl',base:'3xl'}}>The home for hackathons</Heading>
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

        <Box   my={8}  bg={'whiteAlpha.800'} px={{lg:4,base:2}} py={6}>
          <Box maxW={860}>

          <Flex  mb={{lg:6,base:4}} align={'center'} justify={'space-between'}>

<Heading   
fontSize={{lg:'4xl',base:'2xl'}} >Hackathons For You</Heading>
<Button href={'/hackathons'} colorScheme="purple" as={NextLink} variant={'ghost'} bg={'transparent!important'}>See All</Button>
          </Flex>
         
<HackathonList hackathons={hackathons as Hackathon[]} loading={isLoading} />
                  
        </Box>
        </Box>

      </Box>

      <Footer/>
    </main>
  );
}
