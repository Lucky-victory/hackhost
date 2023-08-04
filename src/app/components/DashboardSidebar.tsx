import { Box, Button, Flex, List, ListItem } from '@chakra-ui/react';
import NextLink from 'next/link';
import { MdDashboard, MdGridOn, MdGridView, MdGroup } from 'react-icons/md';
const pages = [
    { icon: MdDashboard, title: 'overview', url: '/dashboard/overview' },
    { icon: MdGridOn, title: 'projects', url: '/dashboard/projects' },
    { icon: MdGroup, title: 'users', url: '/dashboard/users' },
    {
        icon: MdGridView,
        title: 'hackathons',
        url: '/dashboard/hackathons',
    },
];
const DashboardSidebar = ({ currentPage = '' }) => {
    const isCurrentPage = (tab = '', page: string) => {
        return tab === page;
    };
    return (
        <Box
            minH={'full'}
            // px={6}
            py={6}
            minW={'220'}
            bg={'purple.600'}
            borderLeftRadius={'md'}
        >
            <Flex direction={'column'}>
                <List display={'flex'} flexDirection={'column'} gap={'4'}>
                    {pages.map((page, i) => {
                        return (
                            <ListItem key={'page-' + i}>
                                {isCurrentPage(currentPage, page.title) ? (
                                    <Button
                                        minH={12}
                                        textTransform={'capitalize'}
                                        as={NextLink}
                                        href={page.url}
                                        fontWeight={'medium'}
                                        w={'full'}
                                        justifyContent={'flex-start'}
                                        borderRadius={'none'}
                                        colorScheme={'purple'}
                                        borderLeft={'4px'}
                                        borderLeftColor={'white'}
                                        _hover={{
                                            bg: 'purple.400',
                                        }}
                                    >
                                        <Box as={page.icon} mr={3}></Box>{' '}
                                        {page.title}
                                    </Button>
                                ) : (
                                    <Button
                                        minH={12}
                                        textTransform={'capitalize'}
                                        as={NextLink}
                                        href={page.url}
                                        bg={'transparent'}
                                        _hover={{
                                            bg: 'purple.500',
                                            color: 'white',
                                        }}
                                        fontWeight={'medium'}
                                        w={'full'}
                                        justifyContent={'flex-start'}
                                        borderRadius={'none'}
                                        color={'whiteAlpha.900'}
                                    >
                                        <Box as={page.icon} mr={3}></Box>{' '}
                                        {page.title}
                                    </Button>
                                )}
                            </ListItem>
                        );
                    })}
                </List>
            </Flex>
        </Box>
    );
};

export default DashboardSidebar;
