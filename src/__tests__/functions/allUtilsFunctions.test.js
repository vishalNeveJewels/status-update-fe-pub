// utils.test.js

import { getCookie, setCookie, isValidEmail, generateUniqueId, isValidPassword, validateFormats } from '../../utils';

describe('Utility Functions', () => {
  beforeEach(() => {
    // Clear all cookies before each test
    document.cookie = '';
  });

  describe('getCookie', () => {
    it('should return null if the cookie does not exist', () => {
      expect(getCookie('nonexistent')).toBeNull();
    });

    it('should return the value of an existing cookie', () => {
      setCookie('test', 'value');
      expect(getCookie('test')).toBe('value');
    });

    it('should handle cookies with special characters', () => {
      setCookie('special', 'value@#%');
      expect(getCookie('special')).toBe('value@#%');
    });
  });

  describe('setCookie', () => {
    beforeEach(() => {
      // Clear all cookies before each test
      document.cookie = '';
    });

    it('should create a cookie with the correct value', () => {
      setCookie('test', 'value');
      expect(document.cookie).toContain('test=value');
    });

    it('should create a cookie with the correct path', () => {
      setCookie('test', 'value', 7, '/testpath');
      expect(document.cookie).toContain('test=value');
    });
  });

  describe('isValidEmail', () => {
    it('should return true for valid email addresses', () => {
      expect(isValidEmail('test@example.com')).toBe(true);
      expect(isValidEmail('user.name+tag+sorting@example.com')).toBe(true);
    });

    it('should return false for invalid email addresses', () => {
      expect(isValidEmail('plainaddress')).toBe(false);
      expect(isValidEmail('@missingusername.com')).toBe(false);
      expect(isValidEmail('user@.com')).toBe(false);
      expect(isValidEmail('user@domain')).toBe(false);
    });
  });

  describe('generateUniqueId', () => {
    it('should generate a unique ID', () => {
      const id1 = generateUniqueId();
      const id2 = generateUniqueId();
      expect(id1).not.toBe(id2);
      expect(id1.startsWith('id_')).toBe(true);
      expect(id2.startsWith('id_')).toBe(true);
    });

    it('should generate an ID that has a consistent format', () => {
      const id = generateUniqueId();
      expect(id).toMatch(/^id_[a-z0-9]{13}$/);
    });
  });

  describe('isValidPassword', () => {
    test('should return false if password is shorter than 5 characters', () => {
      expect(isValidPassword('1234')).toBe(false);
    });

    test('should return false if password does not contain a special character', () => {
      expect(isValidPassword('abcdE')).toBe(false);
    });

    test('should return true for a valid password with special characters', () => {
      expect(isValidPassword('aB1#fG')).toBe(true);
    });

    test('should return true for a valid password with special characters and length >= 5', () => {
      expect(isValidPassword('a@Bc1D')).toBe(true);
    });
  });

  describe('validateFormats', () => {
    const mockErrorCallback = jest.fn();

    test('should call error callback if an invalid file extension is found', () => {
      const validExtensions = ['.jpg', '.png'];
      const files = [{ name: 'image1.jpg' }, { name: 'image2.png' }, { name: 'document.pdf' }];

      const result = validateFormats(validExtensions, files, mockErrorCallback);

      expect(result).toEqual([{ name: 'image1.jpg' }, { name: 'image2.png' }]);
      expect(mockErrorCallback).toHaveBeenCalledWith('Please upload these typed files .jpg,.png');
    });

    test('should return null if no valid files are found', () => {
      const validExtensions = ['.jpg', '.png'];
      const files = [{ name: 'document.pdf' }, { name: 'spreadsheet.xls' }];

      const result = validateFormats(validExtensions, files, mockErrorCallback);

      expect(result).toBeNull();
      expect(mockErrorCallback).toHaveBeenCalledWith('Please upload these typed files .jpg,.png');
    });
  });
});
