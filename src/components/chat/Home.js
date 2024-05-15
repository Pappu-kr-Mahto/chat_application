import { Typography, Box, Button, Container } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import Chatpage from './Chatpage';
import ChatUserList from './ChatUserList';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import LogoutIcon from '@mui/icons-material/Logout';
import AddIcon from '@mui/icons-material/Add';
import Modal from '@mui/material/Modal';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import getUserIdUtil from '../utils/getUserIdUtil';
import Chat from '../assets/images/chat.png'
import CloseIcon from '@mui/icons-material/Close';
import Tooltip from '@mui/material/Tooltip';

const style = {
  overflowY: 'auto',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 350,
  height: 450,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,

};

const selectUserStyle = {
  border: '2px solid green',
}

let url = `ws://localhost:8000/ws/chat/${getUserIdUtil.getUserId()}`
let socket = new WebSocket(url);

const Home = () => {

  const initialUser = ['Pappu', 'Praveen', 'kana', 'Pappu', 'Praveen']
  const [users, setUsers] = useState(initialUser);
  const [userChats, setUserChats] = useState('');
  const [activeChatUser, setActiveChatUser] = useState('');
  const [chatUsers, setChatUsers] = useState([]);

  const getAllChatUsers = async () => {
    const URL = `${process.env.REACT_APP_API_URL}/api/getAllChatUsers/`
    const token = `Bearer ${localStorage.getItem('access')}`

    const response = await fetch(URL, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token,
      },
    });

    const result = await response.json();
    console.log(result)
    setChatUsers(result.data)

  }

  const getAllUsers = async () => {
    const URL = `${process.env.REACT_APP_API_URL}/api/getAllUsers/`
    const token = `Bearer ${localStorage.getItem('access')}`

    const response = await fetch(URL, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token,
      },
    });

    const result = await response.json();
    console.log(result)
    setUsers(result.data)

  }

  useEffect(() => {
    getAllChatUsers()
    getAllUsers()
  }, []);

  // Get all the chats of active chat User
  const getUserChat = async (roomId) => {
    const URL = `${process.env.REACT_APP_API_URL}/api/chatmessages/${roomId}`
    const token = `Bearer ${localStorage.getItem('access')}`

    const response = await fetch(URL, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token,
      }
    });
    const result = await response.json();
    console.log(result);
    setUserChats(result.data)
  }

  // !important: changes the active chat user and also the URL
  const selectChatUser = (user) => {
    setActiveChatUser(user)
    getUserChat(user.roomId)
    console.log(user)

    const url = new URL(window.location)
    url.searchParams.set('room', user.roomId)
    window.history.pushState(null, '', url.toString());

  }

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [checked, setChecked] = useState({});
  const [disabledAdd, setDisabledAdd] = useState(true)

  const handleCheckedChange = (id) => {
    if (checked[id]) {
      setChecked({ ...checked, [id]: false })
    }
    else {
      setChecked({ ...checked, [id]: true })
    }
  };

  useEffect(() => {
    let flag = true;
    for (const key in checked) {
      if (checked[key] === true) {
        flag = false;
        break;
      }
    }
    if (flag) setDisabledAdd(true)
    else setDisabledAdd(false)
  }, [checked]);

  const addChatUser = async () => {
    console.log(checked)
    const URL = `${process.env.REACT_APP_API_URL}/api/createroom/`
    const token = `Bearer ${localStorage.getItem('access')}`
    const data = []
    for (const key in checked) {
      if (checked[key]) data.push(key);
    }
    const response = await fetch(URL, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token,
      },
      body: JSON.stringify(data)
    });
    const result = await response.json();
    console.log(result);
  }
  return (
    <>
      <Container>
        <Box sx={{ mt: "1rem", border: "1px solid grey", display: 'flex', }}>
          <Box sx={{ width: "25%", backgroundColor: '#93bdc8', borderRight: '1px solid gray', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ backgroundColor: 'whitesmoke', display: 'flex' }}>
              <Typography sx={{ flexGrow: 2, alignSelf: 'center', paddingLeft: '1rem' }}> User Profile</Typography>
              <Box>
                <Tooltip title="Add User" arrow>
                  <IconButton onClick={handleOpen} aria-label="add">
                    <PersonAddIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Create Group" arrow>
                  <IconButton onClick={handleOpen} aria-label="add">
                    <GroupAddIcon />
                  </IconButton>
                </Tooltip>

              </Box>
            </Box>
            <Box sx={{ flexGrow: 2, overflowY: 'scroll', scrollbarWidth: 'none' }}>
              {
                chatUsers ? chatUsers.map((user) => {
                  return (
                    <ChatUserList user={user} selectChatUser={selectChatUser} />
                  )
                })
                  :
                  <Box>
                    Add New Member to chat
                  </Box>

              }
            </Box>
            <Box>

              <Button fullWidth startIcon={<LogoutIcon />} color='primary'  variant="contained" > Logout </Button>
            </Box>
          </Box>
          <Box sx={{ width: "75%", height: "80vh", }}>
            {
              activeChatUser ?
                <Chatpage room={activeChatUser} setUserChats={setUserChats} userChats={userChats} socket={socket} />
                :
                <Box sx={{ position: 'relative', height: 'inherit' }}>
                  <Typography variant="h5" sx={{ position: 'absolute', top: '45%', left: '30%' }}>Select User to Chat</Typography>
                </Box>
            }
          </Box>
        </Box>
      </Container>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" >
            Add member
            <Button endIcon={<CloseIcon />} sx={{ color: 'rgb(71, 61, 61)', float: 'right' }} onClick={handleClose}></Button>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {
              users.map((user) => {
                return (
                  <Box sx={{ margin: '15px', backgroundColor: 'whitesmoke', boxSizing: 'border-box' }} >
                    <Box sx={checked[user.id] ? selectUserStyle : { border: '2px solid white' }}>
                      <img src={Chat} alt='profile' style={{ borderRadius: '50%', height: '3.5rem', width: '3.5rem' }} />
                      <Box sx={{ display: 'inline-block', verticalAlign: "top" }}>
                        {user.first_name}{user.last_name} <br />
                        <small>{user.email} </small>
                      </Box>
                      <Checkbox sx={{ float: 'right' }} checked={checked[user.id]} onChange={() => handleCheckedChange(user.id)} inputProps={{ 'aria-label': 'controlled' }} />
                    </Box>
                  </Box>
                )
              })
            }
            <Button fullWidth startIcon={<AddIcon />} color='success' variant="contained" disabled={disabledAdd} onClick={addChatUser}> Add </Button>
          </Typography>
        </Box>
      </Modal>
    </>
  );
}

export default Home;
