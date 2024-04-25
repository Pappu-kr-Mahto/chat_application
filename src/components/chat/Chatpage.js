import React, { useState } from 'react';
import { InputAdornment, TextField, Box, Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';


let url = `ws://localhost:8000/ws/chat/`
let socket = new WebSocket(url);
const Chatpage = (props) => {

    const [messages, setMessages] = useState([]);

    const [currMsg, setCurrMsg] = useState('');

    socket.onmessage = (event) => {
        console.log("on message works")
        const data = JSON.parse(event.data);
        const response = [...messages, data['message']]
        setMessages(response)
        console.log(data)
        console.log(messages)
    }

    const sendMessage = (e) => {
        socket.send(JSON.stringify({
            message: currMsg
        }))
        setCurrMsg("");
        e.preventDefault();
    }

    
    return (
        <>
            <Box sx={{ height: 'inherit', position: 'relative' }}>
                chat page  {props.user.name}
                {props.user.roomId}
                {
                    messages && messages.map((msg) => {
                        return (
                            <div>
                                {msg}
                            </div>
                        )
                    })
                }
                <Box sx={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'column', position: 'absolute', bottom: '0', width: "100%" }}>
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
