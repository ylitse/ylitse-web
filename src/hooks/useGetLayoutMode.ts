import { useState, useEffect } from 'react';
import { TABLET_TRESHOLD, MOBILE_TRESHOLD } from '@/components/constants';

/**
 * Checks the width of screen and returns flags for size
 *
 * isTablet: if screen is smaller or equal than TABLET_THRESHOLD
 * isMobile: if screen is smaller or equal than MOBILE_THRESHOLD
 */
export const useGetLayoutMode = () => {
  const [width, setWidth] = useState<number>(window.innerWidth);

  const handleWindowSizeChange = () => setWidth(window.innerWidth);

  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    };
  }, []);

  const isTablet = width <= TABLET_TRESHOLD;
  const isMobile = width <= MOBILE_TRESHOLD;

  return { isTablet, isMobile };
};
