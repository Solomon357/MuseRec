//import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Auth from './components/Auth';
import Navbar from './components/Navbar';
import Create from './components/Create';
import SongList from './components/Songlist';
import Homepage from './components/Homepage';
//import { storage } from './config/firebase';
//import { ref, uploadBytes } from 'firebase/storage';
import { Box, Container, Input } from '@chakra-ui/react';





function App() {
  //useState for file upload
  // const [fileUpload, setFileUpload] = useState(null);


  // const uploadFile = async() =>{
  //   if (!fileUpload) return;
  //   const filesFolderRef = ref(storage, `testfiles/${fileUpload.name}`);
  //   try{
  //     await uploadBytes(filesFolderRef, fileUpload);
  //   } catch(err){
  //     console.error(err);
  //   } 
  // };


  return (
    <Router>
      <Box as={"main"} className="app">

        <Navbar />

          <Routes>
            <Route exact path="/" element={<Homepage />}/>
            <Route exact path="/sign-in" element={<Auth />} />
            <Route exact path="/create" element ={<Create />} />
            <Route exact path ="/songlist" element ={<SongList />} />      
          </Routes>

          {/* <div className='file upload'>
            <input type="file" 
              onChange={(e) => setFileUpload(e.target.files[0])} 
            />

            <button onClick={uploadFile}>Upload file</button>
          </div> */}
      </Box>



    </Router>

  );
}

export default App;
