import React, { useEffect, useState } from 'react';
import './widgets.css';
import apiClient from '../../spotify';
import WidgetCard from './widgetCard';

function Widgets({ artistID }) {
  const [similar, setSimilar] = useState([]);
  const [featured, setFeatured] = useState([]);
  const [newRelease, setNewRelease] = useState([]);
  const id = artistID?.artists[0]?.id;

  useEffect(() => {
    try {
      apiClient.get(`/artists/${id}/related-artists`)
      .then((res) => {
        const a = res.data?.artists.slice(0, 2);
        setSimilar(a);
      })
      .catch((error) => {
        console.error('Error making API request:', error);
      });

      apiClient.get(`/browse/featured-playlists`).then((res) => {
        const a = res.data?.playlists.items.slice(0, 2);
        setFeatured(a);
      });

      apiClient.get(`/browse/new-releases`).then((res) => {
        const a = res.data?.albums.items.slice(0, 2);
        setNewRelease(a);
      });
    } catch (error) {
      console.error('Error in useEffect:', error);
    }
  }, [id]);

  return (
    <div className='widgets-body flex'>
      <WidgetCard title='Similar artists' similar={similar} />
      <WidgetCard title='Made For You' featured={featured} />
      <WidgetCard title='New Releases' newRelease={newRelease} />
    </div>
  );
}

export default Widgets;
