'use client';
import { Box, Flex, Heading } from '@chakra-ui/react';

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
                <Heading color={'gray.600'} size={'lg'}>
                    Dashboard
                </Heading>
            </Box>
            <Flex
                minH={500}
                gap={{ lg: 6, base: 4 }}
                bg={'white'}
                boxShadow={'base'}
                borderRadius={'md'}
            >
                {children}
            </Flex>
        </Box>
    );
}
