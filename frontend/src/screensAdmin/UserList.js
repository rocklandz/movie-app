import React from 'react';
import UserListItem from '../components/UserListItem/UserListItem';

const UserList = () => {
  return (
    <div className='max-w-7xl mx-auto mt-16 mb-32'>
      <div className='text-white bg-gray-800'>
        <div className='p-4 flex'>
          <h1 className='text-3xl font-bold'>User list</h1>
        </div>
        <div className='px-3 py-4 flex justify-center'>
          <table className='w-full text-md bg-gray-900 shadow-md rounded mb-4'>
            <tbody>
              <tr className='border-b'>
                <th className='text-left p-3 px-5'>Name</th>
                <th className='text-left p-3 px-5'>Email</th>
                <th className='text-left p-3 px-5'>Role</th>
                <th></th>
              </tr>
              <UserListItem />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserList;
