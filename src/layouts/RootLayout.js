import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Navbar from '../components/Navbar';

const RootLayout = () => {
  return ( 
    <Box className="root-layout" maxH={"100vh"} maxW={"100vw"}>
      <Navbar />
      <Box as="main">
        <Outlet />
      </Box>
    </Box>
  );
}
 
export default RootLayout;




