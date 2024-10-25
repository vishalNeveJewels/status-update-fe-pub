import React, { useState, useEffect } from 'react';
import {
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  TableFooter,
  TablePagination,
  Paper,
  Button,
  Autocomplete,
  TextField,
  Box
} from '@mui/material';
import TablePaginationActions from './TablePaginationActions';
import { VENDOR_STATUS_MAP_UPDATE } from 'api/apiEndpoints';
import { useMutation, useQuery } from '@tanstack/react-query';

import { getData } from 'api/apiService';
import { FETCH_SPECIFIC_VENDOR } from 'api/apiEndpoints';
import { rows } from 'utils/dummyData';
import { useNavigate, useParams } from 'react-router-dom';
import { putData } from 'api/apiService';
import { useSnackbar } from 'notistack';
import HandleInvalidVendorId from 'components/HandleInvalidVendorId';

export default function CustomPaginationActionsTable() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [vendorSelectedData, setVendorSelectedData] = useState({});
  const { id } = useParams();
  const { enqueueSnackbar: snack } = useSnackbar();
  const navigate = useNavigate();

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  useEffect(() => {
    document.title = 'Map Status';
  }, []);

  const { data, error } = useQuery({
    queryKey: ['fetchSpecificVendor'],
    queryFn: async () => {
      return await getData(FETCH_SPECIFIC_VENDOR(id));
    },
    retry: 0
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const { reset, mutate } = useMutation({
    mutationFn: async (data) => {
      const res = await putData(VENDOR_STATUS_MAP_UPDATE(id), data);
      return res;
    },
    onSuccess: ({ msg }) => {
      snack(msg || 'Field updated successfully!', { variant: 'success' });
      reset();
      navigate(`/vendors/${id}/upload`);
    },
    onError: (error) => {
      const msg = error.response?.data?.msg;
      const errorMessage = Array.isArray(msg) ? msg[0]?.msg : msg;
      snack(errorMessage || 'Field updated failed!', { variant: 'error' });
      console.error(error);
    }
  });

  const handleClick = () => {
    const payload = {
      statusMap: vendorSelectedData
    };
    mutate(payload);
  };

  const handleStatusChange = (rowCode, value) => {
    setVendorSelectedData((prevData) => ({
      ...prevData,
      [rowCode]: value
    }));
  };

  const getFilteredOptions = () => {
    const selectedValues = Object.values(vendorSelectedData).flat();
    return (data?.data?.vendorStatus || []).filter((option) => !selectedValues.includes(option));
  };

  useEffect(() => {
    if (data?.data?.statusMap) {
      setVendorSelectedData(data?.data?.statusMap);
    }
  }, [data]);

  return (
    <HandleInvalidVendorId error={error}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
          <TableHead>
            <TableRow>
              <TableCell>Standard Status</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Vendor Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0 ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : rows).map((row) => (
              <TableRow key={row.code}>
                <TableCell component="th" scope="row">
                  {row.code}
                </TableCell>
                <TableCell>{row.description}</TableCell>
                <TableCell>
                  <Autocomplete
                    key={row.code}
                    multiple
                    // freeSolo add freeSolo if we want to allow user to type anything and save
                    options={getFilteredOptions() || []}
                    getOptionLabel={(option) => option}
                    value={vendorSelectedData[row.code] || []}
                    onChange={(event, value) => handleStatusChange(row.code, value)}
                    renderInput={(params) => <TextField {...params} placeholder="Select Vendor Status" />}
                  />
                </TableCell>
              </TableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                colSpan={3}
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
        <Box sx={{ textAlign: 'center', pb: 3 }}>
          <Button sx={{ px: 5 }} variant="contained" color="primary" onClick={handleClick}>
            Save
          </Button>
        </Box>
      </TableContainer>
    </HandleInvalidVendorId>
  );
}
