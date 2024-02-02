import React from 'react'
import './albumInfo.css'
import { Link } from 'react-router-dom';
function albumInfo({album, setButtonClicked}) {
    const artists=[];
    album?.artists?.forEach((element)=>{
        artists.push(element.name)
    })
  return (
    <div className='albumInfo-card'>
    <div className='albumName-container'>
        <div className="marquee">
      <p>{album?.name + ' -' + artists.join(', ')}</p>
      </div>
    </div>
    <div className="album-info">
        <p>{`${album?.name} is an ${album?.album_type} by ${artists.join(', ')} with ${album?.total_tracks} track(s)`}</p>
    </div>
        <button className='btn' onClick={()=>{setButtonClicked(true)}}>Lyrics</button>
    </div>
  )
}

export default albumInfo
