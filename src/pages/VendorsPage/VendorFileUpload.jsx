import React, { useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import InputFileUpload from 'components/buttonUploadFile';
import { useFileUpload } from 'hooks/useFileUpload';
import { allXlsType } from 'utils/constants';
import { useParams } from 'react-router';
import { FETCH_SPECIFIC_VENDOR, UPLOAD_FILE_FOR_SPECIFIC_VENDOR } from 'api/apiEndpoints';
import { getItemFromLocalStorage } from 'utils/localStorageUtils';
import Unauthorized from 'components/Unauthorized/Unauthorized';
import { fileUploadErrorMessage } from 'utils/constants';
import { getData } from 'api/apiService';
import CircularProgress from '@mui/material/CircularProgress';
import VendoeFileUplodedTable from './VendoeFileUplodedTable';
import HandleInvalidVendorId from 'components/HandleInvalidVendorId';
import { useQuery, useQueryClient } from '@tanstack/react-query';

const VendorFileUpload = () => {
  const { files, handleFileChange, uploadFiles, clearFiles, isSuccess, isError, apiRes, isUploading } = useFileUpload({
    acceptFileType: allXlsType
  });

  const { id } = useParams();
  const userDetails = getItemFromLocalStorage('userTypeIs');
  const isUserTypeVendor = userDetails?.userTypeValue === 3;
  const queryClient = useQueryClient();

  useEffect(() => {
    document.title = 'Upload File';
  }, []);

  const { error, data: fetchVendorData } = useQuery({
    queryKey: ['fetchSpecificVendor'],
    queryFn: async () => {
      return await getData(FETCH_SPECIFIC_VENDOR(id));
    },
    retry: 0,
    enabled: !isUserTypeVendor
  });

  const handleUpload = () => {
    const uploadFileUrl = UPLOAD_FILE_FOR_SPECIFIC_VENDOR(id);
    uploadFiles(uploadFileUrl);
  };

  useEffect(() => {
    if (isError || isSuccess) {
      clearFiles();
      queryClient.invalidateQueries({ queryKey: ['fetchSpecificVendor'] });
    }
  }, [isError, isSuccess]);

  if (isUserTypeVendor && Number(id) !== userDetails?.vendorId) {
    return <Unauthorized />;
  }

  return (
    <HandleInvalidVendorId error={error}>
      <Box
        sx={{
          minHeight: '70vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          gap: '1rem'
        }}
      >
        <Typography variant="h4">{files?.[0]?.name}</Typography>
        {isUploading && (
          <Typography variant="h5">
            <CircularProgress size="20px" sx={{ transform: 'translateY(10px)' }} /> Uploading...
          </Typography>
        )}
        <InputFileUpload
          isUploading={isUploading}
          files={files}
          accept={allXlsType}
          handleFileChange={handleFileChange}
          handleUpload={handleUpload}
        />
        {isError && (
          <Typography variant="h4" color={'red'}>
            {isError === fileUploadErrorMessage(allXlsType) ? fileUploadErrorMessage(allXlsType) : isError}
          </Typography>
        )}
        {isSuccess && <VendoeFileUplodedTable statusMap={fetchVendorData?.data?.statusMap} data={apiRes?.data} />}
      </Box>
    </HandleInvalidVendorId>
  );
};

export default VendorFileUpload;
