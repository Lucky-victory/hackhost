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
    SimpleGrid,
    Text,
} from '@chakra-ui/react';
import { useParams } from 'next/navigation';

const HackathonPage = () => {
    // const params = useParams();
    // const { id } = params;
    // const { data, isFetching } = useGetHackathonQuery(id as string);
    // console.log({ id, data });

    return (
        <>
            <DashboardSidebar currentPage="hackathons" />
            <Box py={6} px={{ base: 4 }} pr={4} w={'full'}>
                <SimpleGrid minChildWidth="200px" spacing="40px">
                    <Card>
                        <CardBody>
                            <Box>
                                <Text textTransform={'uppercase'} as={'span'}>
                                    Participants
                                </Text>
                            </Box>
                            <Text fontSize={'4xl'} fontWeight={'semibold'}>
                                32
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
                                32
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
                                    Prize (USD)
                                </Text>
                            </Box>
                            <Text fontSize={'4xl'} fontWeight={'semibold'}>
                                20,000
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
                                8
                            </Text>
                        </CardBody>
                    </Card>
                </SimpleGrid>
            </Box>
        </>
    );
};

export default HackathonPage;
