import { Box, Container, Heading, Text, VStack, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Homepage = () => {

    const navigate = useNavigate();
    
    return (
        <Container textAlign={"center"} >
            <Heading size={"xl"} p={"20px"}>Homepage</Heading>
            
            <Box my={"40px"}>
                <Text fontSize={"xl"} mb={"20px"}>Welcome to MuseRec!</Text>
                <Text fontSize={"xl"}>How would you like your songs recommended?</Text>
            </Box>

            <VStack spacing={4}>
                <Button size={"lg"} width={"100%"} onClick={()=> navigate("by-song")}>Search by Song</Button>
                <Button size={"lg"} width={"100%"} onClick={()=> navigate("attribute")}>Search by Song Attributes</Button>
            </VStack>
        </Container>
     );
}
 
export default Homepage;