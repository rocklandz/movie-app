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
  MOVIE_GENRE_SEARCH_REQUEST,
  MOVIE_GENRE_SEARCH_SUCCESS,
  MOVIE_GENRE_SEARCH_FAIL,
  MOVIE_COMMENT_REQUEST,
  MOVIE_CREATE_SUCCESS,
  MOVIE_COMMENT_FAIL,
  MOVIE_COMMENT_SUCCESS,
  MOVIE_RATE_REQUEST,
  MOVIE_RATE_SUCCESS,
  MOVIE_RATE_FAIL,
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

export const getMoviesByGenre = (genre) => async (dispatch, getState) => {
  try {
    dispatch({ type: MOVIE_GENRE_SEARCH_REQUEST });

    const { data } = await axios.get(
      `http://localhost:5000/api/movies/genres?genre=${genre}`
    );
    dispatch({ type: MOVIE_GENRE_SEARCH_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: MOVIE_GENRE_SEARCH_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createComment =
  (movieId, comment) => async (dispatch, getState) => {
    try {
      dispatch({ type: MOVIE_COMMENT_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put(
        `http://localhost:5000/api/movies/${movieId}/comment`,
        { comment },
        config
      );

      dispatch({ type: MOVIE_COMMENT_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: MOVIE_COMMENT_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const createRating = (movieId, rating) => async (dispatch, getState) => {
  try {
    dispatch({ type: MOVIE_RATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `http://localhost:5000/api/movies/${movieId}/rate`,
      { rating },
      config
    );

    dispatch({ type: MOVIE_RATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: MOVIE_RATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
