import React, { useEffect } from 'react';
import { ImFacebook2 } from 'react-icons/im';
import MoviePlayer from '../components/MoviePlayer/MoviePlayer';
import { useDispatch, useSelector } from 'react-redux';
import { getMovie } from '../redux/actions/movieActions';
import CommentForm from '../components/CommentForm/CommentForm';
import Comments from '../components/Comments/Comments';

const MovieStream = ({ match }) => {
  const dispatch = useDispatch();
  const movieId = match.params.id;

  const { loading, movie, error } = useSelector((state) => state.movieDetails);

  useEffect(() => {
    dispatch(getMovie(movieId));
  }, [dispatch, movieId]);

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
                  <h1 className='text-3xl mb-3'>{movie.title}</h1>
                  <button className='share__button rounded flex items-center px-3 py-1 text-white mb-5'>
                    <ImFacebook2 className='mr-2 text-xl' />
                    <span>Share</span>
                  </button>
                  <p className='text-justify mb-5'>{movie.overview}</p>
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
