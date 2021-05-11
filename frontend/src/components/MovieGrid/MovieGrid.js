import React, { useEffect } from 'react';
import MovieCard from '../MovieCard/MovieCard';
import { useDispatch, useSelector } from 'react-redux';
import { getMovies } from '../../redux/actions/movieActions';

const MovieGrid = () => {
  const dispatch = useDispatch();
  const { movies, loading, error } = useSelector((state) => state.movieList);

  useEffect(() => {
    dispatch(getMovies());
  }, [dispatch]);

  return (
    <div className='max-w-7xl mx-auto py-10 px-3 mb-16 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-x-4 md:gap-x-8 gap-y-8'>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        movies.map((movie) => <MovieCard key={movie._id} movie={movie} />)
      )}
    </div>
  );
};

export default MovieGrid;
