import React, { useEffect, useRef, useState } from 'react';
import './audioPlayer.css';
import ProgressCircle from './progressCircle';
import WaveAnimation from './waveAnimation';
import Controls from './controls';

function Index({ currentTrack, currentIndex, setCurrentIndex, total, previewURL,buttonClicked }) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [trackProgress, setTrackProgress] = useState(0);
  var audioSrc = previewURL ? previewURL : total[currentIndex]?.track?.preview_url;
  const audioRef = useRef(new Audio(previewURL ? previewURL : total[0]?.track?.preview_url));
  const intervalRef = useRef();
  const isReady = useRef(false);
  const { duration } = audioRef.current;
  const currentPercentage = duration ? (trackProgress / duration) * 100 : 0;
  const startTimer = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      if (audioRef.current.ended) {
        handleNext();
      } else {
        setTrackProgress(audioRef.current.currentTime);
      }
    }, 1000);
  };

  useEffect(() => {
    try {
      if (audioSrc) {
      if (isPlaying && audioRef.current.src) {
        const playPromise = audioRef.current.play();
        
        if (isPlaying && playPromise !== undefined) {
        playPromise
          .then(() => {
            // Playback started successfully
            setIsPlaying(true);
            startTimer();
          })
          .catch((error) => {
            // Play was interrupted or couldn't start
            console.error('Error starting playback:', error);
          });
      }
      } else {
        if (isPlaying) {
          audioRef.current = new Audio(audioSrc);
          const playPromise = audioRef.current.play();
          if (playPromise !== undefined) {
            playPromise
              .then(() => {
                // Playback started successfully
                setIsPlaying(true);
                startTimer();
              })
              .catch((error) => {
                // Play was interrupted or couldn't start
                console.error('Error starting playback:', error);
              });
          }
        } else {
          audioRef.current.pause();
          clearInterval(intervalRef.current);
        }
      }
    }
    else {
      // Handle the case when audioSrc is null or undefined
      console.error('audioSrc is null or undefined. Handle this case appropriately.');
      if (currentIndex < total.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        setCurrentIndex(0);
      }
    }
    } catch (error) {
      console.error('Error in useEffect (play/pause):', error);
    }
  }, [isPlaying, audioSrc]);

  useEffect(() => {
    try {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = new Audio(audioSrc);
  
        // Listen for the 'loadedmetadata' event to ensure the audio is fully loaded
        audioRef.current.addEventListener('loadedmetadata', () => {
          setTrackProgress(audioRef.current.currentTime);
          if (isReady.current) {
            // Check if the audio is paused before playing
            if (audioRef.current.paused) {
              audioRef.current.play().then(() => {
                setIsPlaying(true);
                startTimer();
              });
            }
          } else {
            isReady.current = true;
          }
        });
      }
    } catch (error) {
      console.error('Error in useEffect (audio change):', error);
    }
  
    // Cleanup event listener when component unmounts
    
    return () => {
        if (!buttonClicked) {
        if (audioRef.current) {
          audioRef.current.removeEventListener('loadedmetadata', () => {});
          audioRef.current.pause();
        }
      };
    }
  }, [currentIndex]);
  
  

  useEffect(() => {
    const cleanup = () => {
      try {
        audioRef.current.pause();
        clearInterval(intervalRef.current);
      } catch (error) {
        console.error('Error in useEffect (cleanup):', error);
      }
    };
    
    cleanup();
    
  }, []); 


  const handleNext = () => {
    if (currentIndex < total.length - 1) {
      setCurrentIndex(currentIndex + 1);
      isReady.current = true;
    } else {
      setCurrentIndex(0);
    }
  };

  const handlePrev = () => {
    if (currentIndex - 1 < 0) {
      setCurrentIndex(total.length - 1);
    } else {
      setCurrentIndex(currentIndex - 1);
    }
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === ' ' || event.key === 'Spacebar') {
        // Prevent the default behavior (e.g., scrolling) when the space key is pressed
        event.preventDefault();
        
        // Toggle the isPlaying state
        setIsPlaying(!isPlaying);
      }
    };

    // Add the event listener when the component mounts
    document.addEventListener('keydown', handleKeyDown);

    // Remove the event listener when the component unmounts
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isPlaying, setIsPlaying]);

  const addZero = (n) => {
    if (n <= 9) {
      return '0' + n;
    } else {
      return '' + n;
    }
  };

  const artists = [];
  currentTrack?.album?.artists?.forEach((artist) => {
    artists.push(artist?.name);
  });

  return (
    <div className='player-body flex'>
      <div className='player-left-body'>
        <ProgressCircle
          percentage={currentPercentage}
          isPlaying={true}
          image={currentTrack?.album?.images[0]?.url}
          size={280}
          color='#C96850'
        />
      </div>
      <div className='player-right-body flex'>
        <p className='song-title'>{currentTrack?.name}</p>
        <p className='song-artist'>{artists.join(' | ')}</p>
        <div className='player-right-bottom flex'>
          <div className='song-duration flex'>
            <p className='duration'>0:{addZero(Math.round(trackProgress))}</p>
            <WaveAnimation isPlaying={isPlaying} />
            <p className='duration'>0:30</p>
          </div>
          <Controls
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            handleNext={handleNext}
            handlePrev={handlePrev}
            total={total}
          />
        </div>
      </div>
    </div>
  );
}

export default Index;
