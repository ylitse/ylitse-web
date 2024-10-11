import {
  isDisplayNameTooLong,
  isDisplayNameTooShort,
  isPasswordTooShort,
  isRegionTooLong,
  isStatusMessageTooLong,
  isStoryTooLong,
  validateBirthYear,
  validateEmail,
} from './validators';

describe('Validators', () => {
  describe('isDisplayNameTooLong', () => {
    it('should return true if the display name is too long', () => {
      expect(isDisplayNameTooLong('A'.repeat(31))).toBe(true);
    });

    it('should return false if the display name is within the limit', () => {
      expect(isDisplayNameTooLong('A'.repeat(30))).toBe(false);
    });
  });

  describe('isDisplayNameTooShort', () => {
    it('should return true if the display name is too short', () => {
      expect(isDisplayNameTooShort('A')).toBe(true);
    });

    it('should return false if the display name is within the limit', () => {
      expect(isDisplayNameTooShort('AA')).toBe(false);
    });
  });

  describe('isPasswordTooShort', () => {
    it('should return false if the field has not been touched', () => {
      expect(isPasswordTooShort('short', false)).toBe(false);
    });

    it('should return true if the password is too short and touched', () => {
      expect(isPasswordTooShort('short', true)).toBe(true);
    });

    it('should return false if the password length is sufficient and touched', () => {
      expect(isPasswordTooShort('longenough', true)).toBe(false);
    });
  });
  describe('isRegionTooLong', () => {
    it('should return true if the region is too long', () => {
      expect(isRegionTooLong('A'.repeat(101))).toBe(true);
    });

    it('should return false if the region is within the limit', () => {
      expect(isRegionTooLong('A'.repeat(100))).toBe(false);
    });
  });

  describe('isStatusMessageTooLong', () => {
    it('should return true if the status message is too long', () => {
      expect(isStatusMessageTooLong('A'.repeat(2001))).toBe(true);
    });

    it('should return false if the status message is within the limit', () => {
      expect(isStatusMessageTooLong('A'.repeat(2000))).toBe(false);
    });
  });

  describe('isStoryTooLong', () => {
    it('should return true if the story is too long', () => {
      expect(isStoryTooLong('A'.repeat(2001))).toBe(true);
    });

    it('should return false if the story is within the limit', () => {
      expect(isStoryTooLong('A'.repeat(2000))).toBe(false);
    });
  });

  describe('validateBirthYear', () => {
    const currentYear = new Date().getFullYear();

    it('should return false if birth year is too old', () => {
      expect(validateBirthYear(1899)).toBe(false);
    });

    it('should return false if birth year is too recent', () => {
      expect(validateBirthYear(currentYear - 16)).toBe(false);
    });

    it('should return true for a valid birth year', () => {
      expect(validateBirthYear(currentYear - 18)).toBe(true);
    });
  });

  describe('validateEmail', () => {
    it('should return true for an empty email', () => {
      expect(validateEmail('')).toBe(true);
    });

    [
      'email@example.com',
      'firstname.lastname@example.com',
      'email@subdomain.example.com',
      'firstname+lastname@example.com',
      '1234567890@example.com',
      'email@example-one.com',
      '_______@example.com',
      'email@example.name',
      'email@example.museum',
      'email@example.co.jp',
      'firstname-lastname@example.com',
      "!#$%&'*+-/=?^_`.{|}~@kebab.fi",
      `${'x'.repeat(63)}@${'e'.repeat(191)}.${'f'.repeat(62)}`,
    ].forEach(validEmail => {
      it(`should return true for valid email ${validEmail}`, () => {
        expect(validateEmail(validEmail)).toEqual(true);
      });
    });

    [
      'plainaddress',
      '#@%^%#$@#$@#.com',
      '@example.com',
      'Joe Smith <email@example.com>',
      'email.example.com',
      'email@example@example.com',
      'あいうえお@example.com',
      'email@example.com (Joe Smith)',
      'email@example',
      'email@111.222.333.44444',
      'a',
      `${'x'.repeat(400)}@example.org`,
    ].forEach(invalidEmail => {
      it(`should return false for invalid email ${invalidEmail}`, () => {
        expect(validateEmail(invalidEmail)).toEqual(false);
      });
    });
  });
});
