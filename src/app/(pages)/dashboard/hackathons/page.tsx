'use client';

import { QueryFilter } from '@/const';
import { Utils } from '@/lib/utils';
import DashboardSidebar from '@/src/app/components/DashboardSidebar';
import Loader from '@/src/app/components/Loader';
import { useGetHackathonsQuery } from '@/state/services/hackathon-api';
import {
    Box,
    Button,
    Card,
    CardBody,
    Flex,
    Heading,
    Stack,
    Table,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
} from '@chakra-ui/react';
import NextLink from 'next/link';
const HackathonsPage = () => {
    const { data: response, isFetching } = useGetHackathonsQuery({
        limit: 20,
    } as QueryFilter);
    const tdProps = {
        textOverflow: 'ellipsis',
        maxW: '56',
        overflow: 'hidden',
    };
    const hackathons = response?.data;
    const getKeys = () => {
        const hackathon = (hackathons && hackathons[0]) || {};
        return Object.keys(hackathon).filter((key) => key !== '_count');
    };
    return (
        <>
            <DashboardSidebar currentPage="hackathons" />
            <Box overflowX={'auto'} pt={6} w={'100%'} pr={{ lg: 6, base: 4 }}>
                <TableContainer>
                    <Table>
                        <Thead>
                            <Tr>
                                {getKeys().map((key, i) => (
                                    <Th key={'th' + i}>{key}</Th>
                                ))}
                                <Th></Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {!isFetching &&
                                hackathons &&
                                hackathons?.length > 0 &&
                                hackathons?.map((hackathon) => (
                                    <Tr key={crypto.randomUUID()}>
                                        <Td {...tdProps}>{hackathon.id}</Td>
                                        <Td {...tdProps}>{hackathon.title}</Td>
                                        <Td {...tdProps}>
                                            {hackathon.subtitle}
                                        </Td>
                                        <Td {...tdProps}>
                                            {hackathon.description}
                                        </Td>
                                        <Td {...tdProps}>
                                            {Utils.formatDate(
                                                hackathon.startDate
                                            )}
                                        </Td>
                                        <Td {...tdProps}>
                                            {Utils.formatDate(
                                                hackathon.endDate
                                            )}
                                        </Td>
                                        <Td {...tdProps}>{hackathon.slug}</Td>
                                        <Td {...tdProps}>
                                            {Utils.formatDate(
                                                hackathon.createdAt
                                            )}
                                        </Td>
                                        <Td {...tdProps}>
                                            {Utils.formatDate(
                                                hackathon.updatedAt
                                            )}
                                        </Td>
                                        <Td {...tdProps}>{hackathon.userId}</Td>
                                        <Td {...tdProps} isNumeric>
                                            {hackathon.price}
                                        </Td>
                                        <Td {...tdProps}>
                                            {hackathon.currency}
                                        </Td>
                                        <Td {...tdProps}>
                                            {hackathon.currencyCode}
                                        </Td>
                                        <Td {...tdProps}>{hackathon.type}</Td>
                                        <Td {...tdProps}>{hackathon.status}</Td>
                                        <Td {...tdProps}>
                                            {hackathon.subStatus}
                                        </Td>
                                        <Td {...tdProps}>
                                            <Button
                                                as={NextLink}
                                                href={`hackathons/${hackathon.id}`}
                                                variant={'outline'}
                                                size={'sm'}
                                                colorScheme="purple"
                                            >
                                                View
                                            </Button>
                                        </Td>
                                    </Tr>
                                ))}
                        </Tbody>
                    </Table>
                </TableContainer>
                {!isFetching && hackathons && hackathons?.length <= 0 && (
                    <Box>
                        <Heading size={'lg'}>No Hackathons Yet</Heading>
                    </Box>
                )}
                {isFetching && <Loader />}
            </Box>
        </>
    );
};

export default HackathonsPage;
