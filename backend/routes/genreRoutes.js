import express from 'express';
import { addGenre, getGenres } from '../controllers/genreController.js';

const router = express.Router();

router.route('/').get(getGenres);
router.route('/add').post(addGenre);

export default router;
