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
import Navbar from '@/src/app/components/Navbar';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import isEmpty from 'just-is-empty';
import MarkdownRenderer from '@/src/app/components/MarkdownRenderer';
import HackathonPageSidebar from '@/src/app/components/HackathonPageSidebar';
import { HackathonResult } from '@/const';
import Head from 'next/head';
import ProjectCardList from '@/src/app/components/ProjectCardList';

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
                                        <Text
                                            fontWeight={'medium'}
                                            fontSize={'lg'}
                                        >
                                            {hackathon?.subtitle}
                                        </Text>
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
                                    <Wrap my={6} spacing={'6'} maxW={1000}>
                                        {hackathon?.judges?.map((judge) => (
                                            <WrapItem key={crypto.randomUUID()}>
                                                <Flex align={'center'}>
                                                    <Avatar
                                                        size={'lg'}
                                                        name={judge.name}
                                                        src={
                                                            judge.avatar as string
                                                        }
                                                    />
                                                    <Box ml={4}>
                                                        <Text
                                                            fontWeight={
                                                                'semibold'
                                                            }
                                                            mb={0.5}
                                                        >
                                                            {judge.name}
                                                        </Text>
                                                        <Text
                                                            fontSize={'sm'}
                                                            fontWeight={
                                                                'medium'
                                                            }
                                                            as={'em'}
                                                        >
                                                            {judge.bio}{' '}
                                                        </Text>
                                                    </Box>
                                                </Flex>
                                            </WrapItem>
                                        ))}
                                    </Wrap>
                                </Box>
                            </Skeleton>
                        </TabPanel>
                        <TabPanel>
                            {isEmpty(hackathon?.projects) ? (
                                <Flex
                                    borderRadius="base"
                                    boxShadow={'md'}
                                    minH={150}
                                    bg="white"
                                    my={6}
                                    align={'center'}
                                    justify={'center'}
                                >
                                    <Heading
                                        color={'purple.800'}
                                        as={'h4'}
                                        size={'md'}
                                    >
                                        No Projects yet for this hackathon.
                                    </Heading>
                                </Flex>
                            ) : (
                                <Flex
                                    gap={{ lg: 8, base: 6 }}
                                    flexWrap={'wrap-reverse'}
                                >
                                    <Skeleton
                                        borderRadius={'base'}
                                        isLoaded={!isLoading}
                                        flex={1}
                                        minW={{ lg: 400, base: 300 }}
                                        w={'full'}
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
                                            <ProjectCardList
                                                projects={hackathon?.projects}
                                            />
                                        </Box>
                                    </Skeleton>
                                    <Skeleton isLoaded={!isLoading}>
                                        <HackathonPageSidebar
                                            hackathon={hackathon}
                                        />
                                    </Skeleton>
                                </Flex>
                            )}
                        </TabPanel>
                        <TabPanel>participants tabs</TabPanel>
                    </TabPanels>
                </Tabs>
            </Box>
        </Box>
    );
}
