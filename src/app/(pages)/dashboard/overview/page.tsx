'use client';

import DashboardSidebar from '@/src/app/components/DashboardSidebar';
import { Box, Flex } from '@chakra-ui/react';

const OverviewPage = () => {
    return (
        <Box>
            <Flex
                gap={{ lg: 8, base: 6 }}
                bg={'white'}
                p={{ lg: 6, base: 4 }}
                borderRadius={'md'}
            >
                <DashboardSidebar currentPage="overview" />
                <Box>Main contet here</Box>
            </Flex>
        </Box>
    );
};

export default OverviewPage;
