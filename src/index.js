import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider, extendTheme } from "@chakra-ui/react"
import App from './App';
import { buttonTheme } from './customthemes/buttonStyle';


//chakra themes

const breakpoints = {
  base: "0px",
  sm: "621px",
  md: "768px",
  lg: "1008px",
  xl: "1280px",
  "2xl": "1536px",
};
export const theme = extendTheme({
  breakpoints,
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

