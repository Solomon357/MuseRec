import { Box, Container, Heading, Text, VStack, Button } from "@chakra-ui/react";

const Homepage = () => {
    
    return (
        <Container >
            <Heading size={"xl"} p={"20px"} textAlign={"center"}>Homepage</Heading>
            
            <Box textAlign={"center"} my={"40px"}>
                <Text fontSize={"xl"} mb={"20px"}>Welcome to MuseRec!</Text>
                <Text fontSize={"xl"}>How would you like your songs recommended?</Text>
            </Box>

            <VStack alignItems={"center"} spacing={4}>
                <Button size={"lg"} width={"100%"} >Search by Song</Button>
                <Button size={"lg"} width={"100%"} >Search by Song Attributes</Button>
            </VStack>
        </Container>
     );
}
 
export default Homepage;