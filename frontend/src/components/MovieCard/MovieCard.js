import React from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

const MovieCard = ({ movie }) => {
  const { _id, title, poster_md, adult, release_date } = movie;
  return (
    <div className='movie__container w-full'>
      <Link to={`/preview/${_id}`}>
        <div className='mb-3'>
          <img className='w-full' src={poster_md} alt='' />
        </div>
      </Link>
      <div className='movie__info'>
        <h3 className='movie__title text-white font-bold'>{title}</h3>
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
