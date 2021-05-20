import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createRating, getMovie } from '../redux/actions/movieActions';
import { Link } from 'react-router-dom';
import MoviePlayer from '../components/MoviePlayer/MoviePlayer';
import CommentForm from '../components/CommentForm/CommentForm';
import Comments from '../components/Comments/Comments';
import StarRating from '../components/StarRating/StarRating';
import LoadingPage from '../components/LoadingPage/LoadingPage';
import FacebookShare from '../components/FacebookShare/FacebookShare';
import { AiOutlineStar } from 'react-icons/ai';
import { FaImdb } from 'react-icons/fa';
import Moment from 'react-moment';

const MovieStream = ({ match }) => {
  const dispatch = useDispatch();
  const movieId = match.params.id;

  const [showRating, setShowRating] = useState(false);

  const { userInfo } = useSelector((state) => state.userLogin);
  const { loading, movie, error } = useSelector((state) => state.movieDetails);

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getMovie(movieId));
  }, [dispatch, movieId]);

  const onRating = (result) => {
    dispatch(createRating(movieId, result));
  };

  return (
    <>
      {loading ? (
        <LoadingPage />
      ) : error ? (
        <div>{error}</div>
      ) : movie ? (
        <>
          <div className='mb-32'>
            <MoviePlayer urlPath={movie.url_path} className='mb-3' />

            <div className='max-w-7xl mx-auto text-white flex flex-col sm:flex-row py-5 px-3'>
              <div className='sm:w-3/4 sm:mr-5'>
                <div>
                  <h1 className='text-3xl mb-2'>
                    {movie.title} (
                    <Moment format='YYYY' date={movie.release_date} />)
                  </h1>

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
                    <FacebookShare
                      url={`http://dantri.com`}
                      quote={`Watch this awesome movie ${movie.title} at Nexflit!`}
                      hashtag={movie.title}
                    />
                  </div>
                </div>

                <Comments comments={movie.comments} />
                {userInfo ? (
                  <CommentForm movieId={movieId} />
                ) : (
                  <div className='w-full bg-gray-700 flex items-center'>
                    <Link
                      to='/login'
                      className='w-full text-center bg-gray-700 px-5 py-2'
                    >
                      Login to comment
                    </Link>
                  </div>
                )}
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
