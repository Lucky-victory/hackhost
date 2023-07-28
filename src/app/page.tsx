'use client';
import NextImage from 'next/image';
import NextLink from 'next/link';
import styles from '@/src/app/styles/home.module.css';

import {
    useAddHackathonMutation,
    useGetHackathonsQuery,
} from '@/state/services/hackathon-api';
import {
    Avatar,
    Box,
    Button,
    Flex,
    Heading,
    Tag,
    TagLabel,
    Text,
    Image,
    LinkBox,
    LinkOverlay,
    WrapItem,
    Wrap,
    HStack,
    Skeleton,
    Stack,
} from '@chakra-ui/react';
import { Link } from '@chakra-ui/next-js';
import HackathonList from './components/HackathonList';
import { Hackathon } from '@/const';
import Footer from './components/Footer';
import { useSession } from 'next-auth/react';
import Navbar from './components/Navbar';
import isEmpty from 'just-is-empty';
import Script from 'next/script';

export default function Home() {
    const sess = useSession();

    const { data, isLoading } = useGetHackathonsQuery();

    const hackathons = data?.data;
    const [addHack, { data: newData, isLoading: isAdding }] =
        useAddHackathonMutation();

    console.log({ isLoading, data });
    return (
        <main className={styles.main}>
            <Script
                src="https://upload-widget.cloudinary.com/global/all.js"
                type="text/javascript"
                id="cloudinary-script"
            ></Script>
            <Box
                p={{ lg: '4', base: 2 }}
                mt={{
                    lg: 'calc(var(--navbar-height) - 2rem)',
                    base: 'calc(var(--navbar-height) - 1rem)',
                }}
            >
                <Navbar />
                <Flex
                    bg={'purple.100'}
                    mx={'auto'}
                    maxW={'var(--page-width)'}
                    mt={6}
                    w={'100%'}
                    minH={{ lg: '400', base: 450 }}
                    bgPos={{ lg: 'right', base: 'bottom' }}
                    bgSize={'contain'}
                    bgRepeat={'no-repeat'}
                    pos={'relative'}
                    wrap={'wrap'}
                    // bgImage={{
                    //   lg: "url(/images/hackathon.jpg)",
                    //   base: "/images/hackathon.jpg",
                    // }}
                >
                    <Box
                        p={{ lg: '8', base: 4 }}
                        mb={{ base: 8 }}
                        maxW={{ lg: 500, base: 600 }}
                    >
                        <Heading
                            fontSize={{ lg: '4xl', base: '3xl' }}
                            color={'purple.800'}
                        >
                            The Hub of Innovation Challenges
                        </Heading>
                        <Text
                            my={6}
                            size={'2xl'}
                            // fontSize={{ lg: '2xl', base: 'md' }}
                            color={'gray.800'}
                        >
                            Ignite your creativity, level up your skills, and
                            conquer the tech world. Join forces with fellow
                            innovators to build groundbreaking products that
                            defy convention. Win awesome prizes as you code your
                            way to victory in thrilling hackathons.
                        </Text>
                        {!sess.data ? (
                            <Button
                                as={NextLink}
                                href={'/auth/sign-up'}
                                borderRadius={'base'}
                                size={{ lg: 'lg', base: 'md', md: 'lg' }}
                                colorScheme="purple"
                            >
                                Join the community
                            </Button>
                        ) : (
                            <Button
                                as={NextLink}
                                href={'/hackathons'}
                                borderRadius={'base'}
                                size={{ lg: 'lg', base: 'md', md: 'lg' }}
                                colorScheme="purple"
                            >
                                Join a Hackathon
                            </Button>
                        )}
                    </Box>
                    <Box
                        flex={1}
                        minW={300}
                        clipPath={{
                            lg: 'polygon(24% 0, 100% 0%, 100% 100%, 0% 100%)',
                        }}
                    >
                        <Image
                            alt=""
                            w={'full'}
                            src="/images/hackathon.jpg"
                            h={'full'}
                            objectFit={'cover'}
                        />
                    </Box>
                </Flex>

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
                            <Button
                                href={'/hackathons'}
                                colorScheme="purple"
                                as={NextLink}
                                variant={'ghost'}
                                bg={'transparent!important'}
                            >
                                See All
                            </Button>
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

            <Footer />
        </main>
    );
}
