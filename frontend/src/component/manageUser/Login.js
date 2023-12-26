import React, { useState } from 'react';
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  FormErrorMessage,
} from '@chakra-ui/react';
import { useNavigate, useLocation } from 'react-router-dom';
import { variables } from './Variable';
import Cookies from 'js-cookie';  

function Login() {
  const [credentials, setCredentials] = useState({
    UserEmail: '',
    UserPassword: '',
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [id]: value,
    }));
  };

  const handleLogin = async () => {
    try {
      console.log(JSON.stringify(credentials))
      const response = await fetch(variables.LOGIN_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (response.ok) {
        const responseData = await response.json();
        // Store the token in localStorage or state for future requests
        Cookies.set('token', responseData.token,{expires:1 });
        console.log('Login successful:', responseData);
        navigate(-1);
      } else {
        const errorData = await response.json();  
        setError(`Login failed: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Login request failed:', error);
    }
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
        <Heading mb={6}>Login</Heading>
        <FormControl id="UserEmail" mb={4}>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            placeholder="Enter your email"
            value={credentials.UserEmail}
            onChange={handleChange}
          />
        </FormControl>

        <FormControl id="UserPassword" mb={6}>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            placeholder="Enter your password"
            value={credentials.UserPassword}
            onChange={handleChange}
          />
        </FormControl>

        {error && (
          <Box color="red.500" mb={4}>
            {error}
          </Box>
        )}

        <Button colorScheme="teal" size="lg" onClick={handleLogin}>
          Login
        </Button>
      </Box>
    </Box>
  );
}

export default Login;
