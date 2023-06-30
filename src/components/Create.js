import { Input, Container, Heading, Text, Button, Checkbox } from '@chakra-ui/react';
import { db, auth } from 'C:/Users/solom/OneDrive/Desktop/Improved_FYP/improved_mrs/src/config/firebase.js';
import { collection, addDoc } from 'firebase/firestore';
import { useState } from 'react';
const Create = () => {

    //useStates for create song
    const [songName, setSongName] = useState("");
    const [Duration, setDuration] = useState(0);
    const [isAfro, setIsAfro] = useState(false);

    //to access a collection we first need a collection ref
    //MAKE SURE THE REF IS EXACT TO THE COLLECTION YOURE USING**
    const songCollectionRef = collection(db, "songs");

    //CREATE FUNCTIONALITY for Firestore
    const submitSong = async () => {
        try{
        await addDoc(songCollectionRef, {
            title: songName,
            duration: Duration,
            afroBeats: isAfro,
            userId: auth?.currentUser?.uid,
        });
        //acknowledge that this way of updating list on screen means 
        // we double query for every 1 action.
        //it doesn't really matter for firebase and it is still secure.
        //getSongList();
        } catch(err){
        console.error(err);
        }
    };

    return ( 

        <Container className="create-doc" m={"20px"}>

            
            <Heading size={'sm'}> Create Doc </Heading>

            <Input placeholder = "Song Name..."
            required 
            onChange={(e) => setSongName(e.target.value)}
            />
            <Input placeholder = "Song Duration..." 
            type = "number"
            required
            onChange={(e) => setDuration(e.target.value)}
            />
            <Checkbox 
            //so check box matches value of the state
            checked = {isAfro} 
            onChange={(e) => setIsAfro(e.target.checked)}
            > Afrobeats? </Checkbox>

            <Button size={"xs"} onClick={submitSong}> Submit Song</Button>

        </Container>

     );
}
 
export default Create;