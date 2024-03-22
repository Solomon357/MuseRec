import { Box, Heading, Container, Button, FormControl, Image, Text, Flex, VStack, FormLabel } from "@chakra-ui/react";
import { useState } from "react";
import { Form, Outlet, useNavigate } from "react-router-dom";
import { Select } from "chakra-react-select"
import useAccessToken from "../components/useAccessToken";
// import Select from 'react-select';
import musicPlaceholder from '../images/music-placeholder-image-1.jpg';


const AttributeLayout = () => {

  const navigate = useNavigate();
  const accessToken = useAccessToken();
  const [genreArray, setGenreArray] = useState(null);
  const [genreValues, setGenreValues] = useState(null); 
  const [isLoading, setIsLoading] = useState(true);
  const [clicked, setClicked] = useState(false)
  const [multiOptions, setMultiOptions] = useState([]); //for storing user selection
  const genreOptions = []; //for populating Select Input
  
  
  const fetchGenres = async () => {
    let accessParams = {
      method: "GET",
      headers: {
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + accessToken
      }
    } 

    let returnedGenres = await fetch("https://api.spotify.com/v1/recommendations/available-genre-seeds", accessParams)
      .then(res => res.json())
      .then(data => {
        setIsLoading(false)
        return data.genres // => Array(126)
      })
      .catch(error => console.log(error));

    setGenreArray(returnedGenres);
  }
 
  if (accessToken !== null && isLoading === true){
    fetchGenres();
  }

  if(genreArray !== null){
    genreArray.map((genre) => (
      genreOptions.push({value:genre, label: genre})
    ));
  } 
  //checking genre states
  //console.log(genres);  Array(126)
  //console.log(genreOptions) (126) [{...}, {...}]


  //** MINOR BUG, OPTIONS STRING DELAYED BY A RENDER */
  const handleChange = (options) => {
    setMultiOptions(options) // => [{...}]

    let optionsString = []
    multiOptions.map((option) => optionsString.push(option.value))
    setGenreValues(optionsString.join(",")); 
   // console.log(genreValues)
   // console.log(multiOptions)
  }

  const getRecommendations = async() => {
    //checking that we have genreValue State
    //console.log("Recommendations for "+ genreValues);

    //change the recommended clicked state so outlet can be displayed
    setClicked(true);
    
    let accessParams = {
      method: "GET",
      headers: {
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + accessToken
      }
    } 

    //run recommender api call with the genreValues
    let recommendedTracks = await fetch('https://api.spotify.com/v1/recommendations?seed_genres='+ genreValues +'&limit=10', accessParams)
      .then(response => response.json())
      .then(data => { return data.tracks }) // => Array(10) [{...},{...}]
      .catch(error => console.log(error))

    //check that recommendedSongs has the right value
    //console.log(recommendedTracks)

    //once we have the data for the recommended songs we navigate to the child component
    navigate("attribute-results", {state:{songOutput: recommendedTracks}});        
  }

  return ( 
    <Container textAlign={"center"} maxW={"5xl"}>

      <Heading mb={"50px"}>Search by Genres</Heading>

      <Form onSubmit={getRecommendations}>

        {genreOptions && 
          <FormControl>
            <FormLabel textAlign={"left"} fontWeight={"medium"} color={"grey"}>Type multi-word genres like "r-n-b"</FormLabel>
            <Select 
              isMulti
              value={multiOptions}
              options={genreOptions} 
              onChange={handleChange} 
              placeholder="Please Select Genre..."
              colorScheme="orange"
              focusBorderColor="orange"
              isOptionDisabled={() => multiOptions.length >= 5}
            />
          </FormControl>
        }
        
        {genreValues ? 
          <Button type="submit">Get Recommended Songs</Button>
          : 
          <Button type="submit" isDisabled>Get Recommended Songs</Button>
        }
      </Form>

      <Box as="main">

        {clicked ? <Outlet />
          :
          <VStack p={"3px"} align={"stretch"}>
            <Flex justifyContent={"center"} alignItems={"center"} mt={"5"} maxW={"5xl"} >
              <Image src={musicPlaceholder} w={"80%"} h={"300px"} />
            </Flex>

            <Text color={"#a6a6a6"} fontSize={"xl"}>Recommended Songs will appear here</Text>
          </VStack>                 
        }
      </Box>
    </Container>
  );
}
export default AttributeLayout;