import React, { useEffect } from 'react';
import MovieListItem from '../components/MovieListItem/MovieListItem';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getMovies } from '../redux/actions/movieActions';

const MovieList = ({ history }) => {
  const { userInfo } = useSelector((state) => state.userLogin);

  const dispatch = useDispatch();
  const { movies, loading, error } = useSelector((state) => state.movieList);
  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
  } = useSelector((state) => state.movieDelete);

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(getMovies());
    } else {
      history.push('/login');
    }
  }, [dispatch, history, userInfo, successDelete]);

  return (
    <div className='max-w-7xl mx-auto mt-16 mb-32'>
      <div className='text-white bg-gray-800'>
        <div className='p-4 flex'>
          <h1 className='text-3xl font-bold'>Movie list</h1>
        </div>
        <div className='p-4'>
          <Link
            to={'/admin/new-movie'}
            className='py-2 px-3 bg-green-500 rounded inline-flex justify-center items-center'
          >
            <AiOutlinePlusCircle className='mr-2' /> New movie
          </Link>
        </div>
        <div className='px-3 py-4 flex justify-center'>
          <table className='w-full text-md bg-gray-900 shadow-md rounded mb-4'>
            <tbody>
              <tr className='border-gray-300'>
                <th className='text-left p-3 px-5'>Name</th>
                <th className='text-left p-3 px-5'>Country</th>
                <th className='text-left p-3 px-5'>Movie Id</th>
                <th className='text-left p-3 px-5'></th>
              </tr>
              {movies &&
                movies.map((movie) => (
                  <MovieListItem key={movie._id} movie={movie} />
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MovieList;
