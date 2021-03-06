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
  MOVIE_COMMENT_FAIL,
  MOVIE_COMMENT_SUCCESS,
  MOVIE_RATE_REQUEST,
  MOVIE_RATE_SUCCESS,
  MOVIE_RATE_FAIL,
  MOVIE_DELETE_REQUEST,
  MOVIE_DELETE_SUCCESS,
  MOVIE_DELETE_FAIL,
  MOVIE_UPDATE_REQUEST,
  MOVIE_UPDATE_SUCCESS,
  MOVIE_UPDATE_FAIL,
  MOVIE_NAME_SEARCH_SUCCESS,
  MOVIE_NAME_SEARCH_FAIL,
  MOVIE_NAME_SEARCH_REQUEST,
  MOVIE_CREATE_REQUEST,
  MOVIE_CREATE_FAIL,
  MOVIE_CREATE_SUCCESS,
} from '../constants/movieConstants';

export const getMovies = () => async (dispatch, getState) => {
  try {
    dispatch({ type: MOVIE_LIST_REQUEST });

    const { data } = await axios.get(`/api/movies`);
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

    const { data } = await axios.get(`/api/movies/${movieId}`);
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

    const { data } = await axios.get(`/api/movies/top-rated`);
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

    const { data } = await axios.get(`/api/movies/genres?genre=${genre}`);
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

export const getMoviesByName =
  (name, genre, pageNumber = 1) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: MOVIE_NAME_SEARCH_REQUEST });

      const { data } = await axios.get(
        `/api/movies/search?name=${name}&genre=${genre}&pageNumber=${pageNumber}`
      );
      dispatch({ type: MOVIE_NAME_SEARCH_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: MOVIE_NAME_SEARCH_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const deleteMovie = (movieId) => async (dispatch, getState) => {
  try {
    dispatch({ type: MOVIE_DELETE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.delete(
      `/api/movies/${movieId}/delete`,
      config
    );

    dispatch({ type: MOVIE_DELETE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: MOVIE_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const newMovie = (movie) => async (dispatch, getState) => {
  try {
    dispatch({ type: MOVIE_CREATE_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const posterData = new FormData();
    posterData.append('file', movie.poster_lg);
    posterData.append('upload_preset', 'movie-poster');
    const posterResult = await axios.post(
      'https://api.cloudinary.com/v1_1/duczq6lyl/image/upload',
      posterData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    const backdropData = new FormData();
    backdropData.append('file', movie.backdrop);
    backdropData.append('upload_preset', 'movie-backdrop');
    const backdropResult = await axios.post(
      'https://api.cloudinary.com/v1_1/duczq6lyl/image/upload',
      backdropData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    movie = {
      ...movie,
      poster_lg: posterResult.data.secure_url,
      poster_md: posterResult.data.secure_url,
      poster_sm: posterResult.data.secure_url,
      backdrop: backdropResult.data.secure_url,
    };

    await axios.post(`/api/movies`, movie, config);

    dispatch({ type: MOVIE_CREATE_SUCCESS });
  } catch (error) {
    dispatch({
      type: MOVIE_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateMovie = (movieId, movie) => async (dispatch, getState) => {
  try {
    dispatch({ type: MOVIE_UPDATE_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const posterData = new FormData();
    posterData.append('file', movie.poster_lg);
    posterData.append('upload_preset', 'movie-poster');
    const posterResult = await axios.post(
      'https://api.cloudinary.com/v1_1/duczq6lyl/image/upload',
      posterData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    const backdropData = new FormData();
    backdropData.append('file', movie.backdrop);
    backdropData.append('upload_preset', 'movie-backdrop');
    const backdropResult = await axios.post(
      'https://api.cloudinary.com/v1_1/duczq6lyl/image/upload',
      backdropData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    movie = {
      ...movie,
      poster_lg: posterResult.data.secure_url,
      poster_md: posterResult.data.secure_url,
      poster_sm: posterResult.data.secure_url,
      backdrop: backdropResult.data.secure_url,
    };

    await axios.put(`/api/movies/${movieId}/update`, movie, config);

    dispatch({ type: MOVIE_UPDATE_SUCCESS });
  } catch (error) {
    dispatch({
      type: MOVIE_UPDATE_FAIL,
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
        `/api/movies/${movieId}/comment`,
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
      `/api/movies/${movieId}/rate`,
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
