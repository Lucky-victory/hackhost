'use client';

import DashboardSidebar from '@/src/app/components/DashboardSidebar';
import {
    Box,
    Flex,
    Heading,
    Table,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
} from '@chakra-ui/react';

const UsersPage = () => {
    return (
        <Box>
            <Flex
                gap={{ lg: 8, base: 6 }}
                bg={'white'}
                p={{ lg: 6, base: 4 }}
                boxShadow={'base'}
                borderRadius={'md'}
            >
                <DashboardSidebar currentPage="users" />

                <TableContainer
                    borderRadius={'md'}
                    border={'1px'}
                    borderColor={'gray.300'}
                    mt={2}
                    my={6}
                    py={4}
                >
                    <Table variant={'striped'} colorScheme="purple">
                        <Thead>
                            <Tr>
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
                            <Tr>
                                <Td>1</Td>
                                <Td>Lucky victory</Td>
                                <Td>Lucky-victory1</Td>
                                <Td>1</Td>
                                <Td>Lucky victory</Td>
                                <Td>Lucky-victory1</Td>
                                <Td>Lucky victory</Td>
                                <Td>Lucky-victory1</Td>
                            </Tr>
                            <Tr>
                                <Td>1</Td>
                                <Td>Lucky victory</Td>
                                <Td>Lucky-victory1</Td>
                                <Td>1</Td>
                                <Td>Lucky victory</Td>
                                <Td>Lucky-victory1</Td>
                                <Td>Lucky victory</Td>
                                <Td>Lucky-victory1</Td>
                            </Tr>
                        </Tbody>
                    </Table>
                </TableContainer>
            </Flex>
        </Box>
    );
};

export default UsersPage;
