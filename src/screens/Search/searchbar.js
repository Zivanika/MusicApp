import react from "react";
import { useState, useEffect } from "react";
import { Container, Form } from "react-bootstrap";
import SpotifyWebApi from "spotify-web-api-node";
import { setClientToken } from "../../spotify";
import TrackSearchResult from "./TrackSearchResult";
import './style.css'
import {IconContext} from 'react-icons'
import {AiFillPlayCircle} from 'react-icons/ai'
import { useNavigate } from 'react-router-dom';
// import React from 'react'
// const spotifyApi = new SpotifyWebApi({
//   clientId: "371456a04a7e4596a295f69490be1c12",
//   clientSecret: "36fe4a649d8d477cbecc2c2865c3b47b",
//   redirectUri: "http://localhost:3000",
// });
var spotifyApi = new SpotifyWebApi();

function Searchbar() {
  const [token, setToken] = useState("");
  useEffect(() => {
    const token = window.localStorage.getItem("token");
    console.log(token);
    const hash = window.location.hash;
    console.log(hash);
    spotifyApi.setAccessToken(token);
    window.location.hash = "";
    if (!token && hash) {
      const _token = hash.split("&")[0].split("=")[1];
      window.localStorage.setItem("token", _token);
      setToken(_token);
      setClientToken(_token);
    } else {
      setToken(token);
      setClientToken(token);
    }
  }, []);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  useEffect(() => {
    if (!search) {
      setSearchResults([]);
      return;
    }

    if (!token) return;
      let cancel=false
    spotifyApi.searchTracks(search).then((res) => {
      if(cancel) return

      // const smallestImage=res.body.tracks.items.map(track=>
      //   track.album.images.reduce(
      //     (smallest,image)=>{
      //       if(image.height<smallest.height) return image
      //       return smallest
      //     },track.album.images
      //   ))
        // res.body.tracks.items.map((track) => ({
        //   console.log(smallestImage.url)
        // }))
        const results= res?.body.tracks?.items?.map((track) => ({
        artist: track.artists[0].name,
       title: track.name,
        uri: track.uri,
        albumUrl: track.album.images[0].url
        // albumUrl: smallestImage.url, // Assuming you want the first image
      }));
      
      res?.body?.tracks?.items?.map((track) => {
        console.log(track.id);
        return null; // If you are using map, it's a good practice to return a value
      });

      setSearchResults(results);
    }).catch(err=>{console.log(err)});
    return ()=>cancel=true
  }, [search, token]); // Add dependencies to the dependency array

  return (
    <Container className="py-2 conctrl" style={{ height: "100vh" ,display:"flex",justifyContent:"center",flexDirection:"column",overflow:"hidden"}}>
      <Form.Control className="formctrl"
        type="search"
        placeholder="What do you want to listen to?"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="searchctn">
      {
        searchResults.map(track=>(
          <TrackSearchResult track={track} key={track.uri}/>
        ))
      }
      </div>
      {/* <div>Bottom</div> */}
    </Container>
  );
}

export default Searchbar;