'use client';

import Navbar from '@/src/app/components/Navbar';
import { Avatar, Box, Button, Flex, Heading, Text } from '@chakra-ui/react';
import { MdAdd, MdEdit } from 'react-icons/md';
import { Utils as U } from '@/lib/utils';
const UserProfilePage = () => {
    const user = { id: 'u1', username: 'Lucky-victory22' };
    const visitingUser = {
        id: 'u2',
    };
    return (
        <Box
            maxW={'var(--page-width)'}
            mx={'auto'}
            mt={{
                lg: 'calc(var(--navbar-height) + 0.5rem)',
                base: 'calc(var(--navbar-height) + 1rem)',
            }}
        >
            <Navbar />
            {/* <Box h={''} bg={'purple.600'}></Box> */}
            <Box h={180} bg={'purple.700'} mt={8} p={{ lg: 6, base: 4 }}></Box>
            <Flex
                bg={''}
                mt={{ lg: '-24', base: '-14' }}
                p={{ lg: 6, base: 4 }}
                direction={{ lg: 'row', base: 'column' }}
                align={{ base: 'center', lg: 'normal' }}
            >
                <Flex direction={'column'} align={'center'}>
                    <Avatar
                        border={'2px'}
                        size={'2xl'}
                        src="https://randomuser.me/api/portraits/men/47.jpg"
                    />
                    <Box mt={4}>
                        {U.isSameUser(user, visitingUser) ? (
                            <Button borderRadius={'base'} colorScheme="purple">
                                <MdEdit style={{ marginRight: 8 }} /> Edit
                                Profile
                            </Button>
                        ) : (
                            <Button
                                minW={'124'}
                                borderRadius={'base'}
                                colorScheme="purple"
                            >
                                <MdAdd style={{ marginRight: 8 }} /> Follow
                            </Button>
                        )}
                    </Box>
                </Flex>
                <Box mt={4} ml={{ lg: 4 }}>
                    <Flex
                        // bg={'green.300'}
                        align={'center'}
                        // justify={{ lg: 'center' }}
                        gap={1}
                        direction={{ lg: 'row', base: 'column' }}
                    >
                        <Heading color={{ lg: 'white' }} as={'h3'}>
                            Lucky Victory
                        </Heading>
                        <Text
                            as={'span'}
                            fontSize={'lg'}
                            fontWeight={'normal'}
                            color={{ base: 'gray.600', lg: 'white' }}
                            // bg={'red'}
                            // h={'full'}
                            alignSelf={{ lg: 'flex-end' }}
                        >
                            (Lucky-victory02)
                        </Text>
                    </Flex>
                    <Box mt={4} maxW={600} px={{ lg: 0, base: 4 }}>
                        <Text fontWeight={'medium'} textAlign={'center'}>
                            I&apos;m lucky-victory, a passionate web developer
                        </Text>
                    </Box>
                </Box>
            </Flex>
        </Box>
    );
};

export default UserProfilePage;
