import React from 'react'
import './songcard.css'
import AlbumImage from './albumImage'
import AlbumInfo from './albumInfo'
function Index({album,setButtonClicked}) {
  // console.log("SongCArd",album);
  return (
    <div className='songCard-body flex'>
      <AlbumImage url={album?.images[0]?.url}/>
      <AlbumInfo album={album} setButtonClicked={setButtonClicked}/>
    </div>
  )
}

export default Index
