const DISPLAY_NAME_MIN_LENGTH = 2;
const EMAIL_REGEX =
  /^[a-zA-Z0-9!#$%&'*+\-/=?^_`.{|}~]{1,64}@[a-z0-9.-]+\.[a-z]{2,64}$/;
const MAX_BIRTH_YEAR = new Date().getFullYear() - 17;
const MIN_BIRTH_YEAR = 1900;
const PASSWORD_MIN_LENGTH = 8;

export const validateBirthYear = (birthYear: number) => {
  if (birthYear < MIN_BIRTH_YEAR) return false;
  if (birthYear > MAX_BIRTH_YEAR) return false;
  return true;
};

export const validateDisplayNameLength = (displayName: string) =>
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
