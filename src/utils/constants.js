export const allXlsType = '.xlsx, .csv';

// Define user types mapping
export const userTypes = {
  1: { name: 'developer', value: 1 },
  2: { name: 'newJewelers', value: 2 },
  3: { name: 'vendor', value: 3 }
};

//file uploading error message
export const fileUploadErrorMessage = (acceptFileType) => `Only ${acceptFileType} file types are allowed!`;
