import { HACKATHON_SUB_STATUS, HackathonResult } from '@/const';
import { Utils as U } from '@/lib/utils';
import {
    Box,
    Button,
    Flex,
    HStack,
    Stack,
    StackDivider,
    Tag,
    TagLabel,
    Text,
} from '@chakra-ui/react';
import { format, formatDistanceStrict } from 'date-fns';
import isEmpty from 'just-is-empty';
import { MdAccountBalance, MdLanguage } from 'react-icons/md';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { useJoinHackathonMutation } from '@/state/services/hackathon-api';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import NextLink from 'next/link';
const HackathonPageSidebar = ({
    hackathon,
}: {
    hackathon: HackathonResult;
}) => {
    const { slug } = useParams();
    const sess = useSession();
    console.log({ sess, slug });
    const [hasJoined, setHasJoined] = useState(false);

    const [joinHackathonTrigger, { isSuccess, isLoading, data }] =
        useJoinHackathonMutation();
    const pathname = usePathname();
    const router = useRouter();
    const participantIds = hackathon?.participants?.map((part) => part?.userId);
    console.log({ participantIds, hasJoined });
    useEffect(() => {
        //@ts-ignore

        setHasJoined(participantIds?.includes(sess.data?.user?.id));

        //@ts-ignore
    }, [hasJoined, hackathon, sess.data?.user]);
    async function handleHackathonJoin() {
        try {
            if (!sess.data) {
                return router.push(`/api/auth/signin?returnTo=${pathname}`);
            }
            await joinHackathonTrigger(slug as string);
        } catch (error) {
            console.log('error joining hackathon', error);
        }
    }
    console.log({ data, isLoading, isSuccess });
    return (
        <Box
            as="aside"
            alignSelf={'start'}
            boxShadow={'base'}
            borderRadius={'md'}
            minH={{ lg: 250, base: 200 }}
            bg={'white'}
            // w={'full'}
            flex={1}
            minW={{ lg: 400, base: 300 }}
            maxW={{ lg: 400 }}
            p={'4'}
        >
            <Stack divider={<StackDivider />} gap={4}>
                {hasJoined ? (
                    <Button
                        as={NextLink}
                        maxW={500}
                        mx={'auto'}
                        w={'full'}
                        href={`${pathname}/project/create`}
                        colorScheme="purple"
                        borderRadius={'base'}
                    >
                        Create Project
                    </Button>
                ) : (
                    <Button
                        onClick={handleHackathonJoin}
                        maxW={500}
                        mx={'auto'}
                        w={'full'}
                        loadingText="Joining..."
                        isLoading={isLoading}
                        colorScheme="purple"
                        borderRadius={'base'}
                    >
                        Join Hackathon
                    </Button>
                )}

                <Box as={Flex} gap={4} wrap={'wrap'} align={'center'}>
                    <Tag
                        mr={4}
                        size="lg"
                        bg={U.dynamicBorderColor(
                            hackathon?.subStatus as HACKATHON_SUB_STATUS
                        )}
                        color={'white'}
                        borderRadius="full"
                    >
                        <Box
                            w={1}
                            h={1}
                            borderRadius={'full'}
                            bg={'white'}
                            mr={2}
                        ></Box>

                        <TagLabel fontWeight={'medium'}>
                            {!isEmpty(hackathon) &&
                                formatDistanceStrict(
                                    new Date(hackathon.startDate),
                                    new Date(hackathon.endDate),
                                    { unit: 'day' }
                                )}{' '}
                            to deadline
                        </TagLabel>
                    </Tag>
                    <Text as={'span'} fontWeight={'medium'}>
                        Deadline:{' '}
                        {!isEmpty(hackathon) &&
                            format(
                                new Date(hackathon.endDate),
                                'MMM dd, yyyy'
                            )}{' '}
                        @{' '}
                        {!isEmpty(hackathon) &&
                            format(new Date(hackathon.endDate), 'hh:mm aaa')}
                    </Text>
                </Box>
                <HStack gap={4} wrap={'wrap'}>
                    <Box>
                        <Flex mb={4} align={'center'}>
                            <Box
                                as={MdLanguage}
                                mr={3}
                                size={22}
                                color={'gray.700'}
                            />
                            ONLINE
                        </Flex>
                        <Text
                            as={'span'}
                            display={'inline-block'}
                            mr={1}
                            fontWeight={'bold'}
                        >
                            {!isEmpty(hackathon) &&
                                U.getCurrencySymbol(hackathon.currency)}{' '}
                            {!isEmpty(hackathon) &&
                                U.formatCurrency(hackathon.price)}
                        </Text>
                        <Text as={'span'} color={'gray.500'}>
                            in prizes
                        </Text>
                    </Box>
                    <Box>
                        <Flex mb={4} align={'center'}>
                            <Box as={MdAccountBalance} size={22} mr={3} />
                            {!isEmpty(hackathon) && hackathon.type}
                        </Flex>
                        <Text
                            as={'span'}
                            display={'inline-block'}
                            mr={1}
                            fontWeight={'bold'}
                        >
                            {hackathon?._count?.participants}
                        </Text>
                        <Text as={'span'} color={'gray.500'}>
                            participant(s)
                        </Text>
                    </Box>
                </HStack>
            </Stack>
        </Box>
    );
};

export default HackathonPageSidebar;
