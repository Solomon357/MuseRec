//import authentification from firebase
import { Box, Button, Container, HStack, Heading, Input } from "@chakra-ui/react";
import { auth, googleProvider } from "../config/firebase";
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { useState } from "react";


// function generateRandomString(length) {
//     let text = '';
//     let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//     for (let i = 0; i < length; i++) {
//     text += possible.charAt(Math.floor(Math.random() * possible.length));
//     }
//     return text;
// }
// const SPOTIFY_ENDPOPINT = 'https://accounts.spotify.com/authorize'

//implicit grant is essientially crafting a unique url for the user
let client_id = 'efe3ac326230422785eca822336069d9';
let redirect_uri = 'http://localhost:3000';
//multiple scopes can be passed as an array
// possible scope incase all my playlists are private => "playlist-read-private" 'user-library-read',
const scope = ['playlist-read-private'];

//let state = generateRandomString(16);

//localStorage.setItem(stateKey, state);

let url = 'https://accounts.spotify.com/authorize';
url += '?response_type=token';
url += '&client_id=' + encodeURIComponent(client_id);
url += '&scope=' + encodeURIComponent(scope);
url += '&redirect_uri=' + encodeURIComponent(redirect_uri);
//url += '&state=' + encodeURIComponent(state);

const Auth = () => {


    // ** TRYING OUT SPOTIFY PCKE AUTH FLOW HERE ** //
    //*** TRY PASTING THIS CODE OUTSIDE OF THE AUTH FUNCTION */

    // const clientId = 'efe3ac326230422785eca822336069d9';
    // const redirectUri = 'http://localhost:3000';

    // function generateRandomString(length) {
    //     let text = '';
    //     let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    //     for (let i = 0; i < length; i++) {
    //     text += possible.charAt(Math.floor(Math.random() * possible.length));
    //     }
    //     return text;
    // }

    // //this digest is basically used to hash the random string generated for security
    // //const digest = await window.crypto.subtle.digest('SHA-256', data);

    // //returns a base64 representation of the digest by calling to
    // //nested function "base64encode()"
    // async function generateCodeChallenge(codeVerifier) {
    //     function base64encode(string) {
    //       return btoa(String.fromCharCode.apply(null, new Uint8Array(string)))
    //         .replace(/\+/g, '-')
    //         .replace(/\//g, '_')
    //         .replace(/=+$/, '');
    //     }
      
    //     const encoder = new TextEncoder();
    //     const data = encoder.encode(codeVerifier);
    //     const digest = await window.crypto.subtle.digest('SHA-256', data);
      
    //     return base64encode(digest);
    // }

    // //now we're requesting user authorisation

    // let codeVerifier = generateRandomString(128);

    // //this will be what takes us to the spotify login page to authorise a users account

    // generateCodeChallenge(codeVerifier).then(codeChallenge => {
    //     let state = generateRandomString(16);
    //     let scope = 'user-library-read';

    //     //note that code verifier is stored in local storage to be used later 
    //     localStorage.setItem('code_verifier', codeVerifier);
      
    //     let args = new URLSearchParams({
    //       response_type: 'code',
    //       client_id: clientId,
    //       scope: scope,
    //       redirect_uri: redirectUri,
    //       state: state,
    //       code_challenge_method: 'S256',
    //       code_challenge: codeChallenge
    //     });
      
    //     window.location = 'https://accounts.spotify.com/authorize?' + args;
    // });

    // //now we're getting the access token from spotify API

    // const urlParams = new URLSearchParams(window.location.search);
    // let code = urlParams.get('code');

    // let getCodeVerifier = localStorage.getItem('code_verifier');

    // let body = new URLSearchParams({
    // grant_type: 'authorization_code',
    // code: code,
    // redirect_uri: redirectUri,
    // client_id: clientId,
    // code_verifier: getCodeVerifier
    // });

    // //POST request
    // const response = fetch('https://accounts.spotify.com/api/token', {
    // method: 'POST',
    // headers: {
    //     'Content-Type': 'application/x-www-form-urlencoded'
    // },
    // body: body
    // })
    // .then(response => {
    //     if (!response.ok) {
    //     throw new Error('HTTP status ' + response.status);
    //     }
    //     return response.json();
    // })
    // .then(data => {
    //     //locally stored access token to use
    //     localStorage.setItem('access_token', data.access_token);
    // })
    // .catch(error => {
    //     console.error('Error:', error);
    // });


    // async function getProfile(accessToken) {
    //     let accessToken = localStorage.getItem('access_token');
      
    //     const response = await fetch('https://api.spotify.com/v1/me', {
    //       headers: {
    //         Authorization: 'Bearer ' + accessToken
    //       }
    //     });
      
    //     const data = await response.json();
    //   }
      

    // ** TRYING OUT SPOTIFY AUTH WITH IMPLICIT GRANT HERE **//

    const handleSpotifyLogin = () => {
        window.location = `${url}`
    }




    // ** NORMAL FIREBASE AUTH FLOW STARTS HERE **//

    //useStates for sign in 
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");

    //just a check to see if the user is still signed in 
    // question mark is to handle error when the object is null
    console.log(auth?.currentUser?.email);


    //function that calls in firebase auth tools to handle login
    //firebase services use promises so function needs to be async
    const signIn = async () =>{
        //when dealing with async and things like promises should always be handling errors as you go
        try{
        //this method takes in the auth and whatever you want authenticated as parameters
        await createUserWithEmailAndPassword(auth, userEmail, userPassword);
        } catch(err){
            console.error(err);
        }
    };

    const signInWithGoogle = async () =>{
        //when dealing with async and things like promises should always be handling errors as you go
        try{
        //this method takes in the auth and whatever you want authenticated as parameters
        await signInWithPopup(auth, googleProvider);
        } catch(err){
            console.error(err);
        }
    };


    // sign out function that uses signout method from auth
    const logOut = async () =>{
        //when dealing with async and things like promises should always be handling errors as you go
        try{
        //this method takes in the auth and whatever you want authenticated as parameters
        await signOut(auth);
        } catch(err){
            console.error(err);
        }
    };

    return ( 

        <Container className="authentification" m="20px">
            <Box>
                <Heading size={"sm"}>Sign In</Heading>
            

                <Input 
                placeholder="Insert Email"
                onChange={(e) => setUserEmail(e.target.value)}
                />
                <Input 
                placeholder="Insert Password"
                type="password"
                onChange={(e) => setUserPassword(e.target.value)}
                />

                <HStack spacing={3}>
                    <Button size={"xs"} className="submit" onClick={signIn}>Sign in</Button>

                    <Button size={"xs"} className="submit" onClick={signInWithGoogle}>Sign in With Google</Button>

                    <Button size={"xs"} className="submit" onClick={logOut}>Log out</Button>
                </HStack>
            </Box>

            <Box mt={"40px"}>
                <Heading> Log in to Spotify</Heading>

                <Button size={"xs"} _hover={{bgColor: "green", color: "white"}} className="submit" onClick={handleSpotifyLogin}>Sign in With Spotify</Button>
            </Box>

        </Container>

        
     );
}
 
export default Auth;