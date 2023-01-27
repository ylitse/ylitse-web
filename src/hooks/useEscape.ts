import { useEffect } from 'react';

export const useEscape = (onEscape: (...args: Array<unknown>) => void) => {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === 'escape') {
        onEscape();
      }
    };

    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, []);
};
