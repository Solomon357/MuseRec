import { Flex, HStack, Heading, Spacer, Text, Link as ChakraLink, IconButton, } from "@chakra-ui/react";
import { Link as ReactLink } from "react-router-dom";
import { EmailIcon } from '@chakra-ui/icons'
import { ReactComponent as LinkedIn } from "../images/LinkedinIcon.svg"
import { ReactComponent as Github } from "../images/GithubIcon.svg"

const Navbar = () => {     
  return ( 
    <Flex as={"nav"} bg={"orange"} p={"10px"}>
      <ChakraLink as={ReactLink} to={"/"} style={{textDecoration: "none"}}>
        <Heading>Muse
          <Heading as={"span"} color={"white"}>Rec</Heading>
        </Heading>
      </ChakraLink>
      <Text size={"xs"}>ver 0.1.2</Text>

      <Spacer />
      
      <HStack gap={5}>
        <IconButton as={ChakraLink} href="mailto:solomonoddy@hotmail.com" variant="ghost" _hover={{bgColor:"orange"}} fontSize={"30px"} icon={<EmailIcon color={"white"}/>}/>
        <IconButton as={ChakraLink} href="https://www.linkedin.com/in/solomon-odeleye-bab5241b9/" variant="ghost" _hover={{bgColor:"orange"}} icon={<LinkedIn fill={"white"} width={"30px"} height={"30px"}/>}/>
        <IconButton as={ChakraLink} href="https://github.com/Solomon357" variant="ghost" _hover={{bgColor:"orange"}} icon={<Github width={"33px"} height={"33px"}/>}/>
      </HStack>
    </Flex>
  );
}
 
export default Navbar;