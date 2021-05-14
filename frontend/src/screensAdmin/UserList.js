import React, { useEffect } from 'react';
import UserListItem from '../components/UserListItem/UserListItem';
import { useDispatch, useSelector } from 'react-redux';
import { listUsers } from '../redux/actions/userActions';

const UserList = ({ history }) => {
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.userLogin);
  const { loading, error, users } = useSelector((state) => state.userList);

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers());
    } else {
      history.push('/login');
    }
  }, [dispatch, history, userInfo]);

  return (
    <div className='max-w-7xl mx-auto mt-16 mb-32'>
      <div className='text-white bg-gray-800'>
        <div className='p-4 flex'>
          <h1 className='text-3xl font-bold'>User list</h1>
        </div>
        <div className='px-3 py-4 flex justify-center'>
          <table className='w-full text-md bg-gray-900 shadow-md rounded mb-4'>
            <tbody>
              <tr>
                <th className='text-left p-3 px-5'>Name</th>
                <th className='text-left p-3 px-5'>Email</th>
                <th className='text-left p-3 px-5'>Role</th>
                <th></th>
              </tr>
              {users &&
                users.map((user) => (
                  <UserListItem key={user._id} user={user} />
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserList;
