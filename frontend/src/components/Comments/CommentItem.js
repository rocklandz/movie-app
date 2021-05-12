import React from 'react';
import Moment from 'react-moment';

const CommentItem = ({ comment }) => {
  return (
    <div className='space-y-4 mb-2'>
      <div className='flex'>
        <div className='flex-shrink-0 mr-3'>
          <img
            className='mt-2 rounded-full w-8 h-8 sm:w-10 sm:h-10'
            src='https://images.unsplash.com/photo-1604426633861-11b2faead63c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80'
            alt=''
          />
        </div>
        <div className='flex-1 px-3 pb-3 leading-relaxed'>
          <strong className='mr-2'>{comment.user.name}</strong>
          <span className='text-xs text-gray-400'>
            <Moment fromNow>{comment.createdAt}</Moment>
          </span>
          <p className='text-sm'>{comment.comment}</p>
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
