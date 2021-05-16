import { get } from 'mongoose';
import React, { useEffect, useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import LoadingPage from '../components/LoadingPage/LoadingPage';
import MovieGrid from '../components/MovieGrid/MovieGrid';
import { getMoviesByName } from '../redux/actions/movieActions';

const Search = () => {
  const dispatch = useDispatch();
  const { movies, page, pages, loading, error } = useSelector(
    (state) => state.movieNameSearch
  );
  const [term, setTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (term) {
      dispatch(getMoviesByName(term));
    }
  };

  return (
    <div className='max-w-7xl mx-auto mt-16'>
      <div className='p-4'>
        <form
          onSubmit={handleSubmit}
          className='bg-white flex items-center rounded-lg shadow-xl'
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
      </div>

      {loading ? (
        <LoadingPage />
      ) : (
        <>
          <MovieGrid movies={movies} loading={loading} error={error} />

          {[...Array(pages).keys()].map((page) => (
            <p
              className='text-white cursor-pointer'
              onClick={() => dispatch(getMoviesByName(term, page + 1))}
            >
              {page + 1}
            </p>
          ))}
        </>
      )}
    </div>
  );
};

export default Search;
