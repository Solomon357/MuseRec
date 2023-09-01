import { Box, Heading, Container, VStack, Button, HStack, Divider, RadioGroup, Radio, Text, Select as ChakraSelect } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import useAccessToken from "../components/useAccessToken";
//import { useSelect } from 'react-select-search';
import Select from 'react-select';


const AttributeLayout = () => {

    const navigate = useNavigate();

    // states useStates
    //token uses custom hook in order to gain implicit grant from spotify 
    const accessToken = useAccessToken();
    const [genres, setGenres] = useState(null); 
    const [isLoading, setIsLoading] = useState(true);
    let genreOptions = [];
    
    //test for token
    console.log("check for access token "+accessToken)
    

    //dummy data 
    // const options = [
    //     {value: 'edm', label: 'edm'},
    //     {value: 'rap', label: 'rap'},
    //     {value: 'soul', label: 'soul'},
    //     {value: 'pop', label: 'pop'},
     
    // ];

    // //use effect to supply genre use state with all genre seeds
    // useEffect(() => {
        
    //     //authParams so we can get token
    //     // let authParams = {
    //     //     method: 'POST',
    //     //     headers: {
    //     //         'Content-Type' : 'application/x-www-form-urlencoded'
    //     //     },
    //     //     body: 'grant_type=client_credentials&client_id='+ creds.client_id + '&client_secret='+ creds.client_secret
    //     // }

    //     // //getting api Access Token
    //     // fetch("https://accounts.spotify.com/api/token", authParams)
    //     //     .then(res => res.json())
    //     //     .then(data => setAccessToken(data.access_token))
    //     //     .catch(error => console.log(error));

        
        
    //     //'active' will be used for our clean up function
    //     //let active = true;
    //     // fetch genre seeds 
    //      //checking for access
        

    //     const fetchData = async () => {
    //         //get accessParams 
    //         let accessParams = {
    //             method: "GET",
    //             headers: {
    //                 'Content-type': 'application/json',
    //                 'Authorization': 'Bearer ' + accessToken
    //             }
    //         } 

    //         let returnedGenres = await fetch("https://api.spotify.com/v1/recommendations/available-genre-seeds", accessParams)
    //             .then(res => res.json())
    //             //console logging api requests is very useful for understanding the path i need for specific data
    //             .then(data => {return data.genres})
    //             .catch(error => console.log(error));

    //         setGenres(returnedGenres)
    //         // console.log(data);
    //         // if (active) {
    //         //     setGenres(data.genres)
    //         // }

                
            
    //         //genres state should be an array with all possible genre seeds
    //         //setGenres(returnedGenres)
    //     }

    //     if (accessToken !== null){
    //         fetchData();
    //     }

    //     // return () => {
    //     //     active = false;
    //     // }
        
        
    //     //setCount(count+1)

    // }, [accessToken])

    // //console.log("check for access token "+accessToken)

    // //checking genre state
    // console.log(genres);
    // //console.log(count)


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
                return data.genres
            })
            .catch(error => console.log(error));

        setGenres(returnedGenres);

        //convert genres array into an array of objects 
        
        // console.log(data);
        // if (active) {
        //     setGenres(data.genres)
        // }

            
        
        //genres state should be an array with all possible genre seeds
        //setGenres(returnedGenres)
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
    //console.log(genres);
    //console.log(genreOptions)

   
    
    
    //console.log(count)

    return ( 
        <Container textAlign={"center"}>
            <Heading mb={"50px"}>Search by Attributes</Heading>

            {genres && <ChakraSelect placeholder='Select genre'>
                {genres.map((genre) => (
                    <option key={genre} value={genre}>{genre}</option>
                ))}
            </ChakraSelect>}

            {genreOptions && <Select options={genreOptions} />}
    

            
            {/* <VStack gap={5}>
                <Heading as={"h2"} size={"lg"}>Mood</Heading> 
                <Text>{mood}</Text>
                <RadioGroup colorScheme="brand" size={"xl"} onChange={setMood} value={mood}>
                    <HStack gap={3} wrap={"wrap"}>
                        <Radio value={"happy"}>Happy</Radio>
                        <Radio value={"sad"}>Sad</Radio>
                        <Radio value={"romantic"}>Romantic</Radio>
                        <Radio value={"aggressive"}>Aggressive</Radio>
                    </HStack>
                </RadioGroup>

                <Divider />

                <Heading size={"lg"}>Genre</Heading>

                <Text>{genre}</Text>
                <RadioGroup colorScheme="brand" size={"xl"} onChange={setGenre} value={genre}>
                    <HStack gap={3} wrap={"wrap"}>
                        <Radio value={"pop"}>Pop</Radio>
                        <Radio value={"rnb"}>RnB</Radio>
                        <Radio value={"rap"}>Rap</Radio>
                        <Radio value={"edm"}>EDM</Radio>
                    </HStack>
                </RadioGroup>

                <Divider />

                {/* <Checkbox size={"xl"}>Hello</Checkbox>

                <Button  size={"lg"} width={"100%"} onClick={()=> navigate("attribute-results")}> Get Results!</Button>
            </VStack> */} 

            <Box as="main">
                <Outlet />
            </Box>
        </Container>
     );
}
 
export default AttributeLayout;