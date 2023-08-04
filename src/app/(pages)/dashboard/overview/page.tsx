'use client';

import DashboardSidebar from '@/src/app/components/DashboardSidebar';
import { Box, Flex } from '@chakra-ui/react';

const OverviewPage = () => {
    return (
        <Box>
            <Flex
                minH={500}
                gap={{ lg: 8, base: 6 }}
                bg={'white'}
                borderRadius={'md'}
            >
                <DashboardSidebar currentPage="overview" />
                <Box>Main contet here</Box>
            </Flex>
        </Box>
    );
};

export default OverviewPage;
