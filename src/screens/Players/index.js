import React, { useEffect, useState } from 'react'
import './player.css'
import { useLocation } from 'react-router-dom'
import apiClient from '../../spotify';
import SongCard from '../../components/songCard'
import Queue from '../../components/queue'
import AudioPlayer from '../../components/audioPlayer/index'
import Widgets from '../../components/widgets'
function Players() {
  const location=useLocation();
  const[tracks,setTracks]=useState([]);
  const[currentTrack,setCurrentTrack]=useState({});
  const[currentIndex,setCurrentIndex]=useState(0);
  // here with the help of useEffect we are acquiring the tracks in a particular playlist
  useEffect(()=>{
 if(location.state){
  apiClient.get("playlists/" + location.state?.id + "/tracks").then((res)=>{
    setTracks(res.data.items);
    // console.log(res.data.items);
    setCurrentTrack(res.data?.items[0]?.track);
  });
 }
  },[location.state]);

  useEffect(()=>{
setCurrentTrack(tracks[currentIndex]?.track);
  },[currentIndex,tracks])
   
  return (
    <div className='screen-container flex'>
      <div className="left-player-body ">
        <AudioPlayer currentTrack={currentTrack} total={tracks} isPlaying={true} currentIndex={currentIndex} setCurrentIndex={setCurrentIndex}/>
        <Widgets artistID={currentTrack?.album}/>
      </div>
      <div className="right-player-body">
      <SongCard album={currentTrack?.album}/>
      <Queue tracks={tracks} setCurrentIndex={setCurrentIndex}/>
      </div>
    </div>
  )
}

export default Players
