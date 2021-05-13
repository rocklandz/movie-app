import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import CountryDropdown from '../components/CountryDropdown/CountryDropdown.js';
import LanguageDropdown from '../components/LanguageDropdown/LanguageDropdown.js';
import { updateMovie } from '../redux/actions/movieActions.js';

const NewMovie = () => {
  const [title, setTitle] = useState('');
  const [overview, setOverview] = useState('');
  const [language, setLanguage] = useState(['en']);
  const [country, setCountry] = useState('United States');
  const [posterUrl, setPosterUrl] = useState('');
  const [actors, setActors] = useState([]);
  const [adult, setAdult] = useState(false);
  const [released, setReleased] = useState(new Date());
  const [genres, setGenres] = useState([]);
  const [movieUrl, setMovieUrl] = useState('');

  const [actorInput, setActorInput] = useState('');
  const [genreInput, setGenreInput] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    
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
            <p className='text-3xl font-bold mb-4 px-5'>New movie</p>
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
                        autoComplete='country'
                        className='text-gray-900 mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                      >
                        <CountryDropdown />
                      </select>
                    </div>

                    <div className='col-span-6 sm:col-span-3'>
                      <label htmlFor='country' className='text-label'>
                        Language
                      </label>
                      <select
                        onChange={(e) => setLanguage(e.target.value)}
                        value={language}
                        className='text-gray-900 mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                      >
                        <LanguageDropdown />
                      </select>
                    </div>

                    <div className='col-span-6'>
                      <label className='inline-flex items-center mt-3'>
                        <input
                          onChange={(e) => setAdult(!adult)}
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
                        {actors.map((actor, idx) => (
                          <div key={idx} className='pill-btn bg-red-500'>
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
                        {genres.map((genre, idx) => (
                          <div key={idx} className='pill-btn bg-purple-500'>
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

export default NewMovie;
