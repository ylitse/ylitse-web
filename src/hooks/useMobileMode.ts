import { useState, useEffect } from 'react';
import { MOBILE_TRESHOLD } from '@/components/variables';

export const useMobileMode = () => {
  const [width, setWidth] = useState<number>(window.innerWidth);

  const handleWindowSizeChange = () => setWidth(window.innerWidth);

  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    };
  }, []);

  const isMobile = width <= MOBILE_TRESHOLD;

  return isMobile;
};
