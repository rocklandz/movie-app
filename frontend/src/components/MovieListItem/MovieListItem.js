import React from 'react';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';

const MovieListItem = () => {
  return (
    <>
      <tr className='border-b hover:bg-orange-100 bg-gray-900'>
        <td className='p-3 px-5 flex items-center'>
          <img
            className='w-9 mr-2'
            src='https://www.themoviedb.org/t/p/w600_and_h900_bestv2/5iHZ6KUSnLEnStXJ6BfFA5Uk2PT.jpg'
            alt=''
          />
          <p>Mortal Kombat</p>
        </td>
        <td className='p-3 px-5'>
          <p>movie.id</p>
        </td>

        <td className='p-3 px-5 text-right'>
          <button
            type='button'
            className='ml-3 text-lg bg-blue-600 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline'
          >
            <AiOutlineEdit />
          </button>
          <button
            type='button'
            className='ml-3 text-lg bg-red-600 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline'
          >
            <AiOutlineDelete />
          </button>
        </td>
      </tr>
    </>
  );
};

export default MovieListItem;
