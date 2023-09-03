import { Box, Button, Collapse, Flex, Image, Spacer, Table, TableCaption, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr } from "@chakra-ui/react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";


const SongResults = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const songs = location.state.songOutput; 
    const [show, setShow] = useState(false);

    const handleToggle = () => setShow(!show)

    console.log("below is recommended songs in a different component");
    console.log(songs);

    return (
        <Box>
        <Collapse startingHeight={350} in={show}>
            <TableContainer>
                <Table variant='simple'>
                    <TableCaption placement="top">Results Recommended by Song</TableCaption>
                    <Thead>
                    <Tr>
                        <Th>Song Name</Th>
                        <Th>Genre</Th>
                        <Th isNumeric>Relative Rating</Th>
                    </Tr>
                    </Thead>
                    <Tbody>
                        {songs.map((song, i) =>(
                            <Tr key={i}>
                                <Td>{song.name}</Td>
                                <Td> <Image src={song.album.images[2].url}/></Td>
                                <Td isNumeric>{song.popularity}</Td>
                            </Tr>

                        ))}
                    
                    </Tbody>
                    <Tfoot>
                    <Tr>
                        <Th>Song Name</Th>
                        <Th>Genre</Th>
                        <Th isNumeric>Relative Rating</Th>
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