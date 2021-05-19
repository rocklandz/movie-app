import React, { useState } from 'react';
import posterHolder from '../../../src/images/posterHolder.png';
import backdropHolder from '../../../src/images/backdropHolder.png';

const UploadImage = ({
  backdrop = backdropHolder,
  poster = posterHolder,
  setPosterUrl,
  setBackdropUrl,
}) => {
  const [posterData, setPosterData] = useState(poster);
  const [backdropData, setBackdropData] = useState(backdrop);

  const handlePosterInput = (e) => {
    const selected = e.target.files[0];
    setPosterData(posterData);

    if (selected) {
      let reader = new FileReader();
      reader.onloadend = () => {
        setPosterData(reader.result);
        setPosterUrl(reader.result);
      };
      reader.readAsDataURL(selected);
    }
  };

  const handleBackdropInput = (e) => {
    const selected = e.target.files[0];
    setBackdropData(posterData);

    if (selected) {
      let reader = new FileReader();
      reader.onloadend = () => {
        setBackdropData(reader.result);
        setBackdropUrl(reader.result);
      };
      reader.readAsDataURL(selected);
    }
  };

  return (
    <div>
      <div className='mb-6'>
        <h1 className='text-label'>Poster</h1>
        <div
          aria-label='File Upload Modal'
          className=' h-full flex flex-col bg-white shadow-xl rounded-md'
        >
          <div className='h-full overflow-auto p-5 w-full h-full flex flex-col'>
            <div className='relative py-6 flex flex-col justify-center items-center'>
              <img
                src={posterData}
                className='max-h-44 object-cover'
                alt='poster'
              />
              <input
                className='absolute cursor-pointer top-0 left-0 h-full w-full opacity-0'
                onChange={handlePosterInput}
                id='hidden-input'
                type='file'
              />
            </div>
            <p className='mt-2 font-semibold text-gray-900 flex flex-wrap justify-center'>
              <span>Choose poster image</span>
            </p>
          </div>
        </div>
      </div>

      <div>
        <h1 className='text-label'>Backdrop</h1>
        <div
          aria-label='File Upload Modal'
          className=' h-full flex flex-col bg-white shadow-xl rounded-md'
        >
          <div className='h-full overflow-auto p-5 w-full h-full flex flex-col'>
            <div className='relative py-6 flex flex-col justify-center items-center'>
              <img
                src={backdropData}
                className='max-h-44 object-cover'
                alt='poster'
              />
              <input
                className='absolute cursor-pointer top-0 left-0 h-full w-full opacity-0'
                onChange={handleBackdropInput}
                id='hidden-input'
                type='file'
              />
            </div>
            <p className='mt-2 font-semibold text-gray-900 flex flex-wrap justify-center'>
              <span>Choose backdrop image</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadImage;
