import React, { useEffect, useState } from 'react';
import { ImFacebook2 } from 'react-icons/im';
import { AiOutlineStar } from 'react-icons/ai';
import { FaImdb } from 'react-icons/fa';
import MoviePlayer from '../components/MoviePlayer/MoviePlayer';
import { useDispatch, useSelector } from 'react-redux';
import { createRating, getMovie } from '../redux/actions/movieActions';
import CommentForm from '../components/CommentForm/CommentForm';
import Comments from '../components/Comments/Comments';
import StarRating from '../components/StarRating/StarRating';

const MovieStream = ({ match }) => {
  const dispatch = useDispatch();
  const movieId = match.params.id;

  const [showRating, setShowRating] = useState(false);

  const { loading, movie, error } = useSelector((state) => state.movieDetails);

  useEffect(() => {
    dispatch(getMovie(movieId));
  }, [dispatch, movieId]);

  const onRating = (result) => {
    dispatch(createRating(movieId, result));
  };

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : movie ? (
        <>
          <div>
            <MoviePlayer urlPath={movie.url_path} className='mb-3' />

            <div className='max-w-7xl mx-auto text-white flex flex-col sm:flex-row py-5 px-3'>
              <div className='sm:w-3/4 sm:mr-5'>
                <div>
                  <h1 className='text-3xl mb-2'>{movie.title}</h1>

                  {showRating ? (
                    <StarRating onRating={onRating} />
                  ) : (
                    <button
                      className='h-full inline-block flex items-center cursor-pointer bg-gray-700 px-3 py-2 rounded-md text-sm mb-2'
                      onClick={() => setShowRating(true)}
                    >
                      <AiOutlineStar /> Rate
                    </button>
                  )}

                  <div className='text-white flex items-center mb-4'>
                    <FaImdb className='text-yellow-300 text-3xl mr-2' />
                    <p className='text-xl'>
                      {movie.average_rating.toFixed(1)}{' '}
                      <span className='text-sm text-gray-600'>
                        ({movie.rating_count})
                      </span>
                    </p>
                  </div>

                  <p className='text-justify mb-5'>{movie.overview}</p>
                  <div className='flex justify-end'>
                    <button className='share__button rounded flex items-center px-3 py-1 text-white mb-5'>
                      <ImFacebook2 className='mr-2 text-xl' />
                      <span>Share</span>
                    </button>
                  </div>
                </div>

                <Comments comments={movie.comments} />
                <CommentForm movieId={movieId} />
              </div>

              <div className='w-full sm:w-1/4 text-right'>
                <button className='red-btn'>Go Back</button>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default MovieStream;
