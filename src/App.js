import { createBrowserRouter, 
  Route, 
  createRoutesFromElements,
  RouterProvider
} from 'react-router-dom';
import Homepage from './components/Homepage';
import SongResults from './components/resultpages/BySongResults';
import AttributeResults from './components/resultpages/AttributeResults';
import "./index.css"
//controls the journey of the pages
import RootLayout from './layouts/RootLayout';
import AttributeLayout from './layouts/AttributeLayout';
import BySongLayout from './layouts/BySongLayout';
import NotFound from './components/NotFound';
//* commented out pages will be functionality that needs to be reimagined *
//import Auth from './components/Auth';
// import Create from './components/Create';
// import SongList from './components/Songlist';

//BrowserRouter element needs to be created OUTSIDE the App function
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}> 
      <Route index element={<Homepage />}/>
      {/* <Route path="sign-in" element={<Auth />} /> */}
      {/* <Route path="create" element ={<Create />} />
      <Route path ="songlist" element ={<SongList />} />      */}
      <Route path ="attribute" element ={<AttributeLayout />}>
        <Route path = "attribute-results" element={<AttributeResults />} />
      </Route>
      <Route path ="by-song" element ={<BySongLayout />} >
        <Route path= "by-song-results" element={<SongResults />} />
      </Route>
      <Route path ="*" element={<NotFound />} />      
    </Route>
  )
)

function App() {
  return ( 
    <RouterProvider router={router} />
  );
}

export default App;
