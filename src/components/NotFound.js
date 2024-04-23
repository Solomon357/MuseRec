import { Box, Heading, Link } from "@chakra-ui/react";

const NotFound = () => {
  return ( 
    <Box>
      <Heading>Page Not Found</Heading>
      <Link href="/">Back to Homepage</Link>
    </Box> 
  );
}
export default NotFound;