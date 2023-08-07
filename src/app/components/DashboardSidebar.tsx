import {
  Box,
  Button,
  Flex,
  IconButton,
  List,
  ListItem,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useState } from "react";
import {
  MdDashboard,
  MdGridOn,
  MdGridView,
  MdGroup,
  MdMenu,
} from "react-icons/md";
const pages = [
  { icon: MdDashboard, title: "overview", url: "/dashboard/overview" },
  { icon: MdGridOn, title: "projects", url: "/dashboard/projects" },
  { icon: MdGroup, title: "users", url: "/dashboard/users" },
  {
    icon: MdGridView,
    title: "hackathons",
    url: "/dashboard/hackathons",
  },
];
const DashboardSidebar = ({ currentPage = "" }) => {
  const isCurrentPage = (tab = "", page: string) => {
    return tab === page;
  };
  const [menuWidth, setMenuWidth] = useState(50);
  const toggleMenu = () => {
    setMenuWidth(menuWidth === 50 ? 220 : 50);
  };
  return (
    <Box
      minH={"full"}
      // px={6}
      transition={"all 0.75s ease-in-out"}
      py={6}
      minW={{
        lg: `220`,
        base: `${menuWidth}px`,
      }}
      overflowX={"hidden"}
      w={{ base: `${menuWidth}px` }}
      bg={"purple.600"}
      borderLeftRadius={"md"}
    >
      <Flex direction={"column"}>
        <IconButton
          ml={1.5}
          alignSelf={"flex-start"}
          onClick={toggleMenu}
          mb={4}
          aria-label="toggle menu"
          fontSize={"xl"}
          variant={"ghost"}
          color={"white"}
          icon={<MdMenu />}
          _hover={{ bg: "purple.400" }}
        />
        <List display={"flex"} flexDirection={"column"} gap={"4"} w={"full"}>
          {pages.map((page, i) => {
            return (
              <ListItem key={"page-" + i}>
                {isCurrentPage(currentPage, page.title) ? (
                  <Button
                    minH={12}
                    textTransform={"capitalize"}
                    as={NextLink}
                    href={page.url}
                    fontWeight={"medium"}
                    w={"full"}
                    justifyContent={"flex-start"}
                    borderRadius={"none"}
                    colorScheme={"purple"}
                    borderLeft={"4px"}
                    borderLeftColor={"white"}
                    _hover={{
                      bg: "purple.400",
                    }}
                  >
                    <Box flexShrink={0} as={page.icon} mr={3}></Box>{" "}
                    {page.title}
                  </Button>
                ) : (
                  <Button
                    minH={12}
                    textTransform={"capitalize"}
                    as={NextLink}
                    href={page.url}
                    bg={"transparent"}
                    _hover={{
                      bg: "purple.500",
                      color: "white",
                    }}
                    fontWeight={"medium"}
                    w={"full"}
                    justifyContent={"flex-start"}
                    borderRadius={"none"}
                    color={"whiteAlpha.900"}
                  >
                    <Box flexShrink={0} as={page.icon} mr={3}></Box>{" "}
                    {page.title}
                  </Button>
                )}
              </ListItem>
            );
          })}
        </List>
      </Flex>
    </Box>
  );
};

export default DashboardSidebar;
