import axios from 'axios';
import {
  MOVIE_LIST_FAIL,
  MOVIE_LIST_REQUEST,
  MOVIE_LIST_SUCCESS,
  MOVIE_DETAILS_FAIL,
  MOVIE_DETAILS_REQUEST,
  MOVIE_DETAILS_SUCCESS,
  MOVIE_TOPRATED_DETAILS_FAIL,
  MOVIE_TOPRATED_DETAILS_REQUEST,
  MOVIE_TOPRATED_DETAILS_SUCCESS,
} from '../constants/movieConstants';

export const getMovies = () => async (dispatch, getState) => {
  try {
    dispatch({ type: MOVIE_LIST_REQUEST });

    const { data } = await axios.get(`http://localhost:5000/api/movies`);
    dispatch({ type: MOVIE_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: MOVIE_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getMovie = (movieId) => async (dispatch, getState) => {
  try {
    dispatch({ type: MOVIE_DETAILS_REQUEST });

    const { data } = await axios.get(
      `http://localhost:5000/api/movies/${movieId}`
    );
    dispatch({ type: MOVIE_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: MOVIE_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getTopRated = () => async (dispatch, getState) => {
  try {
    dispatch({ type: MOVIE_TOPRATED_DETAILS_REQUEST });

    const { data } = await axios.get(
      `http://localhost:5000/api/movies/top-rated`
    );
    dispatch({ type: MOVIE_TOPRATED_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: MOVIE_TOPRATED_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
