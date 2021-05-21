import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/actions/userActions';
import { AiOutlineSearch } from 'react-icons/ai';
import { useOutsideAlert } from '../../utils/useOutsideAlert';

const Navbar = () => {
  const dispatch = useDispatch();

  const [showMenu, setShowMenu] = useState(false);
  const [visible, setVisible, ref] = useOutsideAlert(false);
  const [navbarBg, setNavbarBg] = useState(false);

  const { userInfo } = useSelector((state) => state.userLogin);

  const handleClick = () => {
    window[`scrollTo`]({ top: 0, behavior: `smooth` });
    setShowMenu(false)
  };

  window.onscroll = () => {
    if (window.scrollY >= 64) {
      setNavbarBg(true);
    } else {
      setNavbarBg(false);
    }
  };

  return (
    <nav
      className={`sticky duration-500 ease-in-out top-0 left-0 z-10 bg-black ${
        navbarBg ? 'bg-opacity-90' : 'bg-opacity-100'
      }`}
    >
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
              onClick={() => handleClick()}
              className='flex-shrink-0 flex items-center text-red-600 font-bold text-2xl'
            >
              Nexflit
            </Link>
            <div className='hidden sm:block sm:ml-6'>
              <div className='flex space-x-4'>
                <Link
                  to={'/'}
                  onClick={() => handleClick()}
                  className='text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'
                >
                  Home
                </Link>

                <Link
                  to={'/search'}
                  onClick={() => handleClick()}
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
                    onClick={() => setVisible(true)}
                    type='button'
                    className='bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white'
                    id='user-menu-button'
                    aria-expanded='false'
                    aria-haspopup='true'
                  >
                    <span className='sr-only'>Open user menu</span>
                    <img
                      className='user-avatar h-8 w-8 rounded-full'
                      src={userInfo.avatar}
                      alt=''
                    />
                  </button>
                </div>

                <div
                  ref={ref}
                  className={`${
                    visible ? null : 'hidden'
                  } z-10 origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none`}
                  role='menu'
                  aria-orientation='vertical'
                  aria-labelledby='user-menu-button'
                  tabIndex='-1'
                >
                  {userInfo.isAdmin && (
                    <>
                      <Link
                        onClick={() => setVisible(false)}
                        to={'/admin/users'}
                        className='block px-4 py-2 text-sm text-red-700'
                        role='menuitem'
                      >
                        Manage Users
                      </Link>
                      <Link
                        onClick={() => setVisible(false)}
                        to={'/admin/movies'}
                        className='block px-4 py-2 text-sm text-red-700'
                        role='menuitem'
                      >
                        Manage Movies
                      </Link>
                      <Link
                        onClick={() => setVisible(false)}
                        to={'/admin/genres'}
                        className='block px-4 py-2 text-sm text-red-700'
                        role='menuitem'
                      >
                        Manage Genres
                      </Link>
                    </>
                  )}

                  <Link
                    className='block px-4 py-2 text-sm text-gray-700'
                    role='menuitem'
                    onClick={() => dispatch(logout())}
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
            to={'/'}
            onClick={() => handleClick()}
            className='flex text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'
          >
            Home
          </Link>

          <Link
            to={'/search'}
            onClick={() => handleClick()}
            className='flex items-center text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'
          >
            <AiOutlineSearch className='mr-1' />
            Search
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
