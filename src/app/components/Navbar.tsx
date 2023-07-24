"use client";
import { Avatar, Box, Button, Flex, Link, Text } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import NextLink from "next/link";

const Navbar = () => {
  const sess = useSession();
  return (
    <Flex
      boxShadow={"md"}
      justify={"space-between"}
      p={4}
      align={"center"}
      pos={"fixed"}
      w={"100%"}
      top={0}
      left={0}
      zIndex={"banner"}
      backdropFilter={"auto"}
      backdropBlur={"md"}
      h={{ base: "var(--navbar-height)" }}
      overflow={"hidden"}
      bg={"whiteAlpha.700"}
    >
      <Box>
        <Flex gap={8}>
          <Box>
            <Text>App logo</Text>
          </Box>

          <Link as={NextLink} href={"#"}>
            Host a hackathon
          </Link>
        </Flex>
      </Box>
      {!sess?.data && (
        <Box align={"center"} as={Flex} wrap={"wrap"} gap={4}>
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
            href={"/auth/sign-up"}
            colorScheme="purple"
          >
            Sign Up
          </Button>
        </Box>
      )}
      {sess.data && (
        <Avatar
          src={sess?.data?.user?.image as string}
          name={sess?.data?.user?.name as string}
        />
      )}
    </Flex>
  );
};

export default Navbar;
