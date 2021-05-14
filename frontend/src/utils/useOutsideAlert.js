import { useEffect, useRef, useState } from 'react';

export const useOutsideAlert = (initValue) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(initValue);

  const handleClickOutside = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      setVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, [ref]);

  return  [visible, setVisible, ref] ;
};
