import React, { useEffect } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import InputFileUpload from 'components/buttonUploadFile';
import { useFileUpload } from 'hooks/useFileUpload';
import { COLUMN_FIELDS_GET, UPLOAD_FILE_FOR_COLUMN_MAP } from 'api/apiEndpoints';
import { useParams } from 'react-router';
import { allXlsType } from 'utils/constants';
import { useQuery } from '@tanstack/react-query';
import { getData } from 'api/apiService';
import ColumnMapContainer from './ColumnMapContainer';
import CircularProgress from '@mui/material/CircularProgress';
import HandleInvalidVendorId from 'components/HandleInvalidVendorId';

export const getColumnData = async (vendor_id) => {
  return await getData(COLUMN_FIELDS_GET(vendor_id));
};

export const ColumnMapVendor = () => {
  const { files, handleFileChange, uploadFiles, isSuccess, isError, isUploading } = useFileUpload({ acceptFileType: allXlsType });
  const { id } = useParams();

  useEffect(() => {
    document.title = 'Map Columns';
  }, []);

  const {
    data: columnApiRes,
    refetch,
    error
  } = useQuery({
    queryKey: ['getColumns', id],
    fetchPolicy: 'no-cache',
    retry: 0,
    queryFn: () => getColumnData(id)
  });

  const handleUpload = () => {
    const uploadFileUrl = UPLOAD_FILE_FOR_COLUMN_MAP(id);
    uploadFiles(uploadFileUrl);
  };

  useEffect(() => {
    if (isSuccess) {
      refetch();
    }
  }, [isSuccess, refetch]);

  const isFieldsExists = columnApiRes?.data && Object.keys(columnApiRes?.data || {})?.length;

  return (
    <HandleInvalidVendorId error={error}>
      <Grid container>
        <Grid item xs={12}>
          {isFieldsExists ? (
            <ColumnMapContainer columnApiRes={columnApiRes} />
          ) : (
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
              <InputFileUpload files={files} accept={allXlsType} handleFileChange={handleFileChange} handleUpload={handleUpload} />
              {isError && (
                <Typography variant="h4" color={'red'}>
                  {isError}
                </Typography>
              )}
            </Box>
          )}
        </Grid>
      </Grid>
    </HandleInvalidVendorId>
  );
};
