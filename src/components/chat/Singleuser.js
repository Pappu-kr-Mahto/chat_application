import { Box, Button } from '@mui/material';
import React from 'react';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import Chat from '../assets/images/chat.png'

const Singleuser = (props) => {
  return (
    <>
      <Box startIcon={<AccountCircleOutlinedIcon/>} >
        <img src={Chat} alt="user image" />
        <span style={{verticalAlign:"top"}}>
            {props.user}
        </span>
      </Box>
    </>
  );
}

export default Singleuser;
