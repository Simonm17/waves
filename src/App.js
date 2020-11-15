import React, { useState, useRef } from 'react';
// Import styles
import './styles/app.scss';
// Import Components
import Player from './components/Player';
import Song from './components/Song';
import Library from './components/Library';
import Nav from './components/Nav';
// Import data
import chillHop from './data';
import { library } from '@fortawesome/fontawesome-svg-core';

function App() {

  // Ref
  const audioRef = useRef(null);

  // State
  const [songs, setSongs] = useState(chillHop());
  const [currentSong, setCurrentSong] = useState(songs[1]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [songInfo, setSongInfo] = useState({
    currentTime: null,
    duration: null,
    animationPercentage: 0,
  });
  const [libraryStatus, setLibraryStatus] = useState(false);

  // Event Handlers
  const timeUpdateHandler = e => {
    // When calling onTimeUpdate, you have access to the event object.
    // You can pull data from e.target
    const current = e.target.currentTime;
    const duration = e.target.duration;
    // Calculate and set percentage to state
    const roundedCurrent = Math.round(current);
    const roundedDuration = Math.round(duration);
    const animation = Math.round(roundedCurrent / roundedDuration * 100);
    // update SongInfo using setSongInfo with the current time as the music is playing
    setSongInfo({...songInfo, currentTime: current, duration: duration, animationPercentage: animation})
  };

  const songEndHandler = async () => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
    if (isPlaying) audioRef.current.play();
  }

  return (
    <div className={`App ${libraryStatus ? 'library-active': ''}`}>
      <Nav
        libraryStatus={libraryStatus}
        setLibraryStatus={setLibraryStatus}
      />
      <Song currentSong={currentSong} songInfo={songInfo}/>
      <Player
        setIsPlaying={setIsPlaying} 
        isPlaying={isPlaying}
        currentSong={currentSong}
        audioRef={audioRef}
        setSongInfo={setSongInfo}
        songInfo={songInfo}
        songs={songs}
        setCurrentSong={setCurrentSong}
        setSongs={setSongs}
      />
      <Library
        songs={songs}
        setCurrentSong={setCurrentSong}
        audioRef={audioRef}
        isPlaying={isPlaying}
        setSongs={setSongs}
        libraryStatus={libraryStatus}
      />
      
      <audio
        onTimeUpdate={timeUpdateHandler} 
        ref={audioRef}
        src={currentSong.audio}
        onLoadedMetadata={timeUpdateHandler}
        onEnded={songEndHandler}
      ></audio>
    </div>
  );
}

export default App;
