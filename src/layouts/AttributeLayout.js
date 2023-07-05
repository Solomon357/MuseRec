import { Box, Heading, Container, VStack, Button, HStack, Divider, RadioGroup, Radio } from "@chakra-ui/react";
import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";


const AttributeLayout = () => {
    const navigate = useNavigate();

    const [mood, setMood] = useState("")
    const [genre, setGenre] = useState("")

    return ( 
        <Container textAlign={"center"}>
            <Heading mb={"50px"}>Search by Attributes</Heading>

            
            <VStack gap={5}>
                <Heading as={"h2"} size={"lg"}>Mood</Heading> 

                <RadioGroup colorScheme="brand" size={"xl"} onChange={setMood} value={mood}>
                    <HStack gap={3} wrap={"wrap"}>
                        <Radio value={"happy"}>Happy</Radio>
                        <Radio value={"sad"}>Sad</Radio>
                        <Radio value={"romantic"}>Romantic</Radio>
                        <Radio value={"aggressive"}>Aggressive</Radio>
                    </HStack>
                </RadioGroup>

                <Divider />

                <Heading size={"lg"}>Genre</Heading> 

                <RadioGroup colorScheme="brand" size={"xl"} onChange={setGenre} value={genre}>
                    <HStack gap={3} wrap={"wrap"}>
                        <Radio value={"pop"}>Pop</Radio>
                        <Radio value={"rnb"}>RnB</Radio>
                        <Radio value={"rap"}>Rap</Radio>
                        <Radio value={"edm"}>EDM</Radio>
                    </HStack>
                </RadioGroup>

                <Divider />

                {/* <Checkbox size={"xl"}>Hello</Checkbox> */}

                <Button  size={"lg"} width={"100%"} onClick={()=> navigate("attribute-results")}> Get Results!</Button>
            </VStack>
            <Box as="main">
                <Outlet />
            </Box>
        </Container>
     );
}
 
export default AttributeLayout;