import React from 'react';
import { Link } from 'react-router-dom';
import './Banner.css';

const SliderItem = ({ movie }) => {
  const { backdrop, title, _id } = movie;

  return (
    <div className='slider__item'>
      <div
        style={{ backgroundImage: `url(${backdrop})` }}
        className='slider__backdrop h-50vh md:h-75vh'
      />
      <div className='slider__info text-left absolute z-10 bottom-3 left-5 sm:bottom-24 sm:left-1/4 sm:right-1/4'>
        <h1 className='text-white uppercase sm:text-xl text-base text-red-600 font-bold'>
          On cinema
        </h1>
        <h1 className='text-white uppercase sm:text-4xl md:text-7xl text-2xl mb-3 tracking-wide'>
          {title}
        </h1>
        <Link to={`/preview/${_id}`}>
          <button className='text-white uppercase bg-red-600 hover:bg-red-500 text-white py-2 px-3 sm:py-3 sm:px-6 font-thin rounded'>
            Watch now
          </button>
        </Link>
      </div>
    </div>
  );
};

export default SliderItem;
