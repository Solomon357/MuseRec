import { Box, Button, Container, FormControl, FormLabel, Heading, Input } from "@chakra-ui/react";
import { Outlet, useNavigate } from "react-router-dom";


const BySongLayout = () => {
    const navigate = useNavigate();

    return ( 
        <Container textAlign={"center"}>
            <Heading>Search by Song</Heading>

            <FormControl my={"40px"} isRequired>
                <FormLabel>Song Name</FormLabel>
                <Input type="text" placeholder="Please input a Song"/>
                
            </FormControl>
            
            <Button type="submit" size={"lg"} width={"100%"} onClick={()=> navigate("by-song-results")}> Get Song Results!</Button>

            <Box as="main">
                <Outlet />
            </Box>
        </Container>

            
        
     );
}
 
export default BySongLayout;