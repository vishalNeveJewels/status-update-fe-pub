export const LOGIN_USER = `api/home/login`;
export const REGISTER_USER = 'api/home/register';
export const FORGOT_PASSWORD = '/api/home/forgot-password';
export const RESET_PASSWORD = '/api/home/reset-password';
// export const COLUMN_FIELDS_GET = '/api/vendor/column-map/';
export const COLUMN_FIELDS_GET = (vendorId) => `api/vendor/column-map/${vendorId}`;
export const COLUMN_FIELDS_UPDATE = (vendorId) => `api/vendor/update-column-map/${vendorId}`;
export const COLUMN_FIELDS_RESET = (vendorId) => `api/vendor/reset-vendor-mapping/${vendorId}`;
export const VENDOR_STATUS_MAP_UPDATE = (vendorId) => `api/vendor/update-status-map/${vendorId}`;
export const FETCH_ALL_VENDORS = (page, size, sortField, sortOrder) =>
  `api/vendor/all-vendors?page=${page}&size=${size}&sortFields=${sortField}&sortOrders=${sortOrder}`;
export const FETCH_SPECIFIC_VENDOR = (vendorId) => `api/vendor/get-by-id/${vendorId}`;
export const UPLOAD_FILE_FOR_SPECIFIC_VENDOR = (vendorId) => `api/vendor/${vendorId}/upload`;
export const UPLOAD_FILE_FOR_COLUMN_MAP = (vendorId) => `/api/vendor/${vendorId}/upload-vendor-file-template`;
export const VENDOR_REGISTER_USER = `api/vendor/register`;
export const SEARCH_VENDORS = (vendor) => `api/vendor/get-details-from-admin/${vendor}`;
export const FETCH_SPECIFIC_VENDOR_FILE_HISTORY = (vendorId) => `api/vendor/file-history/${vendorId}`;
export const DOWNLOAD_SPECIFIC_VENDOR_FILE = ({ vendorId, fileName }) => `/api/vendor/file-download/${vendorId}/${fileName}`;
