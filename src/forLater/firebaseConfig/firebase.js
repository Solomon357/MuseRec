// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// for authentication services
import { getAuth, GoogleAuthProvider } from "firebase/auth";
//firestore services
import { getFirestore} from "firebase/firestore";
//storage service
import { getStorage} from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyB890Nx0ZF-xsFDZ8MyRgX0Qo7KXuP1k2c",
  authDomain: "mrs-playground-ver-2.firebaseapp.com",
  projectId: "mrs-playground-ver-2",
  storageBucket: "mrs-playground-ver-2.appspot.com",
  messagingSenderId: "832198274454",
  appId: "1:832198274454:web:ee10afb3a7afa96bdc41b7",
  measurementId: "G-488YFVEER5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//export auth cus we're going to be using it everywhere

//this is kinda the format for getting a firebase service
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);
export const storage = getStorage(app);
