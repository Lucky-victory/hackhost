import '@/src/app/styles/globals.css';
import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
import { ChakraProvider } from './providers/chakra-provider';
import { ReduxProvider } from './providers/redux-provider';

const inter = Poppins({
    weight: ['300', '400', '500', '700'],
    subsets: ['latin'],
});
export const revalidate = 2;

export const metadata: Metadata = {
    title: 'Create Next App',
    description: 'Generated by create next app',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <ReduxProvider>
                    <ChakraProvider>{children}</ChakraProvider>
                </ReduxProvider>
            </body>
        </html>
    );
}
