import React from 'react';
import MovieListItem from '../components/MovieListItem/MovieListItem';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const MovieList = () => {
  return (
    <div className='max-w-7xl mx-auto mt-16 mb-32'>
      <div className='text-white bg-gray-800'>
        <div className='p-4 flex'>
          <h1 className='text-3xl font-bold'>Movie list</h1>
        </div>
        <div className='p-4'>
          <Link to={'/admin/new-movie'}>
            <button className='py-2 px-3 bg-green-500 rounded flex justify-center items-center'>
              <AiOutlinePlusCircle className='mr-2' /> New movie
            </button>
          </Link>
        </div>
        <div className='px-3 py-4 flex justify-center'>
          <table className='w-full text-md bg-gray-900 shadow-md rounded mb-4'>
            <tbody>
              <tr className='border-b'>
                <th className='text-left p-3 px-5'>Name</th>
                <th className='text-left p-3 px-5'>Movie Id</th>
                <th className='text-left p-3 px-5'></th>
              </tr>
              <MovieListItem />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MovieList;
