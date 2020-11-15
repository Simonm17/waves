import React from 'react';

const Song = ({currentSong, songInfo}) => {

    const imgAnim = {
        transform: `rotate(${songInfo.animationPercentage * 10}deg)`
    }

    return (
        <div className="song-container">
            <img style={imgAnim} src={currentSong.cover} alt={currentSong.name}/>
            <h2>{currentSong.name}</h2>
            <h3>{currentSong.artist}</h3>
        </div>
    )
}

export default Song;