import { Button, Flex, HStack, Heading, Spacer, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    // i want to make a const or a func that i can pass into the buttons so I can use them as a link
    const navigate = useNavigate();           
    return ( 
        <Flex as={"nav"} bg={"orange"} p={"10px"}>
            <Heading>Muse
                <Heading as={"span"} color={"white"}>Rec</Heading>
            </Heading>
            <Text size={"xs"}>ver 0.1.2</Text>
            <Spacer />
            <HStack gap={4}>
                <Button colorScheme="Yellow" _hover={{bgColor:"red"}} onClick={() => navigate("/")}>Home</Button>
            </HStack>
        </Flex>
     );
}
 
export default Navbar;