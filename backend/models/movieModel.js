import mongoose from 'mongoose';

const commentSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    comment: { type: String, required: true },
  },
  { timestamps: true }
);

const ratingSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  rating: { type: Number, required: true },
});

const movieSchema = mongoose.Schema({
  title: { type: String, required: true },
  overview: { type: String, required: true },
  actors: [{ type: String, required: true }],
  ratings: [ratingSchema],
  totalRating: { type: Number, default: 0.0 },
  averageRating: { type: Number, default: 0.0 },
  ratingCount: { type: Number, default: 0 },
  comments: [commentSchema],
  genres: [{ type: String, required: true }],
  poster: { type: String, required: true },
  country: { type: String, required: true },
  language: [{ type: String, required: true }],
  adult: { type: Boolean, default: false, required: true },
  releaseDate: { type: Date, default: Date.now() },
  url_path: { type: String, required: true },
});

const Movie = mongoose.model('Movie', movieSchema);

export default Movie;
