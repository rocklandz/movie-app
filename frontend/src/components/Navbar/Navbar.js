import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/actions/userActions';
import { AiOutlineSearch } from 'react-icons/ai';

const Navbar = () => {
  const dispatch = useDispatch();

  const [showMenu, setShowMenu] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const { userInfo } = useSelector((state) => state.userLogin);

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <nav className=''>
      <div className='max-w-7xl mx-auto px-2 sm:px-6 lg:px-8'>
        <div className='relative flex items-center justify-between h-16'>
          <div className='absolute inset-y-0 left-0 flex items-center sm:hidden'>
            <button
              onClick={() => setShowMenu((state) => !state)}
              type='button'
              className='hamburger inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'
              aria-controls='mobile-menu'
              aria-expanded='false'
            >
              <span className='sr-only'>Open main menu</span>

              <svg
                className='block h-6 w-6'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                aria-hidden='true'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M4 6h16M4 12h16M4 18h16'
                />
              </svg>

              <svg
                className='hidden h-6 w-6'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                aria-hidden='true'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M6 18L18 6M6 6l12 12'
                />
              </svg>
            </button>
          </div>
          <div className='flex-1 flex items-center justify-center sm:items-stretch sm:justify-start'>
            <Link
              to={'/'}
              className='flex-shrink-0 flex items-center text-red-600 font-bold text-2xl'
            >
              Nexflit
            </Link>
            <div className='hidden sm:block sm:ml-6'>
              <div className='flex space-x-4'>
                <Link
                  to={'/'}
                  className='bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium'
                  aria-current='page'
                >
                  Home
                </Link>

                <Link
                  to={'/genres'}
                  className='text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'
                >
                  Genres
                </Link>

                <Link
                  to={'/'}
                  className='flex items-center text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'
                >
                  <AiOutlineSearch className='mr-1' />
                  Search
                </Link>
              </div>
            </div>
          </div>

          {userInfo ? (
            // Is user logged in?
            <div className='absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0'>
              <div className='ml-3 relative'>
                <div className='flex items-center'>
                  <p className='text-gray-300 mr-2 text-sm hidden sm:block'>
                    {userInfo.name}
                  </p>
                  <button
                    onClick={() => setShowSettings((state) => !state)}
                    type='button'
                    className='bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white'
                    id='user-menu-button'
                    aria-expanded='false'
                    aria-haspopup='true'
                  >
                    <span className='sr-only'>Open user menu</span>
                    <img
                      className='user-avatar h-8 w-8 rounded-full'
                      src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
                      alt=''
                    />
                  </button>
                </div>

                <div
                  className={`${
                    showSettings ? null : 'hidden'
                  } z-10 origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none`}
                  role='menu'
                  aria-orientation='vertical'
                  aria-labelledby='user-menu-button'
                  tabIndex='-1'
                >
                  <Link
                    className='block px-4 py-2 text-sm text-gray-700'
                    role='menuitem'
                    tabIndex='-1'
                    id='user-menu-item-1'
                  >
                    Settings
                  </Link>
                  <Link
                    className='block px-4 py-2 text-sm text-gray-700'
                    role='menuitem'
                    tabIndex='-1'
                    id='user-menu-item-2'
                    onClick={logoutHandler}
                  >
                    Sign out
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            // No user logged in
            <Link to={'/login'} className='text-sm navbar-text'>
              Sign in
            </Link>
          )}
        </div>
      </div>

      <div
        className={`sm:hidden ${!showMenu ? 'hidden' : null}`}
        id='mobile-menu'
      >
        <div className='px-2 pt-2 pb-3 space-y-1'>
          <Link
            className='bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium'
            aria-current='page'
          >
            Home
          </Link>

          <Link className='navbar-text'>Genres</Link>

          <Link className='navbar-text'>About us</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
