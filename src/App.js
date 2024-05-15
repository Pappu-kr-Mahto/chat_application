
import {
  BrowserRouter as Router, 
  Routes,
  Route
} from "react-router-dom"

import Register from './components/user/Register'
import Login from "./components/user/Login";
import Navbar from "./components/Navbar";
import Home from "./components/chat/Home";
import Chatpage from "./components/chat/Chatpage";
function App() {
  return (
    <>
    <Router>
      <Navbar/>
      <Routes>
        <Route exact path ='/' element={<Login/>} />
        <Route exact path ='/register' element={<Register/>} />
        <Route exact path ='/login' element={<Login/>} />
      </Routes>

      <Routes>
        <Route exact path="/home" element={<Home/>}></Route>
      </Routes>
    </Router>
    </>
  );
}

export default App;
