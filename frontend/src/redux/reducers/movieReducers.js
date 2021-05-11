import {
  MOVIE_COMMENT_FAIL,
  MOVIE_COMMENT_REQUEST,
  MOVIE_COMMENT_SUCCESS,
  MOVIE_CREATE_FAIL,
  MOVIE_CREATE_REQUEST,
  MOVIE_CREATE_SUCCESS,
  MOVIE_DETAILS_FAIL,
  MOVIE_DETAILS_REQUEST,
  MOVIE_DETAILS_SUCCESS,
  MOVIE_GENRE_SEARCH_FAIL,
  MOVIE_GENRE_SEARCH_REQUEST,
  MOVIE_GENRE_SEARCH_SUCCESS,
  MOVIE_LIST_FAIL,
  MOVIE_LIST_REQUEST,
  MOVIE_LIST_SUCCESS,
  MOVIE_TOPRATED_DETAILS_FAIL,
  MOVIE_TOPRATED_DETAILS_REQUEST,
  MOVIE_TOPRATED_DETAILS_SUCCESS,
  MOVIE_NAME_SEARCH_FAIL,
  MOVIE_NAME_SEARCH_REQUEST,
  MOVIE_NAME_SEARCH_SUCCESS,
  MOVIE_RATE_FAIL,
  MOVIE_RATE_REQUEST,
  MOVIE_RATE_SUCCESS,
} from '../constants/movieConstants';

export const movieListReducer = (state = { movies: [] }, action) => {
  const { type, payload } = action;

  switch (type) {
    case MOVIE_LIST_REQUEST:
    case MOVIE_GENRE_SEARCH_REQUEST:
      return { loading: true, movies: [] };
    case MOVIE_LIST_SUCCESS:
    case MOVIE_GENRE_SEARCH_SUCCESS:
      return {
        loading: false,
        movies: payload,
      };
    case MOVIE_LIST_FAIL:
    case MOVIE_GENRE_SEARCH_FAIL:
      return { loading: false, error: payload };
    default:
      return state;
  }
};

export const movieDetailsReducer = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case MOVIE_DETAILS_REQUEST:
      return { loading: true };
    case MOVIE_DETAILS_SUCCESS:
      return {
        loading: false,
        movie: payload,
      };
    case MOVIE_DETAILS_FAIL:
      return { loading: false, error: payload };
    default:
      return state;
  }
};

export const movieTopRatedReducer = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case MOVIE_TOPRATED_DETAILS_REQUEST:
      return { loading: true };
    case MOVIE_TOPRATED_DETAILS_SUCCESS:
      return {
        loading: false,
        movies: payload,
      };
    case MOVIE_TOPRATED_DETAILS_FAIL:
      return { loading: false, error: payload };
    default:
      return state;
  }
};

export const movieCreateReducer = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case MOVIE_CREATE_REQUEST:
      return { loading: true };
    case MOVIE_CREATE_SUCCESS:
      return {
        loading: false,
        movie: payload,
      };
    case MOVIE_CREATE_FAIL:
      return { loading: false, error: payload };
    default:
      return state;
  }
};

export const movieDeleteReducer = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case MOVIE_CREATE_REQUEST:
      return { loading: true };
    case MOVIE_CREATE_SUCCESS:
      return { loading: false, success: true };
    case MOVIE_CREATE_FAIL:
      return { loading: false, error: payload };
    default:
      return state;
  }
};

export const movieCommentReducer = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case MOVIE_COMMENT_REQUEST:
      return { loading: true, movies: [] };
    case MOVIE_COMMENT_SUCCESS:
      return {
        loading: false,
        success: true,
        movie: payload,
      };
    case MOVIE_COMMENT_FAIL:
      return { loading: false, error: payload };
    default:
      return state;
  }
};

export const movieRateReducer = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case MOVIE_RATE_REQUEST:
      return { loading: true, movies: [] };
    case MOVIE_RATE_SUCCESS:
      return {
        loading: false,
        success: true,
        movie: payload,
      };
    case MOVIE_RATE_FAIL:
      return { loading: false, error: payload };
    default:
      return state;
  }
};

export const movieNameSearchReducer = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case MOVIE_NAME_SEARCH_REQUEST:
      return { loading: true };
    case MOVIE_NAME_SEARCH_SUCCESS:
      return { loading: false, movie: payload };
    case MOVIE_NAME_SEARCH_FAIL:
      return { loading: false, error: payload };
    default:
      return state;
  }
};

export const movieGenreSearchReducer = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case MOVIE_GENRE_SEARCH_REQUEST:
      return { loading: true };
    case MOVIE_GENRE_SEARCH_SUCCESS:
      return { loading: false, movie: payload };
    case MOVIE_GENRE_SEARCH_FAIL:
      return { loading: false, error: payload };
    default:
      return state;
  }
};
