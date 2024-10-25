import axiosInstance from './axiosInstance';

export const getData = async (url) => {
  const response = await axiosInstance.get(url);
  return response.data;
};

export const getDataWithHeaders = async (url) => {
  const response = await axiosInstance.get(url, {
    responseType: 'blob'
  });
  return response;
};

export const postData = async (url, data, options) => {
  const response = await axiosInstance.post(url, data, options);
  return response.data;
};

export const putData = async (url, data) => {
  const response = await axiosInstance.put(url, data);
  return response.data;
};

export const patchData = async (url, data) => {
  const response = await axiosInstance.patch(url, data);
  return response.data;
};

export const deleteData = async (url) => {
  const response = await axiosInstance.delete(url);
  return response.data;
};
