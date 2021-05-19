import { GrNext, GrPrevious } from 'react-icons/gr';
import { useDispatch } from 'react-redux';
import { getMoviesByName } from '../../redux/actions/movieActions';
import { listUsers } from '../../redux/actions/userActions';

const Pagination = ({ page, pages, term, genre, userPaginate = false }) => {
  const dispatch = useDispatch();

  const changePage = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > pages || pageNumber === page) {
      return;
    }
    window.scroll(0, 0);
    if (userPaginate) {
      dispatch(listUsers(pageNumber));
    }
    if (!userPaginate) {
      dispatch(getMoviesByName(term, genre, pageNumber));
    }
  };

  return (
    <>
      <div className='flex flex-col items-center mb-32'>
        <div className='flex text-gray-300'>
          <div
            onClick={() => changePage(page - 1)}
            className='h-12 w-12 mr-1 flex justify-center items-center rounded-full bg-gray-700 cursor-pointer'
          >
            <GrPrevious />
          </div>
          <div className='flex h-12 font-medium rounded-full bg-gray-700'>
            {[...Array(pages).keys()].map((p) => (
              <div
                className={`paginate-number ${
                  p === page - 1 ? 'bg-gray-600' : null
                }`}
                onClick={() => changePage(p + 1)}
              >
                {p + 1}
              </div>
            ))}
          </div>
          <div
            onClick={() => changePage(page + 1)}
            className='h-12 w-12 ml-1 flex justify-center items-center rounded-full bg-gray-700 cursor-pointer'
          >
            <GrNext />
          </div>
        </div>
      </div>
    </>
  );
};

export default Pagination;
