import React, { useState } from 'react'
import { useEffect } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Avatar,
  Button,
  Grid,
  Spinner,
  useToast,
} from '@chakra-ui/react'
import { userRequest } from '../requestMethod';
import EmployeeModel from '../Compenents/EmployeeModel';
const Employee = () => {
  const [data, setData] = useState([])
  const [loading,setLoadng]=useState(false)
  const toast=useToast()

  const getData=()=>{
    setLoadng(true)
    
    userRequest.get("/users?limit=8").then(res => {
      setLoadng(false)
      setData(res.data)

    }).catch(err => {
      console.log('err:', err)
    })
  }
  useEffect(() => {
    getData()

  }, [])

  const handelDelete=(id)=>{
    userRequest.delete(`/users/delete/${id}`).then(res => {
        getData()
      }).then(res => {
        toast({
          title: `Deleted`,
          status: "info",
          isClosable: true,
        })
  
      }).catch(err => {
        console.log('err:', err)
        toast({
          title: `Failed to delete user: ${id}`,
          status: "error",
          isClosable: true,
        })
      })
  


  }

 
  if(loading){
    return(
      <Grid flex="4" justifyContent="center" alignItems="center">
        <Spinner
      thickness='4px'
      speed='0.65s'
      emptyColor='gray.200'
      color='blue.500'
      size='xl'
    />
      </Grid>
    )
  }


  return (
    <div style={{ flex: 4 }}>
      <TableContainer>
        <Table variant='simple'>
          <Thead >
            <Tr>
              <Th>Avtar</Th>
              <Th>Name</Th>
              <Th >email</Th>
              <Th >Gender</Th>
              <Th >Status</Th>
              <Th >Update</Th>
              <Th >Delete</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.length > 0 && data.map((el) => {
              return (
                <Tr key={el._id}>
                  <Td> <Avatar name='Dan Abrahmov' src={el.profilePic} /></Td>
                  <Td >{el.fullName}</Td>
                  <Td >{el.email}</Td>
                  <Td >{el.gender}</Td>
                  <Td >{el.isAdmin}</Td>
                  <Td ><EmployeeModel el={el} getData={getData}/></Td>
                  <Td > <Button colorScheme="red" onClick={()=>handelDelete(el._id)}>Delete</Button></Td>
                </Tr>
              )
            })}

          </Tbody>

        </Table>
      </TableContainer>
    </div>
  )
}

export default Employee