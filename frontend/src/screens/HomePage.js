import Banner from '../components/Banner/Banner.js';
import MovieGrid from '../components/MovieGrid/MovieGrid.js';
import { useDispatch, useSelector } from 'react-redux';
import { getMovies, getTopRated } from '../redux/actions/movieActions.js';
import { useEffect } from 'react';
import LoadingPage from '../components/LoadingPage/LoadingPage.js';

const HomePage = () => {
  const dispatch = useDispatch();
  const { movies, loading, error } = useSelector((state) => state.movieList);
  const { movies: topMovies } = useSelector((state) => state.movieTopRated);

  useEffect(() => {
    window.scroll(0, 0);
    dispatch(getMovies());
    dispatch(getTopRated());
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <LoadingPage />
      ) : error ? (
        <div>{error}</div>
      ) : (
        <>
          <Banner movies={topMovies} />
          <MovieGrid movies={movies} loading={loading} error={error} />
        </>
      )}
    </>
  );
};

export default HomePage;
