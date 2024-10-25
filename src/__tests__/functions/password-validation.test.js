import { isNumber, isLowercaseChar, isUppercaseChar, isSpecialChar, minLength } from '../../utils/password-validation';

describe('Validator Functions', () => {
  describe('isNumber', () => {
    test('should return true for strings containing numbers', () => {
      expect(isNumber('abc123')).toBe(true);
      expect(isNumber('123')).toBe(true);
    });

    test('should return false for strings without numbers', () => {
      expect(isNumber('abc')).toBe(false);
      expect(isNumber('')).toBe(false);
    });
  });

  describe('isLowercaseChar', () => {
    test('should return true for strings containing lowercase letters', () => {
      expect(isLowercaseChar('abc')).toBe(true);
      expect(isLowercaseChar('abc123')).toBe(true);
    });

    test('should return false for strings without lowercase letters', () => {
      expect(isLowercaseChar('ABC')).toBe(false);
      expect(isLowercaseChar('123')).toBe(false);
      expect(isLowercaseChar('')).toBe(false);
    });
  });

  describe('isUppercaseChar', () => {
    test('should return true for strings containing uppercase letters', () => {
      expect(isUppercaseChar('ABC')).toBe(true);
      expect(isUppercaseChar('abc123ABC')).toBe(true);
    });

    test('should return false for strings without uppercase letters', () => {
      expect(isUppercaseChar('abc')).toBe(false);
      expect(isUppercaseChar('123')).toBe(false);
      expect(isUppercaseChar('')).toBe(false);
    });
  });

  describe('isSpecialChar', () => {
    test('should return true for strings containing special characters', () => {
      expect(isSpecialChar('!@#')).toBe(true);
      expect(isSpecialChar('abc123!')).toBe(true);
    });

    test('should return false for strings without special characters', () => {
      expect(isSpecialChar('abc')).toBe(false);
      expect(isSpecialChar('ABC123')).toBe(false);
      expect(isSpecialChar('')).toBe(false);
    });
  });

  describe('minLength', () => {
    test('should return true for strings longer than 7 characters', () => {
      expect(minLength('abcdefg1')).toBe(true);
      expect(minLength('12345678')).toBe(true);
    });

    test('should return false for strings 7 characters or shorter', () => {
      expect(minLength('abcdefg')).toBe(false);
      expect(minLength('1234567')).toBe(false);
      expect(minLength('')).toBe(false);
    });
  });
});
