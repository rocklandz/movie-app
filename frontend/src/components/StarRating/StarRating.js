import React, { useState } from 'react';
import { AiFillStar } from 'react-icons/ai';

const StarRating = ({ onRating }) => {
  const [rating, setRating] = useState(null);
  const [hoverRating, setHoverRating] = useState(null);
  const [comment, setComment] = useState('okay');

  const handleRating = (value) => {
    setRating(value);
    onRating(value);
  };

  return (
    <>
      <div className='flex flex-wrap mb-2'>
        <div className='flex mr-2'>
          {[...Array(10)].map((star, index) => {
            const ratingValue = index + 1;

            return (
              <label className='cursor-pointer'>
                <input
                  onClick={() => handleRating(ratingValue)}
                  className='hidden'
                  type='radio'
                  name='rating'
                  value={ratingValue}
                />
                <AiFillStar
                  className='transition duration-500 ease-in-out'
                  color={
                    ratingValue <= (hoverRating || rating)
                      ? '#ffc107'
                      : '#e4e5e9'
                  }
                  size={25}
                  onMouseEnter={() => {
                    setHoverRating(ratingValue);
                  }}
                  onMouseLeave={() => {
                    setHoverRating(null);
                  }}
                />
              </label>
            );
          })}
        </div>
        <div>{comment}</div>
      </div>
    </>
  );
};

export default StarRating;
