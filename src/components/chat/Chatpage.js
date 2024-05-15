import React, { useState } from 'react';
import { InputAdornment, TextField, Box, Button ,Typography} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import getUserIdUtil from '../utils/getUserIdUtil';

const leftChatMessage = {
    display:'inline-block',
    border:'1px solid black',
    borderRadius:'1rem 1rem 1rem 0',
    padding:'0.5rem 1rem' ,
    margin:'0.5rem 0',
    backgroundColor:'whitesmoke',
}
const rightChatMessage = {
    display:'inline-block',
    border:'1px solid black',
    borderRadius:'1rem 1rem 0 1rem',
    padding:'0.5rem 1rem',
    margin:'0.5rem 0',
    backgroundColor:'#4fa4ee;',
    color:'white',
}
const Chatpage = (props) => {
    const userId = getUserIdUtil.getUserId()
    const { room , userChats, setUserChats, socket } = props;
    const [currMsg, setCurrMsg] = useState('');

    const scrollToBottom = ()=>{
        setTimeout(() => {
            const scrollObj = document.getElementById('chatend');
            scrollObj.scrollIntoView({ behavior: 'smooth'});
        }, 200);
    }

    socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log(data)
        if(data.roomId === room.roomId){
            const response = [...userChats,data]
            setUserChats(response)
            scrollToBottom() 
        }   
    }

    const sendMessage = (e) => {
        e.preventDefault();
        socket.send(JSON.stringify({
            sender : getUserIdUtil.getUserId(),
            roomId : room.roomId,
            message: currMsg
        }))
        setCurrMsg("");
    }

    return (
        <>
            <Box sx={{ height: 'inherit', display: 'flex',flexDirection:'column' }}>

                <Box sx={{borderBottom:'1px solid gray', color:'black',backgroundColor:'whitesmoke',padding:'0.5rem'}}>
                    <Typography> chat page  {room.name}  {room.roomId} {userId}</Typography>
                </Box>

                <Box sx={{padding:'0 1rem', flexGrow:2,maxHeight:'85%', overflowY:'scroll', scrollbarWidth: 'none'}}>
                {
                    userChats && userChats.map((msg) => {
                        return (
                            <Box >
                                {
                                    userId === msg.sender_id 
                                    ?
                                    <Box sx={{textAlign:'right'}} >
                                        <Box sx={rightChatMessage}>{msg.message}</Box>
                                    </Box>
                                    :
                                    <Box >
                                        <Box sx={leftChatMessage}>{msg.message}</Box> 
                                    </Box> 
                                }
                              </Box>  
                        )   
                    })

                }
                <div id = 'chatend'></div>
                </Box>

                <Box sx={{ alignContent:'flex-end'}}>
                    <form action="" >
                        <TextField
                            fullWidth
                            name="msg"
                            as="text"
                            margin="normal"
                            variant="outlined"
                            size="small"
                            value={currMsg}
                            onChange={(e) => setCurrMsg(e.target.value)}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <Button onClick={sendMessage} endIcon={<SendIcon/>}>Send</Button>
                                    </InputAdornment>
                                ),
                            }}
                            required
                        />
                    </form>
                </Box>
            </Box>
        </>
    );
}

export default Chatpage;
