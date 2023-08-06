'use client';

import DashboardSidebar from '@/src/app/components/DashboardSidebar';
import {
    Box,
    Card,
    CardBody,
    Flex,
    SimpleGrid,
    Tag,
    Text,
    Container,
} from '@chakra-ui/react';
import { MdGridOn, MdGridView, MdGroup } from 'react-icons/md';

const OverviewPage = () => {
    return (
        <>
            <DashboardSidebar currentPage="overview" />
            <Box w={'full'} px={4} py={6} overflowX={'auto'}>
                <SimpleGrid minChildWidth={'200px'} my={4} spacing={'20px'}>
                    <Card>
                        <CardBody
                            py={2}
                            alignItems={'center'}
                            gap={3}
                            display={'flex'}
                        >
                            <Flex
                                align={'center'}
                                justify={'center'}
                                h={12}
                                w={12}
                                color={'white'}
                                borderRadius={'md'}
                                bg={'orange.400'}
                            >
                                <Box
                                    as={MdGroup}
                                    transform={'auto'}
                                    scale={2}
                                ></Box>
                            </Flex>
                            <Text as="span" fontSize={'xl'} fontWeight={'bold'}>
                                20 <br />
                                Users
                            </Text>
                        </CardBody>
                    </Card>
                    <Card>
                        <CardBody
                            py={2}
                            alignItems={'center'}
                            gap={3}
                            display={'flex'}
                        >
                            <Flex
                                align={'center'}
                                justify={'center'}
                                h={12}
                                w={12}
                                color={'white'}
                                borderRadius={'md'}
                                flexShrink={0}
                                bg={'teal.500'}
                            >
                                <Box
                                    as={MdGridView}
                                    transform={'auto'}
                                    scale={2}
                                ></Box>
                            </Flex>
                            <Text
                                as="span"
                                fontSize={'xl'}
                                fontWeight={'semibold'}
                            >
                                10 <br />
                                Hackathons
                            </Text>
                        </CardBody>
                    </Card>
                    <Card>
                        <CardBody
                            py={2}
                            alignItems={'center'}
                            gap={3}
                            display={'flex'}
                        >
                            <Flex
                                align={'center'}
                                justify={'center'}
                                h={12}
                                w={12}
                                color={'white'}
                                borderRadius={'md'}
                                flexShrink={0}
                                bg={'green.400'}
                            >
                                <Box
                                    as={MdGridOn}
                                    transform={'auto'}
                                    scale={2}
                                ></Box>
                            </Flex>
                            <Box>
                                <Text
                                    as="span"
                                    fontSize={'xl'}
                                    fontWeight={'semibold'}
                                >
                                    43 <br />
                                    Projects
                                </Text>
                            </Box>
                        </CardBody>
                    </Card>
                </SimpleGrid>
                <Card minH={250}>
                    <CardBody>
                        <Container>
                            <Text>No history yet</Text>
                        </Container>
                    </CardBody>
                </Card>
            </Box>
        </>
    );
};

export default OverviewPage;
