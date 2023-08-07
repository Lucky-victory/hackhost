'use client';
import { Utils } from '@/lib/utils';
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
    LinkBox,
    LinkOverlay,
    Image,
    StackDivider,
    Stack,
} from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import NextLink from 'next/link';
import { MdArrowDropDown, MdLogout } from 'react-icons/md';
// import { Link } from '@chakra-ui/next-js';
const Navbar = () => {
    const sess = useSession();
    const user = sess?.data?.user as DefaultSession['user'];

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
                    <LinkBox>
                        <LinkOverlay href="/">
                            <Image src={'/HackHost.svg'} alt="logo" />
                        </LinkOverlay>
                    </LinkBox>

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
                                    src={user?.image as string}
                                    name={user?.name as string}
                                />

                                <MdArrowDropDown size={24} />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent>
                            <PopoverArrow />
                            {/* <PopoverCloseButton /> */}
                            {/* <PopoverHeader>Confirmation!</PopoverHeader> */}
                            <PopoverBody>
                                <Stack divider={<StackDivider />}>
                                    {Utils.checkUserRole(user).isAdmin && (
                                        <Button
                                            variant="ghost"
                                            colorScheme="purple"
                                            href={`/dashboard/overview`}
                                            as={NextLink}
                                        >
                                            Dashboard
                                        </Button>
                                    )}
                                    <Button
                                        variant="ghost"
                                        colorScheme="purple"
                                        href={`/profile/${
                                            user?.username
                                                ? user?.username
                                                : user?.id
                                        }`}
                                        as={NextLink}
                                    >
                                        Profile
                                    </Button>
                                    <Button
                                        colorScheme="red"
                                        as={NextLink}
                                        href={'/api/auth/signout'}
                                    >
                                        <Box as={MdLogout} mr={2}></Box>
                                        Logout
                                    </Button>
                                </Stack>
                            </PopoverBody>
                        </PopoverContent>
                    </Popover>
                </Box>
            )}
        </Flex>
    );
};

export default Navbar;
