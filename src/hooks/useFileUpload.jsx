import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { postData } from 'api/apiService';
import { useSnackbar } from 'notistack';
import { fileUploadErrorMessage } from 'utils/constants';
import { handleFileDownload } from 'utils';

const submitFormData = async ({ url, formData }) => {
  const response = await postData(url, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return response;
};

const useFileUpload = ({ acceptFileType } = {}) => {
  const [files, setFiles] = useState([]);
  const [apiRes, setApiRes] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isError, setIsError] = useState(null);
  const { enqueueSnackbar: snack } = useSnackbar();

  const { mutate, isSuccess } = useMutation({
    mutationFn: submitFormData,
    onSuccess: (res) => {
      snack('File upload success!', { variant: 'success' });
      setApiRes(res);
      setIsUploading(false);
      setIsError(null);
      console.log('File upload success!');
    },
    onError: (error) => {
      const { response } = error;
      setIsUploading(false);
      const errorMessage = response?.data?.msg || response.headers?.['x-message'] || 'File Upload failed!';
      snack(errorMessage, { variant: 'error' });
      setApiRes(null);
      setIsError(errorMessage);
      if (response.status === 501) {
        handleFileDownload(response);
      }
    }
  });

  const handleFileChange = (event) => {
    if (!event.target.files) return;
    const fileList = event.target.files;
    setIsError(null);
    try {
      const acceptedTypes = acceptFileType?.split(',')?.map((v) => v.trim().replace('.', ''));
      const fileExtension = fileList[0].name.split('.').pop().toLowerCase();
      if (!acceptedTypes?.includes(fileExtension)) {
        throw new Error(fileUploadErrorMessage(acceptFileType));
      }
    } catch (error) {
      console.error(error.message);
      setIsError(error.message);
      return;
    }
    const fileArray = Array.from(fileList);
    setFiles(fileArray);
  };

  const uploadFiles = (url) => {
    setIsUploading(true);
    files.forEach((file) => {
      console.log(`Uploading file: ${file.name}`);

      const formData = new FormData();
      formData.append('file', file);

      mutate({ formData, url });
    });
  };

  const clearFiles = () => {
    setIsUploading(false);
    setFiles([]);
  };

  return {
    files,
    handleFileChange,
    isUploading,
    uploadFiles,
    clearFiles,
    isSuccess,
    setFiles,
    isError,
    apiRes
  };
};

export { useFileUpload };
