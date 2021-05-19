import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getMoviesByName } from '../redux/actions/movieActions';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { BiSearch } from 'react-icons/bi';
import MovieListItem from '../components/MovieListItem/MovieListItem';
import Loader from '../components/Loader/Loader';
import Pagination from '../components/Pagination/Pagination';
import { getGenres } from '../redux/actions/genreActions';

const MovieList = ({ history }) => {
  const dispatch = useDispatch();

  const [term, setTerm] = useState('');
  const [genre, setGenre] = useState('');

  const { genres } = useSelector((state) => state.genreList);
  const { userInfo } = useSelector((state) => state.userLogin);
  const { movies, page, pages, loading, error } = useSelector(
    (state) => state.movieNameSearch
  );
  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
  } = useSelector((state) => state.movieDelete);

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(getGenres());
      dispatch(getMoviesByName(term, genre));
    } else {
      history.push('/login');
    }
  }, [dispatch, history, userInfo, successDelete, genre]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (term) {
      dispatch(getMoviesByName(term, genre));
    }
  };

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

        <div className='p-4 grid grid-cols-6 gap-3'>
          <form
            onSubmit={handleSubmit}
            className='bg-white flex items-center rounded-lg shadow-xl col-span-6 sm:col-span-4'
          >
            <input
              className='rounded-l-full w-full py-4 px-6 text-gray-700 leading-tight focus:outline-none'
              id='search'
              type='text'
              placeholder='Search'
              value={term}
              onChange={(e) => setTerm(e.target.value)}
            />

            <div className='p-1'>
              <button
                type='submit'
                className='text-white rounded-full p-2 focus:outline-none w-12 h-12 flex items-center justify-center'
              >
                <BiSearch className='text-gray-400 text-2xl' />
              </button>
            </div>
          </form>

          <div className='col-span-6 sm:col-span-2'>
            <select
              onChange={(e) => setGenre(e.target.value)}
              value={genre}
              className='text-gray-900 w-full h-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
            >
              <option value=''>No genre filter</option>
              {genres.map((genre) => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className='px-3 py-4 flex justify-center'>
          {loading ? (
            <Loader />
          ) : (
            <div className='flex flex-col w-full'>
              <table className='w-full text-md bg-gray-900 shadow-md rounded mb-16'>
                <tbody>
                  <tr className='border-gray-300'>
                    <th className='text-left p-3 px-5'>Name</th>
                    <th className='text-left p-3 px-5'>Country</th>
                    <th className='text-left p-3 px-5'>Release</th>
                    <th className='text-left p-3 px-5'>Star</th>
                    <th className='text-left p-3 px-5'></th>
                  </tr>

                  {movies &&
                    movies.map((movie) => (
                      <MovieListItem key={movie._id} movie={movie} />
                    ))}
                </tbody>
              </table>

              <Pagination page={page} pages={pages} term={term} genre={genre} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
