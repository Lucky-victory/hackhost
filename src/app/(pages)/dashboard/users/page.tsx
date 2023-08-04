'use client';

import { Utils as U } from '@/lib/utils';
import DashboardSidebar from '@/src/app/components/DashboardSidebar';
import Loader from '@/src/app/components/Loader';
import { useGetUsersQuery } from '@/state/services/hackathon-api';
import {
    Avatar,
    Box,
    Button,
    Flex,
    Heading,
    Spinner,
    Table,
    TableContainer,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
} from '@chakra-ui/react';

const UsersPage = () => {
    const { data: response, isFetching } = useGetUsersQuery();
    console.log({ response });
    const users = response?.data;
    const tdProps = {
        textOverflow: 'ellipsis',
        maxW: '56',
        overflow: 'hidden',
    };
    return (
        <Box>
            <Flex
                minH={500}
                gap={{ lg: 8, base: 6 }}
                bg={'white'}
                // py={{ lg: 6, base: 4 }}
                boxShadow={'base'}
                borderRadius={'md'}
            >
                <DashboardSidebar currentPage="users" />

                <Flex
                    pt={4}
                    pr={{ base: 4, lg: 6 }}
                    overflowX={'auto'}
                    flex={1}
                    direction={'column'}
                >
                    <Flex justify={'flex-end'} mt={4}>
                        <Button colorScheme="purple">Add New User</Button>
                    </Flex>
                    {!isFetching && users && users?.length > 0 ? (
                        <TableContainer
                            borderRadius={'md'}
                            border={'1px'}
                            borderColor={'gray.300'}
                            mt={2}
                            my={6}
                            py={4}
                            // w={'100%'}
                        >
                            <Table colorScheme="purple">
                                <Thead>
                                    <Tr>
                                        <Th>Photo</Th>
                                        <Th>ID</Th>
                                        <Th>Name</Th>
                                        <Th>Username</Th>
                                        <Th>Email</Th>
                                        <Th>Created At</Th>
                                        <Th>Updated At</Th>
                                        <Th>Role</Th>
                                        <Th>Auth Type</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {users.map((user) => {
                                        return (
                                            <Tr key={crypto.randomUUID()}>
                                                <Td>
                                                    <Avatar
                                                        bg={'purple.700'}
                                                        color="white"
                                                        fontWeight={'semibold'}
                                                        name={user?.name}
                                                        size={'sm'}
                                                        src={
                                                            user?.avatar as string
                                                        }
                                                    />
                                                </Td>
                                                <Td {...tdProps}>{user?.id}</Td>
                                                <Td {...tdProps}>
                                                    {user.name}
                                                </Td>
                                                <Td {...tdProps}>
                                                    {user?.username || ''}
                                                </Td>
                                                <Td {...tdProps} maxW={'44'}>
                                                    {user?.email}
                                                </Td>
                                                <Td {...tdProps}>
                                                    {U.formatDate(
                                                        user?.createdAt,
                                                        'dd/MM/yyyy HH:mm'
                                                    )}
                                                </Td>
                                                <Td {...tdProps}>
                                                    {U.formatDate(
                                                        user?.updatedAt,
                                                        'dd/MM/yyyy HH:mm'
                                                    )}
                                                </Td>
                                                <Td>{user?.role}</Td>
                                                <Td>{user?.authType}</Td>
                                                <Td>
                                                    <Button
                                                        size={'sm'}
                                                        colorScheme="purple"
                                                        variant={'outline'}
                                                    >
                                                        Edit
                                                    </Button>
                                                </Td>
                                            </Tr>
                                        );
                                    })}
                                </Tbody>
                            </Table>
                        </TableContainer>
                    ) : (
                        <Loader />
                    )}
                </Flex>
            </Flex>
        </Box>
    );
};

export default UsersPage;
