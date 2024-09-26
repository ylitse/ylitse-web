import {
  validateBirthYear,
  validateDisplayNameLength,
  validateEmail,
  validatePasswordLength,
} from './validators';

describe('Validation Functions', () => {
  describe('validateBirthYear', () => {
    it('should return false for a birth year less than MIN_BIRTH_YEAR', () => {
      expect(validateBirthYear(1899)).toBe(false);
    });

    it('should return false for a birth year greater than MAX_BIRTH_YEAR', () => {
      const futureBirthYear = new Date().getFullYear() - 16; // Younger than 17
      expect(validateBirthYear(futureBirthYear)).toBe(false);
    });

    it('should return true for a valid birth year within range', () => {
      expect(validateBirthYear(1990)).toBe(true);
    });
  });

  describe('validateDisplayNameLength', () => {
    it('should return false if display name length is less than DISPLAY_NAME_MIN_LENGTH', () => {
      expect(validateDisplayNameLength('A')).toBe(false);
    });

    it('should return true if display name length is greater than or equal to DISPLAY_NAME_MIN_LENGTH', () => {
      expect(validateDisplayNameLength('AB')).toBe(true);
    });
  });

  describe('validateEmail', () => {
    it('should return true for an empty email (optional field)', () => {
      expect(validateEmail('')).toBe(true);
    });

    it('should return true for a valid email', () => {
      expect(validateEmail('test@example.com')).toBeTruthy();
    });

    it('should return false for an invalid email', () => {
      expect(validateEmail('invalid-email')).toBeFalsy();
    });
  });

  describe('validatePasswordLength', () => {
    it('should return true if password is not touched', () => {
      expect(validatePasswordLength('123', false)).toBe(true);
    });

    it('should return false if password length is less than PASSWORD_MIN_LENGTH and isTouched is true', () => {
      expect(validatePasswordLength('short', true)).toBe(false);
    });

    it('should return true if password length is greater than or equal to PASSWORD_MIN_LENGTH and isTouched is true', () => {
      expect(validatePasswordLength('longenough', true)).toBe(true);
    });
  });
});
