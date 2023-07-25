import '@/src/app/styles/globals.css';

import 'react-datepicker/dist/react-datepicker.css';
import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import { ChakraProvider } from './providers/chakra-provider';
import { ReduxProvider } from './providers/redux-provider';
import { NextAuthSessionProvider } from './providers/nextauth-provider';

const inter = Montserrat({
    weight: ['400', '500', '600', '700'],
    subsets: ['latin'],
});
export const revalidate = 2;

export const metadata: Metadata = {
    title: 'HackHost | The Hub of Innovation Challenges',
    description: `Ignite your creativity, level up your skills, and conquer the tech world. Join forces with fellow innovators to build groundbreaking products that defy convention. Win awesome prizes as you code your way to victory in thrilling hackathons.`,
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <NextAuthSessionProvider>
                    <ReduxProvider>
                        <ChakraProvider>{children}</ChakraProvider>
                    </ReduxProvider>
                </NextAuthSessionProvider>
            </body>
        </html>
    );
}
