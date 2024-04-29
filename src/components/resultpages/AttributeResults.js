import { Box, Button, Collapse, Flex, Spacer, Table, TableCaption, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr, Image, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CircularAudio from "../CircularAudio";


const AttributeResults = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const songs = location.state.songOutput;
  const [show, setShow] = useState(false)

  const handleToggle = () => setShow(!show)
  
  useEffect(() => {
    window.scrollTo({ top: document.body.scrollHeight, behavior:"smooth"});
  },[songs])
  
  //tests
  // console.log("attribute recommended songs in a different component")
  // console.log(songs);
  return ( 
    <Box>
      <Collapse startingHeight={580} in={show}>
        <TableContainer>
          <Table variant='simple'>
            <TableCaption placement="top" fontSize={"17px"}>Songs recommended by Genres</TableCaption>
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
                  <Td>
                    {song.artists.map((artist, i) => (
                      <Text key={artist.id}> {artist.name + ((i !== song.artists.length-1) ? ', ' : '')} </Text>
                    ))}
                  </Td>
                  <Td>{((song.preview_url) ?
                    <CircularAudio song={song.preview_url} idnum={song.id} size={"60px"} />
                    : <CircularAudio disabled={true} size={"60px"} href={song.external_urls.spotify}/>)}
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

      <Flex mt={"40px"} paddingBottom={"40px"}>
        <Button onClick={()=> navigate("/by-song")}>Find by Song or Artist</Button>
        <Spacer />
        <Button onClick={() => navigate("/")}>Home</Button>
      </Flex>
    </Box>
  );
}
 
export default AttributeResults;