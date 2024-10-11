import {
  validateBirthYear,
  validateIsDisplayNameInvalid,
  validateIsDisplayNameTooLong,
  validateIsDisplayNameTooShort,
  validateEmail,
  validatePasswordLength,
  validateIsRegionTooLong,
  validateIsStatusMessageTooLong,
  validateIsStoryTooLong,
} from './validators';

describe('Validation Functions', () => {
  // Test birth year validation
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

  // Test display name validation
  describe('validateIsDisplayNameInvalid', () => {
    test('returns true for valid display name', () => {
      expect(validateIsDisplayNameInvalid('Valid_Name123')).toBe(true);
    });

    test('returns false for invalid display name', () => {
      expect(validateIsDisplayNameInvalid('Invalid@Name')).toBe(false);
    });
  });

  describe('validateIsDisplayNameTooLong', () => {
    test('returns true when display name is within the max length', () => {
      expect(validateIsDisplayNameTooLong('ShortName')).toBe(true);
    });

    test('returns false when display name exceeds max length', () => {
      expect(validateIsDisplayNameTooLong('A'.repeat(31))).toBe(false);
    });
  });

  describe('validateIsDisplayNameTooShort', () => {
    test('returns true when display name is above the minimum length', () => {
      expect(validateIsDisplayNameTooShort('AB')).toBe(true);
    });

    test('returns false when display name is too short', () => {
      expect(validateIsDisplayNameTooShort('A')).toBe(false);
    });
  });

  // Test email validation
  describe('validateEmail', () => {
    it('should return true for an empty email (optional field)', () => {
      expect(validateEmail('')).toBe(true);
    });

    [
      '',
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

  // Test password length validation
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

  // Test region length validation
  describe('validateIsRegionTooLong', () => {
    test('returns true when region length is within limit', () => {
      expect(validateIsRegionTooLong('Some region name')).toBe(true);
    });

    test('returns false when region length exceeds limit', () => {
      expect(validateIsRegionTooLong('A'.repeat(101))).toBe(false);
    });
  });

  // Test status message length validation
  describe('validateIsStatusMessageTooLong', () => {
    test('returns true when status message is within limit', () => {
      expect(validateIsStatusMessageTooLong('This is a status message.')).toBe(
        true,
      );
    });

    test('returns false when status message exceeds limit', () => {
      expect(validateIsStatusMessageTooLong('A'.repeat(2001))).toBe(false);
    });
  });

  // Test story length validation
  describe('validateIsStoryTooLong', () => {
    test('returns true when story is within limit', () => {
      expect(validateIsStoryTooLong('This is a short story.')).toBe(true);
    });

    test('returns false when story exceeds limit', () => {
      expect(validateIsStoryTooLong('A'.repeat(2001))).toBe(false);
    });
  });
});
