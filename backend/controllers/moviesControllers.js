import asyncHandler from 'express-async-handler';
import Movie from '../models/movieModel.js';

// @desc    Fetch all movies
// @route   GET /api/movies
// @access  Public
const getMovies = asyncHandler(async (req, res) => {
  const movies = await Movie.find({});

  res.json(movies);
});

// @desc    Fetch top rated movies
// @route   GET /api/movies/top-rated
// @access  Public
const getTopRated = asyncHandler(async (req, res) => {
  const movies = await Movie.find({}).sort({ average_rating: -1 }).limit(5);

  res.json(movies);
});

// @desc    Fetch single movie by Id
// @route   GET /api/movies/:id
// @access  Public
const getMovieById = asyncHandler(async (req, res) => {
  const movie = await Movie.findById(req.params.id).populate({
    path: 'comments',
    populate: { path: 'user', model: 'User', select: 'name avatar' },
  });

  if (movie) {
    res.json(movie);
  } else {
    res.status(404);
    throw new Error('Movie not found');
  }
});

// @desc    Fetch movies by name
// @route   GET /api/movies/search
// @access  Public
const getMoviesByName = asyncHandler(async (req, res) => {
  const pageSize = 15;
  const page = Number(req.query.pageNumber) || 1;

  const movieName = req.query.name;
  const genre = req.query.genre.toString();

  const searchTerm =
    genre && movieName
      ? {
          title: { $regex: movieName.split('-').join(' '), $options: 'i' },
          genres: { $all: [genre] },
        }
      : movieName
      ? {
          title: { $regex: movieName.split('-').join(' '), $options: 'i' },
        }
      : genre
      ? {
          genres: { $all: [genre] },
        }
      : {};

  const count = await Movie.countDocuments({ ...searchTerm });
  const movies = await Movie.find({
    ...searchTerm,
  })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  if (movies) {
    res.status(200);
    res.json({ movies, page, pages: Math.ceil(count / pageSize) });
  } else {
    throw new Error('No movies found');
  }
});

// @desc    Fetch movies by genre
// @route   GET /api/movies/genres
// @access  Public
const getMoviesByGenre = asyncHandler(async (req, res) => {
  const searchTerm = req.query.genre.toString();
  const movies = await Movie.find({
    genres: { $all: [searchTerm] },
  });
  if (movies) {
    res.status(200).json(movies);
  } else {
    throw new Error('No movies found');
  }
});

// @desc    Delete a movie
// @route   DELETE /api/movies/:id/delete
// @access  Private/Admin
const deleteMovie = asyncHandler(async (req, res) => {
  const movie = await Movie.findById(req.params.id);

  if (movie) {
    await movie.remove();
    res.json({ message: 'Movie removed' });
  } else {
    res.status(404);
    throw new Error('Movie not found');
  }
});

// @desc    Create a movie
// @route   POST /api/movies
// @access  Private/Admin
const createMovie = asyncHandler(async (req, res) => {
  const {
    title,
    overview,
    actors,
    genres,
    poster,
    country,
    language,
    adult,
    release_date,
    url_path,
    backdrop,
    poster_lg,
    poster_md,
    poster_sm,
  } = req.body;

  const movie = await Movie.create({
    title,
    overview,
    actors,
    genres,
    poster,
    country,
    language,
    adult,
    release_date,
    url_path,
    backdrop,
    poster_lg,
    poster_md,
    poster_sm,
  });

  if (movie) {
    res.status(201).json(movie);
  } else {
    res.status(404);
    throw new Error('Create movie failed');
  }
});

// @desc    Update a movie info
// @route   PUT /api/movies/:id/update
// @access  Private/Admin
const updateMovie = asyncHandler(async (req, res) => {
  const {
    title,
    overview,
    actors,
    genres,
    poster,
    country,
    language,
    adult,
    release_date,
    url_path,
    backdrop,
    poster_lg,
    poster_md,
    poster_sm,
  } = req.body;

  const movie = await Movie.findById(req.params.id);

  if (movie) {
    movie.title = title || movie.title;
    movie.overview = overview || movie.overview;
    movie.actors = actors || movie.actors;
    movie.genres = genres || movie.genres;
    movie.poster = poster || movie.poster;
    movie.country = country || movie.country;
    movie.language = language || movie.language;
    movie.adult = adult || movie.adult;
    movie.release_date = release_date || movie.release_date;
    movie.url_path = url_path || movie.url_path;
    movie.backdrop = backdrop || movie.backdrop;
    movie.poster_lg = poster_lg || movie.poster_lg;
    movie.poster_md = poster_md || movie.poster_md;
    movie.poster_sm = poster_sm || movie.poster_sm;

    const updatedMovie = await movie.save();
    res.json(updatedMovie);
  } else {
    res.status(404);
    throw new Error('Movie not found');
  }
});

// @desc    Create a comment
// @route   PUT /api/movies/:id/comment
// @access  Private
const createComment = asyncHandler(async (req, res) => {
  const movie = await Movie.findById(req.params.id);

  if (movie) {
    movie.comments.unshift({
      user: req.user._id,
      comment: req.body.comment,
    });

    await movie.save();

    const updatedMovie = await Movie.findById(req.params.id).populate({
      path: 'comments',
      populate: { path: 'user', model: 'User', select: 'name avatar' },
    });

    res.status(201).json(updatedMovie);
  } else {
    res.status(404);
    throw new Error('No movie found');
  }
});

// @desc    Rate a movie
// @route   PUT /api/movies/:id/rate
// @access  Private
const rateMovie = asyncHandler(async (req, res) => {
  const userRating = Number(req.body.rating);

  if (!userRating) {
    res.status(400);
    throw new Error('Rating must be a number');
  }
  if (userRating < 0 || userRating > 10) {
    res.status(400);
    throw new Error('Rating score must be from 0 to 10');
  }

  const movie = await Movie.findById(req.params.id);

  if (movie) {
    const alreadyRated = movie.ratings.find(
      (rating) => rating.user.toString() === req.user.id.toString()
    );

    if (alreadyRated) {
      movie.total_rating =
        movie.total_rating - alreadyRated.rating + userRating;
      alreadyRated.rating = userRating;
      movie.average_rating = (movie.total_rating / movie.rating_count).toFixed(
        1
      );
    }
    if (!alreadyRated) {
      movie.ratings.unshift({
        user: req.user._id,
        rating: userRating,
      });
      movie.rating_count++;
      movie.total_rating += userRating;
      movie.average_rating = (movie.total_rating / movie.rating_count).toFixed(
        1
      );
    }

    await movie.save();

    const updatedMovie = await Movie.findById(req.params.id).populate({
      path: 'comments',
      populate: { path: 'user', model: 'User', select: 'name avatar' },
    });

    res.status(201).json(updatedMovie);
  } else {
    res.status(404);
    throw new Error('No movie found');
  }
});

export {
  getMovies,
  getMovieById,
  getMoviesByName,
  getMoviesByGenre,
  createMovie,
  updateMovie,
  deleteMovie,
  createComment,
  rateMovie,
  getTopRated,
};
