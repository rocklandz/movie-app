import mongoose from 'mongoose';

const genresSchema = mongoose.Schema({ genres: [String] });

const Genres = mongoose.model('Genres', genresSchema);

export default Genres;
