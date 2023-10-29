import { Box, Button, Collapse, Flex, Image, Link, Spacer, Table, TableCaption, TableContainer, Tbody, Td, Text, Tfoot, Th, Thead, Tr } from "@chakra-ui/react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";


const SongResults = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const songs = location.state.songOutput; 
    //important for accessing spotify links so ill use it later
    //const accessToken = location.state.access_token;
    const [show, setShow] = useState(false);

    const handleToggle = () => setShow(!show)

    console.log("below is recommended songs in a different component");
    console.log(songs);

    return (
        <Box>
        <Collapse startingHeight={580} in={show}>
            <TableContainer>
                <Table variant='simple'>
                    <TableCaption placement="top">Results Recommended by Song</TableCaption>
                    <Thead>
                    <Tr>
                        <Th>Album Cover</Th>
                        <Th>Song Name</Th>
                        <Th>Artist</Th>
                        <Th>Preview</Th>
                    </Tr>
                    </Thead>
                    <Tbody>
                        {songs.map((song) =>(
                            <Tr key={song.id}>
                                <Td><Image src={song.album.images[2].url}/></Td>
                                <Td isTruncated> {song.name} </Td>
                                <Td>{song.artists.map((artist, i) => (
                                    <Text key={i}> {artist.name + ((i !== song.artists.length-1) ? ',' : '')} </Text>
                                    ))}
                                </Td>
                                <Td> <audio controls> 
                                        <source src={song.preview_url} type="audio/mpeg" />Your browser does not support</audio>
                                </Td>
                            </Tr>
                        ))}
                    
                    </Tbody>
                    <Tfoot>
                    <Tr>
                        <Th>Album Cover</Th>
                        <Th>Song Name</Th>
                        <Th>Artist</Th>
                    </Tr>
                    </Tfoot>
                </Table>
            </TableContainer>
        </Collapse>

            <Button size={"sm"} onClick={handleToggle} mt={'1rem'}>Show {show ? 'Less' : 'More'} Songs </Button>


            <Flex my={"40px"}>
                <Button onClick={()=> navigate("/attribute")}>Find by Attribute</Button>
                <Spacer />
                <Button onClick={()=> navigate("/")}>Home</Button>
            </Flex>
        </Box>
     );
}
 
export default SongResults;