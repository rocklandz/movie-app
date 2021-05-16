import asyncHandler from 'express-async-handler';
import Genres from '../models/genreModel.js';

// @desc    Fetch all genres
// @route   GET /api/genres
// @access  Public
const getGenres = asyncHandler(async (req, res) => {
  const genres = await Genres.find();
  const genreObj = genres[0];

  res.json(genreObj);
});

// @desc    Add new genre
// @route   POST /api/genres/add
// @access  Public
const addGenre = asyncHandler(async (req, res) => {
  const data = await Genres.find();
  const genreObj = data[0];
  const genres = genreObj.genres;

  const newGenre = req.body.genre;

  if (!newGenre) {
    res.status(400);
    throw new Error('You must specify a Genre');
  }
  if (genres.includes(newGenre)) {
    res.status(400);
    throw new Error('This genre has already exist');
  }

  genres.push(newGenre);
  await genreObj.save();

  res.json(genreObj);
});

export { getGenres, addGenre };
