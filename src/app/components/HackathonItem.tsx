"use client";
import { HACKATHON_SUB_STATUS, Hackathon } from "@/const";
import { Utils as U } from "@/lib/utils";
import {
  Box,
  Flex,
  Heading,
  Tag,
  TagLabel,
  Text,
  Image,
  LinkBox,
  LinkOverlay,
  HStack,
} from "@chakra-ui/react";
import { format, formatDistanceStrict } from "date-fns";

import NextLink from "next/link";
const HackathonItem = ({
  hackathon,
  loading,
}: {
  hackathon: Hackathon;
  loading: boolean;
}) => {
  return (
    <LinkBox
      border={"2px"}
      transitionProperty={"border"}
      transition={"0.25s ease-in-out"}
      _hover={{
        borderColor: U.dynamicBorderColor(
          hackathon.subStatus as HACKATHON_SUB_STATUS,
        ),
        borderRight: "8px",
        borderRightColor: U.dynamicBorderColor(
          hackathon.subStatus as HACKATHON_SUB_STATUS,
        ),
      }}
      boxShadow={"base"}
      borderRadius={"md"}
      borderColor={"gray.100"}
      as={Flex}
      wrap={"wrap"}
      gap={4}
      p={4}
      pr={{ lg: 4, base: 4 }}
      maxW={850}
      w={"100%"}
      minW={{ lg: 600, base: 300 }}
    >
      <Image
        borderRadius={"lg"}
        alt="b"
        src={"/images/placeholder.webp"}
        w={[300, 250, 250]}
        maxH={"3xs"}
      />
      <LinkOverlay
        as={NextLink}
        href={`/hackathon/${hackathon.slug}`}
        flex={1}
        minW={{ lg: 400, base: 250 }}
      >
        <Box ml={{ lg: 4 }}>
          <Heading
            fontWeight={"semibold"}
            mb={4}
            as="h3"
            fontSize={{ lg: "3xl", base: "2xl" }}
          >
            {hackathon.title}
          </Heading>
          <Box as={Flex} gap={4} wrap={"wrap"} align={"center"}>
            <Tag
              mr={6}
              size="lg"
              bg={U.dynamicBorderColor(
                hackathon.subStatus as HACKATHON_SUB_STATUS,
              )}
              color={"white"}
              borderRadius="full"
            >
              <Box w={1} h={1} borderRadius={"full"} bg={"white"} mr={2}></Box>
              <TagLabel>
                {hackathon.subStatus === "ONGOING" &&
                  formatDistanceStrict(
                    new Date(),
                    new Date(hackathon.endDate),
                    { unit: "day" },
                  )}{" "}
                {hackathon.subStatus === "UPCOMING" &&
                  formatDistanceStrict(
                    new Date(),
                    new Date(hackathon.startDate),
                    { unit: "day" },
                  )}{" "}
                Left
              </TagLabel>
            </Tag>
            <Text as={"span"} fontWeight={"bold"}>
              {format(new Date(hackathon.startDate), "MMM dd")} -{" "}
              {format(new Date(hackathon.endDate), "MMM dd")},{" "}
              {format(new Date(hackathon.startDate), "yyyy")}
            </Text>
          </Box>
          <HStack my={4} gap={4} wrap={"wrap"}>
            <Box>
              <Text
                as={"span"}
                display={"inline-block"}
                mr={1}
                fontWeight={"bold"}
              >
                {U.getCurrencySymbol(hackathon.currency)}{" "}
                {U.formatCurrency(hackathon.price)}
              </Text>
              <Text as={"span"} color={"gray.500"}>
                in prizes
              </Text>
            </Box>
            <Box>
              <Text
                as={"span"}
                display={"inline-block"}
                mr={1}
                fontWeight={"bold"}
              >
                {hackathon?._count?.participants}
              </Text>
              <Text as={"span"} color={"gray.500"}>
                participants
              </Text>
            </Box>
          </HStack>
        </Box>
      </LinkOverlay>
    </LinkBox>
  );
};

export default HackathonItem;
