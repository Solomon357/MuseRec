import { Button, Flex, HStack, Heading, Spacer, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";


const Navbar = () => {
    // i want to make a const or a func that i can pass into the buttons so I can use them as a link
    const navigate = useNavigate();
    
    return ( 
        <Flex as={"nav"} bg={"orange"} p={"10px"}>
            <Heading>MuseRec</Heading>
            <Text size={"xs"}>ver 0.0.3</Text>

            <Spacer />
            <HStack gap={4}>
                <Button colorScheme="Yellow" _hover={{bgColor:"red"}} onClick={() => navigate("/")}>Home</Button>
                <Button colorScheme="Yellow" _hover={{bgColor:"red"}} onClick={() => navigate("/sign-in")}>Sign in</Button>
                <Button colorScheme="Yellow" _hover={{bgColor:"red"}} onClick={() => navigate("/create")}>Create</Button>
                <Button colorScheme="Yellow" _hover={{bgColor:"red"}} onClick={() => navigate("/songlist")}>SongList</Button>
            </HStack>
        </Flex>
     );
}
 
export default Navbar;