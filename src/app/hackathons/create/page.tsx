"use client";
import { NewHackathon } from "@/const";
import { useAddHackathonMutation } from "@/state/services/hackathon-api";
import {
  Box,
  Button,
  Card,
  CardBody,
  Flex,
  FormControl,
  FormLabel,
  HStack,
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
  useState,
} from "react";
import DatePicker from "react-datepicker";
import { FaArrowDown, FaChevronDown } from "react-icons/fa";
// import { second } from 'first'
const currencies = ["USD", "GBP", "EUR", "INR", "NGN"];
const CreatePage = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [selectedDateType, setSelectedDateType] = useState<"start" | "end">(
    "start",
  );
  const [endDate, setEndDate] = useState(
    new Date(new Date().setDate(new Date().getDate() + 30)),
  );
  const [formFields, setFormFields] = useState<NewHackathon>({
    title: "",
    currency: "USD",
    description: "",
    price: 0,
    startDate,
    endDate,
    userId: "",
  });
  function handleFormSubmit(evt: FormEvent) {
    evt.preventDefault();
  }
  function handleInputChange(evt: ChangeEvent | FormEvent) {
    const { name, value } = evt.target as
      | HTMLInputElement
      | HTMLTextAreaElement
      | HTMLButtonElement;
    setFormFields((prev) => ({ ...prev, [name]: value }));
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
  const DateCustomInput = forwardRef<HTMLButtonElement, { id: string,value?:string,onClick?:MouseEventHandler<HTMLButtonElement> }>(
    ({ value, onClick, id }, ref) => (
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
    ),
  );

  return (
    <Box className="page" pb={12}>
      <FormControl p={8} as={"form"} onSubmit={(evt) => handleFormSubmit(evt)}>
        <Card mb={8}>
          <CardBody>
        <FormLabel mb={8}>
          <Text as={"span"}>
            Title{" "}
            <Text as={"span"} color={"red.400"}>
              *
            </Text>
          </Text>
          <Input
            h={12}
            mt={4}
            value={formFields.title}
            name="title"
            isRequired _focus={{borderColor:'purple.600'}}
            onChange={handleInputChange}
            placeholder="Hackathon Title"
          ></Input>
        </FormLabel>
            <FormLabel htmlFor="desc">
              <Text as={"span"}>
                Details{" "}
                <Text as={"span"} color={"red.400"}>
                  *
                </Text>
              </Text>
            </FormLabel>
            <Flex align="center" justify={"space-between"}>
              <Text fontSize={"smaller"}>
                Give details about the hackathon, instructions, rules etc.
              </Text>
              <Text fontSize={"xs"} as={"em"}>
                markdown supported
              </Text>
            </Flex>
            <Textarea
              mt={6}
              resize={"none"}
              h={250}
              id="desc"
              value={formFields.description} _focus={{borderColor:'purple.600'}}
              name="description"
              isRequired
              onChange={handleInputChange}
            ></Textarea>
          </CardBody>
        </Card>
<Card mb={8}>
    <CardBody>

  
        <HStack divider={<StackDivider/>} my={6} gap={6}>
            <Box>
<FormLabel htmlFor="currency-menu">Currency</FormLabel>
          <Menu id="currency-menu">
            <MenuButton
              px={6}
              py={2}
              border={"1px"}
    maxH={10}
        borderColor={"purple.200"}
        borderRadius={"base"}
        _focus={{ border: "2px", borderColor: "purple.500" }}
        _hover={{  border: "2px", borderColor: "purple.500" }}
              color={"purple.700"}
              value={formFields.currency}
            
            >
                <Flex align={'center'} gap={4}> 

              {formFields.currency}
        
            <FaChevronDown/>
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
Total Price<Text as={'span'} color="red.400" fontSize={'sm'}>*</Text>
</FormLabel>
          <Input id="price"
            type="number"
            value={formFields.price}
            onChange={handleInputChange}
            name="price"
            placeholder="30000" _focus={{borderColor:'purple.600'}}
            h={10}
            maxW={'3xl'} />
            </Box>
        </HStack>
        </CardBody>
</Card>
        <Card>
          <CardBody>
            <Wrap>
              <WrapItem mr={8}>
                <Box>

                <FormLabel htmlFor="s-date">Start Date</FormLabel>
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
                  <FormLabel htmlFor="e-date">End Date</FormLabel>
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


        <Button mt={8} size={'lg'} colorScheme="purple">
            Create
        </Button>
      </FormControl>
    </Box>
  );
};

export default CreatePage;
