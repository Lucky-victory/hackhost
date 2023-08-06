'use client';

import {
    Box,
    Button,
    Card,
    CardBody,
    FormControl,
    FormLabel,
    Input,
    Text,
} from '@chakra-ui/react';
import React, { ChangeEvent, FormEvent, useState } from 'react';
import OAuthButtons from '@/src/app/components/OAuth';
import { useSession, signIn } from 'next-auth/react';
import { useGetCSRFTokenQuery } from '@/state/services/hackathon-api';
import { envConfigs } from '@/lib/env-config';
import { Link } from '@chakra-ui/next-js';
import NextLink from 'next/link';
import Navbar from '@/src/app/components/Navbar';
import { useSearchParams } from 'next/navigation';

const SignInPage = () => {
    const sess = useSession();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { data } = useGetCSRFTokenQuery();
    const params = useSearchParams();
    const redirectUrl = params.get('from');

    const [signInForm, setSignInForm] = useState({
        password: '',
        email: '',
        type: '',
    });
    function handleFormSubmit(evt: FormEvent) {
        evt.preventDefault();
        setIsSubmitting(true);
        signIn('credentials', {
            ...signInForm,
            redirect: true,
            callbackUrl: redirectUrl ? redirectUrl : '/',
        });
    }
    function handleInputChange(evt: ChangeEvent<HTMLInputElement>) {
        const { target } = evt;
        const { name, value } = target;
        setSignInForm((prev) => ({ ...prev, [name]: value }));
    }
    return (
        <Box className="page" px={4}>
            <Navbar />
            <Box mt={'calc(var(--navbar-height) + 2rem )'}>
                <Card
                    maxW={600}
                    my={6}
                    mx={'auto'}
                    borderRadius={'md'}
                    boxShadow={'base'}
                >
                    <CardBody>
                        <FormControl as={'form'} onSubmit={handleFormSubmit}>
                            <Box my={4}>
                                <FormLabel htmlFor="email">
                                    E-mail:
                                    <Text as={'span'} size={'xs'} color={'red'}>
                                        *
                                    </Text>
                                </FormLabel>
                                <Input
                                    placeholder="john@example.com"
                                    isRequired
                                    name="email"
                                    id="email"
                                    type="email"
                                    value={signInForm.email}
                                    onChange={handleInputChange}
                                />
                            </Box>
                            <Box my={4}>
                                <FormLabel htmlFor="password">
                                    Password:
                                    <Text as={'span'} size={'xs'} color={'red'}>
                                        *
                                    </Text>
                                </FormLabel>
                                <Input
                                    type="password"
                                    minLength={6}
                                    onChange={handleInputChange}
                                    placeholder="password"
                                    isRequired
                                    name="password"
                                    id="password"
                                    value={signInForm.password}
                                />
                            </Box>
                            {/* <input
                            type="hidden"
                            name="csrfToken"
                            defaultValue={data?.csrfToken}
                        /> */}
                            <input
                                type="hidden"
                                name="csrfToken"
                                defaultValue={data?.csrfToken}
                            />
                            <input
                                type="hidden"
                                name="callbackUrl"
                                defaultValue={envConfigs.nextauth.url}
                            />
                            <Text mt={4} fontSize={'xs'}>
                                Don&apos;t have an account yet?{' '}
                                <Link
                                    fontWeight={'semibold'}
                                    as={NextLink}
                                    color={'purple'}
                                    href={'/auth/sign-up'}
                                >
                                    Create account
                                </Link>
                            </Text>
                            <Button
                                w={'full'}
                                my={4}
                                type="submit"
                                isLoading={isSubmitting}
                                loadingText="Signing in ..."
                                colorScheme="purple"
                            >
                                Sign In
                            </Button>
                        </FormControl>
                        <Box
                            my={4}
                            mb={6}
                            pos={'relative'}
                            h={'1px'}
                            bg={'gray.200'}
                        >
                            <Text
                                pos={'absolute'}
                                bg={'white'}
                                top={'50%'}
                                translateY={'-50%'}
                                left={'50%'}
                                transform={'auto'}
                                translateX={'-50%'}
                                px={2}
                            >
                                or
                            </Text>
                        </Box>
                        <OAuthButtons
                            csrfToken={data?.csrfToken}
                        ></OAuthButtons>
                    </CardBody>
                </Card>
            </Box>
        </Box>
    );
};

export default SignInPage;
