import React from 'react'
import  ReactDOM  from 'react-router-dom'
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom'
import favourites from '../favourites'
import feed from '../feed'
import trending from '../trending'
import player from '../player'
import library from '../library'
import Sidebar from '../../components/sidebar' 
import './home.css'
function index() {
  return (

      <Router>
        <div className="main-body">
          <Sidebar/>
        <Routes>
            <Route path="/" element={<library/>}></Route>
            <Route path="/trending" element={<trending/>}></Route>
            <Route path="/feed" element={<feed/>}></Route>
            <Route path="/favourites" element={<favourites/>}></Route>
            <Route path="/player" element={<player/>}></Route>
        </Routes>
        </div>
      </Router>
    
  )
}

export default index
