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
  Skeleton,
  Stack,
} from "@chakra-ui/react";
import { Link } from "@chakra-ui/next-js";
import HackathonList from "./components/HackathonList";
import { Hackathon } from "@/const";
import Footer from "./components/Footer";
import { useSession } from "next-auth/react";
import Navbar from "./components/Navbar";
import isEmpty from "just-is-empty";

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
          bg={"purple.100"}
          mx={"auto"}
          maxW={"var(--page-width)"}
          mt={6}
          w={"100%"}
          minH={{ lg: "400", base: 450 }}
          bgPos={{ lg: "right", base: "bottom" }}
          bgSize={"contain"}
          bgRepeat={"no-repeat"}
          pos={"relative"}
          wrap={"wrap"}
          // bgImage={{
          //   lg: "url(/images/hackathon.jpg)",
          //   base: "/images/hackathon.jpg",
          // }}
        >
          <Box
            p={{ lg: "8", base: 4 }}
            mb={{ base: 8 }}
            maxW={{ lg: 500, base: 500 }}
          >
            <Heading fontSize={{ lg: "4xl", base: "3xl" }} color={"purple.800"}>
              The home for hackathons
            </Heading>
            <Text
              my={6}
              fontSize={{ lg: "2xl", base: "md" }}
              color={"gray.700"}
            >
              Build products, practice skills, learn technologies, win prizes,
              and grow your network.
            </Text>
            {!sess.data ? (
              <Button
                as={NextLink}
                href={"/auth/sign-up"}
                borderRadius={"base"}
                size={{ lg: "lg", base: "md", md: "lg" }}
                colorScheme="purple"
              >
                Join the community
              </Button>
            ) : (
              <Button
                as={NextLink}
                href={"/hackathons"}
                borderRadius={"base"}
                size={{ lg: "lg", base: "md", md: "lg" }}
                colorScheme="purple"
              >
                Join a Hackathon
              </Button>
            )}
          </Box>
          <Box
            flex={1}
            minW={300}
            clipPath={{ lg: "polygon(24% 0, 100% 0%, 100% 100%, 0% 100%)" }}
          >
            <Image
              w={"full"}
              src="/images/hackathon.jpg"
              h={"full"}
              objectFit={"cover"}
            ></Image>
          </Box>
        </Flex>

        <Box my={8} bg={"white"} px={{ lg: 4, base: 2 }} py={6}>
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
            {!(isLoading && isEmpty(hackathons)) ? (
              <HackathonList
                hackathons={hackathons as Hackathon[]}
                loading={isLoading}
              />
            ) : (
              <Stack gap={"8"}>
                {[0, 0, 0, 0].map(() => (
                  <Skeleton
                    borderRadius={"lg"}
                    key={crypto.randomUUID()}
                    h={{ base: "64", lg: 230 }}
                    w={"full"}
                    bg={"gray.400"}
                    fadeDuration={3}
                  ></Skeleton>
                ))}
              </Stack>
            )}
          </Box>
        </Box>
      </Box>

      <Footer />
    </main>
  );
}
