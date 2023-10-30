import { Button, Flex, HStack, Heading, Spacer, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";


const Navbar = () => {
    // i want to make a const or a func that i can pass into the buttons so I can use them as a link
    const navigate = useNavigate();


    //im thinking of a conditional, if the url contains a url hash,
    //then return a nav with the users spotify avatar using spotify api,
    // else keep the nav as is             
    return ( 
        <Flex as={"nav"} bg={"orange"} p={"10px"}>
            <Heading>Muse
                <Heading as={"span"} color={"white"}>Rec</Heading>
            </Heading>
            <Text size={"xs"}>ver 0.1.0</Text>

            <Spacer />
            <HStack gap={4}>
                <Button colorScheme="Yellow" _hover={{bgColor:"red"}} onClick={() => navigate("/")}>Home</Button>

                {/* * these links will become relevant again once i finish the main functionality */}
                
                {/* <Button colorScheme="Yellow" _hover={{bgColor:"red"}} onClick={() => navigate("sign-in")}>Sign in</Button>
                <Button colorScheme="Yellow" _hover={{bgColor:"red"}} onClick={() => navigate("create")}>Create</Button>
                <Button colorScheme="Yellow" _hover={{bgColor:"red"}} onClick={() => navigate("songlist")}>SongList</Button> */}
            </HStack>
        </Flex>
     );
}
 
export default Navbar;