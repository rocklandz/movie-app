import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useDispatch, useSelector } from 'react-redux';
import { getMovie, updateMovie } from '../redux/actions/movieActions';
import { MOVIE_UPDATE_RESET } from '../redux/constants/movieConstants';

const EditMovie = ({ match, history }) => {
  const dispatch = useDispatch();

  const movieId = match.params.id;
  const { movie, loading, error } = useSelector((state) => state.movieDetails);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = useSelector((state) => state.movieUpdate);

  const [title, setTitle] = useState('');
  const [overview, setOverview] = useState('');
  const [country, setCountry] = useState('United States');
  const [posterUrl, setPosterUrl] = useState('');
  const [actors, setActors] = useState([]);
  const [adult, setAdult] = useState(false);
  const [released, setReleased] = useState(new Date());
  const [genres, setGenres] = useState([]);
  const [movieUrl, setMovieUrl] = useState('');

  const [actorInput, setActorInput] = useState('');
  const [genreInput, setGenreInput] = useState('');

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: MOVIE_UPDATE_RESET });
      history.push('/admin/movies');
    } else {
      if (!movie || movie._id !== movieId) {
        dispatch(getMovie(movieId));
        window.scroll(0, 0);
      } else {
        setTitle(movie.title);
        setOverview(movie.overview);
        setCountry(movie.country);
        setPosterUrl(movie.poster_lg);
        setActors(movie.actors);
        setAdult(movie.adult);
        setGenres(movie.genres);
        setMovieUrl(movie.url_path);
      }
    }
  }, [dispatch, movieId, movie, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateMovie(movieId, {
        title,
        overview,
        country,
        poster_lg: posterUrl,
        actors,
        adult,
        released_date: released,
        genres,
        url_path: movieUrl,
      })
    );
  };

  const addGenre = (e) => {
    if (e.key === 'Enter') {
      setGenres((state) => [...state, genreInput]);
      setGenreInput('');
    }
  };

  const addActor = (e) => {
    if (e.key === 'Enter') {
      setActors((state) => [...state, actorInput]);
      setActorInput('');
    }
  };

  return (
    <div className='max-w-7xl mx-auto mt-16 mb-32'>
      <div className='mt-10 sm:mt-0 text-white flex flex-col'>
        <div className='md:grid md:grid-cols-3 md:gap-6'>
          <div className='sm:col-span-1'>
            <p className='text-3xl font-bold mb-4 px-5'>Edit movie</p>
          </div>
          <div className='mt-5 mx-2 md:mt-0 sm:col-span-2'>
            <form onSubmit={() => submitHandler()}>
              <div className='shadow overflow-hidden '>
                <div className='px-4 py-5 bg-gray-800 bg-opacity-50 sm:p-6'>
                  <div className='grid grid-cols-6 gap-6'>
                    <div className='col-span-6 sm:col-span-3'>
                      <label htmlFor='first_name' className='text-label'>
                        Title
                      </label>
                      <input
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                        required
                        type='text'
                        className='text-input'
                        placeholder='Movie title...'
                      />
                    </div>

                    <div className='col-span-6 sm:col-span-3'>
                      <label htmlFor='last_name' className='text-label'>
                        Released Date
                      </label>
                      <DatePicker
                        selected={released}
                        onChange={(date) => setReleased(date)}
                        className='text-input'
                      />
                    </div>

                    <div className='col-span-6'>
                      <label htmlFor='email_address' className='text-label'>
                        Overview (less than 300 characters)
                      </label>
                      <textarea
                        onChange={(e) => setOverview(e.target.value)}
                        value={overview}
                        required
                        type='text'
                        autoComplete='email'
                        className='text-input'
                      />
                    </div>

                    <div className='col-span-6 sm:col-span-3'>
                      <label htmlFor='country' className='text-label'>
                        Country / Region
                      </label>
                      <select
                        onChange={(e) => setCountry(e.target.value)}
                        value={country}
                        required
                        autoComplete='country'
                        className='text-gray-900 mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                      >
                        <option>United States</option>
                        <option>Canada</option>
                        <option>Mexico</option>
                      </select>
                    </div>

                    <div className='col-span-6'>
                      <label className='inline-flex items-center mt-3'>
                        <input
                          onChange={() => setAdult(!adult)}
                          checked={adult}
                          type='checkbox'
                          className='form-checkbox h-5 w-5 text-red-600'
                        />
                        <span className='ml-2'>Is this movie rated R?</span>
                      </label>
                    </div>

                    <div className='col-span-6'>
                      <label htmlFor='street_address' className='text-label'>
                        Actors
                      </label>
                      <div className='mb-4'>
                        {actors.map((actor) => (
                          <div
                            onClick={() => {
                              const newActors = actors.filter(
                                (a) => a !== actor
                              );
                              setActors(newActors);
                            }}
                            className='pill-btn bg-red-500 cursor-pointer'
                          >
                            {actor}
                          </div>
                        ))}
                      </div>
                      <input
                        onKeyDown={addActor}
                        onChange={(e) => setActorInput(e.target.value)}
                        value={actorInput}
                        type='text'
                        className='text-input'
                        placeholder='New actor by Enter'
                      />
                    </div>

                    <div className='col-span-6'>
                      <label htmlFor='street_address' className='text-label'>
                        Genres
                      </label>
                      <div className='mb-4'>
                        {genres.map((genre) => (
                          <div
                            onClick={() => {
                              const newGenres = genres.filter(
                                (g) => g !== genre
                              );
                              setGenres(newGenres);
                            }}
                            className='pill-btn bg-purple-500 cursor-pointer'
                          >
                            {genre}
                          </div>
                        ))}
                      </div>
                      <input
                        onKeyDown={addGenre}
                        onChange={(e) => setGenreInput(e.target.value)}
                        value={genreInput}
                        type='text'
                        className='text-input'
                        placeholder='New genre by Enter'
                      />
                    </div>

                    <div className='col-span-6 sm:col-span-3'>
                      <label htmlFor='state' className='text-label'>
                        Poster
                      </label>
                      <input
                        onChange={(e) => setPosterUrl(e.target.value)}
                        value={posterUrl}
                        required
                        type='text'
                        className='text-input'
                      />
                    </div>

                    <div className='col-span-6 sm:col-span-3'>
                      <label htmlFor='postal_code' className='text-label'>
                        Movie Url
                      </label>
                      <input
                        onChange={(e) => setMovieUrl(e.target.value)}
                        value={movieUrl}
                        required
                        type='text'
                        className='text-input'
                      />
                    </div>
                  </div>
                </div>
                <div className='px-4 py-3 bg-gray-800 bg-opacity-50 text-right sm:px-6'>
                  <button type='submit' className='red-btn'>
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditMovie;
