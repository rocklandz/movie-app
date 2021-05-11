import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MovieInfo from '../components/MovieInfo/MovieInfo';
import { getMovie } from '../redux/actions/movieActions';

const MoviePreview = ({ match }) => {
  const dispatch = useDispatch();
  const movieId = match.params.id;

  useEffect(() => {
    dispatch(getMovie(movieId));
  }, [dispatch, movieId]);

  const { movie, loading, error } = useSelector((state) => state.movieDetails);

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : movie ? (
        <MovieInfo movie={movie} />
      ) : null}
    </>
  );
};

export default MoviePreview;
