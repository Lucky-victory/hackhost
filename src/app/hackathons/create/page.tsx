"use client";
import { HackathonCreate } from "@/const";
import { useAddHackathonMutation } from "@/state/services/hackathon-api";
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
} from "@chakra-ui/react";
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
} from "react";
import DatePicker from "react-datepicker";
import {
  MdExpandMore,
  MdPhoto,
  MdAdd,
  MdClose,
  MdDelete,
} from "react-icons/md";

const currencies = ["USD", "GBP", "EUR", "INR", "NGN"];
const CreatePage = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(true);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const drawerBtnRef = useRef<HTMLButtonElement | null>(null);
  const fileInputRefs = useRef<HTMLInputElement[] | null[]>([]);
  const [startDate, setStartDate] = useState(new Date());
  const [selectedDateType, setSelectedDateType] = useState<"start" | "end">(
    "start",
  );
  const [endDate, setEndDate] = useState(
    new Date(new Date().setDate(new Date().getDate() + 30)),
  );
  const [formFields, setFormFields] = useState<HackathonCreate>({
    title: "",
    currency: "USD",
    description: "",
    price: 0,
    startDate,
    endDate,
    userId: "",
    judges: [{ name: "", avatar: "", bio: "" }],
  });
  function handleFormSubmit(evt: FormEvent) {
    evt.preventDefault();
    console.log({ formFields });
  }
  function handleInputChange(evt: ChangeEvent | FormEvent) {
    const { name, value } = evt.target as
      | HTMLInputElement
      | HTMLTextAreaElement
      | HTMLButtonElement;
    setFormFields((prev) => ({
      ...prev,
      [name]: name === "price" ? +value : value,
    }));
  }
  function handleDatePicker(
    evt: ChangeEvent<HTMLDivElement>,
    type: "start" | "end",
  ) {
    const time = evt as unknown as Date;
    type === "end" ? setEndDate(time) : setStartDate(time);
    setSelectedDateType(type);
  }
  useEffect(() => {
    selectedDateType === "end"
      ? setFormFields((prev) => ({ ...prev, endDate }))
      : setFormFields((prev) => ({ ...prev, startDate }));
  }, [startDate, endDate]);

  //@ts-ignore
  const DateCustomInput = forwardRef<
    HTMLButtonElement,
    {
      id: string;
      value?: string;
      onClick?: MouseEventHandler<HTMLButtonElement>;
    }
  >(({ value, onClick, id }, ref) => (
    <Button
      border={"1px"}
      id={id}
      borderColor={"purple.200"}
      borderRadius={"base"}
      _focus={{ border: "2px", borderColor: "purple.500" }}
      _hover={{ border: "2px", borderColor: "purple.500" }}
      onClick={onClick}
      ref={ref}
    >
      {value}
    </Button>
  ));
  function handleAddMoreJudge() {
    const { judges } = formFields;
    const newJudges = [...judges, { name: "", bio: "", avatar: "" }];
    setFormFields((prev) => ({ ...prev, judges: newJudges }));
  }
  function handleRemoveJudge(index: number) {
    const { judges: prevJudges } = formFields;
    let newJudges = [...prevJudges];
    newJudges = newJudges.filter((_, ind) => ind !== index);
    setFormFields((prev) => ({ ...prev, judges: newJudges }));
  }
  function handleJudgesInputChange(evt: ChangeEvent, index: number) {
    const { name, value } = evt.target as HTMLInputElement;
    const { judges } = formFields;
    const newJudges = [...judges];
    newJudges[index][name as keyof (typeof newJudges)[typeof index]] = value;

    setFormFields((prev) => ({ ...prev, judges: newJudges }));
  }
  function handlePhotoSelect(index: number) {
    console.log({ inp: fileInputRefs.current[index] });

    fileInputRefs.current[index]?.click();
  }

  function handleFileInputChange(
    evt: ChangeEvent<HTMLInputElement>,
    index: number,
  ) {
    console.log(evt.target.files, { index });
    const file = (evt.target.files && evt.target.files[0]) as File;
    const { judges } = formFields;
    const newJudges = [...judges];
    const reader = new FileReader();
    reader.onload = function (e) {
      newJudges[index]["avatar"] = e.target?.result as string;
      setFormFields((prev) => ({ ...prev, judges: newJudges }));
    };
    reader.readAsDataURL(file);
  }

  function handleDrawerClose() {}
  return (
    <Box className="page" pb={12}>
      <FormControl p={8} as={"form"} onSubmit={(evt) => handleFormSubmit(evt)}>
        <HStack
          bg={"inherit"}
          wrap={"wrap"}
          divider={<StackDivider />}
          justify={"flex-end"}
          w={"full"}
          mb={8}
        >
          <Button
            ref={drawerBtnRef}
            onClick={onOpen}
            colorScheme="purple"
            variant={"ghost"}
            fontWeight={"medium"}
          >
            Preview{" "}
          </Button>
          <Button
            type="submit"
            colorScheme="purple"
            variant={"outline"}
            fontWeight={"medium"}
          >
            Save as Draft{" "}
          </Button>
          <Button type="submit" colorScheme="purple">
            Publish
          </Button>
        </HStack>
        <Card mb={8}>
          <CardBody>
            <FormLabel mb={8}>
              <Text as={"span"}>
                Title:
                <Text as={"span"} color={"red.400"}>
                  *
                </Text>
              </Text>
              <Input
                h={12}
                mt={4}
                value={formFields.title}
                name="title"
                isRequired
                _focus={{ borderColor: "purple.600" }}
                onChange={handleInputChange}
                placeholder="Hackathon Title"
              ></Input>
            </FormLabel>
            <FormLabel htmlFor="desc">
              <Text as={"span"}>
                Details:
                <Text as={"span"} color={"red.400"}>
                  *
                </Text>
              </Text>
            </FormLabel>
            <Flex
              align="center"
              justify={"space-between"}
              wrap={"wrap"}
              gap={3}
            >
              <Text fontSize={"smaller"}>
                Give details about the hackathon, instructions, rules etc.
              </Text>
            </Flex>
            <Box mt={6}>
              <Text fontSize={"xs"} color={"gray.500"} textAlign={"right"}>
                markdown supported
              </Text>

              <Textarea
                mt={2}
                resize={"vertical"}
                h={220}
                minH={150}
                maxH={350}
                id="desc"
                value={formFields.description}
                _focus={{ borderColor: "purple.600" }}
                name="description"
                placeholder={`# About this hackathon\n\n\n# Rules\n\n\n# Prizes
              `}
                isRequired
                onChange={handleInputChange}
              ></Textarea>
            </Box>
          </CardBody>
        </Card>
        <Card mb={8}>
          <CardBody>
            <HStack wrap={"wrap"} divider={<StackDivider />} my={6} gap={6}>
              <Box>
                <FormLabel htmlFor="currency-menu">Currency:</FormLabel>
                <Menu id="currency-menu">
                  <MenuButton
                    px={6}
                    py={2}
                    border={"1px"}
                    maxH={10}
                    borderColor={"purple.200"}
                    borderRadius={"base"}
                    _focus={{ border: "2px", borderColor: "purple.500" }}
                    _hover={{ border: "2px", borderColor: "purple.500" }}
                    color={"purple.700"}
                    value={formFields.currency}
                  >
                    <Flex align={"center"} gap={4}>
                      {formFields.currency}

                      <MdExpandMore />
                    </Flex>
                  </MenuButton>
                  <MenuList>
                    {currencies.map((currency) => (
                      <MenuItem
                        key={crypto.randomUUID()}
                        name="currency"
                        value={currency}
                        onClick={handleInputChange}
                      >
                        {currency}
                      </MenuItem>
                    ))}
                  </MenuList>
                </Menu>
              </Box>
              <Box>
                <FormLabel htmlFor="price">
                  Total Price:
                  <Text as={"span"} color="red.400" fontSize={"sm"}>
                    *
                  </Text>
                </FormLabel>
                <Input
                  id="price"
                  type="number"
                  value={formFields.price === 0 ? "" : formFields.price}
                  onChange={handleInputChange}
                  name="price"
                  placeholder="30000"
                  _focus={{ borderColor: "purple.600" }}
                  h={10}
                  isRequired
                  maxW={"3xl"}
                />
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
                    Start Date:
                    <Text as={"span"} color="red.400" fontSize={"sm"}>
                      *
                    </Text>
                  </FormLabel>
                  <Text fontSize={"xs"} mb={2}>
                    When does the hackathon start?
                  </Text>
                  <Box
                    customInput={<DateCustomInput id={"s-date"} />}
                    showIcon
                    as={DatePicker}
                    dateFormat={"dd MMM yyy hh:mm aaa"}
                    showTimeSelect
                    onChange={(e: ChangeEvent<HTMLDivElement>) =>
                      handleDatePicker(e, "start")
                    }
                    selected={startDate}
                  ></Box>
                </Box>
              </WrapItem>
              <WrapItem>
                <Box>
                  <FormLabel htmlFor="e-date">
                    End Date:
                    <Text as={"span"} color="red.400" fontSize={"sm"}>
                      *
                    </Text>
                  </FormLabel>
                  <Text fontSize={"xs"} mb={2}>
                    When does the hackathon end?
                  </Text>
                  <Box
                    customInput={<DateCustomInput id={"e-date"} />}
                    as={DatePicker}
                    showIcon
                    dateFormat={"dd MMM yyy hh:mm aaa"}
                    showTimeSelect
                    onChange={(e: ChangeEvent<HTMLDivElement>) =>
                      handleDatePicker(e, "end")
                    }
                    selected={endDate}
                  ></Box>
                </Box>
              </WrapItem>
            </Wrap>
          </CardBody>
        </Card>
        <Card my={6}>
          <CardBody>
            <Box>
              <Text fontWeight={"medium"} mb={2}>
                Judges
              </Text>
              <Text as={"span"} fontSize={"xs"}>
                Info about this hackathon Judges.
              </Text>
            </Box>

            {formFields.judges?.map((judge, index) => {
              return (
                <HStack
                  align={"center"}
                  my={6}
                  key={`judge-${index}`}
                  divider={<StackDivider />}
                  gap={4}
                  wrap={"wrap"}
                >
                  <Box>
                    <FormLabel htmlFor="j-name">
                      Name:
                      <Text as={"span"} color="red.400" fontSize={"sm"}>
                        *
                      </Text>
                    </FormLabel>
                    <Input
                      key={`judge-${index}`}
                      name="name"
                      value={judge.name}
                      onChange={(evt) => handleJudgesInputChange(evt, index)}
                      id="j-name"
                      isRequired
                      placeholder="John Mills"
                    />
                  </Box>
                  <Box>
                    <FormLabel htmlFor="j-bio">Bio:</FormLabel>
                    <Input
                      name="bio"
                      value={judge.bio as string}
                      onChange={(evt) => handleJudgesInputChange(evt, index)}
                      id="j-bio"
                      placeholder="Software Engineer at Somewhere"
                    />
                  </Box>
                  <Box>
                    <FormLabel htmlFor="j-photo">Photo:</FormLabel>
                    {judge.avatar ? (
                      <Box
                        border={"1px"}
                        borderColor={"gray.400"}
                        boxShadow={"lg"}
                        className="my-box"
                        pos={"relative"}
                        w={"5.5rem"}
                        h={"5.5rem"}
                        borderRadius={"full"}
                      >
                        <Box top={0} right={-2} pos={"absolute"} zIndex={1}>
                          <Button
                            w={4}
                            h={8}
                            p={0}
                            onClick={() => handlePhotoSelect(index)}
                            color={"whiteAlpha.900"}
                            borderRadius={"full"}
                            bg={"blackAlpha.700 !important"}
                            aria-label="camera icon"
                          >
                            <MdClose size={18} />
                          </Button>
                        </Box>
                        <Image
                          pos={"relative"}
                          borderRadius={"inherit"}
                          h={"full"}
                          w={"full"}
                          src={judge.avatar as string}
                          alt=""
                          objectFit={"cover"}
                        />
                      </Box>
                    ) : (
                      <Box>
                        <Button colorScheme="purple">
                          <MdPhoto />
                          <Text
                            ml={2}
                            as="span"
                            display={"inline-block"}
                            onClick={() => handlePhotoSelect(index)}
                          >
                            {" "}
                            Choose Photo
                          </Text>{" "}
                        </Button>
                        <Input
                          accept="image/*"
                          max={1}
                          onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            handleFileInputChange(e, index)
                          }
                          ref={(el) => (fileInputRefs.current[index] = el)}
                          id="j-photo"
                          type={"file"}
                          hidden
                        />
                      </Box>
                    )}
                  </Box>

                  {!(index === 0) && (
                    <Flex h={16} align={"flex-end"}>
                      <IconButton
                        onClick={() => handleRemoveJudge(index)}
                        aria-label="danger"
                        colorScheme="red"
                        icon={<MdDelete />}
                      ></IconButton>
                    </Flex>
                  )}
                </HStack>
              );
            })}

            <Box mt={3}>
              <Button
                onClick={handleAddMoreJudge}
                variant={"ghost"}
                colorScheme="purple"
                fontWeight={"medium"}
              >
                <MdAdd />
                <Text ml={2} as="span" display={"inline-block"}>
                  Add Another
                </Text>{" "}
              </Button>
            </Box>
          </CardBody>
        </Card>
      </FormControl>

      <Drawer
        isOpen={isOpen}
        finalFocusRef={drawerBtnRef}
        size={"lg"}
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>A preview of your hackathon</DrawerHeader>

          <DrawerBody>{/* <Input placeholder='Type here...' /> */}</DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Close
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default CreatePage;
