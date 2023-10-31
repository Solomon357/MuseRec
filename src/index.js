import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider, extendTheme } from "@chakra-ui/react"
import App from './App';
import { radioTheme } from './customthemes/radioStyle';
import { buttonTheme } from './customthemes/buttonStyle';




const root = ReactDOM.createRoot(document.getElementById('root'));

//if my understanding is right I will use the "createMultiStyleConfigHelpers" component here
//to auto customize any checkbox that I make
export const theme = extendTheme({
  components: {
    Radio: radioTheme,
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

