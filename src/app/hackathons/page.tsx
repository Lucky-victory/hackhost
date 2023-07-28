"use client";
import { useGetHackathonQuery, useGetHackathonsQuery } from "@/state/services/hackathon-api";

import { Box, Button, Flex, Heading, Input, Skeleton, Stack } from "@chakra-ui/react";
import { useParams } from "next/navigation";
import Navbar from "../components/Navbar";
import NextLink from 'next/link';
import isEmpty from "just-is-empty";
import HackathonList from "../components/HackathonList";
import { Hackathon } from "@/const";

export default function HackathonPage() {


    const { data, isLoading } = useGetHackathonsQuery({params:{limit:5}});

    const hackathons = data?.data;
  return <Box p={"1rem"} className="page">
    <Navbar />
<Flex
                h={150}
                bg={'purple.50'}
                
                p={{ lg: 6, base: 4 }}
                align={'center'}
                justify={'center'}
            >
            <Flex align='center'>
<Input _focus={{borderColor:'purple.700'}} borderRightRadius={0} w={{base:350}} borderColor={'gray.400'} type="search" placeholder='Search for Hackathons'/ ><Button  borderLeftRadius={0} colorScheme='purple'>Search</Button>
            </Flex>
            </Flex>
<Box mt={'calc(var(--navbar-height) - 2rem)'}>

<Box my={8} bg={'white'} px={{ lg: 4, base: 2 }} py={6}>
                    <Box maxW={860}>
                        <Flex
                            mb={{ lg: 6, base: 4 }}
                            align={'center'}
                            justify={'space-between'}
                        >
                            <Heading
                                color={'purple.800'}
                                size={{ lg: 'xl', base: 'md' }}
                            >
                                Hackathons For You
                            </Heading>
                      {/*      <Button
                                href={'/hackathons'}
                                colorScheme="purple"
                                as={NextLink}
                                variant={'ghost'}
                                bg={'transparent!important'}
                            >
                                See All
                                </Button>*/}

                        </Flex>
                        {!(isLoading && isEmpty(hackathons)) ? (
                            <HackathonList
                                hackathons={hackathons as Hackathon[]}
                                loading={isLoading}
                            />
                        ) : (
                            <Stack gap={'8'}>
                                {[0, 0, 0, 0].map(() => (
                                    <Skeleton
                                        borderRadius={'lg'}
                                        key={crypto.randomUUID()}
                                        h={{ base: '64', lg: 230 }}
                                        w={'full'}
                                        colorScheme="gray"
                                        fadeDuration={3}
                                    ></Skeleton>
                                ))}
                            </Stack>
                        )}
                        {!isLoading && isEmpty(hackathons) && (
                            <Flex
                                align={'center'}
                                justify={'center'}
                                h={{ lg: '200', base: 150 }}
                            >
                                <Heading
                                    size={'lg'}
                                    as={'h3'}
                                    color={'purple.800'}
                                >
                                    No hackathons available yet
                                </Heading>
                            </Flex>
                        )}
                    </Box>
                </Box>

</Box>
  </Box>;
}
