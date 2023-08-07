import { Flex, Spinner, Text } from "@chakra-ui/react";
import React from "react";

const Loader = ({ loadingText = "Fetching Data..." }) => {
  return (
    <Flex
      w={"full"}
      h={"full"}
      // minW={300}
      direction={"column"}
      align={"center"}
      justify={"center"}
      mx={"auto"}
    >
      <Spinner
        mb={2}
        thickness="4px"
        speed="0.45s"
        emptyColor="gray.200"
        color="purple.500"
        size="xl"
        label={loadingText}
      />
      <Text>{loadingText}</Text>
    </Flex>
  );
};

export default Loader;
