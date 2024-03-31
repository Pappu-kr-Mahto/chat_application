import { useState } from 'react';
import React from "react";
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        firstName: '',
        lastName: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    return (
        <>
            <Container maxWidth="xs"  sx={{ border: "1px solid gray", borderRadius: "5px", padding: "20px",marginTop:"3rem" }}>
                <Typography variant="h4" align="center" gutterBottom> Login </Typography>
                <form action="">
                    <TextField
                        fullWidth label="Email/Username" name="email" type="email" value={formData.email}
                        onChange={handleChange} margin="normal" variant="outlined" required
                    />
                    <TextField
                        fullWidth label="Password" name="password" type="email" value={formData.email}
                        onChange={handleChange} margin="normal" variant="outlined" required
                    />
                    <Box align="center" >
                        <Button type="submit" variant="contained" color="primary"
                            size="large" style={{ marginTop: '1rem' }} endIcon={<LoginIcon />} > Login</Button>
                    </Box>
                </form>
            </Container>
        </>
    )
}
export default Login
