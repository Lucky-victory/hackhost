import { Project } from "@/const";
import ProjectCardItem from "./ProjectCardItem";
import { Box, Wrap } from "@chakra-ui/react";

const PorjectCardList = ({ projects = [] }: { projects: Project[] }) => {
  return (
    <Wrap flexWrap={"wrap"} h={"fit-content"} spacing={4}>
      {projects?.map((project) => {
        return <ProjectCardItem key={crypto.randomUUID()} project={project} />;
      })}
    </Wrap>
  );
};

export default PorjectCardList;
