// import React, { useEffect, useState } from 'react'
// import APIKit from '../../spotify'
// // import axios from 'axios';
// function Library() {
//   const [playlists,setPlaylists]=useState(null);
//   // useEffect(()=>{
//   //   APIKit.get("me/playlists").then(function(response){
//   //     setPlaylists(response.data.items);
//   //     console.log(response.data.items);
//   // })},[])
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await APIKit.get("me/playlists");
//         setPlaylists(response.data.items);
//         console.log(response.data.items);
//       } catch (error) {
//         if (error.response && error.response.status === 429) {
//           // Retry after a delay (e.g., 5 seconds)
//           setTimeout(() => fetchData(), 5000);
//         } else {
//           // Handle other errors
//           console.error("Error fetching playlists:", error);
//         }
//       }
//     };
  
//     // fetchData();
//   }, []);
  
//   return (

//     <div  className='screen-container'>
//       {playlists?.map((playlist)=>{
//         return (<div>{playlist.name}</div>)
//       })}
//     </div>
//   )
// }
// export default Library


import React, { useEffect, useState } from 'react';
import APIKit from '../../spotify';
import './library.css'
import {IconContext} from 'react-icons'
import {AiFillPlayCircle} from 'react-icons/ai'
import { useNavigate } from 'react-router-dom';
function Libraries() {
  const [playlists, setPlaylists] = useState(null);
  const [retryCount, setRetryCount] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await APIKit.get("me/playlists");
        setPlaylists(response.data.items);
      } catch (error) {
        if (error.response && error.response.status === 429 && retryCount < 3) {
          // Calculate exponential backoff delay
          const delay = Math.pow(2, retryCount) * 1000;
          
          // Retry after the calculated delay
          setRetryCount(retryCount + 1);
          setTimeout(() => fetchData(), delay);
        } else {
          // Handle other errors
          console.error("Error fetching playlists:", error);
        }
      }
    };
fetchData();
  }, [retryCount]); // Include retryCount as a dependency to trigger retries

  const navigate=useNavigate();
  const playPlaylist=(id)=>{
    navigate("/player",{state:{id:id,type:"playlist"}});
  }
  return (
    <div className='screen-container'>
      <div className="library-body">
      {playlists?.map((playlist) => (
        <div className='playlist-card' key={playlist.id} onClick={()=>playPlaylist(playlist.id)}>
          <img src={playlist.images[0].url} className='playlist-image' alt='Playlist-Alt'/>
          <p className='playlist-title'>{playlist.name}</p>
          <p className='playlist-subtitle'>{playlist.tracks.total} Songs</p>
          <div className="playlist-fade">
            <IconContext.Provider value={{size:"50px",color:"#E99D72"}}>
              <AiFillPlayCircle/>
            </IconContext.Provider>
          </div>
          </div>
        // let naam={playlist.name};
        // console.log({playlists.name});
      ))}
      </div>
    </div>
  );
}

export default Libraries;

// import React, { useEffect, useState } from 'react'
// import APIKit from '../../spotify'
// // import axios from 'axios';
// import './library.css'
// function Libraries() {
//   const [playlists,setPlaylists]=useState(null);
//   useEffect(()=>{
//     APIKit.get("me/playlists").then(function(response){
//       setPlaylists(response.data.items);
//       console.log(response.data.items);
//   })},[])
//   return (

//     <div  className='screen-container'>
//       {playlists?.map((playlist)=>{
//         return (<div>{playlist.name}</div>)
//       })}
//     </div>
//   )
// }
// export default Libraries