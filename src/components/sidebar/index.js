import React, { useEffect, useState } from 'react'
import "./sidebar.css";
import './Sidebarbutton.css';
import Sidebarbutton from "./Sidebarbutton.js";
import {MdFavorite} from 'react-icons/md'
// import { IoIosTrendingUp } from "react-icons/io";
import {FaGripfire,FaPlay} from 'react-icons/fa';
import {FaSignOutAlt} from "react-icons/fa";
import { AiOutlineSearch } from "react-icons/ai";
import {IoLibrary} from 'react-icons/io5';
import {MdSpaceDashboard} from "react-icons/md"
import apiClient from '../../spotify.js';
function Sidebar() {
  const[image,setImage]=useState("https://img.freepik.com/free-photo/creative-abstract-illustration-with-double-bass-generative-ai_169016-30116.jpg?w=996&t=st=1704042403~exp=1704043003~hmac=9fb90db348d0a59d2a9927be55b8c2c343b76f494964509a9b91d020856b6840")
  useEffect(()=>{
    apiClient.get("me").then(response=>{
      setImage(response.data.images[0].url);});
  },[])
  const handleLogout = () => {
    localStorage.removeItem('token');
    console.log("Logged Out");
    window.location.reload();
}
  return (
    <div className='sidebar-container'>
      <img src={image} className='profile-img' alt="profile"/>
    <div>
    {/* <Sidebarbutton title="Feed" to="/feed" icon={<MdSpaceDashboard/>}/>
    <Sidebarbutton title="Trending" to="/trending" icon={<FaGripfire/>}/> */}
    {/* <Sidebarbutton title="Player" to="/player" icon={<FaPlay/>} /> */}
    <Sidebarbutton title="Library" to="/" icon={<IoLibrary/>}/>
    {/* <Sidebarbutton title="Favorites" to="/favourites" icon={<MdFavorite/>}/> */}
    <Sidebarbutton title="Search" to="/search" icon={<AiOutlineSearch />}/>
    {/* <Sidebarbutton title="Search" to="/search" icon={<AiOutlineSearch />}/> */}
    </div>
   
    {/* <div><Sidebarbutton title="Sign Out" to="" icon={<AiOutlineSearch />}/></div> */}
    <div onClick={handleLogout}><Sidebarbutton title="Sign Out" icon={<FaSignOutAlt />}/></div>
    </div> 
    
  )
}

export default Sidebar
