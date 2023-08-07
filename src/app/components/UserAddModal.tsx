import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    Menu,
    MenuButton,
    MenuIcon,
    MenuItem,
    MenuItemOption,
    MenuList,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    useDisclosure,
} from '@chakra-ui/react';

const UserAddModal = ({ mode = 'create', modalBtnText = 'Add New User' }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <Box>
            <Button colorScheme="purple" borderRadius={'base'} onClick={onOpen}>
                {modalBtnText}
            </Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalCloseButton />
                    <ModalHeader>{modalBtnText}</ModalHeader>
                    <ModalBody>
                        <FormControl>
                            <Box mb={4}>
                                <FormLabel htmlFor="n">Name:</FormLabel>
                                <Input
                                    id="n"
                                    placeholder="name"
                                    autoComplete={'off'}
                                />
                            </Box>
                            <Box mb={4}>
                                <FormLabel htmlFor="p">Password:</FormLabel>
                                <Input
                                    id="p"
                                    type="password"
                                    placeholder="password"
                                    autoComplete={'off'}
                                />
                            </Box>
                            <Box mb={4}>
                                <FormLabel htmlFor="e">
                                    E-mail address:
                                </FormLabel>
                                <Input
                                    type="email"
                                    id="e"
                                    autoComplete={'off'}
                                    placeholder="E-mail address"
                                />
                            </Box>
                            <Box my={4}>
                                <Menu>
                                    <MenuButton
                                        border={'1px'}
                                        borderColor={'gray.100'}
                                        _hover={{ bg: 'gray.300' }}
                                        _focus={{ boxShadow: 'outline' }}
                                        _expanded={{ boxShadow: 'outline' }}
                                        borderRadius={'base'}
                                        fontWeight={'medium'}
                                        py={2}
                                        px={'4'}
                                        bg={'purple.50'}
                                    >
                                        Choose Role
                                    </MenuButton>

                                    <MenuList>
                                        <MenuItem>BASIC</MenuItem>
                                        <MenuItem>ADMIN</MenuItem>
                                        <MenuItem>MOD</MenuItem>
                                    </MenuList>
                                </Menu>
                            </Box>
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button mr={4} variant={'outline'} onClick={onClose}>
                            Cancel
                        </Button>
                        <Button colorScheme="purple">Create</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
};

export default UserAddModal;
