import { Box, Button, FormControl, Text } from '@chakra-ui/react';
import { GithubIcon, GoogleIcon } from './Icons';
import { envConfigs } from '@/lib/env-config';

const OAuthButtons = ({ csrfToken = '' }) => {
    return (
        <Box my={4}>
            <FormControl
                mb={4}
                as={'form'}
                method="post"
                action={`/api/auth/signin/google`}
            >
                <input
                    type="hidden"
                    name="csrfToken"
                    defaultValue={csrfToken}
                />
                <input
                    type="hidden"
                    name="callbackUrl"
                    defaultValue={envConfigs.nextauth.url}
                />
                <Button type="submit" w={'full'}>
                    <Box mr={4}>
                        <GoogleIcon size={28} />
                    </Box>{' '}
                    <Text>Sign Up with Google</Text>{' '}
                </Button>
            </FormControl>

            <FormControl
                mb={4}
                as={'form'}
                method="post"
                action={`/api/auth/signin/github`}
            >
                <input
                    type="hidden"
                    name="csrfToken"
                    defaultValue={csrfToken}
                />
                <input
                    type="hidden"
                    name="callbackUrl"
                    defaultValue={envConfigs.nextauth.url}
                />
                <Button type="submit" w={'full'}>
                    <Box mr={4}>
                        <GithubIcon size={28} />
                    </Box>{' '}
                    <Text>Sign Up with Github</Text>{' '}
                </Button>
            </FormControl>
        </Box>
    );
};

export default OAuthButtons;
