'use client'
import { useGetHackathonQuery } from "@/state/services/hackathon-api";

import { Box } from "@chakra-ui/react";
import { useParams } from "next/navigation";

export default function HackathonPage() {
    const { slug } = useParams();
    const {data:hackathon,isLoading,endpointName,error,
    } = useGetHackathonQuery(slug as string)
    console.log({hackathon,error,endpointName});
    
    return <Box p={"1rem"}>slug:{slug}
      {isLoading}
      <pre>{JSON.stringify(hackathon, undefined, 3)}</pre>
  </Box>;
}
