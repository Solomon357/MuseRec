import { useEffect, useState } from 'react';
import Auth from './components/Auth';
import { db, auth, storage} from './config/firebase';
//getDocs contains the functionality for reading all data
import { getDocs, collection, addDoc, deleteDoc, doc, updateDoc} from 'firebase/firestore';
import { ref, uploadBytes } from 'firebase/storage';


function App() {

  //useState for list of songs 
  const [songList, setSongList] = useState([]);
  //to access a collection we first need a collection ref
  //MAKE SURE THE REF IS EXACT TO THE COLLECTION YOURE USING**
  const songCollectionRef = collection(db, "songs");


  //useStates for create song
  const [songName, setSongName] = useState("");
  const [Duration, setDuration] = useState(0);
  const [isAfro, setIsAfro] = useState(false);

  //useState for updated song title
  const[updSongName, setUpdSongName] = useState("");

  //useState for file upload
  const [fileUpload, setFileUpload] = useState(null);


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
      getSongList();
    } catch(err){
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

  const uploadFile = async() =>{
    if (!fileUpload) return;
    const filesFolderRef = ref(storage, `testfiles/${fileUpload.name}`);
    try{
      await uploadBytes(filesFolderRef, fileUpload);
    } catch(err){
      console.error(err);
    } 
  };

  useEffect(() => {
    //make sure i remember to call the getsonglist function inside the useEffect
    getSongList();
  },[]);

  return (
    <div className="App"> 
      <h1>Firebase Course </h1>

      <div className="sign-in">
        <h2> Sign in</h2>
        <Auth />
      </div> 

      <div className="create-doc">
        <h2> Create Doc </h2>
        <input placeholder = "Song Name..."
          required 
          onChange={(e) => setSongName(e.target.value)}
        />
        <input placeholder = "Song Duration..." 
          type = "number"
          required
          onChange={(e) => setDuration(e.target.value)}
        />
        <input type="checkbox"
          //so check box matches calue of the state
          checked = {isAfro}
          onChange={(e) => setIsAfro(e.target.checked)}
         />
        <label> afrobeats </label>
        <button onClick={submitSong}> Submit Song</button>

      </div>

      <div className="readlist">
        <h2>SongList</h2>
        {songList.map((song) => (
          <div key={song.id}>
            <p style={{ color: song.afroBeats ? "green" : "red" }}>
              Song title: {song.title}</p>
            <p>Duration: {song.duration}</p>
            {/* "() =>" syntax needed for calling a function with a parameter in react */}
            <button onClick={() => deleteSong(song.id)}>Delete song</button>
            <input placeholder='new title...'
              onChange={(e) => setUpdSongName(e.target.value)} />
            <button onClick={() => updateSongTitle(song.id)}> Update title</button>
          </div>
        ))};
      </div>

      <div className='file upload'>
        <input type="file" 
          onChange={(e) => setFileUpload(e.target.files[0])} 
        />

        <button onClick={uploadFile}>Upload file</button>
      </div>


    </div>

  );
}

export default App;
