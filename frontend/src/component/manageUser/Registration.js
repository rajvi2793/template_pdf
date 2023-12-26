import React, { useState } from 'react';
import { Box, Heading, FormControl, FormLabel, Input, Button, FormErrorMessage} from '@chakra-ui/react';
import { variables } from './Variable';

function Registration() {

    const [user, setUser] = useState({
        userId: 0,
        userName: '',
        userEmail: '',
        userPwd: '',
        userSign:null
      });
      
      const [emailError, setEmailError] = useState('');
    
      const handleChange = (e) => {
        const { id, value } = e.target;
    
        // Email validation
        if (id === 'userEmail') {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          setEmailError(emailRegex.test(value) ? '' : 'Invalid email address');
        }
    
        setUser((prevUser) => ({
          ...prevUser,
          [id]: value,
        }));
      };

      const handleSignatureChange = (e) => {
        e.preventDefault();

        const formData= new FormData();

        formData.append("file",e.target.files[0],e.target.files[0].name)
    
        fetch(variables.API_URL+'user/SaveSign/',{
            method:'POST',
            body:formData
        }).then(res=>res.json())
        .then(data=>{
            setUser((prevUser) => ({
                ...prevUser,
                userSign: data,
              }));
        })
      };
    
      const handleSubmit = () => {
        // Check for email validation error before submitting
        if (emailError) {
          console.log('Invalid email address');
          return;
        }
    
        fetch(variables.API_URL+'user',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                UserName:user.userName,
                UserEmail:user.userEmail,
                UserPassword:user.userPwd,
                UserDefaultSign:user.userSign
            })
        }).then(res=>res.json())
        .then((result)=>{
            alert(result);
        },
        (error)=>{
            alert("Failed");
        }
        )
    
        // Handle registration submission using the user state
        console.log('Registration submitted:', user);
      };

  return (
    <Box
    display="flex"
    flexDirection="column"
    justifyContent="center"
    alignItems="center"
    height="100vh"
  >
    <Box width="300px">
      <Heading mb={6}>Register</Heading>
      <FormControl id="userName" mb={4}>
        <FormLabel>User's Name</FormLabel>
        <Input
          type="text"
          placeholder="Enter your name"
          value={user.userName}
          onChange={handleChange}
        />
      </FormControl>

      <FormControl id="userEmail" mb={4} isInvalid={!!emailError}>
        <FormLabel>User Email</FormLabel>
        <Input
          type="email"
          placeholder="Enter your email"
          value={user.userEmail}
          onChange={handleChange}
        />
        <FormErrorMessage>{emailError}</FormErrorMessage>
      </FormControl>

      <FormControl id="userPwd" mb={6}>
        <FormLabel>User Password</FormLabel>
        <Input
          type="password"
          placeholder="Enter your password"
          value={user.userPwd}
          onChange={handleChange}
        />
      </FormControl>

      <FormControl id="userSign" mb={6}>
          <FormLabel>User Signature</FormLabel>
          <Input type="file" onChange={handleSignatureChange} />
        </FormControl>

      <Button colorScheme="teal" size="lg" onClick={handleSubmit}>
        Register
      </Button>
    </Box>
  </Box>
  )
}

export default Registration