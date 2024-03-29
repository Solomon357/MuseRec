import { Text, Stack, useRadioGroup, useRadio, Box, Button, Container, FormControl, FormLabel, Heading, Image, Input, SimpleGrid, chakra, Flex, VStack, HStack, Spacer } from "@chakra-ui/react";
import { useState } from "react";
import { Form, Outlet, useNavigate } from "react-router-dom";
import useAccessToken from "../components/useAccessToken";
import musicPlaceholder from '../images/music-placeholder-image-1.jpg';
import CircularAudio from "../components/CircularAudio";

const BySongLayout = () => {
  const navigate = useNavigate();
  //states + useStates
  const accessToken = useAccessToken(); 
  
  const [searchInput, setSearchInput] = useState("");
  const [selectedDetails, setSelectedDetails] = useState("");
  const [selectedTrackID, setSelectedTrackID] = useState("");
  const [selectedTrackName, setSelectedTrackName] = useState("");
  const [tracks, setTracks] = useState([]); 
  const [clicked, setClicked] = useState(false)   


  const search = async () => {
    //just to check that search input is being saved
    //console.log("Searching for "+ searchInput)

    //parameters needed to initiate a search
    let accessParams = {
      method: "GET",
      headers: {
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + accessToken
      }
    } 

    //search request with spotify api  will always returns the 20 most relevant items by default
    let returnedTracks = await fetch('https://api.spotify.com/v1/search?q='+ searchInput +'&type=track', accessParams)
      .then(response => response.json())
      .then(data => { return data.tracks.items })
      .catch(error => console.log(error))
    console.log(returnedTracks)
    setTracks(returnedTracks);
    
    //check for structure of tracks usestate
    // console.log(tracks) //=> this will return nothing cus useState is async but results are deffo there
  }

  //this RadioGroup function will encapsulate all the functionality that governs the custom radio 
  //should be in its own separate file
  function CustomRadioGroup() {
    function CustomRadio(props) {
      const { image, title, albumName, artistName, song_preview, id, ...radioProps } = props
      const { state, getInputProps, getRadioProps, htmlProps, getLabelProps } =
        useRadio(radioProps)
        
      //Design for a single custom radio button
      return (
        //Box has to be a "label" for this to work
        <chakra.label {...htmlProps} cursor='pointer'>
          <input {...getInputProps({})} hidden />
          <Flex
            bg={state.isChecked ? 'orange.200' : 'gray.200'}
            w={'326px'}
            h={'90px'}
            overflow={'auto'}
            p={'3px'}
            borderRadius={'md'}
            
            _hover={{
              boxShadow: " 0px 8px 23px #DAE0F9",
              outline: "solid 1px #BFC8E6",
            }}
            {...getRadioProps()}
          >
            <HStack spacing={"5px"} width={"100%"}>
              <Image src={image} height={"100%"} borderRadius={'md'} {...getLabelProps()} />
              <Box textAlign={'left'} maxH={"100%"}>
                <Heading size={'sm'} mb={'3px'}> {title} </Heading>
                <Text fontSize={'sm'}> Album: {albumName === title ? 'Single' : albumName}</Text>
                <Text fontSize={'sm'}> By: {artistName}</Text>
              </Box>
              <Spacer />
              {song_preview ? 
                <CircularAudio song={song_preview} idnum={id} />
                : 
                <CircularAudio disabled={true}/>
              }
            </HStack>
          </Flex>
        </chakra.label>
      )
    }
    
    const handleChange = (value) => {
      var newVal = value.split(",")
      setSelectedDetails(value);
      setSelectedTrackID(newVal[0]);
      setSelectedTrackName(newVal[1]);
      

      // tests for correct values on selection
      // console.log(`The value is ${value}!`);   
      // console.log(`Test for split[0] ${newVal[0]}!`);   
      // console.log(`Test for split[1] ${newVal[1]}!`);   
    }
  
    const { getRadioProps, getRootProps } = useRadioGroup({
      name: "track-input",
      onChange: handleChange,
      value: selectedDetails,
    })
    
    return (
      <Stack {...getRootProps()}>
        <SimpleGrid spacing={'6px'} columns={{base:1,  sm:2, lg:3}}>
          {tracks.map((track) => {
            return (
              <CustomRadio
                key={track.id}
                id={track.id}
                image={track.album.images[2].url}
                {...getRadioProps({ value: track.id+","+track.name })}
                title = {track.name}
                albumName = {track.album.name}
                artistName = {track.artists.map((artist, i) =>(
                  artist.name + ((i !== track.artists.length-1) ? ', ' : '')
                ))}
                song_preview = {track.preview_url}
                
              />
            )
          })}
        </SimpleGrid>
      </Stack>
    )
  }

  const getRecommendations = async () => {
    //test for selectTrackID
    //console.log("Recommendations for "+ selectedTrackID)

    //change the recommended clicked state so outlet can be displayed
    setClicked(true);

    //first we need the parameters that we grab from my search page
    let accessParams = {
      method: "GET",
      headers: {
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + accessToken
      }
    } 

    let recommendedTracks = await fetch('https://api.spotify.com/v1/recommendations?seed_tracks='+ selectedTrackID +'&limit=10', accessParams)
      .then(response => response.json())
      .then(data => { return data.tracks })
      .catch(error => console.log(error))

    //test for returned recommended songs 
    //console.log(recommendedTracks)

    //once we have the data for the recommended songs we navigate to the child component
    navigate("by-song-results", {state:{songOutput: recommendedTracks, access_token: accessToken, selectedSongName: selectedTrackName}});  
  }
  
  //STATE TEST CHECKS
  // console.log("state of tracks array "+ tracks) // end state should be an array of tracks from search
  // console.log("Selected track id= "+ selectedTrackID) // value should be trackID every render 

  return ( 
    <Container textAlign={"center"} maxW={'5xl'}>

      <Heading mb={"50px"}>Search by Artist or Song</Heading>

      <FormControl isRequired textAlign={"left"}>
        <FormLabel>Find Songs</FormLabel>
        <Input 
          type="search" 
          placeholder="Search for Songs or Artists!" 
          maxW={"70%"}
          mr={"10px"}
          focusBorderColor="orange"
          onKeyUp={(e) => {
            if (e.key === "Enter"){
              search();
            }
          }}
          onChange={(e) => setSearchInput(e.target.value)}
        />

        <Button type="submit" mb={"5px"} w={"20%"} minW={"90px"} onClick={search}>Find Songs</Button>
      </FormControl>
      
      <Form onSubmit={getRecommendations}>
        { tracks && <CustomRadioGroup />}

        {selectedDetails ?
         <Button type="submit" size={"lg"} width={"80%"} my={"10px"}> Get Recommendations!</Button>
         :
         <Button type="submit" size={"lg"} width={"80%"} my={"10px"} isDisabled> Get Recommendations!</Button> 
        } 
      </Form>

      <Box as="main">
        {clicked ? <Outlet /> 
          : 
          <VStack p={"3px"} align={"stretch"}>
            <Flex justifyContent={"center"} alignItems={"center"} mt={"5"} maxW={"5xl"}>
              <Image src={musicPlaceholder} w={"80%"} h={"300px"} />
            </Flex>

            <Text color={"#a6a6a6"} fontSize={"xl"}>Recommended Songs will appear here</Text>
          </VStack>  
        }
      </Box>
    </Container>
  );
}

export default BySongLayout;