import { Box, Heading, Container, Button, Text, FormControl } from "@chakra-ui/react";
import { useState } from "react";
import { Form, Outlet, useNavigate } from "react-router-dom";
import useAccessToken from "../components/useAccessToken";
import Select from 'react-select';


const AttributeLayout = () => {
    // states useStates
    const navigate = useNavigate();
    //token uses custom hook in order to gain implicit grant from spotify 
    const accessToken = useAccessToken();
    const [genres, setGenres] = useState(null);
    const [genreValues, setGenreValues] = useState(null); 
    const [recommendedSongs, setRecommendedSongs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const genreOptions = [];
    
    //test for token
    //console.log("check for access token "+accessToken) // => accessToken = string

    //api call to gain all genres that we can put into recommender search
    const fetchGenres = async () => {
        //get accessParams 
        let accessParams = {
            method: "GET",
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + accessToken
            }
        } 

        let returnedGenres = await fetch("https://api.spotify.com/v1/recommendations/available-genre-seeds", accessParams)
            .then(res => res.json())
            //console logging api requests is very useful for understanding the path i need for specific data
            .then(data => {
                setIsLoading(false)
                return data.genres // => Array(126)
            })
            .catch(error => console.log(error));

        setGenres(returnedGenres);
    }

    //only call this function once the token has a value
    //we set isLoading to false inside the function so it only runs once 
    if (accessToken !== null && isLoading === true){
        fetchGenres();
    }

    //converting genres array to an array of objects once genres has data
    genres && genres.map((genre) => (
        genreOptions.push({value:genre, label: genre})
    ));

    //checking genre states
    //console.log(genres);  Array(126)
    //console.log(genreOptions) (126) [{...}, {...}]
    
    const handleChange = (selectedOptions) => {
        const multiOptions = [];
        selectedOptions.map((option) => ( // array of objects so we need to map through it
            multiOptions.push(option.value) // store every value in multiOptions
        ))
        
        setGenreValues(multiOptions.join(",")); // join function allows commas to seperate multiple values
        // console.log(`selected values: ${multiOptions}`) // => e.g.  selected values: edm / edm,rap,... 

        // console.log("handleChange: ", selectedOption); // => [{...}]
    }

    const getRecommendations = async() =>{
        //checking that we have genreValue State
        console.log("Recommendations for "+ genreValues);

        //first we need the parameters that we grab from my search page
        let accessParams = {
            method: "GET",
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + accessToken
            }
        } 

        //run recommender api call with the track artist, genre and trackID (might only need track ID)
        let recommendedTracks = await fetch('https://api.spotify.com/v1/recommendations?seed_genres='+ genreValues +'&limit=10', accessParams)
            .then(response => response.json())
            //console logging api requests is very useful for understanding the path i need for specific data
            //returning data.tracks to recommendedTracks variable
            .then(data => { return data.tracks }) // => Array(10) [{...},{...}]
            .catch(error => console.log(error))

        setRecommendedSongs(recommendedTracks)

        //check that recommendedSongs has the right value
        console.log(recommendedSongs)

        //once we have the data for the recommended songs we navigate to the child component
        navigate("attribute-results", {state:{songOutput: recommendedSongs}});        
    }

    return ( 
        <Container textAlign={"center"} maxW={"3xl"}>
            <Heading mb={"50px"}>Search by Attributes</Heading>
            {genreOptions && 
            <FormControl>
                <Text>genre values is: {genreValues}</Text>
                <Select 
                    options={genreOptions}  
                    placeholder="Please Select Genre..."
                    onChange={handleChange}
                    isMulti
                    />
            </FormControl>}

            {/* im sure we can struct this better with more understanding of Form element*/}
            <Form onSubmit={getRecommendations}>
                <Button type="submit">Get Recommended Songs</Button>
            </Form>
            <Box as="main">
                <Outlet />
            </Box>
        </Container>
     );
}
 
export default AttributeLayout;