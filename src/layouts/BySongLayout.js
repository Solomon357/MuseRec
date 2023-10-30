import { Text, Stack, useRadioGroup, useRadio, Box, Button, Container, FormControl, FormLabel, Heading, Image, Input, SimpleGrid, chakra, Flex, } from "@chakra-ui/react";
import { useState } from "react";
import { Form, Outlet, useNavigate } from "react-router-dom";
import useAccessToken from "../components/useAccessToken";


const BySongLayout = () => {

  const navigate = useNavigate();
  //states + useStates
  const accessToken = useAccessToken(); 
  
  const [searchInput, setSongInput] = useState("");
  const [selectedTrackID, setSelectedTrackID] = useState("");
  const [tracks, setTracks] = useState([]);    


  const search = async () => {
    //just to check that search input is being saved
    console.log("Searching for "+ searchInput)
    console.log("state of accessToken in search "+accessToken)

    //first we get the parameters needed to initiate a search
    let accessParams = {
      method: "GET",
      headers: {
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + accessToken
      }
    } 

    // we use the search end point to get the id of one element
    //search request with spotify api always returns the 20 most relevant items if you dont specify a limit
    let returnedTracks = await fetch('https://api.spotify.com/v1/search?q='+ searchInput +'&type=track', accessParams)
      .then(response => response.json())
      //console logging api requests is very useful for debugging
      .then(data => { return data.tracks.items })
      .catch(error => console.log(error))

    setTracks(returnedTracks);
    
    //check for structure of tracks usestate
    // console.log(tracks) => this will return nothing cus useState is async but results are deffo there
  }

  //this RadioGroup function will encapsulate all the functionality that governs the custom radio 
  function CustomRadioGroup() {
    function CustomRadio(props) {
      const { image, title, albumName, artistName, ...radioProps } = props
      const { state, getInputProps, getRadioProps, htmlProps, getLabelProps } =
        useRadio(radioProps)
      
        
      //the design for a single custom radio button
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
            <Image src={image} borderRadius={'md'}mr={'5px'} {...getLabelProps()} />
            <Box textAlign={'left'}>
              <Heading size={'sm'} mb={'3px'}> {title} </Heading>
              <Text fontSize={'sm'}> Album: {albumName === title ? 'Single' : albumName}</Text>
              <Text fontSize={'sm'}> By: {artistName}</Text>
            </Box>
          </Flex>
        </chakra.label>
      )
    }
    
    const handleChange = (value) => {
      setSelectedTrackID(value);
      console.log(`The value is ${value}!`);   
    }
  
    const { value, getRadioProps, getRootProps } = useRadioGroup({
      name: "track-input",
      onChange: handleChange,
      value: selectedTrackID,
    })
    
    return (
      <Stack {...getRootProps()}>
        <Text>The selected radio id is: {value}</Text>
        <SimpleGrid spacing={'6px'} columns={{base:1,  sm:2, md:3}}>
          {tracks.map((track) => {
            return (
              <CustomRadio
                key={track.id}
                image={track.album.images[2].url}
                {...getRadioProps({ value: track.id })}
                title = {track.name}
                albumName = {track.album.name}
                artistName = {track.artists.map((artist, i) =>(
                  artist.name + ((i !== track.artists.length-1) ? ', ' : '')
                ))}
              />
            )
          })}
        </SimpleGrid>
      </Stack>
    )
  }


  //recommender function 
  const getRecommendations = async () => {
    //just to check that search input is being saved
    console.log("Recommendations for "+ selectedTrackID)

    //console.log("state of accessToken in recommender "+ accessToken)

    //first we need the parameters that we grab from my search page
    let accessParams = {
      method: "GET",
      headers: {
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + accessToken
      }
    } 

    //run recommender api call with the track artist, genre and trackID (might only need track ID)
    let recommendedTracks = await fetch('https://api.spotify.com/v1/recommendations?seed_tracks='+ selectedTrackID +'&limit=10', accessParams)
      .then(response => response.json())
      //console logging api requests is very useful for understanding the path i need for specific data
      //returning data.tracks to recommendedTracks variable
      .then(data => { return data.tracks })
      .catch(error => console.log(error))

    //testing if api call actually returned recommended songs 
    console.log(recommendedTracks)

    //once we have the data for the recommended songs we navigate to the child component
    navigate("by-song-results", {state:{songOutput: recommendedTracks, access_token: accessToken}});
      
  }
  
  //STATE CHECKS
  // console.log("state of tracks array "+ tracks) // end state should be an array of tracks from search
  // console.log("Selected track id= "+ selectedTrackID) // value should be trackID every render 

  return ( 
    <Container textAlign={"center"} maxW={'5xl'}>
      <Heading>Search by Song</Heading>

      <FormControl my={"40px"} isRequired >
        <FormLabel>Find Songs</FormLabel>
        <Input 
          type="search" 
          placeholder="Search for Songs!" 
          maxW={"70%"}
          onKeyUp={(e) => {
              if (e.key === "Enter"){
                  search();
              }
          }}
          onChange={(e) => setSongInput(e.target.value)}
        />

        <Button type="submit" onClick={search}>Find Song</Button>
      </FormControl>

      <Form onSubmit={getRecommendations}>
        { tracks && <CustomRadioGroup />}

        <Button type="submit" size={"lg"} width={"80%"} my={"10px"}> Get Recommendations!</Button>
      </Form>

      <Box as="main">
        <Outlet />
      </Box>
    </Container>
  );
}

export default BySongLayout;