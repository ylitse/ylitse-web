import { Status } from '@/features/MentorPage/components/MentorList/MentorCard/List/Tag';

export const capitalize = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1);

export const getIsOlderThanDaysAgo = (daysAgo: number, compareTime: number) => {
  const timestampDaysAgo = new Date().getTime() - daysAgo * 24 * 60 * 60 * 1000;
  return compareTime > timestampDaysAgo;
};

export const getStatus = (
  isMe: boolean,
  isAvailable: boolean,
  isNew: boolean,
): Status => {
  if (isMe) {
    return 'me';
  }
  if (!isAvailable) {
    return 'unavailable';
  }
  if (isNew) {
    return 'new';
  }
  return 'empty';
};

// TODO: Add a test for this
export const getCookie = (key: string) => {
  var pattern = RegExp(key + '=.[^;]*');
  var matched = document.cookie.match(pattern);
  if (matched) {
    var cookie = matched[0].split('=');
    return cookie[1];
  }
  return false;
};

const PAST_DATE = 'Thu, 01 Jan 1970 00:00:00 UTC';
export const removeCookie = (key: string) => {
  document.cookie = `${key}=; expires ${PAST_DATE}; path=/;`;
};
