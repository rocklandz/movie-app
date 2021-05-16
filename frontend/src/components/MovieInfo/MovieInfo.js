import Moment from 'react-moment';
import ReactPlayer from 'react-player';
import { FaImdb } from 'react-icons/fa';
import { FaRegistered } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import './MovieInfo.css';
import FacebookShare from '../FacebookShare/FacebookShare';

const MovieInfo = ({ movie }) => {
  const location = useLocation();
  const {
    _id,
    genres,
    actors,
    backdrop,
    title,
    overview,
    poster_lg,
    released_date,
    adult,
    url_path,
  } = movie;
  console.log(location);

  return (
    <div className=''>
      <div
        style={{ backgroundImage: `url(${backdrop})` }}
        className='movie__backdrop'
      ></div>
      <div className='movie__info relative max-w-7xl mx-auto flex sm:flex-row flex-col -mt-64 mb-32'>
        <div className='w-3/4 mx-auto sm:w-1/4 px-3 py-4'>
          <img src={`${poster_lg}`} alt='movie poster' className='mb-3' />
          <Link to={`/movie/${_id}`}>
            <button className='red-btn w-full'>Watch</button>
          </Link>
        </div>

        <div className='w-full sm:w-3/4 px-3 py-4'>
          <h3 className='text-white text-4xl mb-2'>{title}</h3>

          <div className='text-white flex items-center mb-3 flex-wrap'>
            {genres.map((genre) => (
              <Link to={`/genres/${genre}`} key={genre} className='genre-btn'>
                {genre}
              </Link>
            ))}
          </div>

          <div className='text-white flex items-center mb-3'>
            <p>
              Released: <Moment format={'DD/MM/YYYY'}>{released_date}</Moment>
            </p>
            {adult && <FaRegistered className='text-2xl text-red-600 ml-2' />}
          </div>

          <div className='text-white flex items-center mb-9'>
            <FaImdb className='text-yellow-300 text-4xl mr-2' />
            <p className='text-2xl'>
              {movie.average_rating.toFixed(1)}{' '}
              <span className='text-sm text-gray-600'>
                ({movie.rating_count})
              </span>
            </p>
          </div>

          <FacebookShare
            url={`http://dantri.com`}
            quote={`Watch this awesome movie ${movie.title} at Nexflit!`}
            hashtag={movie.title}
          />

          <div className='text-white mb-3'>
            <p className='text-xl font-bold mb-1'>Stars</p>
            <p>
              {actors.map((actor, index) => (
                <span>
                  {actor}
                  {index !== actors.length - 1 ? ', ' : null}
                </span>
              ))}
            </p>
          </div>

          <div className='text-white mb-3'>
            <p className='text-xl font-bold mb-1'>Overview</p>
            <p>{overview}</p>
          </div>

          <div className='text-white mb-3'>
            <p className='text-xl font-bold mb-5'>Trailer</p>
            <div className='player-wrapper flex justify-center max-w-4xl'>
              <ReactPlayer
                className='react-player'
                width='100%'
                height='100%'
                url={url_path}
                controls
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieInfo;
