import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getGenres } from '../redux/actions/genreActions';
import { AiOutlinePlusCircle } from 'react-icons/ai';

const ManageGenres = () => {
  const dispatch = useDispatch();
  const { genres, loading, error } = useSelector((state) => state.genreList);

  const [newGenre, setNewGenre] = useState(null);

  useEffect(() => {
    dispatch(getGenres());
  }, []);

  return (
    <div className='max-w-7xl mx-auto mt-16 mb-32 min-h-1/2'>
      <div className='text-white bg-gray-800'>
        <div className='p-4 flex'>
          <h1 className='text-3xl font-bold'>Manage Genres</h1>
        </div>

        <div className='p-4 flex flex-wrap'>
          {genres && (
            <>
              {genres.map((genre) => (
                <div className='genre-btn'>{genre}</div>
              ))}
              <div className='new-genre-btn'>
                <AiOutlinePlusCircle className='mr-1' />
                New Genre
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageGenres;
