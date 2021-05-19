import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import noImgHolder from '../../../src/images/no-img-holder.png';

const MovieCard = ({ movie }) => {
  const { _id, title, poster_md, adult, release_date } = movie;
  const [imgError, setImgError] = useState(false);

  return (
    <div className='movie__container w-full'>
      <Link to={`/preview/${_id}`}>
        <div className='mb-3'>
          {imgError ? (
            <img className='w-full' src={noImgHolder} alt='' />
          ) : (
            <img
              onError={() => setImgError(true)}
              className='w-full'
              src={poster_md}
              alt=''
            />
          )}
        </div>
      </Link>
      <div className='movie__info'>
        <Link
          to={`/preview/${_id}`}
          className='movie__title text-white font-bold'
        >
          {title}
        </Link>
        <p className='movie__title text-gray-400 text-xs'>
          {adult ? 'R-18' : 'PG-13'}
        </p>
        <p className='movie__release text-gray-400 text-xs'>
          Released: <Moment format='YYYY/MM/DD'>{release_date}</Moment>
        </p>
      </div>
    </div>
  );
};

export default MovieCard;
