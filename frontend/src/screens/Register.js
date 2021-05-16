import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { registerUser } from '../redux/actions/userActions';
import Loader from '../components/Loader/Loader';
import FormError from '../components/FormError/FormError';

const Register = ({ location, history }) => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { loading, error, userInfo } = useSelector(
    (state) => state.userRegister
  );

  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [userInfo, history, redirect]);

  const onSubmit = (data) => {
    const { name, email, password } = data;
    dispatch(registerUser(name, email, password));
  };

  return (
    <div className='max-w-7xl mx-auto flex justify-center mt-16 mb-32'>
      <div className='w-full max-w-xs text-white'>
        <p className='text-3xl font-bold mb-4 px-5'>Register</p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='bg-gray-800 bg-opacity-50 shadow-md px-5 pt-6 pb-8 mb-4'
        >
          <div className='mb-4'>
            <label className='text-label' for='username'>
              Username
            </label>
            <input
              className='text-input'
              type='text'
              name='name'
              {...register('name', {
                required: true,
                minLength: 6,
                maxLength: 32,
              })}
            />
            {errors.name?.type === 'required' && (
              <FormError error={'Name is required'} />
            )}
            {(errors.name?.type === 'minLength' ||
              errors.name?.type === 'maxLength') && (
              <FormError error={'Name must have 6-32 characters'} />
            )}
          </div>

          <div className='mb-4'>
            <label className='text-label' for='username'>
              Email
            </label>
            <input
              className='text-input'
              type='email'
              name='email'
              {...register('email', {
                required: true,
                pattern:
                  /^[a-z][a-z0-9_.]{3,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$/,
              })}
            />
            {errors.email?.type === 'required' && (
              <FormError error={'Email is required'} />
            )}
            {errors.email?.type === 'pattern' && (
              <FormError error={'Email is not valid'} />
            )}
          </div>

          <div className='mb-4'>
            <label className='text-label' for='password'>
              Password
            </label>
            <input
              className='text-input'
              type='password'
              name='password'
              {...register('password', {
                required: true,
                minLength: 6,
                maxLength: 32,
              })}
            />
            {errors.password?.type === 'required' && (
              <FormError error={'Password is required'} />
            )}
            {(errors.password?.type === 'minLength' ||
              errors.password?.type === 'maxLength') && (
              <FormError error={'Password must have 6-32 characters'} />
            )}
          </div>

          {error && (
            <div className='mb-2 text-center text-red-500'>{error}</div>
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
