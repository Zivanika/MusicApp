import React from 'react'
import './style.css'
import {IconContext} from 'react-icons'
import {AiFillPlayCircle} from 'react-icons/ai'
import { useNavigate } from 'react-router-dom';
function TrackSearchResult({track}) {
  // console.log(track)
    const navigate=useNavigate();
    const playTrack = (id) => {
      const match = id.match(/spotify:track:(.+)/);
      const trackId = match ? match[1] : id;
      // console.log(trackId);
      navigate("/player", { state: { id: trackId, type:"track" }  });
    };
    
  return (
    <div className=' m-2 align-items-center resultctn' style={{marginRight:"25px",marginTop:"10px"}} onClick={()=>playTrack(track.uri)}>
      <img src={track.albumUrl} className="searchimg" style={{marginRight:"10px"}}/>
      <div className="details">
      <div className="ml-3" style={{fontWeight:"bolder",color:"#c4d0e3"}}>{track.title}</div>
      <div className="text-muted" style={{fontWeight:400,color:"#c4d0e37c",fontSize:"12px"}}>{track.artist}</div>
      <div className="resultctn-fade">
            <IconContext.Provider value={{size:"50px",color:"#E99D72"}}>
              <AiFillPlayCircle/>
            </IconContext.Provider>
          </div>
          </div>
      </div>
   
  )
}

export default TrackSearchResult