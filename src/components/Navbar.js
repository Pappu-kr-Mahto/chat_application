import React, { useState, useEffect } from 'react';
import { Button, Box, Container } from '@mui/material'
// import { AppBar, Toolbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {
    Link,
} from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();

    const [loginUser, setLoginUser] = useState(false);

    useEffect(() => {
        if(localStorage.getItem('access')){
            setLoginUser(true)
        }
        else{
            navigate('/login');
        }
    },[localStorage.getItem('access')]);

    const handleLogout = ()=>{
        localStorage.removeItem('access')
        localStorage.removeItem('user')
        setLoginUser(false)
        navigate('/login');
    }
    return (
        <>
            <Box>
                { 
                loginUser ? <Container align="right" sx={{ padding: 0.5, mt: 3 }}>
                          
                            <Button onClick={handleLogout} variant="outlined" sx={{ ml: 1 }} >  Logout </Button>
                                </Container>
                          :
                            <Container align="right" sx={{ padding: 0.5, mt: 3 }}>
                                <Button component={Link} to="/login" color="success" variant="contained" sx={{ mr: 1 }} >  Sign In </Button>
                                <Button component={Link} to="/register" variant="outlined" sx={{ ml: 1 }} >  Sign Up </Button>
                            </Container>
                }
            </Box>
        </>
    );
}

export default Navbar;
