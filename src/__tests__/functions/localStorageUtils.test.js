// localStorageUtils.test.js

import { setItemInLocalStorage, getItemFromLocalStorage, removeItemFromLocalStorage } from '../../utils/localStorageUtils';

describe('Local Storage Utils', () => {
  // Mock the localStorage methods before each test
  beforeEach(() => {
    jest.clearAllMocks(); // Clear any previous mocks
    Object.defineProperty(window, 'localStorage', {
      value: {
        setItem: jest.fn(),
        getItem: jest.fn(),
        removeItem: jest.fn(),
        clear: jest.fn()
      },
      writable: true
    });
  });

  describe('setItemInLocalStorage', () => {
    it('should set a string item in localStorage', () => {
      const key = 'testKey';
      const value = 'testValue';
      setItemInLocalStorage(key, value);
      expect(localStorage.setItem).toHaveBeenCalledWith(key, value);
    });

    it('should set a non-string item in localStorage', () => {
      const key = 'testObject';
      const value = { a: 1, b: 2 };
      setItemInLocalStorage(key, value);
      expect(localStorage.setItem).toHaveBeenCalledWith(key, JSON.stringify(value));
    });

    it('should log an error if setting fails', () => {
      const key = 'testKey';
      const value = 'testValue';
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

      // Mock localStorage.setItem to throw an error
      localStorage.setItem.mockImplementation(() => {
        throw new Error('Failed to set item');
      });

      setItemInLocalStorage(key, value);
      expect(consoleSpy).toHaveBeenCalledWith(`Error setting localStorage item ${key}:`, expect.any(Error));

      consoleSpy.mockRestore();
    });
  });

  describe('getItemFromLocalStorage', () => {
    it('should get a parsed item from localStorage', () => {
      const key = 'testKey';
      const value = { a: 1, b: 2 };
      localStorage.getItem.mockReturnValueOnce(JSON.stringify(value));

      const result = getItemFromLocalStorage(key);
      expect(result).toEqual(value);
    });

    it('should return null if the item does not exist', () => {
      localStorage.getItem.mockReturnValueOnce(null);
      const result = getItemFromLocalStorage('nonExistentKey');
      expect(result).toBeNull();
    });

    it('should log an error if getting fails', () => {
      const key = 'testKey';
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

      // Mock localStorage.getItem to throw an error
      localStorage.getItem.mockImplementation(() => {
        throw new Error('Failed to get item');
      });

      const result = getItemFromLocalStorage(key);
      expect(result).toBeNull();
      expect(consoleSpy).toHaveBeenCalledWith(`Error getting localStorage item ${key}:`, expect.any(Error));

      consoleSpy.mockRestore();
    });
  });

  describe('removeItemFromLocalStorage', () => {
    it('should remove an item from localStorage', () => {
      const key = 'testKey';
      removeItemFromLocalStorage(key);
      expect(localStorage.removeItem).toHaveBeenCalledWith(key);
    });

    it('should log an error if removing fails', () => {
      const key = 'testKey';
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

      // Mock localStorage.removeItem to throw an error
      localStorage.removeItem.mockImplementation(() => {
        throw new Error('Failed to remove item');
      });

      removeItemFromLocalStorage(key);
      expect(consoleSpy).toHaveBeenCalledWith(`Error removing localStorage item ${key}:`, expect.any(Error));

      consoleSpy.mockRestore();
    });
  });
});
