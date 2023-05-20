import { RefObject, useCallback, useEffect } from 'react';

type ScrollComplete<HTMLElement> = {
  ref: RefObject<HTMLElement>;
  callback: () => void;
};

const THRESHOLD = 1;

export const useScrollCompleteCallback = ({
  ref,
  callback,
}: ScrollComplete<HTMLElement | null>) => {
  const onScroll: EventListener = useCallback(({ target }) => {
    const { scrollTop } = target as Element;
    if (scrollTop < THRESHOLD) {
      callback();
    }
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
};
