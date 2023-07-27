'use client';
import { useGetHackathonQuery } from '@/state/services/hackathon-api';

import {
    Avatar,
    Box,
    Card,
    CardBody,
    Flex,
    Heading,
    Skeleton,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Text,
    Wrap,
    WrapItem,
} from '@chakra-ui/react';
import { useParams, usePathname, useSearchParams } from 'next/navigation';
import Navbar from '../../components/Navbar';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import isEmpty from 'just-is-empty';
import MarkdownRenderer from '../../components/MarkdownRenderer';
import HackathonPageSidebar from '../../components/HackathonPageSidebar';
import { HackathonResult } from '@/const';
import Head from 'next/head';

const tabs = ['overview', 'projects', 'participants'];
export default function HackathonPage() {
    const { slug } = useParams();
    const pathname = usePathname();
    const query = useSearchParams();
    const currentTab = query.get('tab');
    let tabInUrlIndex = tabs.findIndex((t) => t === currentTab);
    tabInUrlIndex = tabInUrlIndex < 0 ? 0 : tabInUrlIndex;
    const [tabIndex, setTabIndex] = useState(tabInUrlIndex);

    const { data, isLoading, error } = useGetHackathonQuery(slug as string);
    const hackathon = data?.data as HackathonResult;
    console.log({ hackathon, error });

    const router = useRouter();

    function changeTab(tab: string, index: number = 0) {
        router.replace(`${pathname}?tab=${tab}`);

        setTabIndex(index);
    }
    return (
        <Box
            maxW={'var(--page-width)'}
            mx={'auto'}
            mt={{
                lg: 'calc(var(--navbar-height) + 0.5rem)',
                base: 'calc(var(--navbar-height) + 1rem)',
            }}
        >
            <Head>
                <title>{hackathon?.title}</title>
            </Head>
            <Navbar />
            <Flex
                h={150}
                bg={'purple.700'}
                mt={8}
                p={{ lg: 6, base: 4 }}
                align={'center'}
                justify={'center'}
            >
                <Heading
                    color={'white'}
                    textAlign={'center'}
                    fontSize={{ base: '2xl', md: '3xl', lg: '5xl' }}
                >
                    {hackathon?.title}
                </Heading>
            </Flex>
            <Box>
                <Tabs variant={'unstyled'} defaultIndex={tabIndex}>
                    <TabList bg={'purple.700'} pl={4} overflowX={'auto'}>
                        {tabs.map((tab, index) => (
                            <Tab
                                flexShrink={0}
                                key={'tab-' + index}
                                _selected={{
                                    bg: 'white',
                                    color: 'purple.600',
                                    borderTopLeftRadius: 'lg',
                                    borderTopRightRadius: 'lg',
                                }}
                                color={'white'}
                                onClick={() => changeTab(tab, index)}
                                textTransform={'capitalize'}
                            >
                                {tab}{' '}
                                {tab === 'participants' &&
                                    `(${hackathon?._count?.participants || 0})`}
                            </Tab>
                        ))}
                    </TabList>

                    <TabPanels minH={350}>
                        <TabPanel>
                            {hackathon?.subtitle && (
                                <Card
                                    boxShadow={'base'}
                                    borderRadius={'md'}
                                    my={4}
                                >
                                    <CardBody>
                                        <Text>{hackathon?.subtitle}</Text>
                                    </CardBody>
                                </Card>
                            )}
                            <Flex
                                gap={{ lg: 6, base: 6 }}
                                flexWrap={'wrap-reverse'}
                            >
                                <Skeleton
                                    isLoaded={!isLoading}
                                    flex={1}
                                    minW={{ lg: 400, base: 300 }}
                                    w={'full'}
                                >
                                    <Box
                                        boxShadow={'base'}
                                        borderRadius={'md'}
                                        flex={1}
                                        minW={{ lg: 400, base: 300 }}
                                        bg={'white'}
                                        w={'full'}
                                        p={{ lg: '6', base: 4 }}
                                    >
                                        <Box maxW={'full'}>
                                            <MarkdownRenderer
                                                markdown={
                                                    hackathon?.description as string
                                                }
                                            />
                                            laborum rerum unde magni iure fugiat
                                            ab deserunt doloribus doloremque
                                            quam vitae. Ratione at facere sit
                                            iusto aperiam, voluptas ea officia
                                            quo ullam illum. Similique,
                                            asperiores magni esse accusantium,
                                            quasi aliquid incidunt cumque
                                            laborum!
                                        </Box>
                                    </Box>
                                </Skeleton>
                                <Skeleton isLoaded={!isLoading}>
                                    <HackathonPageSidebar
                                        hackathon={hackathon}
                                    />
                                </Skeleton>
                            </Flex>
                            <Skeleton isLoaded={!isLoading}>
                                <Box
                                    bg={'white'}
                                    boxShadow={'base'}
                                    borderRadius={'md'}
                                    my={6}
                                    p={{ lg: '6', base: 4 }}
                                >
                                    <Heading size={'lg'}>Judges</Heading>
                                    <Wrap my={6} spacing={'6'}>
                                        <WrapItem>
                                            <Flex align={'center'}>
                                                <Avatar size={'lg'} />
                                                <Box ml={4}>
                                                    <Text
                                                        fontWeight={'semibold'}
                                                        mb={0.5}
                                                    >
                                                        Lucky Victory
                                                    </Text>
                                                    <Text
                                                        fontSize={'sm'}
                                                        fontWeight={'medium'}
                                                        as={'em'}
                                                    >
                                                        Software engineer at
                                                        Matrix{' '}
                                                    </Text>
                                                </Box>
                                            </Flex>
                                        </WrapItem>
                                    </Wrap>
                                </Box>
                            </Skeleton>
                        </TabPanel>
                        <TabPanel>
                            {isEmpty(hackathon?.projects) &&
                                'No Projects yet for this hackathon.'}
                            <Flex
                                gap={{ lg: 8, base: 6 }}
                                flexWrap={'wrap-reverse'}
                            >
                                <Box
                                    boxShadow={'base'}
                                    borderRadius={'md'}
                                    flex={1}
                                    minW={{ lg: 500, base: 300 }}
                                    bg={'white'}
                                    w={'full'}
                                    p={{ lg: '6', base: 4 }}
                                >
                                    laborum rerum unde magni iure fugiat ab
                                    deserunt doloribus doloremque quam vitae.
                                    Ratione at facere sit iusto aperiam,
                                    voluptas ea officia quo ullam illum.
                                    Similique, asperiores magni esse
                                    accusantium, quasi aliquid incidunt cumque
                                </Box>
                                <HackathonPageSidebar hackathon={hackathon} />
                            </Flex>
                        </TabPanel>
                        <TabPanel>participants tabs</TabPanel>
                    </TabPanels>
                </Tabs>
            </Box>
        </Box>
    );
}
