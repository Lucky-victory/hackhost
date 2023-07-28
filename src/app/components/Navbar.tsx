'use client';
import {
    Avatar,
    Box,
    Button,
    Flex,
    Tag,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverFooter,
    PopoverArrow,
    PopoverCloseButton,
    PopoverAnchor,
    TagRightIcon,
    Text,
} from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import NextLink from 'next/link';
import { MdArrowDropDown, MdLogout } from 'react-icons/md';
import { Link } from '@chakra-ui/next-js';
const Navbar = () => {
    const sess = useSession();

    function showPopover() {}
    return (
        <Flex
            boxShadow={'md'}
            justify={'space-between'}
            p={4}
            align={'center'}
            pos={'fixed'}
            w={'100%'}
            top={0}
            left={0}
            zIndex={'banner'}
            backdropFilter={'auto'}
            backdropBlur={'md'}
            h={{ base: 'var(--navbar-height)' }}
            bg={'whiteAlpha.800'}
        >
            <Box>
                <Flex gap={{ lg: 8, base: 6 }} align="center">
                    <Box>
                        <Link href="/">App logo</Link>
                    </Box>

                    <Button
                        as={NextLink}
                        variant={'ghost'}
                        colorScheme="purple"
                        href={'/hackathons/create'}
                    >
                        Host a hackathon
                    </Button>
                </Flex>
            </Box>
            {!sess?.data && (
                <Box align={'center'} as={Flex} wrap={'wrap'} gap={4}>
                    <Button
                        borderRadius={'base'}
                        as={NextLink}
                        href={'/auth/sign-in'}
                        colorScheme="purple"
                        variant={'ghost'}
                    >
                        Log In
                    </Button>

                    <Button
                        borderRadius={'base'}
                        as={NextLink}
                        href={'/auth/sign-up'}
                        colorScheme="purple"
                    >
                        Sign Up
                    </Button>
                </Box>
            )}
            {sess.data && (
                <Box>
                    <Popover>
                        <PopoverTrigger>
                            <Button bg={'transparent'}>
                                <Avatar
                                    mr={2}
                                    size={{ lg: 'md', base: 'sm' }}
                                    src={sess?.data?.user?.image as string}
                                    name={sess?.data?.user?.name as string}
                                />

                                <MdArrowDropDown size={24} />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent>
                            <PopoverArrow />
                            {/* <PopoverCloseButton /> */}
                            {/* <PopoverHeader>Confirmation!</PopoverHeader> */}
                            <PopoverBody>
                                <Button
                                    colorScheme="red"
                                    as={NextLink}
                                    href={'/api/auth/signout'}
                                >
                                    <Box as={MdLogout} mr={2}></Box>
                                    Logout
                                </Button>
                            </PopoverBody>
                        </PopoverContent>
                    </Popover>
                </Box>
            )}
        </Flex>
    );
};

export default Navbar;
