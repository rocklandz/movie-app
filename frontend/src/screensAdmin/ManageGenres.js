import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addGenre, getGenres } from '../redux/actions/genreActions';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import Loader from '../components/Loader/Loader';

const ManageGenres = () => {
  const dispatch = useDispatch();
  const { genres, loading, error } = useSelector((state) => state.genreList);
  const { loading: loadingCreate, success } = useSelector(
    (state) => state.addGenre
  );

  const [newGenre, setNewGenre] = useState(null);
  const [toggleInput, setToggleInput] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addGenre(newGenre));
    setNewGenre('');
    setToggleInput(false);
  };

  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch, success]);

  return (
    <div className='max-w-7xl mx-auto mt-16 mb-32'>
      <div className='text-white bg-gray-800 min-h-1/2'>
        <div className='p-4 flex'>
          <h1 className='text-3xl font-bold'>Manage Genres</h1>
        </div>

        <div className='p-4 flex flex-wrap justify-center items-center'>
          {loading ? (
            <Loader />
          ) : (
            <>
              {genres.map((genre) => (
                <div className='genre-btn'>{genre}</div>
              ))}
              {toggleInput ? (
                <div>
                  <form onSubmit={handleSubmit} className='mb-2 text-gray-700'>
                    <input
                      value={newGenre}
                      onChange={(e) => setNewGenre(e.target.value)}
                      min={0}
                      max={100}
                      autoFocus
                      className='rounded-lg h-full px-2 py-1 focus:outline-none'
                      type='text'
                    />
                  </form>
                </div>
              ) : (
                <button
                  onClick={() => setToggleInput(true)}
                  className='new-genre-btn'
                >
                  <AiOutlinePlusCircle className='mr-1' />
                  New Genre
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageGenres;
