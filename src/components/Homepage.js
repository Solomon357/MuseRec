import { Box, Container, Text, VStack, Button, Image } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
const Homepage = () => {
    const navigate = useNavigate();
    
    return (
        <Container textAlign={"center"}>
            
            <Image src="/MuseRecIcon.png" maxH={"300px"} display={'block'} mx={'auto'}/>
           
            

            <Box my={"40px"}>
                <Text fontSize={"xl"} mb={"20px"}>Welcome to this music recommendation platform!</Text>
                <Text fontSize={"xl"}>How would you like your songs recommended?</Text>
            </Box>

            <VStack spacing={4}>
                <Button size={"lg"} width={"100%"} onClick={()=> navigate("by-song")}>Search by Artist or Song</Button>
                <Button size={"lg"} width={"100%"} onClick={()=> navigate("attribute")}>Search by Song Attributes</Button>
            </VStack>
        </Container>
     );
}
 
export default Homepage;