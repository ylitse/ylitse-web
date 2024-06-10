import mockNotices from './mock.json';

export type Notice = {
  id: number;
  message: string;
};

export const fetchNotices = (): Notice[] => {
  const data = mockNotices.notices as Notice[];
  return data;
};
