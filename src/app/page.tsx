'use client';
import Image from 'next/image';
import styles from '@/src/app/styles/page.module.css';
import axios from 'axios';
import {
    useAddHackathonMutation,
    useGetHackathonsQuery,
} from '@/state/services/hackathon-api';
import { Box, Button, Text } from '@chakra-ui/react';

// import { Box, Flex } from '@chakra-ui/react';
export default function Home() {
    // const user = await prisma.user.create({
    //     data: { name: 'Lucky', email: 'lucky@test.com' },
    // });
    // console.log({ user });
    // const f = async () => {};
    // axios.get('/api/hackathon').then((d) => {
    //     console.log({ data: d });
    // });
    const { data, isLoading } = useGetHackathonsQuery();
    const [addHack, { data: newData, isLoading: isAdding }] =
        useAddHackathonMutation();
    // console.log({newData,isAdding});

    console.log({ isLoading, data });
    return (
        <main className={styles.main}>
            <Box>
                GET
                {isLoading ? 'loading...' : <Text>{data?.title}</Text>}
            </Box>
            <Box>
                POST
                {isLoading ? 'loading...' : <Text>{data?.title}</Text>}
            </Box>

            <Button
                onClick={() => {
                    addHack({ title: 'new Hack', id: '123' });
                }}
            >
                add hack
            </Button>
            {isAdding ? (
                'adding'
            ) : (
                <Text>
                    {newData?.title} {newData?.id}
                </Text>
            )}
        </main>
    );
}
