import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, updateUser } from '../../redux/actions/userActions';
import LoaderButton from '../../components/Loader/LoaderButton';

const UserListItem = ({ user }) => {
  const dispatch = useDispatch();
  const { _id, name, email, isAdmin } = user;

  const { savingId, loading } = useSelector((state) => state.userUpdate);
  const {
    deletingId,
    loading: loadingDelete,
  } = useSelector((state) => state.userDelete);

  const [nameInput, setNameInput] = useState(name);
  const [emailInput, setEmailInput] = useState(email);
  const [isAdminInput, setIsAdminInput] = useState(isAdmin);

  const saveHandler = () => {
    dispatch(
      updateUser(_id, {
        name: nameInput,
        email: emailInput,
        isAdmin: isAdminInput,
      })
    );
  };

  const deleteHandler = (userId) => {
    if (window.confirm('Are you sure to delete?')) {
      dispatch(deleteUser(userId));
    }
  };

  return (
    <>
      <tr className='border-b border-gray-700 hover:bg-gray-700 bg-gray-900'>
        <td className='p-3 px-5'>
          <input
            onChange={(e) => setNameInput(e.target.value)}
            type='text'
            value={nameInput}
            className='bg-transparent'
          />
        </td>
        <td className='p-3 px-5'>
          <input
            onChange={(e) => setEmailInput(e.target.value)}
            type='text'
            value={emailInput}
            className='bg-transparent'
          />
        </td>
        <td className='p-3 px-5'>
          <select
            onChange={(e) => setIsAdminInput(e.target.value)}
            value={isAdminInput}
            className='bg-transparent'
          >
            <option value={false} className='text-gray-900'>
              User
            </option>
            <option value={true} className='text-gray-900'>
              Admin
            </option>
          </select>
        </td>
        <td className='p-3 px-5 flex justify-end'>
          <button
            onClick={() => saveHandler(_id)}
            type='button'
            className='w-20 h-10 flex items-center justify-center mr-3 text-sm bg-blue-600 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline'
          >
            {loading && savingId === _id ? <LoaderButton /> : 'Save'}
          </button>
          <button
            onClick={() => deleteHandler(_id)}
            type='button'
            className='w-20 h-10 flex items-center justify-center text-sm bg-red-600 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline'
          >
            {loadingDelete && deletingId === _id ? <LoaderButton /> : 'Delete'}
          </button>
        </td>
      </tr>
    </>
  );
};

export default UserListItem;
