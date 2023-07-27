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
import { useSession } from 'next-auth/react';
import OAuthButtons from '@/src/app/components/OAuthButtons';
import { useState } from 'react';
const SignUpPage = () => {
    const sess = useSession();

    const { data } = useGetCSRFTokenQuery();
    const [signUpForm, setSignUpForm] = useState({
        name: '',
        password: '',
        email: '',
    });
    return (
        <Box className="page" px={4}>
            <Card
                maxW={500}
                my={6}
                mx={'auto'}
                borderRadius={'md'}
                boxShadow={'base'}
            >
                <CardBody>
                    <FormControl as={'form'}>
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
                                placeholder="password"
                                isRequired
                                name="password"
                                id="password"
                                value={signUpForm.password}
                            />
                        </Box>

                        <Button
                            w={'full'}
                            mb={6}
                            type="submit"
                            colorScheme="purple"
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
                    <OAuthButtons csrfToken={data?.csrfToken}></OAuthButtons>
                </CardBody>
            </Card>
        </Box>
    );
};

export default SignUpPage;
