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
} from '@chakra-ui/react';
import { MdGridOn, MdGridView, MdGroup } from 'react-icons/md';

const OverviewPage = () => {
    return (
        <>
            <DashboardSidebar currentPage="overview" />
            <Box w={'full'} px={4} py={6}>
                <SimpleGrid minChildWidth={'150px'} my={4} spacing={'20px'}>
                    <Card>
                        <CardBody
                            py={2}
                            alignItems={'center'}
                            gap={4}
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
                            gap={4}
                            display={'flex'}
                        >
                            <Flex
                                align={'center'}
                                justify={'center'}
                                h={12}
                                w={12}
                                color={'white'}
                                borderRadius={'md'}
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
                            gap={4}
                            display={'flex'}
                        >
                            <Flex
                                align={'center'}
                                justify={'center'}
                                h={12}
                                w={12}
                                color={'white'}
                                borderRadius={'md'}
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
            </Box>
        </>
    );
};

export default OverviewPage;
