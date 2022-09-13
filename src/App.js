import React,{useState} from 'react'
import Login from "./Pages/Login";
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import Signup from "./Pages/Signup";
import Home from "./Pages/Home";
import Navbar from "./Components/Navbar";
import Alert from './Components/Alert'
import Profile from './Pages/Profile';
import AddQuestion from './Pages/AddQuestion';
import { useEffect } from 'react';

function App() {

  const [userData, setUserData] = useState(JSON.parse(localStorage.getItem("userData")));
  const [customAlert, setCustomAlert] = useState(null);
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth")??false);

  useEffect(()=>{
    // function checkUserData(event) {
    //   if(event.key==='userData'){
    //     const user = JSON.parse(localStorage.getItem("userData"));
    //     if(user){
    //       setUserData(user);
    //       console.log("YO")
    //     }
    //   }
    //   console.log("YasdO")
    // }
    // console.log("YO12")
    // window.addEventListener('storage', checkUserData)
    // return () => {
    //   window.removeEventListener('storage', checkUserData)
    // }

    const user = JSON.parse(localStorage.getItem("userData"));
    if(user){
      setUserData(user);
      // console.log("inside")
    }
  }, [])
  

  // console.log(userData);

  const setAlert=(message, type)=>{
    let alertObject = {
      message: message,
      type: type
    }
    setCustomAlert(alertObject);

    setTimeout(() => {
      setCustomAlert(null)
    }, 1500);
  }

  return (
    <>
      <Router>

        <Navbar isAuth={isAuth} setIsAuth={setIsAuth}/>
        <Alert customAlert={customAlert}/>

        <Routes>
            <Route path="/" element={<Home isAuth={isAuth}/>}></Route>
            <Route path="/me" element={<Profile isAuth={isAuth} setAlert={setAlert} setUserData={setUserData} userData={(userData)}/>}></Route>
            <Route path="/login" element={<Login isAuth={isAuth} setIsAuth={setIsAuth} setAlert={setAlert} setUserData={setUserData}/>}></Route>
            <Route path="/signup" element={<Signup isAuth={isAuth} setIsAuth={setIsAuth} setAlert={setAlert} setUserData={setUserData}/>}></Route>
            <Route path="/addQuestion" element={<AddQuestion isAuth={isAuth}/>}></Route>
        </Routes>

      </Router>
    </>
  );
}

export default App;
