import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import {
  movieCommentReducer,
  movieCreateReducer,
  movieDeleteReducer,
  movieDetailsReducer,
  movieGenreSearchReducer,
  movieListReducer,
  movieNameSearchReducer,
  movieRateReducer,
  movieTopRatedReducer,
  movieUpdateReducer,
} from './reducers/movieReducers';
import {
  userDeleteReducer,
  userDetailsReducer,
  userListReducer,
  userLoginReducer,
  userRegisterReducer,
  userUpdateReducer,
} from './reducers/userReducers';
import { addGenreReducers, genreListReducers } from './reducers/genreReducers';

const reducers = combineReducers({
  // User reducers
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdate: userUpdateReducer,
  userDelete: userDeleteReducer,
  userList: userListReducer,

  // Movie reducers
  movieList: movieListReducer,
  movieDetails: movieDetailsReducer,
  movieDelete: movieDeleteReducer,
  movieUpdate: movieUpdateReducer,
  movieCreate: movieCreateReducer,
  movieComment: movieCommentReducer,
  movieRate: movieRateReducer,
  movieNameSearch: movieNameSearchReducer,
  movieGenreSearch: movieGenreSearchReducer,
  movieTopRated: movieTopRatedReducer,

  // Genre reducers
  genreList: genreListReducers,
  addGenre: addGenreReducers,
});

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const initState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const middlewares = [thunk];

const store = createStore(
  reducers,
  initState,
  composeWithDevTools(applyMiddleware(...middlewares))
);

export default store;
