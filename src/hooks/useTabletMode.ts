import { useState, useEffect } from 'react';
import { TABLET_TRESHOLD } from '@/components/variables';

export const useTabletMode = () => {
  const [width, setWidth] = useState<number>(window.innerWidth);

  const handleWindowSizeChange = () => setWidth(window.innerWidth);

  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    };
  }, []);

  const isTablet = width <= TABLET_TRESHOLD;

  return isTablet;
};
