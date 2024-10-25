// apiService.test.js

import axiosInstance from '../../api/axiosInstance';
import { getData, postData, putData, deleteData } from '../../api/apiService';
import MockAdapter from 'axios-mock-adapter';

describe('Axios Instance and API Service', () => {
  let mock;

  beforeAll(() => {
    // Create a new instance of the mock adapter
    mock = new MockAdapter(axiosInstance);
  });

  afterEach(() => {
    // Reset any request history after each test
    mock.reset();
  });

  afterAll(() => {
    // Cleanup mock adapter after tests are done
    mock.restore();
  });

  describe('getData', () => {
    it('should fetch data successfully', async () => {
      const url = '/test';
      const mockData = { data: 'some data' };

      // Setup the mock to return a successful response
      mock.onGet(url).reply(200, mockData);

      const response = await getData(url);
      expect(response).toEqual(mockData);
    });

    it('should handle errors', async () => {
      const url = '/test';

      // Setup the mock to return an error response
      mock.onGet(url).reply(500);

      await expect(getData(url)).rejects.toThrow('Request failed with status code 500');
    });
  });

  describe('postData', () => {
    it('should post data successfully', async () => {
      const url = '/test';
      const postDataMock = { key: 'value' };
      const mockResponse = { success: true };

      // Setup the mock to return a successful response
      mock.onPost(url).reply(200, mockResponse);

      const response = await postData(url, postDataMock);
      expect(response).toEqual(mockResponse);
    });

    it('should handle post errors', async () => {
      const url = '/test';
      const postDataMock = { key: 'value' };

      // Setup the mock to return an error response
      mock.onPost(url).reply(400);

      await expect(postData(url, postDataMock)).rejects.toThrow('Request failed with status code 400');
    });
  });

  describe('putData', () => {
    it('should put data successfully', async () => {
      const url = '/test';
      const putDataMock = { key: 'value' };
      const mockResponse = { updated: true };

      // Setup the mock to return a successful response
      mock.onPut(url).reply(200, mockResponse);

      const response = await putData(url, putDataMock);
      expect(response).toEqual(mockResponse);
    });

    it('should handle put errors', async () => {
      const url = '/test';
      const putDataMock = { key: 'value' };

      // Setup the mock to return an error response
      mock.onPut(url).reply(400);

      await expect(putData(url, putDataMock)).rejects.toThrow('Request failed with status code 400');
    });
  });

  describe('deleteData', () => {
    it('should delete data successfully', async () => {
      const url = '/test';
      const mockResponse = { success: true };

      // Setup the mock to return a successful response
      mock.onDelete(url).reply(200, mockResponse);

      const response = await deleteData(url);
      expect(response).toEqual(mockResponse);
    });

    it('should handle delete errors', async () => {
      const url = '/test';

      // Setup the mock to return an error response
      mock.onDelete(url).reply(404);

      await expect(deleteData(url)).rejects.toThrow('Request failed with status code 404');
    });
  });
});
