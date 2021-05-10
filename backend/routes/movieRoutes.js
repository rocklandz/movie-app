import express from 'express';
import {
  getMovieById,
  getMoviesByName,
  getMovies,
  updateMovie,
  createMovie,
  deleteMovie,
  createComment,
  rateMovie,
  getMoviesByGenre,
  getTopRated,
} from '../controllers/moviesControllers.js';
import { protect, admin } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.route('/').get(getMovies).post(protect, admin, createMovie);
router.route('/top-rated').get(getTopRated);
router.route('/search').get(getMoviesByName);
router.route('/genres').get(getMoviesByGenre);
router.route('/:id').get(getMovieById);
router.route('/:id/rate').put(protect, rateMovie);
router.route('/:id/comment').put(protect, createComment);
router.route('/:id/update').put(protect, admin, updateMovie);
router.route('/:id/delete').delete(protect, admin, deleteMovie);

export default router;
