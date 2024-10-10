const DISPLAY_NAME_MAX_LENGTH = 30;
const DISPLAY_NAME_MIN_LENGTH = 2;
const DISPLAY_NAME_REGEX = /^[\u00C0-\u017FA-zA-Z'0-9-_]{3,35}$/;
const EMAIL_REGEX =
  /^[a-zA-Z0-9!#$%&'*+\-/=?^_`.{|}~]{1,64}@[a-z0-9.-]+\.[a-z]{2,64}$/;
const MAX_BIRTH_YEAR = new Date().getFullYear() - 17;
const MIN_BIRTH_YEAR = 1900;
const PASSWORD_MIN_LENGTH = 8;
const REGION_MAX_LENGTH = 100;
const STATUS_MESSAGE_MAX_LENGTH = 2000;
const STORY_MAX_LENGTH = 2000;

export const validateBirthYear = (birthYear: number) => {
  if (birthYear < MIN_BIRTH_YEAR) return false;
  if (birthYear > MAX_BIRTH_YEAR) return false;
  return true;
};

export const validateIsDisplayNameInvalid = (displayName: string) =>
  DISPLAY_NAME_REGEX.test(displayName);

export const validateIsDisplayNameTooLong = (displayName: string) =>
  displayName.length <= DISPLAY_NAME_MAX_LENGTH;

export const validateIsDisplayNameTooShort = (displayName: string) =>
  displayName.length >= DISPLAY_NAME_MIN_LENGTH;

export const validateEmail = (email: string) => {
  if (email.length === 0) return true;
  if (email.length > 320) return false;
  return EMAIL_REGEX.test(email);
};

export const validatePasswordLength = (
  password: string,
  isTouched: boolean,
) => {
  if (!isTouched) return true;
  return password.length >= PASSWORD_MIN_LENGTH;
};

export const validateIsRegionTooLong = (region: string) =>
  region.length <= REGION_MAX_LENGTH;

export const validateIsStatusMessageTooLong = (statusMessage: string) =>
  statusMessage.length <= STATUS_MESSAGE_MAX_LENGTH;

export const validateIsStoryTooLong = (story: string) =>
  story.length <= STORY_MAX_LENGTH;
