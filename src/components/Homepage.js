import { Box, Container, Text, Button, Image, Heading, HStack, Flex, Spacer } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import MusicNote from "../images/music_note_icon.png"
import MusicLogo from "../images/soundcloud_music_icon.png"

const Homepage = () => {

  //TODO:
  // find a way to make sure only 1 circular audio is playing at a time

  const navigate = useNavigate();

  const styles = {
    heading:{
      position: "relative",
      zIndex: "2",
      size:"3xl",
      color:"orange"
    }
  }

  return (
    <Container maxW={"80%"} display="flex" justifyContent={"center"} alignItems={"center"} centerContent>
      <Flex mt={"10%"}>

        <Image src={MusicLogo} maxH="128px" maxW="128px" alt="MusicLogo" mr={"10px"} />
        <Box>
      
          <HStack position={"relative"} left={{base:"0px", sm:"170px", md:"220px"}} top="21px">
            <Image src={MusicNote} maxH={"30px"} className="note" zIndex={0}/>
            <Image src={MusicNote} maxH={"30px"} className="note" zIndex={0}/>
            <Image src={MusicNote} maxH={"30px"} className="note" zIndex={0}/>
            <Image src={MusicNote} maxH={"30px"} className="note" zIndex={0}/>
          </HStack>

          <Box position={"relative"} bottom={"10px"} backgroundColor={"white"}>
            <Heading  as={"h2"} mb={"10px"} mr={"10px"}>Welcome to <Heading as={"span"} sx={styles.heading}>MuseRec</Heading></Heading>
          </Box>
          
          <Box position={"relative"} bottom={"5px"} maxW={"70%"} display={{ base:"none", md:"block" }}>
            <Text fontSize={"xl"}>
              Here you can take a deep dive into your favourite genres or discover new songs and artists
              by getting a range of song recommendations tailored to you.
            </Text>
          </Box>
        </Box>
      </Flex> 
      
      <Text fontSize={"xl"} my={"40px"}>How would you like your songs recommended?</Text>

      <Flex width={"50%"} wrap={"wrap"} gap={2}>
        <Button size={"lg"} minWidth={"163px"} onClick={()=> navigate("by-song")}>By Artist or Song</Button>
        <Spacer />
        <Button size={"lg"} minWidth={"163px"} onClick={()=> navigate("attribute")}>By Song Genres</Button>
      </Flex>
    </Container>
  );
}
 
export default Homepage;