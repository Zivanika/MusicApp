import React from 'react'
import './widgetEntry.css'
function widgetEntry({title,subtitle,image}) {
  return (
    <div className='entry-body flex'>
    <img src={image} alt={title} className='entry-image'/>
    <div className="entry-right-body flex">
        <p className='entry-title'>{title}</p>
        <p className='entry-subtitle'>{subtitle}</p>
    </div>
    </div>
  )
}

export default widgetEntry
