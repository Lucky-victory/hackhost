'use client'
import { NewHackathon } from '@/const'
import { useAddHackathonMutation} from '@/state/services/hackathon-api'
import { Box ,Flex,FormControl, FormLabel, Input, Menu, MenuButton, MenuItem, MenuList, Text, Textarea} from '@chakra-ui/react'
import { ChangeEvent, FormEvent, useState } from 'react'
// import { second } from 'first'
const CreatePage = () => {
const currencies=['USD','GBP','EUR','INR','NGN']
const [formFields,setFormFields]=useState<NewHackathon>({title:'',currency:'USD',description:'',price:0,startDate:new Date(),endDate:new Date(),userId:''})
    function handleFormSubmit(evt: FormEvent){
        evt.preventDefault();
    

    }
    function handleInputChange(evt:(ChangeEvent|FormEvent)){
        const {name,value}=evt.target as (HTMLInputElement|HTMLTextAreaElement|HTMLButtonElement)
        setFormFields((prev)=>({...prev,[name]:value}))
    }

  return (
    <Box className='page'>

<FormControl  p={8} as={'form'} onSubmit={(evt)=>handleFormSubmit(evt)}>
    <FormLabel mb={8}>
        <Text as={'span'}>Title <Text as={'span'} color={'red.400'}>*</Text></Text>
<Input h={12} mt={4} value={formFields.title} name='title' isRequired  onChange={handleInputChange}>
</Input>
    </FormLabel>
    <FormLabel htmlFor='desc'>
        <Text as={'span'}>Details <Text as={'span'} color={'red.400'}>*</Text></Text>
    </FormLabel>
    <Flex align='center' justify={'space-between'}>

    <Text fontSize={'smaller'}>Give details about the hackathon, instructions, rules etc.</Text>
        <Text fontSize={'xs'} as={'em'}>markdown supported</Text>
    </Flex>
<Textarea mt={6} resize={'none'} h={250} id='desc' value={formFields.description} name='description' isRequired  onChange={handleInputChange}>
</Textarea>

<Flex my={6}>
<Menu >
    <MenuButton px={6} py={2} bg={'purple.100'} color={'purple.700'} value={formFields.currency}  borderRadius={'base'}>
        {formFields.currency}
        {/* <FaArrowUp /> */}
    </MenuButton>
    <MenuList>
{currencies.map((currency)=>  <MenuItem name='currency' value={currency} onClick={handleInputChange}>
    {currency}
    </MenuItem>)}
    
  
    </MenuList>
</Menu>
<Input type='number' value={formFields.price} onChange={handleInputChange} name='price' placeholder='30,000'>

</Input>
</Flex>
</FormControl>
    </Box>
  )
}

export default CreatePage