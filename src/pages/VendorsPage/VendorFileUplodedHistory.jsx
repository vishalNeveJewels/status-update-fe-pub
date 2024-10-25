import React from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getData, getDataWithHeaders } from 'api/apiService';
import { DOWNLOAD_SPECIFIC_VENDOR_FILE, FETCH_SPECIFIC_VENDOR_FILE_HISTORY } from 'api/apiEndpoints';
import { useParams } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import HandleInvalidVendorId from 'components/HandleInvalidVendorId';
import { useSnackbar } from 'notistack';
import { handleFileDownload } from 'utils';

const headerCells = [
  {
    align: 'left',
    disablePadding: false,
    label: 'File Name'
  },
  {
    align: 'left',
    disablePadding: false,
    label: 'Date'
  },
  {
    align: 'left',
    disablePadding: false,
    label: 'Time'
  }
];

const submitFormData = async ({ vendorId, fileName }) => {
  const response = await getDataWithHeaders(DOWNLOAD_SPECIFIC_VENDOR_FILE({ vendorId, fileName }));
  return response;
};

const VendorFileUplodedHistory = () => {
  const { id } = useParams();
  const { enqueueSnackbar: snack } = useSnackbar();

  const { data: fetchedUplodedFileHistoryData, error } = useQuery({
    queryKey: ['fetchSpecificVendorUplodedFileHistory', id],
    retry: 0,
    queryFn: async () => {
      return await getData(FETCH_SPECIFIC_VENDOR_FILE_HISTORY(id));
    }
  });

  const { mutate } = useMutation({
    mutationFn: submitFormData,
    onSuccess: (response) => {
      snack('File download success!', { variant: 'success' });
      handleFileDownload(response);
    },
    onError: (error) => {
      const { response } = error;
      const errorMessage = response?.data?.msg || response.headers?.['x-message'] || 'File download failed!';
      snack(errorMessage, { variant: 'error' });
    }
  });

  const handleTableRowClick = (row) => {
    mutate({ fileName: row.originalFilename, vendorId: id });
  };

  return (
    <HandleInvalidVendorId error={error}>
      <div
        style={{
          margin: '1rem',
          backgroundColor: 'white'
        }}
      >
        <TableContainer
          sx={{
            width: '100%',
            overflowX: 'auto',
            position: 'relative',
            display: 'block',
            maxWidth: '100%',
            '& td, & th': { whiteSpace: 'nowrap' }
          }}
        >
          <Table aria-labelledby="tableTitle">
            <TableHead>
              <TableRow>
                {headerCells?.map((headCell, index) => (
                  <TableCell key={index} align={headCell.align} padding={headCell.disablePadding ? 'none' : 'normal'}>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        columnGap: '0.5rem'
                      }}
                    >
                      {headCell.label}
                    </div>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {fetchedUplodedFileHistoryData?.data
                ?.sort((a, b) => a.sequence - b.sequence)
                .map((row, index) => {
                  return (
                    <TableRow
                      onClick={() => handleTableRowClick(row)}
                      hover
                      role="checkbox"
                      sx={{ '&:last-child td, &:last-child th': { border: 0 }, cursor: 'pointer' }}
                      tabIndex={-1}
                      key={index}
                    >
                      <TableCell>{row?.filename}</TableCell>
                      <TableCell>{row?.date}</TableCell>
                      <TableCell>{row?.time}</TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </HandleInvalidVendorId>
  );
};

export default VendorFileUplodedHistory;
