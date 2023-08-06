"use client";

import DashboardSidebar from "@/src/app/components/DashboardSidebar";
import { useGetHackathonQuery } from "@/state/services/hackathon-api";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";

import { useParams } from "next/navigation";
import { MdEdit, MdChevronRight, MdDelete, MdRemove } from "react-icons/md";
import NextLink from "next/link";
import Loader from "@/src/app/components/Loader";
import MarkdownRenderer from "@/src/app/components/MarkdownRenderer";
const HackathonPage = () => {
  const params = useParams();
  const { id } = params;

  const { data: response, isFetching } = useGetHackathonQuery(id as string);
  const hackathon = response?.data;
  console.log({ id, hackathon });

  return (
    <>
      <DashboardSidebar currentPage="hackathons" />
      <Box
        overflowY={"auto"}
        bg={"purple.50"}
        backdropBlur={"2xl"}
        backdropFilter={"auto"}
        py={6}
        px={{ base: 4 }}
        pr={4}
        w={"full"}
      >
        <Breadcrumb
          spacing="8px"
          separator={<MdChevronRight color="gray.500" />}
        >
          <BreadcrumbItem>
            <BreadcrumbLink
              color={"purple"}
              as={NextLink}
              href="/dashboard/overview"
            >
              Dashboard
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem>
            <BreadcrumbLink
              color={"purple"}
              as={NextLink}
              href="/dashboard/hackathons"
            >
              Hackathons
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink href="#">{hackathon?.id}</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
        {!isFetching && hackathon ? (
          <>
            <Flex gap={4} my={4} justify={"flex-end"}>
              <Button gap={3} variant={"outline"} colorScheme="purple">
                <MdRemove /> Unpublish
              </Button>
              <Button gap={3} colorScheme="purple">
                <MdEdit /> Edit
              </Button>
              <Button gap={3} colorScheme="red">
                <MdDelete /> Delete
              </Button>
            </Flex>
            <Card mb={4}>
              <CardBody>
                <Heading fontSize={"2xl"} as={"h3"}>
                  {hackathon?.title}
                </Heading>
                <Text mt={3}>{hackathon?.subtitle}</Text>
              </CardBody>
            </Card>
            <SimpleGrid mb={6} minChildWidth="200px" spacing="20px">
              <Card>
                <CardBody>
                  <Box>
                    <Text textTransform={"uppercase"} as={"span"}>
                      Participants
                    </Text>
                  </Box>
                  <Text fontSize={"4xl"} fontWeight={"semibold"}>
                    {hackathon?._count?.participants || 0}
                  </Text>

                  <Button size={"sm"} variant={"outline"}>
                    Go to Participants
                  </Button>
                </CardBody>
              </Card>
              <Card>
                <CardBody>
                  <Box>
                    <Text textTransform={"uppercase"} as={"span"}>
                      Projects
                    </Text>
                  </Box>
                  <Text fontSize={"4xl"} fontWeight={"semibold"}>
                    {hackathon?._count?.projects || 0}
                  </Text>
                  <Button size={"sm"} variant={"outline"}>
                    Go to Projects
                  </Button>
                </CardBody>
              </Card>
              <Card>
                <CardBody>
                  <Box>
                    <Text textTransform={"uppercase"} as={"span"}>
                      Prize ({hackathon?.currency})
                    </Text>
                  </Box>
                  <Text fontSize={"4xl"} fontWeight={"semibold"}>
                    {Number(hackathon?.price || 0).toLocaleString("en-US")}
                  </Text>
                </CardBody>
              </Card>
              <Card>
                <CardBody>
                  <Box>
                    <Text textTransform={"uppercase"} as={"span"}>
                      Judges
                    </Text>
                  </Box>
                  <Text fontSize={"4xl"} fontWeight={"semibold"}>
                    {hackathon?.judges?.length || 0}
                  </Text>
                </CardBody>
              </Card>
            </SimpleGrid>
            <Card>
              <CardBody>
                <Accordion allowToggle>
                  <AccordionItem>
                    <h2>
                      <AccordionButton fontWeight={"semibold"} fontSize={"2xl"}>
                        <Box as="span" flex="1" textAlign="left">
                          Hackathon Details
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                      <MarkdownRenderer markdown={hackathon?.description} />
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
              </CardBody>
            </Card>
          </>
        ) : (
          <Loader />
        )}
      </Box>
    </>
  );
};

export default HackathonPage;
