import { useState, useEffect, useRef } from 'react';
import { useEscape } from './useEscape';

export const useComponentVisible = <
  A extends HTMLButtonElement | HTMLDivElement,
>(
  initialIsVisible: boolean,
) => {
  const [isComponentVisible, setIsComponentVisible] =
    useState(initialIsVisible);
  const ref = useRef<A>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setIsComponentVisible(false);
    }
  };

  useEscape(() => setIsComponentVisible(false));

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);

  return { ref, isComponentVisible, setIsComponentVisible };
};
