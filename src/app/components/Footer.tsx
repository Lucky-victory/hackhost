"use client";

import { Box } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Box
      mt={6}
      bg={"purple.50"}
      as="footer"
      p={{ lg: 6, base: 4 }}
      minH={{ lg: 300, base: 250 }}
    ></Box>
  );
};

export default Footer;
