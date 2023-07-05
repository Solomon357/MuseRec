import { Box, Button, Collapse, Flex, Spacer, Table, TableCaption, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


const AttributeResults = () => {

    const navigate = useNavigate();

    const [show, setShow] = useState(false)

    const handleToggle = () => setShow(!show)

    return ( 
        <Box>
            <Collapse startingHeight={350} in={show}>
                <TableContainer>
                    <Table variant='simple'>
                        <TableCaption placement="top">Results Recommended by Attribute</TableCaption>
                        <Thead>
                        <Tr>
                            <Th>Song Name</Th>
                            <Th>Genre</Th>
                            <Th isNumeric>Relative Rating</Th>
                        </Tr>
                        </Thead>
                        <Tbody>
                        <Tr>
                            <Td>Song#1</Td>
                            <Td>Rock</Td>
                            <Td isNumeric>1</Td>
                        </Tr>
                        <Tr>
                            <Td>Song#2</Td>
                            <Td>Rock</Td>
                            <Td isNumeric>2.1</Td>
                        </Tr>
                        <Tr>
                            <Td>Song#3</Td>
                            <Td>Metal</Td>
                            <Td isNumeric>3.91</Td>
                        </Tr>
                        <Tr>
                            <Td>Song#4</Td>
                            <Td>Rock</Td>
                            <Td isNumeric>1</Td>
                        </Tr>
                        <Tr>
                            <Td>Song#5</Td>
                            <Td>Rock</Td>
                            <Td isNumeric>2.1</Td>
                        </Tr>
                        <Tr>
                            <Td>Song#6</Td>
                            <Td>Metal</Td>
                            <Td isNumeric>3.91</Td>
                        </Tr>
                        <Tr>
                            <Td>Song#7</Td>
                            <Td>Rock</Td>
                            <Td isNumeric>1</Td>
                        </Tr>
                        <Tr>
                            <Td>Song#8</Td>
                            <Td>Rock</Td>
                            <Td isNumeric>2.1</Td>
                        </Tr>
                        <Tr>
                            <Td>Song#9</Td>
                            <Td>Metal</Td>
                            <Td isNumeric>3.91</Td>
                        </Tr>
                        <Tr>
                            <Td>Song#10</Td>
                            <Td>Rock</Td>
                            <Td isNumeric>1</Td>
                        </Tr>
                        
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
                <Button onClick={()=> navigate("/by-song")}>Find by Song Name</Button>
                <Spacer />
                <Button onClick={() => navigate("/")}>Home</Button>
            </Flex>
        </Box>
     );
}
 
export default AttributeResults;