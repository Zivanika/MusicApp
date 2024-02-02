import React from "react";
import "./lyrics.css";
export default function Lyrics({ lyrics }) {
  return (
    <div className="container">
      <div className="lyricsBox">
        {lyrics ? <p>{lyrics}</p> : "You have to guess the lyrics for this one, sorry!"}
      </div>
    </div>
  );
}
