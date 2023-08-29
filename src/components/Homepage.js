import { Box, Container, Heading, Text, VStack, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import GetPlaylists from "./spotifyGetPlaylistBtn/getPlaylists";

//get access token, expire date and token type from the url once logged in
const getReturnedSpotifyParams = (hash) => {
    // url once logged in looks like this:
    // http://localhost:3000/#access_token=BQCuHklPXW5dmrOkor-jrVGTDXXilsqPo1rLXi8zN8yyH5p3sVxFO0ymeFKH1FJrnLGHmFGxy1iGw7JJ8sFnWVLmKDI0bmseV4qBdr3ElBh2y2YiJ9BuCaBlnIJUK5UDCtyQimOD4Ic3SsAVvHg3lahjkovK4zkHcE-KVT_52zGyXfGXOICdKLeQiUP8_wh5Caf5V_RsSj3ssOra&token_type=Bearer&expires_in=3600 
    const stringAfterHashtag = hash.substring(1);

    // in url params are split by an "&" so that can be the identifier we use
    const paramsInUrl = stringAfterHashtag.split("&");
    

    const paramsSplitUp = paramsInUrl.reduce((accumulator, currentValue) => {
        console.log("This is current value: " + currentValue);
        //destructuring *look it up*
        const [key, value] = currentValue.split("=");
        accumulator[key] = value;
        return accumulator;
    }, {});

    return paramsSplitUp;
};

const Homepage = () => {
    //useEffect in order to test return params function
    useEffect(() => {
      if (window.location.hash){

        localStorage.clear();

        const {
            access_token,
            expires_in,
            token_type,
        } = getReturnedSpotifyParams(window.location.hash)
        //console.log({ access_token, token_type, expires_in });
        
        localStorage.setItem("accessToken", access_token);
        localStorage.setItem("tokenType", token_type);
        localStorage.setItem("expiresIn", expires_in);
      }  
    })

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
                <GetPlaylists />
            </VStack>
        </Container>
     );
}
 
export default Homepage;