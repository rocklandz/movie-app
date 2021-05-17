import React, { useState } from 'react';
import CommentItem from './CommentItem';

const Comments = ({ comments = [] }) => {
  const [hideCmt, setHideCmt] = useState(true);

  return (
    <>
      <div className='antialiased max-w-screen-sm mb-5'>
        <h3 className='mb-4 text-lg font-semibold'>Comments</h3>

        {comments.length > 3 && hideCmt ? (
          <>
            {[...comments.slice(0, 3)].map((comment) => (
              <CommentItem key={comment.id} comment={comment} />
            ))}
            <p className='cursor-pointer' onClick={() => setHideCmt(false)}>
              Show all comment ({comments.length})
            </p>
          </>
        ) : (
          comments.map((comment) => (
            <CommentItem key={comment.id} comment={comment} />
          ))
        )}
      </div>
    </>
  );
};

export default Comments;
