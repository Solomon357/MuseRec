import { Box, Button, Divider, Heading, Input, Text } from "@chakra-ui/react";
//getDocs contains the functionality for reading all data
import { getDocs, deleteDoc, doc, updateDoc, collection } from 'firebase/firestore';
import { db } from 'C:/Users/solom/OneDrive/Desktop/Improved_FYP/improved_mrs/src/config/firebase.js';

import { useState, useEffect } from "react";
//COMPONENT CONTAINS READ UPDATE AND DELETE FUNCTIONALITY
const SongList = () => {

    const songCollectionRef = collection(db, "songs");

     //useState for list of songs 
    const [songList, setSongList] = useState([]);

    

    //useState for updated song title
    const[updSongName, setUpdSongName] = useState("");

    //UPDATE functionality
    const updateSongTitle = async(id) => {
        try{
        const songDoc = doc(db, "songs", id)
        await updateDoc(songDoc, {
            title: updSongName
        });
        }catch(err){
        console.error(err);
        }
    };

     //DELETE FUNCTIONALITY
    const deleteSong = async(id) => {
        try{
        //specify what doc i want
        const songDoc = doc(db, "songs", id)
        await deleteDoc(songDoc);
        } catch(err){
        console.error(err);
        }
    };

    //making a function inside a useEffect like this is a 
    //kinda a work around to get an async function inside a useEffect
    const getSongList = async () => {
        //READ Functionality for firestore
        //always a try catch for error handling
        try {
        //gets raw data for firestore collection
        const data = await getDocs(songCollectionRef);
        //gets the readable data that we want as an array of objects
        const filteredData = data.docs.map((doc) => ({
            ...doc.data(), 
            id: doc.id,
        }));
        //once we get the raw data, then filter for what we want, set the useState to the filtered data
        setSongList(filteredData);
        } catch (err) {
        console.error(err);
        }
    };

    useEffect(() => {
        //make sure i remember to call the getsonglist function inside the useEffect
        getSongList();
      },[]);

    return ( 
        <Box >
            <Heading size={"sm"}>SongList</Heading>

            {songList.map((song) => (
                <Box key={song.id} p="10px" m={"5px"} border={"solid 1px black"}>
                    <Text style={{ color: song.afroBeats ? "green" : "red" }}>
                    Song title: {song.title}</Text>
                    <Text>Duration: {song.duration}</Text>
                    {/* "() =>" syntax needed for calling a function with a parameter in react */}
                    <Button size={"xs"} onClick={() => deleteSong(song.id)}>Delete song</Button>
                    <Input placeholder='new title...'
                    onChange={(e) => setUpdSongName(e.target.value)} />
                    <Button  size={"xs"} onClick={() => updateSongTitle(song.id)}> Update title</Button>
                    <Divider p="10px" />
                </Box>
            ))}
        </Box>

     );
}
 
export default SongList;