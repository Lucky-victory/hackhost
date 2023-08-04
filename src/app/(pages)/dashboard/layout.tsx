'use client';
import { Box, Heading } from '@chakra-ui/react';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <Box
            p={{ base: 4, lg: 5 }}
            px={{ xs: 0 }}
            bg={'whiteAlpha.200'}
            backdropBlur={'30px'}
            backdropFilter={'auto'}
            minH={'xl'}
        >
            <Box
                boxShadow={'base'}
                borderRadius={'md'}
                mb={4}
                bg={'white'}
                p={{ lg: 6, base: 4 }}
            >
                <Heading color={'gray.600'}>Dashboard</Heading>
            </Box>
            {children}
        </Box>
    );
}
