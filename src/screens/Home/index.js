import React, { useEffect, useState } from 'react'
import  ReactDOM  from 'react-router-dom'
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom'
import Login from '../Auth/login'
import Favourites from '../Favourites'
import Feed from '../Feed'
import Trending from '../Trending'
// import Players from '../Players'
// import Library from '../Library'
import Players from '../Players'
import Libraries from '../Libraries'
import Sidebar from '../../components/sidebar' 
import Search from '../Search'
import Lyrics from '../Lyrics'
import './home.css'
import { setClientToken } from '../../spotify'
function Index() {
  const[token,setToken]=useState("");
  const [lyrics, setLyrics] = useState('');

  useEffect(()=>{
    const token=window.localStorage.getItem("token");
    const hash=window.location.hash;
    console.log(hash);
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

  function removeToken() {
    localStorage.removeItem('token');
  }
  
  // Attach the function to the beforeunload event
  window.addEventListener('beforeunload', removeToken);

  return !token?(
    <Login/>):
      (<Router>
        <div className="main-body">
          <Sidebar/>
        <Routes>
            <Route path="/" element={<Libraries/>}></Route>
            {/* <Route path="/trending" element={<Trending/>}></Route>
            <Route path="/feed" element={<Feed/>}></Route>
            <Route path="/favourites" element={<Favourites/>}></Route> */}
            <Route path="/player" element={<Players lyrics={lyrics} setLyrics={setLyrics} />}></Route>
            <Route path="/search" element={<Search/>}></Route>
            <Route path="/lyrics" element={<Lyrics lyrics={lyrics}/>}></Route>
        </Routes>
        </div>
      </Router>
    
  )
}

export default Index
