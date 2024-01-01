import React, { useEffect, useState } from 'react'
import  ReactDOM  from 'react-router-dom'
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom'
import Login from '../Auth/login'
import Favourites from '../Favourites'
import Feed from '../Feed'
import Trending from '../Trending'
import Player from '../Player'
import Library from '../Library'
import Sidebar from '../../components/sidebar' 
import './home.css'
import { setClientToken } from '../../spotify'
function Index() {
  const[token,setToken]=useState("");
  useEffect(()=>{
    const token=window.localStorage.getItem("token");
    const hash=window.location.hash;
    window.location.hash="";
    if(!token &&hash){
      const _token=hash.split("&")[0].split('=')[1];
    window.localStorage.setItem("token",_token);
    setToken(_token);
    setClientToken(_token);
    }
    else{
      setToken(token);
      setClientToken(token);
    }
    
  },[])
  return !token?(
    <Login/>):
      (<Router>
        <div className="main-body">
          <Sidebar/>
        <Routes>
            <Route path="/" element={<Library/>}></Route>
            <Route path="/trending" element={<Trending/>}></Route>
            <Route path="/feed" element={<Feed/>}></Route>
            <Route path="/favourites" element={<Favourites/>}></Route>
            <Route path="/player" element={<Player/>}></Route>
        </Routes>
        </div>
      </Router>
    
  )
}

export default Index
