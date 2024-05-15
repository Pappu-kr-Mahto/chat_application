import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
const Login = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData( prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) =>{
        e.preventDefault();

        const baseURL = "http://localhost:8000"
            const URL = `${baseURL}/api/login/`

            const response = await fetch(URL,{
                    method:"POST",
                    headers:{
                    'Content-Type': 'application/json', 
                    },
                    body:JSON.stringify(formData), 
                });
                
                const result = await response.json();
                console.log(result)
                if(result['access']){
                    setFormData({email: '',password: ''})
                    window.localStorage.setItem('access',result['access'])
                    window.localStorage.setItem('user',result['user'])
                    navigate('/home')
                }
                else{
                    alert(result['error'])
                }

    }
    return (
        <>
            <Container maxWidth="xs"  sx={{ border: "1px solid gray", borderRadius: "5px", padding: "20px",marginTop:"3rem" }}>
                <Typography variant="h4" align="center" gutterBottom> Login </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth label="Email/Username" name="email" type="email" value={formData.email}
                        onChange={handleChange} margin="normal" variant="outlined" required
                    />
                    <TextField
                        fullWidth label="Password" name="password" type="password" value={formData.password}
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
