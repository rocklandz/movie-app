import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createComment } from '../../redux/actions/movieActions';

const CommentForm = ({ movieId }) => {
  const dispatch = useDispatch();
  const { avatar } = useSelector((state) => state.userLogin.userInfo);

  const [comment, setComment] = useState('');
  console.log(avatar);
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createComment(movieId, comment));
    setComment('');
  };

  return (
    <div className='antialiased max-w-screen-sm mb-5'>
      <div className='space-y-4'>
        <div className='flex'>
          <div className='flex-shrink-0 mr-3'>
            <img
              className='mt-2 rounded-full w-8 h-8 sm:w-10 sm:h-10'
              src={avatar}
              alt=''
            />
          </div>
          <div className='flex-1 py-2 leading-relaxed'>
            <form onSubmit={handleSubmit} className='flex flex-col items-end'>
              <textarea
                onChange={(e) => setComment(e.target.value)}
                value={comment}
                placeholder='Type Your Comment'
                required
                className='rounded text-gray-700 py-2 px-3 focus:outline-none h-15 text-sm w-full leading-normal resize-none mb-2'
              />
              <button
                className='bg-gray-700 block px-3 py-2 rounded-md text-sm'
                type='submit'
              >
                Comment
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentForm;
