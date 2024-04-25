import React, { useState  } from 'react';
import { TextField, Button, Container, Typography,Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AppRegistration } from '@mui/icons-material';

const Register = () => {
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        email: '',
        first_name: '',
        last_name: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) =>{
        e.preventDefault();

        const baseURL = "http://localhost:8000"
            const URL = `${baseURL}/api/signup/`

            const response = await fetch(URL,{
                    method:"POST",
                    headers:{
                    'Content-Type': 'application/json', 
                    },
                    body:JSON.stringify(formData), 
                });
                
                const result = await response.json();
                console.log(result)
                if(result['success']){
                    alert("Account Created successfully.")
                    setFormData({email: '', first_name: '',last_name: '',password: ''})
                    navigate('/login')
                }
                else{
                    alert(result['error'])
                }

    }
    return (
        <>
            <Container  maxWidth="xs" sx={{ marginTop: "2rem", borderRadius: "5px", border: "1px solid gray", padding: "20px", borderColor: "#2b2b2b" }}>
                
                <Typography variant="h4" align="center" gutterBottom >
                    Registration
                </Typography>
                <form onSubmit={ handleSubmit }>
                    <TextField
                        fullWidth label="Email" name="email" type="email" value={formData.email}
                        onChange={handleChange} margin="normal" variant="outlined" required
                    />
                    <TextField
                        fullWidth
                        label="First Name" name="first_name" value={formData.first_name} onChange={handleChange}
                        margin="normal" variant="outlined" required
                    />
                    <TextField
                        fullWidth
                        label="Last Name" name="last_name" value={formData.last_name} onChange={handleChange}
                        margin="normal" variant="outlined" required
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
