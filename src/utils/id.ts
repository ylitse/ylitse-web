import { uid } from 'uid';

export const createUniqueId = (): string => {
  return uid();
};
