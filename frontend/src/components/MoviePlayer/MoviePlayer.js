import React from 'react';
import ReactPlayer from 'react-player';
import './MoviePlayer.css';

const MoviePlayer = ({ urlPath }) => {
  return (
    <div className='player-wrapper-wide'>
      <ReactPlayer
        controls
        // playing
        className='react-player'
        url={urlPath}
        width='100%'
        height='100%'
      />
    </div>
  );
};

export default MoviePlayer;
