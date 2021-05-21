import {
  GENRE_ADD_FAIL,
  GENRE_ADD_REQUEST,
  GENRE_ADD_SUCCESS,
  GENRE_LIST_FAIL,
  GENRE_LIST_REQUEST,
  GENRE_LIST_SUCCESS,
} from '../constants/genreConstants';

export const genreListReducers = (state = { genres: [] }, action) => {
  const { type, payload } = action;

  switch (type) {
    case GENRE_LIST_REQUEST:
      return { ...state, loading: true };
    case GENRE_LIST_SUCCESS:
      return { loading: false, genres: payload };
    case GENRE_LIST_FAIL:
      return { loading: false, error: payload };
    default:
      return state;
  }
};

export const addGenreReducers = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case GENRE_ADD_REQUEST:
      return { ...state, loading: true };
    case GENRE_ADD_SUCCESS:
      return { loading: false, success: true, genres: payload };
    case GENRE_ADD_FAIL:
      return { loading: false, error: payload };
    default:
      return state;
  }
};
