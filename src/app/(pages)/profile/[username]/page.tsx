"use client";

import Navbar from "@/src/app/components/Navbar";
import {
  Avatar,
  Box,
  Button,
  Flex,
  Heading,
  Skeleton,
  SkeletonCircle,
  Text,
} from "@chakra-ui/react";
import { MdAdd, MdEdit } from "react-icons/md";
import { Utils as U } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { useGetUserQuery } from "@/state/services/hackathon-api";
import { useParams } from "next/navigation";
const UserProfilePage = () => {
  const { username } = useParams();
  const visitingUser = useSession().data?.user as DefaultSession["user"];
  const { data: response, isFetching } = useGetUserQuery(username as string);
  const user = response?.data;
  console.log({ user });

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
      {/* <Box h={''} bg={'purple.600'}></Box> */}
      <Box h={180} bg={"purple.700"} mt={8} p={{ lg: 6, base: 4 }}></Box>
      <Flex
        bg={""}
        mt={{ lg: "-24", base: "-14" }}
        p={{ lg: 6, base: 4 }}
        direction={{ lg: "row", base: "column" }}
        align={{ base: "center", lg: "normal" }}
      >
        <Flex direction={"column"} align={"center"}>
          <Skeleton isLoaded={!isFetching} borderRadius={"full"}>
            <Avatar
              border={"2px"}
              borderColor={"white"}
              size={"2xl"}
              name={user?.name}
              src={user?.avatar as string}
            />
          </Skeleton>
          <Skeleton isLoaded={!isFetching} my={4}>
            <Box mt={4}>
              {U.isSameUser(user, visitingUser) ? (
                <Button borderRadius={"base"} colorScheme="purple">
                  <MdEdit style={{ marginRight: 8 }} /> Edit Profile
                </Button>
              ) : (
                <Button minW={"124"} borderRadius={"base"} colorScheme="purple">
                  <MdAdd style={{ marginRight: 8 }} /> Follow
                </Button>
              )}
            </Box>
          </Skeleton>
        </Flex>
        <Box mt={4} ml={{ lg: 4 }}>
          <Skeleton isLoaded={!isFetching} mb={4}>
            <Flex
              // bg={'green.300'}
              align={"center"}
              // justify={{ lg: 'center' }}
              gap={1}
              direction={{ lg: "row", base: "column" }}
            >
              <Heading color={{ lg: "white" }} as={"h3"}>
                {user?.name}
              </Heading>

              <Text
                as={"span"}
                fontSize={"lg"}
                fontWeight={"normal"}
                color={{ base: "gray.600", lg: "white" }}
                textAlign={"left"}
                // bg={'red'}
                // h={'full'}
                alignSelf={{ lg: "flex-end" }}
              >
                ({user?.username})
              </Text>
            </Flex>
          </Skeleton>
          <Skeleton isLoaded={!isFetching}>
            <Box mt={4} maxW={600} px={{ lg: 0, base: 4 }}>
              <Text fontWeight={"medium"} textAlign={"center"}>
                A passionate web developer, with understanding of web standards,
                blockchain and cybersecurity
              </Text>
            </Box>
          </Skeleton>
        </Box>
      </Flex>
    </Box>
  );
};

export default UserProfilePage;
