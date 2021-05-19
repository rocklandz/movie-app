import React, { useEffect } from 'react';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteMovie } from '../../redux/actions/movieActions';
import Moment from 'react-moment';

const MovieListItem = ({ movie }) => {
  const { actors, _id, country, title, poster_sm, release_date } = movie;
  const dispatch = useDispatch();

  const deleteHandler = (movieId) => {
    if (window.confirm('Are you sure to delete?')) {
      dispatch(deleteMovie(movieId));
    }
  };

  return (
    <>
      <tr className='border-b border-gray-700 hover:bg-gray-700 bg-gray-900'>
        <td className='p-3 px-5 flex items-center'>
          <Link to={`/preview/${_id}`}>
            <img className='w-9 mr-4' src={poster_sm} alt='' />
          </Link>
          <Link to={`/preview/${_id}`}>{title}</Link>
        </td>

        <td className='p-3 px-5 text-center'>
          <p>{country}</p>
        </td>

        <td className='p-3 px-5'>
          <p>
            <Moment format='MM/DD/YYYY'>{release_date}</Moment>
          </p>
        </td>

        <td className='p-3 px-5'>
          <p>{actors[0]}</p>
        </td>

        <td className='p-3 px-5 text-right'>
          <Link to={`/admin/edit/${_id}`}>
            <button
              type='button'
              className='ml-3 text-lg bg-blue-600 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline'
            >
              <AiOutlineEdit />
            </button>
          </Link>
          <button
            onClick={() => deleteHandler(_id)}
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
