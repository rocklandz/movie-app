import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { register } from '../redux/actions/userActions';
import Loader from '../components/Loader/Loader';

const Register = ({ location, history }) => {
  const dispatch = useDispatch();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { loading, error, userInfo } = useSelector((state) => state.userLogin);

  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [userInfo, history, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(register(username, email, password));
  };

  return (
    <div className='max-w-7xl mx-auto flex justify-center mt-16 mb-32'>
      <div className='w-full max-w-xs text-white'>
        <p className='text-3xl font-bold mb-4 px-5'>Register</p>
        <form
          onSubmit={submitHandler}
          className='bg-gray-800 bg-opacity-50 shadow-md px-5 pt-6 pb-8 mb-4'
        >
          <div className='mb-4'>
            <label className='text-label' for='username'>
              Username
            </label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.valuew)}
              className='text-input'
              type='text'
              placeholder='Username'
            />
          </div>

          <div className='mb-4'>
            <label className='text-label' for='username'>
              Email
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.valuew)}
              className='text-input'
              type='email'
              placeholder='Email'
            />
          </div>

          <div className='mb-4'>
            <label className='text-label' for='password'>
              Password
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='text-input'
              type='password'
            />
          </div>

          <div className='mb-6'>
            <label className='text-label' for='password'>
              Confirm password
            </label>
            <input
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className='text-input'
              type='password'
            />
          </div>

          {error && (
            <div className='mb-2 text-center text-red-400'>{error}</div>
          )}

          <div className='flex flex-col items-center'>
            <button type='submit' className='red-btn w-full'>
              Register
            </button>
            {loading && <Loader />}
            <div className='text-gray-400 text-sm'>
              Have an account?{' '}
              <Link to={'/login'} className='text-white'>
                Sign In
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
