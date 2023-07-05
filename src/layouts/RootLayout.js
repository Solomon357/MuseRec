import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Navbar from '../components/Navbar';
//import { storage } from './config/firebase';
//import { ref, uploadBytes } from 'firebase/storage';

const RootLayout = () => {
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
        <Box className="root-layout">
            <Navbar />


            <Box as="main">
                <Outlet />

                {/* <div className='file upload'>
                <input type="file" 
                onChange={(e) => setFileUpload(e.target.files[0])} 
                />

                <button onClick={uploadFile}>Upload file</button>
            </div> */}

            </Box>
        </Box>
     );
}
 
export default RootLayout;




