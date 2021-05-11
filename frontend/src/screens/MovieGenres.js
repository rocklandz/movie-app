import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import GenreDropdown from '../components/GenreDropdown/GenreDropdown';
import MovieGrid from '../components/MovieGrid/MovieGrid';
import { getMoviesByGenre } from '../redux/actions/movieActions';

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
    <div>
      <div className='grid grid-cols-6 gap-6 text-white text-3xl max-w-7xl mx-auto mt-16 mb-5 px-5'>
        <p className='col-span-6 sm:col-span-4 text-3xl font-bold'>
          Filtered by genre: {movieGenre}
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
      <MovieGrid movies={movies} loading={loading} error={error} />
    </div>
  );
};

export default MovieGenres;
