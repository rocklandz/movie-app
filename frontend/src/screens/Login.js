import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
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
              onChang={(e) => setEmail(e.target.valuew)}
              className='shadow appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='username'
              type='text'
              placeholder='Username'
            />
          </div>
          <div className='mb-6'>
            <label className='block text-sm mb-2' for='password'>
              Password
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='shadow appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='password'
              type='password'
            />
          </div>
          <div className='flex flex-col items-center'>
            <button
              className='uppercase py-3 px-5 w-full border border-red-700 hover:bg-red-700 mb-2'
              type='button'
            >
              Sign In
            </button>
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
