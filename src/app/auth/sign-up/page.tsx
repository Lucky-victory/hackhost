'use client'

import { envConfigs } from "@/lib/utils"
import { useGetCSRFTokenQuery } from "@/state/services/hackathon-api"
import { Box, Button, Card, CardBody, FormControl, Text } from "@chakra-ui/react"
import { useSession } from 'next-auth/react'
import {GoogleIcon,GithubIcon} from "@/src/app/components/Icons"
const SignUpPage = () => {
  const sess=useSession()
  console.log(sess);
  
  const {data}=useGetCSRFTokenQuery()
  console.log(data);
  
  return (
    <Box className="page">

<Card maxW={600} m={'4 auto'}>
    <CardBody>
<FormControl as='form'>

</FormControl>

<FormControl as={'form'} method="post" action={`/api/auth/signin/google`}>
<input type="hidden" name="csrfToken" defaultValue={data?.csrfToken}/>
<input type="hidden" name="callbackUrl" defaultValue={envConfigs.nextauth.url}/>
    <Button type="submit"><Box mr={4} ><GoogleIcon size={28}/></Box> <Text>Sign Up with Google</Text> </Button>
</FormControl>

<FormControl as={'form'} method="post" action={`/api/auth/signin/github`}>
<input type="hidden" name="csrfToken" defaultValue={data?.csrfToken}/>
<input type="hidden" name="callbackUrl" defaultValue={envConfigs.nextauth.url}/>
    <Button type="submit"><Box mr={4} ><GithubIcon size={28}/></Box> <Text>Sign Up with Github</Text> </Button>
</FormControl>

    </CardBody>
</Card>
    </Box>
  )
}

export default SignUpPage