import React, { useState } from 'react';
import { AiFillStar } from 'react-icons/ai';

const StarRating = ({ onRating }) => {
  const [rating, setRating] = useState(null);
  const [hoverRating, setHoverRating] = useState(null);
  let curentRating = hoverRating || rating;

  const handleRating = (value) => {
    setRating(value);
    onRating(value);
  };

  return (
    <>
      <div className='flex flex-wrap mb-2'>
        <div className='flex mr-2 h-9'>
          {[...Array(10)].map((star, index) => {
            const ratingValue = index + 1;

            return (
              <label className='cursor-pointer'>
                <input
                  onClick={() => {
                    handleRating(ratingValue);
                  }}
                  className='hidden'
                  type='radio'
                  name='rating'
                  value={ratingValue}
                />
                <AiFillStar
                  className='transition duration-500 ease-in-out'
                  color={ratingValue <= curentRating ? '#ffc107' : '#e4e5e9'}
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
        {curentRating === 1 && <div>Meh, I'll pass this.</div>}
        {curentRating === 2 && <div>Meh, I'll pass this.</div>}
        {curentRating === 3 && <div>Not worth it.</div>}
        {curentRating === 4 && <div>Not worth it.</div>}
        {curentRating === 5 && <div>It is okay.</div>}
        {curentRating === 6 && <div>It is okay.</div>}
        {curentRating === 7 && <div>Great movie.</div>}
        {curentRating === 8 && <div>Great movie.</div>}
        {curentRating === 9 && <div>Awesome!</div>}
        {curentRating === 10 && <div>Awesome!</div>}
      </div>
    </>
  );
};

export default StarRating;
