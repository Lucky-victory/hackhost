"use client";
import { Box, Flex, Heading } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const sess = useSession();
  const router = useRouter();

  if (sess.status !== "loading" && sess.status !== "authenticated") {
    router.push("/auth/sign-in");

    return;
  } else if (
    sess.status === "authenticated" &&
    //@ts-ignore
    sess?.data?.user?.role !== "ADMIN"
  ) {
    router.push("/");
    return;
  }
  return (
    <Box
      p={{ base: 4, lg: 5 }}
      px={{ xs: 0 }}
      bg={"whiteAlpha.200"}
      backdropBlur={"30px"}
      backdropFilter={"auto"}
      minH={"xl"}
    >
      <Box
        boxShadow={"base"}
        borderRadius={"md"}
        mb={4}
        bg={"white"}
        p={{ base: 4 }}
      >
        <Heading color={"gray.600"} size={"md"}>
          Dashboard
        </Heading>
      </Box>
      <Flex
        minH={550}
        maxH={650}
        gap={{ lg: 6, base: 3 }}
        bg={"white"}
        boxShadow={"base"}
        borderRadius={"md"}
      >
        {children}
      </Flex>
    </Box>
  );
}
