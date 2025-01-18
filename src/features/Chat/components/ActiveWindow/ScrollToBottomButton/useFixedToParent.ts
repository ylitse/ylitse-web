import { useEffect } from 'react';

export const useFixedToParent = (
  parentRef: React.RefObject<HTMLDivElement>,
  childRef: React.RefObject<HTMLDivElement>,
  offsets = { bottom: 20, right: 20 },
) => {
  useEffect(() => {
    const updatePosition = () => {
      if (!parentRef.current || !childRef.current) return;

      const parentRect = parentRef.current.getBoundingClientRect();
      const { bottom, right } = offsets;

      childRef.current.style.position = 'fixed';
      childRef.current.style.bottom = `${window.innerHeight - parentRect.bottom + bottom}px`;
      childRef.current.style.right = `${window.innerWidth - parentRect.right + right}px`;
    };

    updatePosition();

    const parent = parentRef.current;
    parent?.addEventListener('scroll', updatePosition);

    window.addEventListener('resize', updatePosition);

    return () => {
      parent?.removeEventListener('scroll', updatePosition);
      window.removeEventListener('resize', updatePosition);
    };
  }, [parentRef, childRef, offsets]);
};
