import React from 'react';

const VISIBILITY_THRESHOLD_TIME = 1000;

export const useIsVisible = <T extends HTMLElement>(
  ref: React.MutableRefObject<T | null>,
) => {
  const [isIntersecting, setIntersecting] = React.useState(false);
  const timerRef = React.useRef<NodeJS.Timeout | null>(null);

  React.useEffect(() => {
    if (!ref.current) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Start a timer when the element becomes visible
          timerRef.current = setTimeout(() => {
            setIntersecting(true);
          }, VISIBILITY_THRESHOLD_TIME);
        } else {
          // Clear the timer and reset visibility when the element is not visible
          if (timerRef.current) {
            clearTimeout(timerRef.current);
            timerRef.current = null;
          }
          setIntersecting(false);
        }
      },
      // The elemenet should be 100% visible
      { threshold: 1.0 },
    );

    observer.observe(ref.current);

    // Cleanup
    return () => {
      observer.disconnect();
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [ref]);

  return isIntersecting;
};
