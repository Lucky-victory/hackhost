import { Project } from '@/const';
import {
    Avatar,
    Box,
    Card,
    CardBody,
    Flex,
    Heading,
    Image,
    LinkBox,
    LinkOverlay,
    Skeleton,
    Text,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { format } from 'date-fns';
//@ts-ignore
const ProjectCardItem = ({ project = {} }: { project: Project }) => {
    return (
        <Card minH={180} maxW={350} borderRadius={'md'} boxShadow={'base'}>
            <CardBody>
                <LinkBox>
                    <LinkOverlay as={NextLink} href="#"></LinkOverlay>
                    <Box mb={4}>
                        <Image
                            w={'full'}
                            style={{ objectFit: 'cover' }}
                            borderRadius={'base'}
                            alt=""
                            src={
                                project?.screenshotUrl ||
                                '/images/placeholder.webp'
                            }
                        />
                    </Box>
                    <Box py={4}>
                        <Heading as={'h4'} size={'md'} my={4}>
                            {project?.title || 'Project Title'}
                        </Heading>

                        <Flex align={'center'} mb={4}>
                            <Avatar
                                src={project?.user?.avatar as string}
                                name={project?.user?.name}
                                size={{ base: 'md', xs: 'sm' }}
                            />
                            <Text ml={4} fontWeight={'semibold'}>
                                {project?.user?.name || 'Victory Lucky'}
                            </Text>
                        </Flex>
                        <Flex gap={2} fontSize={'smaller'}>
                            <Text as={'span'}>Submitted on:</Text>{' '}
                            <Text as="span">
                                {format(
                                    new Date(project?.updatedAt || new Date()),
                                    'MMM dd, 2023'
                                )}
                            </Text>
                        </Flex>
                    </Box>
                </LinkBox>
            </CardBody>
        </Card>
    );
};

export default ProjectCardItem;
