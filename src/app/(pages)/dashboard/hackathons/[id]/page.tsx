'use client';

import DashboardSidebar from '@/src/app/components/DashboardSidebar';
import { useGetHackathonQuery } from '@/state/services/hackathon-api';
import {
    Box,
    Button,
    Card,
    CardBody,
    CardHeader,
    Flex,
    Heading,
    SimpleGrid,
    Text,
} from '@chakra-ui/react';
import { useParams } from 'next/navigation';
import { MdEdit } from 'react-icons/md';

const HackathonPage = () => {
    const params = useParams();
    const { id } = params;

    const { data: response, isFetching } = useGetHackathonQuery(id as string);
    const hackathon = response?.data;
    console.log({ id, hackathon });

    return (
        <>
            <DashboardSidebar currentPage="hackathons" />
            <Box bg={'purple.50'} py={6} px={{ base: 4 }} pr={4} w={'full'}>
                <Flex mb={4} justify={'flex-end'}>
                    <Button gap={3} colorScheme="purple">
                        <MdEdit /> Edit
                    </Button>
                </Flex>
                <Card mb={4}>
                    <CardBody>
                        <Heading fontSize={'2xl'} as={'h3'}>
                            {hackathon?.title}
                        </Heading>
                        <Text mt={3}>{hackathon?.subtitle}</Text>
                    </CardBody>
                </Card>
                <SimpleGrid minChildWidth="200px" spacing="20px">
                    <Card>
                        <CardBody>
                            <Box>
                                <Text textTransform={'uppercase'} as={'span'}>
                                    Participants
                                </Text>
                            </Box>
                            <Text fontSize={'4xl'} fontWeight={'semibold'}>
                                {hackathon?._count?.participants || 0}
                            </Text>

                            <Button size={'sm'} variant={'outline'}>
                                Go to Participants
                            </Button>
                        </CardBody>
                    </Card>
                    <Card>
                        <CardBody>
                            <Box>
                                <Text textTransform={'uppercase'} as={'span'}>
                                    Projects
                                </Text>
                            </Box>
                            <Text fontSize={'4xl'} fontWeight={'semibold'}>
                                {hackathon?._count?.projects || 0}
                            </Text>
                            <Button size={'sm'} variant={'outline'}>
                                Go to Projects
                            </Button>
                        </CardBody>
                    </Card>
                    <Card>
                        <CardBody>
                            <Box>
                                <Text textTransform={'uppercase'} as={'span'}>
                                    Prize ({hackathon?.currency})
                                </Text>
                            </Box>
                            <Text fontSize={'4xl'} fontWeight={'semibold'}>
                                {Number(hackathon?.price || 0).toLocaleString(
                                    'en-US'
                                )}
                            </Text>
                        </CardBody>
                    </Card>
                    <Card>
                        <CardBody>
                            <Box>
                                <Text textTransform={'uppercase'} as={'span'}>
                                    Judges
                                </Text>
                            </Box>
                            <Text fontSize={'4xl'} fontWeight={'semibold'}>
                                {hackathon?.judges?.length || 0}
                            </Text>
                        </CardBody>
                    </Card>
                </SimpleGrid>
                {/* Card>CardBody */}
            </Box>
        </>
    );
};

export default HackathonPage;
