'use client';

import DashboardSidebar from '@/src/app/components/DashboardSidebar';
import { Box, Flex } from '@chakra-ui/react';

const OverviewPage = () => {
    return (
        <>
            
                <DashboardSidebar currentPage="overview" />
                <Box>Main contet here</Box>
            
        </>
    );
};

export default OverviewPage;
