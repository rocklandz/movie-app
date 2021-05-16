import { FacebookShareButton } from 'react-share';
import { ImFacebook2 } from 'react-icons/im';

const FacebookShare = ({ url, quote, hashtag }) => {
  return (
    <FacebookShareButton
      url={url}
      quote={quote}
      hashtag={`#${hashtag.replace(/\s/g, '').toLowerCase()}`}
    >
      <button className='share__button rounded flex items-center px-3 py-1 text-white mb-5'>
        <ImFacebook2 className='mr-2 text-xl' />
        <span>Share</span>
      </button>
    </FacebookShareButton>
  );
};

export default FacebookShare;
