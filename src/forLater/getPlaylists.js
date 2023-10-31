import { Button } from "@chakra-ui/react";
import axios from "axios";
import { useState, useEffect } from "react";

//this is provided by spotify documentation
const PLAYLIST_ENDPOINT = "https://api.spotify.com/v1/me/playlists"

//const RECOMMENDATION_ENDPOINT = "https://api.spotify.com/v1/recommendations"

const GetPlaylists = () => {

    //some useStates to collect data
    const [token, setToken] = useState("");
    const [spotifyData, setSpotifyData] = useState({});

    //useEffect will be used here to collect the token that we put into localStorage in Homepage
    useEffect(() => {
       if (localStorage.getItem('accessToken')) {
        setToken(localStorage.getItem('accessToken'));
       }
    }, []);

    const handleGetPlaylists = () => {
        axios.get(PLAYLIST_ENDPOINT, {
            headers: {
                Authorization: "Bearer " + token,
            }, 
         }).then(response => {
            setSpotifyData(response.data);
            //console.log(response);
         }).catch((error) => {
            console.log(error);
        });
    };
    //"<>" syntax is a fragment basically if i want to quickly create a root component for an app
    return(
        <>
        <Button size={"lg"} onClick={handleGetPlaylists}>Get Spotify Playlists</Button>

        {/*optional chaining, i think i did something like this for my firebase auth check*/} 
        {
            spotifyData?.items ? spotifyData.items.map((item) => <p>{item.name}</p>) : null
        }
        </>
    )
}

 
export default GetPlaylists;
