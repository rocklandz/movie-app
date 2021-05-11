import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Slider from 'react-slick';
import SliderItem from './SliderItem';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Banner.css';
import { getTopRated } from '../../redux/actions/movieActions';

const Banner = () => {
  const dispatch = useDispatch();
  const { loading, movies, error } = useSelector(
    (state) => state.movieTopRated
  );

  useEffect(() => {
    dispatch(getTopRated());
  }, [dispatch]);

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    fade: true,
    adaptiveHeight: true,
  };

  return (
    <div className='banner w-full overflow-hidden'>
      <Slider {...settings}>
        {movies &&
          movies.map((movie) => <SliderItem key={movie._id} movie={movie} />)}
      </Slider>
    </div>
  );
};

export default Banner;
