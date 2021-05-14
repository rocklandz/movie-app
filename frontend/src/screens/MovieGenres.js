import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import GenreDropdown from '../components/GenreDropdown/GenreDropdown';
import ErrorPage from '../components/ErrorPage/ErrorPage';
import LoadingPage from '../components/LoadingPage/LoadingPage';
import MovieGrid from '../components/MovieGrid/MovieGrid';
import { getMoviesByGenre } from '../redux/actions/movieActions';
import { genres } from '../utils/genreConstants.js';
import { Link } from 'react-router-dom';

const MovieGenres = ({ match, history }) => {
  const movieGenre = match.params.genre;
  const dispatch = useDispatch();
  const { movies, loading, error } = useSelector((state) => state.movieList);
  const [genre, setGenre] = useState(movieGenre);

  useEffect(() => {
    dispatch(getMoviesByGenre(movieGenre));
  }, [dispatch, movieGenre]);

  const handleChange = (e) => {
    const newGenre = e.target.value;
    setGenre(newGenre);
    history.push(`/genres/${newGenre}`);
  };

  return (
    <>
      <div className='grid grid-cols-6 gap-6 text-white text-3xl max-w-7xl mx-auto mt-16 mb-10 px-5'>
        <p className='col-span-6 sm:col-span-4 text-3xl font-bold'>
          Filtered by genre: {movieGenre}{' '}
          {genre && !loading ? `(${movies.length})` : null}
        </p>
        <div className='col-span-6 sm:col-span-2'>
          <select
            onChange={handleChange}
            value={genre}
            className='text-gray-900 mt-1 block w-full px-2 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm'
          >
            <GenreDropdown />
          </select>
        </div>
      </div>

      {!genre && (
        <div className='max-w-4xl px-5 mx-auto text-white flex justify-center items-center mb-3 flex-wrap'>
          {genres.map((genre) => (
            <Link to={`/genres/${genre}`} key={genre} className='genre-btn'>
              {genre}
            </Link>
          ))}
        </div>
      )}

      {loading ? (
        <LoadingPage />
      ) : error ? (
        <ErrorPage error={error} />
      ) : (
        <MovieGrid movies={movies} />
      )}
    </>
  );
};

export default MovieGenres;
