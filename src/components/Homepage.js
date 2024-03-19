import { Box, Container, Text, VStack, Button, Image, Heading, HStack, Center, Flex, Spacer } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import MusicNote from "../images/music_note_icon.png"
import MusicLogo from "../images/soundcloud_music_icon.png"
import "../index.css"

const Homepage = () => {
    const navigate = useNavigate();

    const styles = {
        heading:{
            position: "relative",
            zIndex: "2",
            size:"3xl",
            color:"orange",
            backgroundColor: "white",
        },
        text:{
            fontSize:"xl"
        },
        title: {
            //position: "relative",
            //zIndex: "2",
            backgroundColor: "white"
        }
    }

    return (
        <Container maxW={"80%"} h={"100vh"}  display="flex" justifyContent={"center"} alignItems={"center"} centerContent>
    
            <Flex mb={"5%"}>

                <Image src={MusicLogo} maxH="128px" maxW="128px" alt="MusicLogo" mr={"10px"} />
                <Box>
                
                    <HStack position={"relative"} left={{md:"220px"}} top={"15px"}>
                        <Image src={MusicNote} maxH={"30px"} className="note" zIndex={0}/>
                        <Image src={MusicNote} maxH={"30px"} className="note" zIndex={0}/>
                        <Image src={MusicNote} maxH={"30px"} className="note" zIndex={0}/>
                        <Image src={MusicNote} maxH={"30px"} className="note" zIndex={0}/>
                    </HStack>

                    <Box position={"relative"} bottom={"10px"}>
                        <Heading as={"h2"} mb={"10px"} mr={"10px"}>Welcome to <Heading as={"span"} sx={styles.heading}>MuseRec</Heading></Heading>
                    </Box>
                    
                    <Box position={"relative"} bottom={"5px"} maxW={"70%"} display={{ base:"none", md:"block" }}>
                        <Text sx={styles.text}>
                            Here you can take a deep dive into your favourite genres or discover new songs or artists
                            by getting personalised songs thanks to our recommender system.
                        </Text>
                    </Box>
                </Box>
            </Flex>
           
            
            <Text sx={styles.text} mb={"40px"} >How would you like your songs recommended?</Text>

            <Flex width={"50%"} wrap={"wrap"} gap={2}>
                <Button size={"lg"} minWidth={"163px"} onClick={()=> navigate("by-song")}>By Artist or Song</Button>
                <Spacer />
                <Button size={"lg"} minWidth={"163px"} onClick={()=> navigate("attribute")}>By Song Attributes</Button>
            </Flex>
        </Container>
     );
}
 
export default Homepage;