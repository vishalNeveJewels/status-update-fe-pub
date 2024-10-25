import { strengthColor, strengthIndicator } from '../../utils/password-strength'; // Update the path to your module

// Define the helper functions for testing
const hasNumber = (number) => new RegExp(/[0-9]/).test(number);
const hasMixed = (number) => new RegExp(/[a-z]/).test(number) && new RegExp(/[A-Z]/).test(number);
const hasSpecial = (number) => new RegExp(/[!#@$%^&*)(+=._-]/).test(number);

describe('Password Validator Functions', () => {
  describe('hasNumber', () => {
    test('should return true for strings containing numbers', () => {
      expect(hasNumber('abc123')).toBe(true);
      expect(hasNumber('123')).toBe(true);
      expect(hasNumber('abc!')).toBe(false);
      expect(hasNumber('')).toBe(false);
    });
  });

  describe('hasMixed', () => {
    test('should return true for strings containing both lowercase and uppercase letters', () => {
      expect(hasMixed('abcXYZ')).toBe(true);
      expect(hasMixed('abc')).toBe(false);
      expect(hasMixed('XYZ')).toBe(false);
      expect(hasMixed('123')).toBe(false);
      expect(hasMixed('')).toBe(false);
    });
  });

  describe('hasSpecial', () => {
    test('should return true for strings containing special characters', () => {
      expect(hasSpecial('abc@123')).toBe(true);
      expect(hasSpecial('abc123')).toBe(false);
      expect(hasSpecial('')).toBe(false);
      expect(hasSpecial('abcXYZ')).toBe(false);
    });
  });

  describe('strengthColor', () => {
    test('should return the correct label and color based on strength count', () => {
      expect(strengthColor(0)).toEqual({ label: 'Poor', color: 'error.main' });
      expect(strengthColor(1)).toEqual({ label: 'Poor', color: 'error.main' });
      expect(strengthColor(2)).toEqual({ label: 'Weak', color: 'warning.main' }); // Corrected this line
      expect(strengthColor(3)).toEqual({ label: 'Normal', color: 'warning.dark' });
      expect(strengthColor(4)).toEqual({ label: 'Good', color: 'success.main' });
      expect(strengthColor(5)).toEqual({ label: 'Strong', color: 'success.dark' });
      expect(strengthColor(6)).toEqual({ label: 'Strong', color: 'success.dark' }); // Testing for >=6
    });
  });

  describe('strengthIndicator', () => {
    test('should return the correct strength count based on password criteria', () => {
      expect(strengthIndicator('abc')).toBe(0); // less than 6 characters
      expect(strengthIndicator('abc123')).toBe(2); // length > 5, has number
      expect(strengthIndicator('abcdefg')).toBe(1); // length > 5
      expect(strengthIndicator('abcdEF')).toBe(2); // has mixed case
      expect(strengthIndicator('abcdef@')).toBe(2); // has special char
      expect(strengthIndicator('abcD123@')).toBe(5); // length > 7, has number, mixed case, and special char
      expect(strengthIndicator('')).toBe(0); // empty string
    });
  });
});
