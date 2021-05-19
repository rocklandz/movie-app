import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LoadingPage from '../components/LoadingPage/LoadingPage';
import MovieGrid from '../components/MovieGrid/MovieGrid';
import Pagination from '../components/Pagination/Pagination';
import { getMoviesByName } from '../redux/actions/movieActions';
import { BiSearch } from 'react-icons/bi';
import { getGenres } from '../redux/actions/genreActions';

const Search = () => {
  const dispatch = useDispatch();
  const { movies, page, pages, loading, error } = useSelector(
    (state) => state.movieNameSearch
  );
  const { genres } = useSelector((state) => state.genreList);

  const [term, setTerm] = useState('');
  const [genre, setGenre] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (term) {
      dispatch(getMoviesByName(term, genre));
    }
  };

  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getMoviesByName(term, genre));
  }, [dispatch, genre]);

  return (
    <div className='max-w-7xl mx-auto mt-32'>
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

      {loading ? (
        <LoadingPage />
      ) : movies ? (
        <>
          <MovieGrid movies={movies} loading={loading} error={error} />

          <Pagination page={page} pages={pages} term={term} genre={genre} />
        </>
      ) : null}
    </div>
  );
};

export default Search;
