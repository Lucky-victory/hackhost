import { Box, Button, Divider, Flex, List, ListItem } from '@chakra-ui/react';
import NextLink from 'next/link';
const pages = [
    { title: 'overview', url: '/dashboard/overview' },
    { title: 'projects', url: '/dashboard/projects' },
    { title: 'users', url: '/dashboard/users' },
    { title: 'hackathons', url: '/dashboard/hackathons' },
];
const DashboardSidebar = ({ currentPage = '' }) => {
    return (
        <Box
            borderRight={'2px'}
            borderRightColor={'gray.200'}
            pr={4}
            minW={'200'}
        >
            <Flex direction={'column'}>
                <List display={'flex'} flexDirection={'column'} gap={'4'}>
                    {pages.map((page, i) => {
                        return (
                            <ListItem key={'page-' + i}>
                                <Button
                                    textTransform={'capitalize'}
                                    as={NextLink}
                                    href={page.url}
                                    bg={
                                        currentPage !== page.title
                                            ? 'transparent'
                                            : undefined
                                    }
                                    fontWeight={'medium'}
                                    w={'full'}
                                    justifyContent={'flex-start'}
                                    borderRadius={'base'}
                                    colorScheme={
                                        currentPage === page.title
                                            ? 'purple'
                                            : undefined
                                    }
                                >
                                    {page.title}
                                </Button>
                                <Divider />
                            </ListItem>
                        );
                    })}
                </List>
            </Flex>
        </Box>
    );
};

export default DashboardSidebar;
