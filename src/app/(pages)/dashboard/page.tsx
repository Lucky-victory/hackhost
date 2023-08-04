'use client';

import {
    Box,
    Button,
    Divider,
    Flex,
    Link,
    List,
    ListItem,
    StackDivider,
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import DashboardSidebar from '@/src/app/components/DashboardSidebar';

const DashboardPage = () => {
    const router = useRouter();
    router.push('/dashboard/overview');
    return (
        <Box>
            <Box
                p={{ base: 6, lg: 10 }}
                px={{ xs: 0 }}
                bg={'whiteAlpha.600'}
                backdropBlur={'30px'}
                backdropFilter={'auto'}
                minH={'xl'}
            >
                <Flex
                    gap={{ lg: 8, base: 6 }}
                    bg={'white'}
                    p={{ lg: 6, base: 4 }}
                    borderRadius={'md'}
                >
                    <DashboardSidebar />
                    <Box>Main contet here</Box>
                </Flex>
            </Box>
        </Box>
    );
};

export default DashboardPage;
