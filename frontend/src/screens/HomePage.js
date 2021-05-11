import Banner from '../components/Banner/Banner.js';
import MovieGrid from '../components/MovieGrid/MovieGrid.js';
import { useDispatch, useSelector } from 'react-redux';
import { getMovies, getTopRated } from '../redux/actions/movieActions.js';
import { useEffect } from 'react';

const HomePage = () => {
  const dispatch = useDispatch();
  const { movies, loading, error } = useSelector((state) => state.movieList);
  const { movies: topMovies } = useSelector((state) => state.movieTopRated);

  useEffect(() => {
    dispatch(getMovies());
    dispatch(getTopRated());
  }, [dispatch]);

  return (
    <>
      <Banner movies={topMovies} />
      <MovieGrid movies={movies} loading={loading} error={error} />
    </>
  );
};

export default HomePage;
