import { useState, useEffect } from 'react';

const MOBILE_WIDTH_TRESHOLD = 700;
export const useMobileMode = () => {
  const [width, setWidth] = useState<number>(window.innerWidth);

  const handleWindowSizeChange = () => setWidth(window.innerWidth);

  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    };
  }, []);

  const isMobile = width <= MOBILE_WIDTH_TRESHOLD;

  return isMobile;
};
