import axios from 'axios';
import {
  GENRE_ADD_FAIL,
  GENRE_ADD_REQUEST,
  GENRE_ADD_SUCCESS,
  GENRE_LIST_FAIL,
  GENRE_LIST_REQUEST,
  GENRE_LIST_SUCCESS,
} from '../constants/genreConstants.js';

export const getGenres = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GENRE_LIST_REQUEST });

    const { data } = await axios.get('/api/genres');
    dispatch({ type: GENRE_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GENRE_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const addGenre = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GENRE_ADD_REQUEST });

    const { data } = await axios.get('/api/genres/add');
    dispatch({ type: GENRE_ADD_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GENRE_ADD_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
