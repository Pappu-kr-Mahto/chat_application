
import {
  BrowserRouter as Router, 
  Routes,
  Route
} from "react-router-dom"

import Index from "./components/user/Index"
import Register from './components/user/Register'
import Login from "./components/user/Login";
import Navbar from "./components/Navbar";
import Home from "./components/chat/Home";

function App() {
  return (
    <>
    <Router>
      <Navbar/>
      <Routes>
        <Route exact path ='/' element={<Index/>} />
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
