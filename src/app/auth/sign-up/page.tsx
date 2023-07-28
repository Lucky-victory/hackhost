'use client';

import { useGetCSRFTokenQuery } from '@/state/services/hackathon-api';
import {
    Box,
    Button,
    Card,
    CardBody,
    Divider,
    FormControl,
    FormLabel,
    Input,
    Text,
} from '@chakra-ui/react';
import { signIn, useSession } from 'next-auth/react';
import OAuthButtons from '@/src/app/components/OAuth';
import { ChangeEvent, FormEvent, useState } from 'react';
import { Link } from '@chakra-ui/next-js';
import NextLink from 'next/link';
import Navbar from '../../components/Navbar';
import { useSearchParams } from 'next/navigation';
const SignUpPage = () => {
    const sess = useSession();

    const [isSubmitting, setIsSubmitting] = useState(false);
    const { data } = useGetCSRFTokenQuery();
    const params = useSearchParams();
    const redirectUrl = params.get('from');
    const [signUpForm, setSignUpForm] = useState({
        name: '',
        password: '',
        email: '',
        type: 'create',
    });
    function handleFormSubmit(evt: FormEvent) {
        evt.preventDefault();
        setIsSubmitting(true);
        signIn('credentials', {
            ...signUpForm,
            redirect: true,
            callbackUrl: redirectUrl ? redirectUrl : '/',
        });
    }
    function handleInputChange(evt: ChangeEvent<HTMLInputElement>) {
        const { target } = evt;
        const { name, value } = target;
        setSignUpForm((prev) => ({ ...prev, [name]: value }));
    }
    return (
        <Box className="page" px={4}>
            <Navbar />
            <Box mt={'calc(var(--navbar-height) + 2rem )'}>
                <Card
                    maxW={500}
                    my={6}
                    mx={'auto'}
                    borderRadius={'md'}
                    boxShadow={'base'}
                >
                    <CardBody>
                        <FormControl
                            as={'form'}
                            onSubmit={handleFormSubmit}
                            method="post"
                        >
                            <Box my={4}>
                                <FormLabel htmlFor="name">
                                    Name:
                                    <Text size={'xs'} color={'red'} as={'span'}>
                                        *
                                    </Text>
                                </FormLabel>
                                <Input
                                    placeholder="John"
                                    isRequired
                                    name="name"
                                    id="name"
                                    value={signUpForm.name}
                                    onChange={handleInputChange}
                                />
                            </Box>
                            <Box my={4}>
                                <FormLabel htmlFor="email">
                                    E-mail:
                                    <Text as={'span'} size={'xs'} color={'red'}>
                                        *
                                    </Text>
                                </FormLabel>
                                <Input
                                    onChange={handleInputChange}
                                    placeholder="john@example.com"
                                    isRequired
                                    name="email"
                                    id="email"
                                    type="email"
                                    value={signUpForm.email}
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
                                    onChange={handleInputChange}
                                    placeholder="password"
                                    isRequired
                                    name="password"
                                    id="password"
                                    value={signUpForm.password}
                                />
                            </Box>
                            <Text mt={4} fontSize={'xs'}>
                                Already have an account?{' '}
                                <Link
                                    fontWeight={'semibold'}
                                    color={'purple'}
                                    href={'/auth/sign-in'}
                                >
                                    Login
                                </Link>
                            </Text>
                            <Button
                                w={'full'}
                                my={4}
                                type="submit"
                                colorScheme="purple"
                                isLoading={isSubmitting}
                                loadingText="Creating account..."
                            >
                                Sign Up
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

export default SignUpPage;
