import React from "react";
import APIKit from '../../spotify'

export default function trending(){
  APIKit.get('me/top/tracks').then(function(response){
    console.log(response?.data)
  })
  return(
    <div className="screen-container"></div>
  )
}