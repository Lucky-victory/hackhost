'use client'
import { Hackathon } from "@/const";
import {
    Box,
    Flex,
    Heading,
    Tag,
    TagLabel,
    Text,
    Image,
    LinkBox,
    LinkOverlay,
    HStack,
  } from "@chakra-ui/react";
import { format } from "date-fns";
  

  import NextLink from "next/link";
const HackathonItem = ({hackathon,loading}:{hackathon:Hackathon,loading:boolean}) => {
  return (
    <LinkBox border={'2px'} transitionProperty={'border'} transition={'0.25s ease-in-out'} _hover={{borderColor:'purple.400',borderRight:'8px',borderRightColor:'purple.500'}} borderRadius={'base'} borderColor={'gray.300'}  as={Flex} p={4} pr={6} w={800} maxW={'100%'} minW={600} >
    <Image
      borderRadius={"lg"}
      alt="b"
      src={"/images/placeholder.webp"}
      w={"3xs"}
      maxH={'3xs'}
    />
    <LinkOverlay as={NextLink} href="/">
      <Box ml={4}>
        <Heading fontWeight={'semibold'} mb={4} as="h3" fontSize={{lg:'3xl',base:'lg'}}>
         {hackathon.title}
        </Heading>
        <Box as={Flex} wrap={'wrap'} align={'center'}>
          <Tag mr={6}
            size="lg"
            bg={"teal"}
            color={"white"}
            borderRadius="full"
          >
            <Box
              w={1}
              h={1}
              borderRadius={"full"}
              bg={"white"}
              mr={2}
            ></Box>
            <TagLabel>7 Days Left</TagLabel>
          </Tag>
<Text as={'span'} fontWeight={'bold'}>{format(new Date(hackathon.startDate),'MMM dd')} - {format(new Date(hackathon.endDate),'MMM dd')}, {format(new Date(hackathon.startDate),'yyyy')}</Text>
        </Box>
        <HStack my={4} gap={6} wrap={'wrap'}>
          <Box>
            <Text as={'span'} display={'inline-block'} mr={2} fontWeight={'bold'}>$32,000</Text>
            <Text as={'span'} color={'gray.500'}>in prizes</Text>
          </Box>
          <Box>
            <Text as={'span'} display={'inline-block'} mr={2} fontWeight={'bold'}>562</Text>
            <Text as={'span'} color={'gray.500'}> participants</Text>
          </Box>
        </HStack>
      </Box>
    </LinkOverlay>
  </LinkBox>
  
  )
}

export default HackathonItem