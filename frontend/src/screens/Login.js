import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Loader from '../components/Loader/Loader';
import { login } from '../redux/actions/userActions';

const Login = ({ location, history }) => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { loading, error, userInfo } = useSelector((state) => state.userLogin);

  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [userInfo, history, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <div className='max-w-7xl mx-auto flex justify-center mt-16 mb-32'>
      <div className='w-full max-w-xs text-white'>
        <p className='text-3xl font-bold mb-4 px-5'>Sign In</p>

        <form
          onSubmit={submitHandler}
          className='bg-gray-800 bg-opacity-50 shadow-md px-5 pt-6 pb-8 mb-4'
        >
          <div className='mb-4'>
            <label className='block text-sm mb-2' for='username'>
              Email
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='text-input'
              type='text'
            />
          </div>
          <div className='mb-6'>
            <label className='block text-sm mb-2' for='password'>
              Password
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='text-input'
              type='password'
            />
          </div>

          {error && (
            <div className='mb-2 text-center text-red-500'>{error}</div>
          )}

          <div className='flex flex-col items-center'>
            <button
              className='uppercase py-3 px-5 w-full border border-red-700 hover:bg-red-700 mb-2'
              type='submit'
            >
              Sign In
            </button>
            {loading && <Loader />}
            <div className='text-gray-400 text-sm'>
              New to us?{' '}
              <Link to={'/register'} className='text-white'>
                Register now
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
