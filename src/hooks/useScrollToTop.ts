import { RefObject, useCallback, useEffect, useState } from 'react';

type ScrollComplete<HTMLElement> = {
  ref: RefObject<HTMLElement>;
};

const THRESHOLD = 1;

export const useScrollToTop = ({ ref }: ScrollComplete<HTMLElement | null>) => {
  const [isScrolledToTop, setIsScrolledToTop] = useState(false);
  const onScroll: EventListener = useCallback(({ target }) => {
    const { scrollTop } = target as Element;

    setIsScrolledToTop(scrollTop < THRESHOLD);
  }, []);

  useEffect(() => {
    const targetElement = ref.current;

    if (targetElement) {
      targetElement.addEventListener('scroll', onScroll);

      return () => {
        targetElement.removeEventListener('scroll', onScroll);
      };
    }
  }, [onScroll, ref]);

  return { isScrolledToTop };
};
