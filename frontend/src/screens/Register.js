import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
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
              onChangee={(e) => setPassword(e.target.value)}
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
              onChangee={(e) => setConfirmPassword(e.target.value)}
              className='text-input'
              type='password'
            />
          </div>

          <div className='flex flex-col items-center'>
            <button className='red-btn w-full' type='button'>
              Register
            </button>
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
