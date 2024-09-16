import { useLayoutEffect, useMemo, useRef } from 'react';

export const useDebounce = (
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  callback: (...args: any[]) => void,
  delay: number,
) => {
  const callbackRef = useRef(callback);

  useLayoutEffect(() => {
    callbackRef.current = callback;
  });

  let timer: undefined | ReturnType<typeof setTimeout>;

  const naiveDebounce = (
    func: (...args: unknown[]) => void,
    delayMs: number,
    ...args: unknown[]
  ) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, delayMs);
  };

  return useMemo(
    () =>
      (...args: unknown[]) =>
        naiveDebounce(callbackRef.current, delay, ...args),
    [delay],
  );
};
