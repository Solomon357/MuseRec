import { Text, Stack, useRadioGroup, useRadio, Box, Button, Container, FormControl, FormLabel, Heading, Image, Input, SimpleGrid } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Form, Outlet, useNavigate } from "react-router-dom";


//show secret for the purposes of this tutorial only

//see if i can put these credentials as a seperate file 
// so i can pass the creds as a prop to any component that needs them
const credentials = {
    client_id: 'efe3ac326230422785eca822336069d9',
    client_secret: '110bc2e445a44599919b66cd3805a675',
 }

const BySongLayout = () => {
    const navigate = useNavigate();

    //useStates
    const [searchInput, setSongInput] = useState("");
    const [accessToken, setAccessToken] = useState("");
    const [selectedTrackID, setSelectedTrackID] = useState("");

    //this use state is the data coming in from the spotify app
    const [tracks, setTracks] = useState([]);  
    
    //use state to store the 10 recommended songs into  
    const [recommendedSongs, setRecommendedSongs] = useState([]);    

    //useEffect for spotify
    useEffect(() => {
        //need some params before we can get the token
        let authParams = {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/x-www-form-urlencoded'
            },
            body: 'grant_type=client_credentials&client_id='+ credentials.client_id + '&client_secret='+ credentials.client_secret
        }
        //api Access Token
        fetch("https://accounts.spotify.com/api/token", authParams)
            .then(res => res.json())
            .then(data => setAccessToken(data.access_token))
            .catch(error => console.log(error))
    }, [])

    // Search function 
    const search = async () => {
        //just to check that search input is being saved
        console.log("Searching for "+ searchInput)

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
        console.log(tracks)
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

        setRecommendedSongs(recommendedTracks);
        //testing if api call actually returned recommended songs 
        console.log(recommendedSongs)

        //once we have the data for the recommended songs we navigate to the child component
        navigate("by-song-results", {state:{songOutput: recommendedSongs}});
        
    }
    // console.log("state of tracks array "+ tracks) // end state should be an array of tracks from search
    // console.log("Selected track id= "+ selectedTrackID) // value should be trackID every render
    //console.log(recommendedSongs) // end state should be an array of recommended tracks 

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