'use client';
import {
    HACKATHON_STATUS,
    HACKATHON_SUB_STATUS,
    HACKATHON_TYPE,
    HackathonCreate,
    PROJECT_STATUS,
    ProjectCreate,
} from '@/const';
import {
    useAddHackathonMutation,
    useAddProjectMutation,
} from '@/state/services/hackathon-api';
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Box,
    Button,
    Card,
    CardBody,
    Flex,
    FormControl,
    Toast,
    FormLabel,
    HStack,
    Hide,
    IconButton,
    Image,
    Input,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    StackDivider,
    Text,
    Textarea,
    Wrap,
    WrapItem,
    useDisclosure,
    useToast,
} from '@chakra-ui/react';
import {
    ChangeEvent,
    FormEvent,
    LegacyRef,
    MouseEvent,
    MouseEventHandler,
    ReactNode,
    forwardRef,
    useEffect,
    useRef,
    useState,
} from 'react';
import DatePicker from 'react-datepicker';
import {
    MdExpandMore,
    MdPhoto,
    MdAdd,
    MdClose,
    MdDelete,
} from 'react-icons/md';
import Navbar from '@/src/app/components/Navbar';
import { CloudinaryImage } from '@cloudinary/url-gen/assets/CloudinaryImage';
import {
    AdvancedImage,
    accessibility,
    responsive,
    lazyload,
    placeholder,
} from '@cloudinary/react';
import { useParams } from 'next/navigation';
import CloudinaryImageWidget from '@/src/app/components/CloudinaryImageWidget';
const toolsUsed = [
    'vue',
    'react',
    'react-native',
    'flutter',
    'angular',
    'svelte',
    'redux',
    'mysql',
    'postgresql',
    'mongodb',
    'tidb',
    'nodejs',
    'python',
];
const categories = ['Frontend', 'Backend', 'AI', 'Blockchain', 'Mobile App'];
const SubmissionPage = () => {
    const { slug: hackathonSlug } = useParams();
    const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(true);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [addProjectTrigger, { data, isLoading }] = useAddProjectMutation();
    const screenshotInputRef = useRef<HTMLInputElement | null>(null);
    const [startDate, setStartDate] = useState(new Date());
    const [selectedDateType, setSelectedDateType] = useState<'start' | 'end'>(
        'start'
    );
    const [endDate, setEndDate] = useState(
        new Date(new Date().setDate(new Date().getDate() + 30))
    );
    const initialFields = {
        title: '',
        description: '',
        screenshotUrl: '',
        repoUrl: '',
        demoUrl: '',
        fileUrl: '',
        slug: '',
        category: '',
        isWinner: false,
        status: PROJECT_STATUS.DRAFT,
        toolsUsed: [],
    };
    const [formFields, setFormFields] = useState<ProjectCreate>(initialFields);
    console.log({ data });
    const toast = useToast({ position: 'top' });
    function handleFormSubmit(evt: FormEvent) {
        evt.preventDefault();
        console.log({ formFields, data });
    }
    function handleInputChange(evt: ChangeEvent | FormEvent) {
        const { name, value } = evt.target as
            | HTMLInputElement
            | HTMLTextAreaElement
            | HTMLButtonElement;
        setFormFields((prev) => ({
            ...prev,
            [name]:
                name === 'toolsUsed'
                    ? [...formFields.toolsUsed, { name: value }]
                    : value,
        }));
    }

    function handleToolsUsedRemove(index: number) {
        const { toolsUsed } = formFields;
        let newTools = [...toolsUsed];
        newTools = newTools.filter((_, ind) => ind !== index);
        setFormFields((prev) => ({ ...prev, toolsUsed: newTools }));
    }
    // function handleJudgesInputChange(evt: ChangeEvent, index: number) {
    //     const { name, value } = evt.target as HTMLInputElement;
    //     const { judges } = formFields;
    //     const newJudges = [...judges];
    //     newJudges[index][name as keyof (typeof newJudges)[typeof index]] =
    //         value;

    //     setFormFields((prev) => ({ ...prev, judges: newJudges }));
    // }
    // function handlePhotoSelect(index: number) {
    //     console.log({ inp: fileInputRefs.current[index] });

    //     fileInputRefs.current[index]?.click();
    // }
    function handleScreenshotPhotoSelect() {
        screenshotInputRef.current?.click();
    }

    // function handleFileInputChange(
    //     evt: ChangeEvent<HTMLInputElement>,
    //     index: number
    // ) {
    //     console.log(evt.target.files, { index });
    //     const file = (evt.target.files && evt.target.files[0]) as File;
    // const { judges } = formFields;
    // const newJudges = [...judges];
    // const reader = new FileReader();
    // reader.onload = function (e) {
    //     newJudges[index]['avatar'] = e.target?.result as string;
    //     setFormFields((prev) => ({ ...prev, judges: newJudges }));
    // };
    // reader.readAsDataURL(file);
    // }
    async function handleProjectPublish(status: keyof typeof PROJECT_STATUS) {
        setFormFields((prev) => ({
            ...prev,
            status,
        }));
        try {
            const fields = { ...formFields, status };
            await addProjectTrigger({
                ...fields,
                slug: hackathonSlug as string,
            });
            setTimeout(() => {
                if (status !== 'DRAFT') {
                    setFormFields(initialFields);
                }
            }, 1500);
            toast({
                title: 'Project added successfully.',
                description: '',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
        } catch (error) {
            toast({
                title: 'An error occured.',
                description: '',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    }

    return (
        <Box className="page" pb={12}>
            <Navbar />
            <FormControl
                p={8}
                as={'form'}
                onSubmit={(evt) => handleFormSubmit(evt)}
            >
                <Card mb={6}>
                    <CardBody>
                        <HStack
                            bg={'inherit'}
                            wrap={'wrap'}
                            divider={<StackDivider />}
                            justify={'flex-end'}
                            w={'full'}
                            mb={8}
                        >
                            <Button
                                onClick={() => handleProjectPublish('DRAFT')}
                                type="submit"
                                colorScheme="purple"
                                variant={'outline'}
                                fontWeight={'medium'}
                                isLoading={isLoading}
                                loadingText="Submitting..."
                            >
                                Save as Draft{' '}
                            </Button>
                            <Button
                                isLoading={isLoading}
                                type="submit"
                                colorScheme="purple"
                                loadingText="Submitting..."
                                onClick={() =>
                                    handleProjectPublish('PUBLISHED')
                                }
                            >
                                Publish
                            </Button>
                        </HStack>
                    </CardBody>
                </Card>

                <Card mb={8}>
                    <CardBody>
                        <FormLabel mb={8}>
                            <Text as={'span'}>
                                Title:
                                <Text as={'span'} color={'red.400'}>
                                    *
                                </Text>
                            </Text>
                            <Input
                                h={12}
                                mt={4}
                                value={formFields.title}
                                name="title"
                                isRequired
                                _focus={{ borderColor: 'purple.600' }}
                                onChange={handleInputChange}
                                placeholder="Project Title"
                            ></Input>
                        </FormLabel>

                        <Box minH={100} mb={4}>
                            <FormLabel htmlFor="scrnshot">
                                <Text as={'span'}>
                                    ScreenShot:
                                    <Text as={'span'} color={'red.400'}>
                                        *
                                    </Text>
                                </Text>
                            </FormLabel>
                            <Box>
                                <Text size={'smaller'}>
                                    Upload a screenshot of your project
                                </Text>
                            </Box>
                            <Flex wrap={'wrap'} align="center" gap={6}>
                                <Flex
                                    my={3}
                                    bg={'gray.100'}
                                    w={'full'}
                                    h={150}
                                    borderRadius={'md'}
                                    maxW={400}
                                    align={'center'}
                                    justify={'center'}
                                >
                                    <Text color={'gray.400'}>
                                        Screenshot preview will appear here{' '}
                                    </Text>
                                </Flex>

                                {/* <Input
                                    hidden
                                    type="file"
                                    ref={screenshotInputRef}
                                    id="srcnshot"
                                    accept="image/*"
                                ></Input>
                                <Button
                                    colorScheme="purple"
                                    onClick={handleScreenshotPhotoSelect}
                                >
                                    <MdPhoto />
                                    Choose Photo{' '}
                                </Button> */}
                                <CloudinaryImageWidget />
                            </Flex>
                        </Box>
                        <FormLabel htmlFor="desc">
                            <Text as={'span'}>
                                Details:
                                <Text as={'span'} color={'red.400'}>
                                    *
                                </Text>
                            </Text>
                        </FormLabel>
                        <Flex
                            align="center"
                            justify={'space-between'}
                            wrap={'wrap'}
                            gap={3}
                        >
                            <Text fontSize={'smaller'}>
                                Give details about your projects, how you
                                utilized the available tools.
                            </Text>
                        </Flex>
                        <Box mt={4}>
                            <Text
                                fontSize={'xs'}
                                color={'gray.500'}
                                textAlign={'right'}
                            >
                                markdown supported
                            </Text>

                            <Textarea
                                mt={2}
                                resize={'vertical'}
                                h={220}
                                minH={150}
                                maxH={350}
                                id="desc"
                                value={formFields.description}
                                _focus={{ borderColor: 'purple.600' }}
                                name="description"
                                placeholder={`# About this project\n\n\n## Tools used\n\n\n## Challenges
              `}
                                isRequired
                                onChange={handleInputChange}
                            ></Textarea>
                        </Box>
                    </CardBody>
                </Card>
                <Card mb={8}>
                    <CardBody>
                        <HStack
                            wrap={'wrap'}
                            divider={<StackDivider />}
                            my={6}
                            gap={{ lg: 6, base: 4 }}
                        >
                            <Box>
                                <FormLabel htmlFor="category">
                                    Tools Used:
                                </FormLabel>

                                <Menu id="tools-menu">
                                    <Flex
                                        align={'center'}
                                        gap={4}
                                        wrap={'wrap'}
                                    >
                                        <Flex
                                            overflowX={'auto'}
                                            align="center"
                                            gap={2}
                                            minW={80}
                                            display={'inline-block'}
                                            maxW={200}
                                            py={2}
                                        >
                                            {formFields.toolsUsed?.map(
                                                (t, i) => (
                                                    <Text
                                                        flexShrink={0}
                                                        size={'smaller'}
                                                        bg={'grap.100'}
                                                        borderRadius={'base'}
                                                        key={'tag' + i}
                                                    >
                                                        {t?.name}{' '}
                                                        <IconButton
                                                            onClick={() =>
                                                                handleToolsUsedRemove(
                                                                    i
                                                                )
                                                            }
                                                            size={'xs'}
                                                            aria-label="close"
                                                            icon={<MdClose />}
                                                        />
                                                    </Text>
                                                )
                                            )}
                                        </Flex>
                                        <MenuButton
                                            minW={160}
                                            px={6}
                                            py={2}
                                            border={'1px'}
                                            maxH={10}
                                            borderColor={'purple.200'}
                                            borderRadius={'base'}
                                            _focus={{
                                                border: '2px',
                                                borderColor: 'purple.500',
                                            }}
                                            _hover={{
                                                border: '2px',
                                                borderColor: 'purple.500',
                                            }}
                                            color={'purple.700'}
                                        >
                                            <MdExpandMore />
                                        </MenuButton>
                                    </Flex>
                                    <MenuList>
                                        {toolsUsed.map((tool) => (
                                            <MenuItem
                                                key={crypto.randomUUID()}
                                                name="toolsUsed"
                                                value={tool}
                                                onClick={handleInputChange}
                                            >
                                                {tool}
                                            </MenuItem>
                                        ))}
                                    </MenuList>
                                </Menu>
                            </Box>
                            <Box>
                                <FormLabel htmlFor="category">
                                    Category:
                                </FormLabel>
                                <Menu id="category-menu">
                                    <MenuButton
                                        minW={160}
                                        px={6}
                                        py={2}
                                        border={'1px'}
                                        maxH={10}
                                        borderColor={'purple.200'}
                                        borderRadius={'base'}
                                        _focus={{
                                            border: '2px',
                                            borderColor: 'purple.500',
                                        }}
                                        _hover={{
                                            border: '2px',
                                            borderColor: 'purple.500',
                                        }}
                                        color={'purple.700'}
                                    >
                                        <Flex align={'center'} gap={4}>
                                            {formFields.category}

                                            <MdExpandMore />
                                        </Flex>
                                    </MenuButton>
                                    <MenuList>
                                        {categories.map((category) => (
                                            <MenuItem
                                                key={crypto.randomUUID()}
                                                name="category"
                                                value={category}
                                                onClick={handleInputChange}
                                            >
                                                {category}
                                            </MenuItem>
                                        ))}
                                    </MenuList>
                                </Menu>
                            </Box>
                        </HStack>
                    </CardBody>
                </Card>
                <Card>
                    <CardBody>
                        <Wrap>
                            <WrapItem mr={8}>
                                <Box>
                                    <FormLabel htmlFor="s-date">
                                        Demo Link:
                                        <Text
                                            as={'span'}
                                            color="red.400"
                                            fontSize={'sm'}
                                        >
                                            *
                                        </Text>
                                    </FormLabel>
                                    <Text fontSize={'xs'} mb={2}>
                                        Link to view your live project.
                                    </Text>
                                </Box>
                                <Input
                                    name="demoUrl"
                                    value={formFields.demoUrl}
                                    placeholder="https://my-app.example.com"
                                />
                            </WrapItem>
                            <WrapItem>
                                <Box>
                                    <FormLabel htmlFor="e-date">
                                        Repo Link:
                                        <Text
                                            as={'span'}
                                            color="red.400"
                                            fontSize={'sm'}
                                        >
                                            *
                                        </Text>
                                    </FormLabel>
                                    <Text fontSize={'xs'} mb={2}>
                                        Link to your project repo,
                                        Github,GitLab,etc.{' '}
                                    </Text>
                                </Box>
                                <Input
                                    name="repoUrl"
                                    value={formFields.repoUrl}
                                    placeholder="https://github.com/<username>/<project>"
                                />
                            </WrapItem>
                        </Wrap>
                    </CardBody>
                </Card>
            </FormControl>
        </Box>
    );
};

export default SubmissionPage;
