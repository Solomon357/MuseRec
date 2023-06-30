//import authentification from firebase
import { Button, Container, HStack, Heading, Input } from "@chakra-ui/react";
import { auth, googleProvider } from "../config/firebase";
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { useState } from "react";

const Auth = () => {
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

        </Container>
     );
}
 
export default Auth;