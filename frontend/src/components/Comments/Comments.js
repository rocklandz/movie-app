import React from 'react';
import CommentItem from './CommentItem';

const Comments = ({ comments = [] }) => {
  return (
    <>
      <div className='antialiased max-w-screen-sm mb-5'>
        <h3 className='mb-4 text-lg font-semibold'>Comments</h3>

        {comments.map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
      </div>
    </>
  );
};

export default Comments;
