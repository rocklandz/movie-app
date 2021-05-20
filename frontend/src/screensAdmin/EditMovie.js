import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMovie, updateMovie } from '../redux/actions/movieActions';
import { getGenres } from '../redux/actions/genreActions';
import GenreDropdown from '../components/GenreDropdown/GenreDropdown';
import DatePicker from 'react-datepicker';
import Loader from '../components/Loader/Loader';
import LoaderButton from '../components/Loader/LoaderButton';
import CountryDropDown from '../components/CountryDropdown/CountryDropdown';
import UploadImage from '../components/UploadImage/UploadImage';
import { MOVIE_UPDATE_RESET } from '../redux/constants/movieConstants';
import 'react-datepicker/dist/react-datepicker.css';

const EditMovie = ({ match, history }) => {
  const dispatch = useDispatch();
  const movieId = match.params.id;

  const { genres: genreList } = useSelector((state) => state.genreList);
  const { movie, loading, error } = useSelector((state) => state.movieDetails);
  const { loading: loadingUpdate, success: successUpdate } = useSelector(
    (state) => state.movieUpdate
  );

  const [title, setTitle] = useState('');
  const [overview, setOverview] = useState('');
  const [country, setCountry] = useState('United States');
  const [posterUrl, setPosterUrl] = useState('');
  const [backdropUrl, setBackdropUrl] = useState('');
  const [actors, setActors] = useState([]);
  const [adult, setAdult] = useState(false);
  const [released, setReleased] = useState(new Date());
  const [genres, setGenres] = useState([]);
  const [movieUrl, setMovieUrl] = useState('');

  const [actorInput, setActorInput] = useState('');

  useEffect(() => {
    dispatch(getGenres());
    window.scroll(0, 0);
  }, [dispatch]);

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: MOVIE_UPDATE_RESET });
      history.push('/admin/movies');
    } else {
      if (!movie || movie._id !== movieId) {
        dispatch(getMovie(movieId));
      } else {
        setTitle(movie.title);
        setOverview(movie.overview);
        setCountry(movie.country);
        setPosterUrl(movie.poster_lg);
        setBackdropUrl(movie.backdrop);
        setActors(movie.actors);
        setAdult(movie.adult);
        setGenres(movie.genres);
        setMovieUrl(movie.url_path);
        setReleased(new Date(movie.release_date));
      }
    }
  }, [dispatch, history, movieId, movie, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateMovie(movieId, {
        title,
        overview,
        country,
        poster_lg: posterUrl,
        poster_sm: posterUrl,
        poster_md: posterUrl,
        backdrop: backdropUrl,
        actors,
        adult,
        released_date: released,
        genres,
        url_path: movieUrl,
      })
    );
  };

  const addActor = () => {
    if (actorInput) {
      setActors((state) => [...state, actorInput]);
      setActorInput('');
    }
  };

  return (
    <>
      <div className='max-w-7xl mx-auto mt-16 mb-32 bg-gray-800'>
        {loading ? (
          <div className='w-full flex justify-center mt-32'>
            <Loader />
          </div>
        ) : error ? (
          <div>{error}</div>
        ) : (
          <div className='mt-10 sm:mt-0 text-white flex flex-col'>
            <h1 className='text-3xl font-bold mb-4 p-4'>Edit movie</h1>
            <div className='md:grid md:grid-cols-3 md:gap-6'>
              <div className='sm:col-span-1 m-2 px-4 py-5'>
                {movie && (
                  <UploadImage
                    backdrop={movie.backdrop}
                    poster={movie.poster_lg}
                    setPosterUrl={setPosterUrl}
                    setBackdropUrl={setBackdropUrl}
                  />
                )}
              </div>

              <div className='mt-5 mx-2 md:mt-0 sm:col-span-2'>
                <form onSubmit={submitHandler}>
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
                            Overview (less than 500 characters)
                          </label>
                          <textarea
                            onChange={(e) => setOverview(e.target.value)}
                            value={overview}
                            required
                            rows='5'
                            type='text'
                            className='text-input'
                            minLength='10'
                            maxLength='500'
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
                            <CountryDropDown />
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
                          <label
                            htmlFor='street_address'
                            className='text-label'
                          >
                            Genres
                          </label>
                          <div>
                            {movie && (
                              <GenreDropdown
                                preSelect={movie.genres}
                                setGenres={setGenres}
                                genreList={genreList}
                              />
                            )}
                          </div>
                        </div>

                        <div className='col-span-6'>
                          <label
                            htmlFor='street_address'
                            className='text-label'
                          >
                            Actors
                          </label>
                          <div className='mb-4 flex flex-wrap'>
                            {actors.map((actor) => (
                              <div
                                onClick={() => {
                                  const newActors = actors.filter(
                                    (a) => a !== actor
                                  );
                                  setActors(newActors);
                                }}
                                className='actor-btn'
                              >
                                {actor}
                              </div>
                            ))}
                          </div>
                          <div className='relative'>
                            <input
                              onChange={(e) => setActorInput(e.target.value)}
                              value={actorInput}
                              type='text'
                              className='text-input'
                              placeholder="Enter actor's name"
                            />
                            <button
                              type='button'
                              className='absolute top-0 right-0 button rounded-sm bg-gray-700 h-full px-3'
                              onClick={addActor}
                            >
                              Add
                            </button>
                          </div>
                        </div>

                        <div className='col-span-6'>
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
                    <div className='px-4 py-3 bg-gray-800 bg-opacity-50 flex justify-end sm:px-6'>
                      <button type='submit' className='red-btn'>
                        <span>Save</span>
                        {loadingUpdate && <LoaderButton />}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default EditMovie;
