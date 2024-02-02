import React, { useEffect, useState } from "react";
import "./player.css";
import { useLocation } from "react-router-dom";
import apiClient from "../../spotify";
import SongCard from "../../components/songCard";
import Queue from "../../components/queue";
import AudioPlayer from "../../components/audioPlayer/index";
import Widgets from "../../components/widgets";
import axios from "axios";
import CancelIcon from '@mui/icons-material/Cancel';
// import lyricsFinder from 'lyrics-finder';

const baseURL = "http://localhost:3001"

function Players({lyrics,setLyrics}) {
  const location = useLocation();
  const [buttonClicked, setButtonClicked] = useState(false);
  // console.log(location)
  const [tracks, setTracks] = useState([]);
  const [previewURL, setPreviewURL] = useState("");
  const [currentTrack, setCurrentTrack] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  // here with the help of useEffect we are acquiring the tracks in a particular playlist

  useEffect(() => {
    if (location.state?.type == "playlist") {
      apiClient
        .get("playlists/" + location.state?.id + "/tracks")
        .then((res) => {
          setTracks(res?.data?.items);
          // console.log("Response",res.data.items[currentIndex]?.track);
          // setPreviewURL(res?.data?.items[0]?.track?.preview_url)
          setCurrentTrack(res?.data?.items[0]?.track);
        });
    } else if (location.state?.type == "track") {
      apiClient.get("tracks/" + location.state?.id).then((res) => {
        setPreviewURL(res.data.preview_url);
        setCurrentTrack(res.data);
      });
    }

  }, [location.state]);

  useEffect(() => {
    setCurrentTrack(tracks[currentIndex]?.track);
  }, [currentIndex, tracks]);

  useEffect(() => {
    const fetchLyrics = async () => {
      try {
        const track = currentTrack.name;
        const {data} = await axios.post(`${baseURL}/api/lyrics`,{track})
        // console.log(typeof(data))
        setLyrics(data);
      } catch (error) {
        console.error('Error fetching lyrics:', error);
      }
    };
    

    // Call the fetchLyrics function when the component mounts
      fetchLyrics();
  }, [currentTrack,setCurrentTrack])

  useEffect(() => {
   console.log(lyrics)
   
  }, [lyrics])

  const handleClose = ()=>{
    setButtonClicked(!buttonClicked);
  }
  
  

  return (
    <>
    <div className="screen-container flex" style={{display: !buttonClicked ? 'flex' : 'none'}}>
      <div className="left-player-body ">
        <AudioPlayer
          currentTrack={currentTrack}
          total={tracks}
          isPlaying={true}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          previewURL={previewURL}
          buttonClicked={buttonClicked}
        />
        <Widgets artistID={currentTrack?.album} />
      </div>
      <div className="right-player-body">
        <SongCard album={currentTrack?.album} setButtonClicked={setButtonClicked}/>
        <Queue
          tracks={tracks ? tracks : ""}
          setCurrentIndex={setCurrentIndex}
        />
    </div>
      </div>
    <div className="container" style={{display: buttonClicked ? 'flex' : 'none'}}>
      <div className="lyricsBox">
        {lyrics ? <div><p>{lyrics}</p><p style={{fontSize:"15px"}}>Lyrics provided by genius-lyrics</p></div> : "You have to guess the lyrics for this one, sorry!"}
      </div>
      <div style={{cursor:"pointer",alignSelf:"start",transform:"translate(150px,40px)",color:"rgb(27, 27, 27)"}} onClick={handleClose}><CancelIcon fontSize="large"/></div>
      
    </div>
    </>
  );
}

export default Players;
