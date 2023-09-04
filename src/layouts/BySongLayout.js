import { Text, Stack, useRadioGroup, useRadio, Box, Button, Container, FormControl, FormLabel, Heading, Image, Input, SimpleGrid } from "@chakra-ui/react";
import { useState } from "react";
import { Form, Outlet, useNavigate } from "react-router-dom";
import useAccessToken from "../components/useAccessToken";

const BySongLayout = () => {
  const navigate = useNavigate();
  

  //states + useStates
  const accessToken = useAccessToken(); 
  
  const [searchInput, setSongInput] = useState("");
  const [selectedTrackID, setSelectedTrackID] = useState("");
  //this use state is for data coming in from the spotify app
  const [tracks, setTracks] = useState([]);    

  // Search function 
  const search = async () => {
    //just to check that search input is being saved
    console.log("Searching for "+ searchInput)
    console.log("state of accessToken in search "+accessToken)

    //Get request using search to get the Artist ID

    //first we need the parameters that we grab from my search page
    let accessParams = {
      method: "GET",
      headers: {
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + accessToken
      }
    } 

    // we use the search end point to get the id of one element
    //search with spotify api always returns the 20 most relevant items if you dont specify a limit
    let returnedTracks = await fetch('https://api.spotify.com/v1/search?q='+ searchInput +'&type=track', accessParams)
      .then(response => response.json())
      //console logging api requests is very useful for understanding the path i need for specific data
      .then(data => { return data.tracks.items })
      .catch(error => console.log(error))

    setTracks(returnedTracks);
    //check for structure of tracks usestate
    // console.log(tracks) => this will return nothing cus useState is async but results are deffo there
  }

  //this RadioGroup function will encapsulate all the functionality that governs the custom radio 
  // (double click bug issue might be located here)
  function CustomRadioGroup() {
    function CustomRadio(props) {
      const { image, ...radioProps } = props
      const { state, getInputProps, getRadioProps, htmlProps, getLabelProps } =
        useRadio(radioProps)
        
      //the design for a single custom radio button
      return (
        //Box has to be a "label" for this to work
        <Box as="label" {...htmlProps} cursor='pointer'>
          <input {...getInputProps({})} hidden />
          <Box
            {...getRadioProps()}
            bg={state.isChecked ? 'orange.200' : 'transparent'}
            w={'150px'}
            p={'3px'}
            borderRadius={'md'}
            _hover={{
              boxShadow: " 0px 8px 23px #DAE0F9",
              outline: "solid 1px #BFC8E6",
            }}
          >
            <Image src={image} borderRadius={'md'} {...getLabelProps()} />
          </Box>
        </Box>
      )
    }
    
    const handleChange = (value) => {
      setSelectedTrackID(value);
      console.log(`The value is ${value}!`);   
    }

    const { value, getRadioProps, getRootProps } = useRadioGroup({
      name: "track-input",
      //defaultValue: tracks[0].id,
      onChange: handleChange,
      value: selectedTrackID,
    })
    
    return (
      <Stack {...getRootProps()}>
        <Text>The selected radio id is: {value}</Text>
        <SimpleGrid spacing={'4px'} columns={'4'}>
          {tracks.map((track) => {
            return (
              <Box key={track.id}>
                <CustomRadio
                  key={track.id}
                  image={track.album.images[0].url}
                  {...getRadioProps({ value: track.id })}
                />
                {track.name}
              </Box>
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
    navigate("by-song-results", {state:{songOutput: recommendedTracks}});
      
  }
  
  //STATE CHECKS
  // console.log("state of tracks array "+ tracks) // end state should be an array of tracks from search
  // console.log("Selected track id= "+ selectedTrackID) // value should be trackID every render 

  return ( 
    <Container textAlign={"center"} maxW={"3xl"}>
      <Heading>Search by Song</Heading>

      <FormControl my={"40px"} isRequired >
        <FormLabel>Find Song</FormLabel>
        <Input 
          type="search" 
          placeholder="Search for Song" 
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