import { Container, Flex, Grid, Heading, InputRightElement, InputGroup, Input, Text, Button, GridItem, useToast, } from '@chakra-ui/react'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { publicRequest } from '../requestMethod'


const initialState = {
    fullName: "",
    email: "",
    password: "",
    mobile:"",
    isAdmin: "employee",

}

const Signup = () => {
    const [user, setUser] = useState(initialState)
    const navigate = useNavigate()
    const [alert, setAlert] = useState(false)
    const toast = useToast({
        position: 'top'
    })



    const [show, setShow] = React.useState(false)
    const handleClick = () => setShow(!show)
    let handelChange = (e) => {
        const { name, value, type, checked } = e.target;
        const val = type === "checkbox" ? checked : value;

        setUser({ ...user, [name]: val });
    };

    const handelSubmit = (e) => {
        if (user.fullName === "" || user.email === "" || user.password === "") {
            setAlert(true)


        } else {

            console.log('user:', user)
            publicRequest.post("/auth/register", user).then((res) => {
                toast({
                    title: `Account Created`,
                    status: "success",
                    isClosable: true,
                })
                toast({
                    title: `You Are Redirected To Login Page in 3 sec`,
                    status: "info",
                    isClosable: true,
                })
                setTimeout(() => {
                    navigate("/login")
                }, 3000)
            }).catch((err) => {
                console.log('err:', err)
            })
        }
    }
    return (
        <>
            <Grid bg="#FFF5F5" w="100%" h="100vh" display="grid" justifyContent="center" alignItems="center">

                <Container  >
                    <Grid w="400px" bg="#FFF" boxShadow="xl">
                     
                        <Grid gap={5} p={8} display="grid" justifyContent="center">

                            <Grid display="grid" alignItems="baseline" textAlign="center" gap={2} ><Heading size="md">SIGNUP </Heading>



                            </Grid>
                            <Grid gap={3}>
                                <GridItem>
                                    <Input variant='outline' borderRadius="0px" name='fullName' onChange={handelChange} value={user.fullName} placeholder='Enter Your Full Name' />
                                </GridItem>

                                <GridItem>
                                    <Input variant='outline' name='email' borderRadius="0px" onChange={handelChange} value={user.email} placeholder='Enter Your Email' />
                                </GridItem>
                                <GridItem>
                                    <Input variant='outline' borderRadius="0px" name='mobile' onChange={handelChange} value={user.mobile} placeholder='Enter Your Number' />
                                </GridItem>

                                <GridItem>
                                    <InputGroup size='md'>
                                        <Input
                                            pr='4.5rem'
                                            type={show ? 'text' : 'password'}
                                            placeholder='Enter Your  Password'
                                            borderRadius="0px"
                                            onChange={handelChange} value={user.password}
                                            name='password'
                                        />
                                        <InputRightElement width='4.5rem'>
                                            <Button h='1.75rem' size='sm' onClick={handleClick}>
                                                {show ? 'Hide' : 'Show'}
                                            </Button>
                                        </InputRightElement>
                                    </InputGroup>
                                </GridItem>
                                {alert && <Text color="red">Fill this Form Properly</Text>}


                            </Grid>
                       
                            <Flex>
                                <Button colorScheme="facebook" w="100%" border="none" color="#FFF" h={50} onClick={handelSubmit}>
                                    <b>   CONTINUE</b>
                                </Button>
                            </Flex>
                            <Flex color="#FF3F6C"> <Link to="/login" >Already Have a Account?</Link></Flex>


                        </Grid>
                    </Grid>

                </Container>

            </Grid>

        </>




    )
}

export default Signup
