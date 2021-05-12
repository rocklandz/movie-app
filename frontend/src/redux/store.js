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
} from './reducers/movieReducers';
import {
  userDeleteReducer,
  userDetailsReducer,
  userLoginReducer,
  userRegisterReducer,
} from './reducers/userReducers';

const reducers = combineReducers({
  // User reducers
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userDelete: userDeleteReducer,

  // Movie reducers
  movieList: movieListReducer,
  movieDetails: movieDetailsReducer,
  movieDelete: movieDeleteReducer,
  movieCreate: movieCreateReducer,
  movieComment: movieCommentReducer,
  movieRate: movieRateReducer,
  movieNameSearch: movieNameSearchReducer,
  movieGenreSearch: movieGenreSearchReducer,
  movieTopRated: movieTopRatedReducer,
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
