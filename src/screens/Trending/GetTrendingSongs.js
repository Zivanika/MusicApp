import React, { useState, useEffect } from 'react';

const TrendingSongs = () => {
  const [token, setToken] = useState("");
  const [trendingSongs, setTrendingSongs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedToken = window.localStorage.getItem("token");
        const hash = window.location.hash;
        console.log(hash);
        window.location.hash = "";

        if (!storedToken && hash) {
          const _token = hash.split("&")[0].split('=')[1];
          window.localStorage.setItem("token", _token);
          setToken(_token);
        } else {
          setToken(storedToken);
        }

        const response = await fetch('https://api.spotify.com/v1/me/top/tracks', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Unable to fetch trending songs');
        }

        const data = await response.json();
        setTrendingSongs(data.items);
      } catch (error) {
        console.error('Error:', error.message);
      }
    };

    fetchData();
  }, [token]);

  return (
    <div>
      <h1>Trending Songs</h1>
      <ul>
        {trendingSongs?.map((song) => (
          <li key={song.id}>{song.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default TrendingSongs;
