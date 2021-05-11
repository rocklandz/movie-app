import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className='footer mx-auto relative pt-1 border-b-2 border-blue-700'>
      <div className='z-50 relative mx-auto px-6'>
        <div className='sm:flex justify-center sm:mt-8'>
          <div className='mt-8 max-w-3xl sm:mt-0 sm:w-full sm:px-8 flex flex-col md:flex-row justify-between'>
            <div className='flex flex-col'>
              <span className='font-bold text-white uppercase mb-2'>
                About Us
              </span>
              <span className='my-2'>
                <Link className='text-gray-500  text-sm hover:text-gray-100'>
                  FAQ
                </Link>
              </span>
              <span className='my-2'>
                <Link className='text-gray-500  text-sm hover:text-gray-100'>
                  Investor Relations
                </Link>
              </span>
              <span className='my-2'>
                <Link className='text-gray-500  text-sm hover:text-gray-100'>
                  Contact us
                </Link>
              </span>
            </div>

            <div className='flex flex-col'>
              <span className='font-bold text-white uppercase mt-4 md:mt-0 mb-2'>
                Movies
              </span>
              <span className='my-2'>
                <Link className='text-gray-500 text-sm hover:text-gray-100'>
                  Media Center
                </Link>
              </span>
              <span className='my-2'>
                <Link className='text-gray-500  text-sm hover:text-gray-100'>
                  Speed test
                </Link>
              </span>
              <span className='my-2'>
                <Link className='text-gray-500 text-sm hover:text-gray-100'>
                  Privacy
                </Link>
              </span>
            </div>

            <div className='flex flex-col'>
              <span className='font-bold text-white uppercase mt-4 md:mt-0 mb-2'>
                Info
              </span>
              <span className='my-2'>
                <Link className='text-gray-500  text-sm hover:text-gray-100'>
                  Terms of use
                </Link>
              </span>
              <span className='my-2'>
                <Link className='text-gray-500  text-sm hover:text-gray-100'>
                  Cookie Preferences
                </Link>
              </span>
              <span className='my-2'>
                <Link className='text-gray-500  text-sm hover:text-gray-100'>
                  Legal Notices
                </Link>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className='container mx-auto px-6'>
        <div className='mt-16 border-t border-gray-500 flex flex-col items-center'>
          <div className='sm:w-2/3 text-center py-6'>
            <p className='text-xs text-gray-400 mb-2'>
              © 2021 by Tuan Anh Vuong
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
