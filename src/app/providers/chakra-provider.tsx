'use client';

import { CacheProvider } from '@chakra-ui/next-js';
import { ChakraProvider as Provider } from '@chakra-ui/react';

export function ChakraProvider({ children }: { children: React.ReactNode }) {
    return (
        <CacheProvider>
            <Provider>{children}</Provider>
        </CacheProvider>
    );
}
