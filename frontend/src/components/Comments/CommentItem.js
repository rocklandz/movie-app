import Moment from 'react-moment';

const CommentItem = ({ comment }) => {
  return (
    <div className='space-y-4 mb-2'>
      <div className='flex'>
        <div className='flex-shrink-0 mr-3'>
          <img
            className='mt-2 rounded-full w-8 h-8 sm:w-10 sm:h-10'
            src={comment.user.avatar}
            alt='avatar'
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
