import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider, extendTheme } from "@chakra-ui/react"
import App from './App';
import { buttonTheme } from './customthemes/buttonStyle';


//chakra themes for the webpage
export const theme = extendTheme({
  components: {
    Button: buttonTheme,
  },
  //add a lighter orange colour to use in colorScheme
  colors: {
    brand: {
      300: "#ffaf80",
      400: "#ff8b47",
      500: "#ffa500",
      600: "#f45b00", 
      700: "#dc5200", 
      800: "#c34800", 
      900: "#a33c00", 
       
    }
  },
})

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <ChakraProvider theme={theme}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ChakraProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

