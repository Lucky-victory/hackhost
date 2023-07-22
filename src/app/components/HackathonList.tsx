import hackathon from "@/state/slices/hackathon"
import HackathonItem from "./HackathonItem"
import { Hackathon } from "@/const"
import { Box, Flex, Skeleton, Stack } from "@chakra-ui/react"

const HackathonList = ({hackathons =[],loading}:{hackathons:Hackathon[],loading:boolean}) => {
  return (
    <Box as={Flex} gap={6} wrap={'wrap'}>
        {loading ?
        <Stack>

        {[0,0,0,0].map(()=><Skeleton h={200} fadeDuration={3} >
            
            </Skeleton>)}
        </Stack>
            :
            hackathons.map((hackathon)=><HackathonItem loading key={crypto.randomUUID()} hackathon={hackathon} />)
        }
    </Box>
  )
}

export default HackathonList