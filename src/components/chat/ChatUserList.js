import React from 'react';
import { Container, Box, Button } from '@mui/material';
import Chat from '../assets/images/chat.png'

const ChatUserList = (props) => {
    const {user , selectChatUser } = props
  return (
    <>
        <Box  sx={{margin:'15px',padding:'5px', backgroundColor:'#fdfdfd'}} onClick={()=>selectChatUser(user)} >
            <img src={Chat} alt='profile' style={{borderRadius:'50%', height:'3rem',width:'3rem'}} />
            <span style={{ verticalAlign: "top" }}>
                {user.name}
                {user.email}
            </span>
        </Box>   
    </>
  );
}

export default ChatUserList;
