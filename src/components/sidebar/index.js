import React from 'react'
import "./sidebar.css";
import './Sidebarbutton.css';
import Sidebarbutton from "./Sidebarbutton.js";
function Sidebar() {
  return (
    <div className='sidebar-container'>
      <img src="https://img.freepik.com/free-photo/creative-abstract-illustration-with-double-bass-generative-ai_169016-30116.jpg?w=996&t=st=1704042403~exp=1704043003~hmac=9fb90db348d0a59d2a9927be55b8c2c343b76f494964509a9b91d020856b6840" className='profile-img' alt="profile"/>
    <div>
    <Sidebarbutton/>
    <Sidebarbutton/>
    <Sidebarbutton/>
    <Sidebarbutton/>
    <Sidebarbutton/>
    </div>
    <Sidebarbutton/>
    </div> 
    
  )
}

export default Sidebar
