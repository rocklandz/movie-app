import React, { useState } from 'react';
import { AiOutlineSave, AiOutlineDelete } from 'react-icons/ai';

const UserListItem = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const submitHandler = () => {
      
  };

  return (
    <>
      <tr className='border-b hover:bg-orange-100 bg-gray-900'>
        <td className='p-3 px-5'>
          <input type='text' value='user.name' className='bg-transparent' />
        </td>
        <td className='p-3 px-5'>
          <input type='text' value='user.email' className='bg-transparent' />
        </td>
        <td className='p-3 px-5'>
          <select value='user.role' className='bg-transparent'>
            <option value='user' className='text-gray-900'>
              User
            </option>
            <option value='admin' className='text-gray-900'>
              Admin
            </option>
          </select>
        </td>
        <td className='p-3 px-5 flex justify-end'>
          <button
            onClick={submitHandler}
            type='button'
            className='mr-3 text-sm bg-blue-600 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline'
          >
            <AiOutlineSave />
          </button>
          <button
            type='button'
            className='text-sm bg-red-600 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline'
          >
            <AiOutlineDelete />
          </button>
        </td>
      </tr>
    </>
  );
};

export default UserListItem;
