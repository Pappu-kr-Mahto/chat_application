import React from 'react';
import { Button, Box, Container } from '@mui/material'
// import { AppBar, Toolbar } from '@mui/material';

import {
    Link,
} from "react-router-dom";

const Navbar = () => {
    return (
        <>
            <Box>
                <Container align="right" sx={{ padding: 0.5, mt: 3 }}>
                    <Button component={Link} to="/login" color="success" variant="contained" sx={{ mr: 1 }} >  Sign In </Button>
                    <Button component={Link} to="/register" variant="outlined" sx={{ ml: 1 }} >  Sign Up </Button>
                </Container>
            </Box>
        </>
    );
}

export default Navbar;
