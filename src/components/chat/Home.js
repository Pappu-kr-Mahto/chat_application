import { Container,Box } from '@mui/material';
import Singleuser from './Singleuser';
import { useState } from 'react';
const Home = () => {
  const initialUser = ['Pappu','Praveen','kalpana']
  const [users, setusers] = useState(initialUser);
  return (
    <>
      <Container sx={{ mt:"1rem",border:"1px solid grey" }}>
        <Box sx={{ width:"40%", backgroundColor:'#89e2c4', height:"100vh",display:"inline-block"}}>
              {
                users.map((user)=>{
                  return(
                  <Singleuser user = {user} />
                  )
                })
              }
        </Box>
        <Box sx={{ width: "60%", height:"100vh",backgroundColor:'red',display:"inline-block", verticalAlign:"top"}}>

        </Box>
      </Container>
    </>
  );
}

export default Home;
