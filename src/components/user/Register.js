import React, { useState } from 'react';
import { TextField, Button, Container, Typography,Box } from '@mui/material';
import {AppRegistration} from '@mui/icons-material';

const Register = () => {
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
            <Container  maxWidth="xs" sx={{ marginTop: "2rem", border: "1px solid gray", padding: "20px", borderColor: "#2b2b2b" }}>
                
                <Typography variant="h4" align="center" gutterBottom >
                    Registration
                </Typography>
                <form >
                    <TextField
                        fullWidth label="Email" name="email" type="email" value={formData.email}
                        onChange={handleChange} margin="normal" variant="outlined" required
                    />
                    <TextField
                        fullWidth
                        label="First Name" name="firstName" value={formData.firstName} onChange={handleChange}
                        margin="normal" variant="outlined"
                    />
                    <TextField
                        fullWidth
                        label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange}
                        margin="normal" variant="outlined"
                    />
                    <TextField
                        fullWidth
                        label="Password" name="password" type="password" value={formData.password}
                        onChange={handleChange} margin="normal" variant="outlined" required
                    />
                    <Box align="center">

                        <Button startIcon={<AppRegistration />}
                            type="submit" variant="contained" color="primary"
                            size="large" style={{ marginTop: '1rem' }}
                        >
                            Register
                        </Button>
                    </Box>
                </form>
            </Container>
        </>
    );
}

export default Register;
