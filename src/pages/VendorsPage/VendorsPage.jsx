import React, { useEffect, useState } from 'react';
import VendorsPageTable from './VendorsPageTable';
// import VendorsPageModal from './VendorsPageModal';
// import { useFormik } from 'formik';
import { Box, Button, Grid, TextField, Typography, Divider } from '@mui/material';
// import * as Yup from 'yup';
import { useQuery, useMutation, useQueryClient, keepPreviousData } from '@tanstack/react-query';
import { getData, postData } from '../../api/apiService';
import { FETCH_ALL_VENDORS, SEARCH_VENDORS, VENDOR_REGISTER_USER } from '../../api/apiEndpoints';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import useDebounce from 'hooks/useDebounce';
import CustomModal from 'components/customModal/CustomModal';
import CircularProgress from '@mui/material/CircularProgress';
import { isValidEmail } from 'utils';

export const handleFetchAllVendors = async (page, tableOrderBy, tableOrderIs) => {
  return await getData(FETCH_ALL_VENDORS(page, 10, tableOrderBy, tableOrderIs));
};

const VendorsPage = () => {
  const [isRecordsModalFormOpened, setIsRecordsModalFormOpened] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [tableOrderIs, setTableOrderIs] = useState('ASC');
  const [tableOrderBy] = useState('id');
  const [value, setValue] = useState('');
  const [isSearchLoading, setIsSearchLoading] = useState(false);
  const [vendorEmailList, setVendorEmailList] = useState({});
  const [vendorRegLoading, isVendorRegLoading] = useState('');
  const debouncedValue = useDebounce(value, 500);
  const queryClient = useQueryClient();

  const searchVendor = async () => {
    setIsSearchLoading(true);
    const res = await getData(SEARCH_VENDORS(debouncedValue.trim()));
    setIsSearchLoading(false);
    return res;
  };

  const { data: searchResult, refetch: refetchSearch } = useQuery({
    queryKey: ['searchVendor'],
    // fetchPolicy: 'no-cache',
    enabled: false,
    queryFn: searchVendor
  });

  useEffect(() => {
    if (debouncedValue && value.trim()) {
      refetchSearch();
    }
  }, [debouncedValue]);

  useEffect(() => {
    document.title = 'Vendor List';
  }, []);

  useEffect(() => {
    if (searchResult) {
      const finalObj = {};
      searchResult?.data?.forEach(({ AcCd }) => {
        finalObj[AcCd] = '';
      });
      setVendorEmailList(finalObj);
    }
  }, [searchResult]);

  const { enqueueSnackbar: snack } = useSnackbar();
  let navigate = useNavigate();

  const { isPending, error, data, refetch } = useQuery({
    queryKey: ['fetchAllVendors', currentPage, tableOrderBy, tableOrderIs],
    queryFn: () => handleFetchAllVendors(currentPage, tableOrderBy, tableOrderIs),
    staleTime: 0,
    placeholderData: keepPreviousData
  });

  const handleAddVendor = async (formData) => {
    const response = await postData(VENDOR_REGISTER_USER, {
      ...formData
      // password: 'Admin@0306'
    });
    return response.data;
  };

  const {
    reset,
    mutate,
    isPending: isSearchSubmitPending
  } = useMutation({
    mutationFn: handleAddVendor,
    onSuccess: () => {
      snack('Vendor registered successfully!', { variant: 'success' });
      handleCloseModal();
      setTableOrderIs('DESC');
      reset();
      refetch();
      setVendorEmailList({});
      isVendorRegLoading('');
    },
    onError: (error) => {
      const msg = error.response?.data?.msg;
      const errorMessage = Array.isArray(msg) ? msg[0]?.msg : msg;
      snack(errorMessage || 'Vendor adding failed!', { variant: 'error' });
    }
  });

  const handleOpenModal = () => {
    setIsRecordsModalFormOpened(true);
  };

  const handleCloseModal = () => {
    queryClient.setQueryData(['searchVendor'], []);
    setIsRecordsModalFormOpened(false);
    setIsSearchLoading(false);
    setValue('');
  };

  const handleTableRowClick = (vendorId) => {
    navigate(`${vendorId}`);
  };

  const handleNextPage = () => {
    if (currentPage < data?.data?.totalPages - 1) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleSortingClick = () => {
    setTableOrderIs((prev) => (prev === 'ASC' ? 'DESC' : 'ASC'));
    refetch();
  };

  const handleOnChange = (event) => {
    const { value } = event.target;
    if (value.trim() === '' || value) setValue(value);
    if (!value) {
      setIsSearchLoading(false);
      queryClient.setQueryData(['searchVendor'], null);
    }
  };

  const handleVendorEmailChange = (event, AcCd) => {
    setVendorEmailList((prev) => {
      return { ...prev, [AcCd]: event.target.value };
    });
  };

  const handleOnClick = ({ AcCd, AcNm, AcTypeNm, email }) => {
    if (!isValidEmail(email)) return snack('Please enter valid email!', { variant: 'warning' });
    isVendorRegLoading(AcCd);
    const payload = {
      vendorId: AcCd,
      vendorName: AcNm,
      vendorTypeName: AcTypeNm,
      email
    };
    mutate(payload);
  };

  if (isPending) {
    return <div>Loading ...</div>;
  }

  if (error) {
    return <div>Something went wrong</div>;
  }

  return (
    <>
      <div
        style={{
          margin: '1rem',
          backgroundColor: 'white'
        }}
      >
        <VendorsPageTable
          rows={data?.data?.vendors}
          onClick={handleOpenModal}
          handleTableRowClick={handleTableRowClick}
          order={tableOrderIs}
          orderBy={tableOrderBy}
          handleSortingClick={handleSortingClick}
        />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', margin: '1rem' }}>
        <Button onClick={handlePrevPage} sx={{ px: 5 }} variant="contained" color="success" disabled={currentPage === 0}>
          Previous
        </Button>
        <span>
          Page {currentPage + 1} of {data?.data?.totalPages}
        </span>

        <Button
          onClick={handleNextPage}
          sx={{ px: 5 }}
          variant="contained"
          color="success"
          disabled={currentPage === data?.data?.totalPages - 1}
        >
          Next
        </Button>
      </div>
      <CustomModal
        open={isRecordsModalFormOpened}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          width: '50%',
          '@media (max-width:600px)': {
            width: '95%'
          }
        }}
      >
        <TextField
          fullWidth
          margin="normal"
          id="vendorId"
          name="vendorId"
          label="Vendor"
          variant="outlined"
          onChange={handleOnChange}
          // onBlur={formik.handleBlur}
          value={value}
        />
        {isSearchLoading ? (
          <Typography variant="h4">Loading...</Typography>
        ) : (
          <Box
            sx={{
              maxHeight: '50vh',
              overflow: 'scroll',
              '&::-webkit-scrollbar': {
                width: '10px',
                borderRadius: '4px'
              },
              '&::-webkit-scrollbar-track': {
                '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.01)',
                borderRadius: '4px'
              },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: 'primary.100',
                outline: '1px solid slategrey',
                borderRadius: '4px',
                cursor: 'pointer'
              }
            }}
          >
            {searchResult?.data?.map(({ AcCd, AcNm, AcTypeNm }) => {
              return (
                <Grid key={AcCd} container border={1} sx={{ borderColor: 'grey.400', mt: 1, borderRadius: '8px', p: '8px' }}>
                  <Grid item md={12}>
                    <Grid container>
                      <Grid item md={6}>
                        Vendor Id : {AcCd}
                      </Grid>
                      <Grid item md={6}>
                        Vendor Name : {AcNm}
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item md={12}>
                    <Grid container columnSpacing={1}>
                      <Grid sx={{ textAlign: 'start', my: 'auto' }} item md={6}>
                        Vendor Type Name : {AcTypeNm}
                      </Grid>
                      <Grid item md={6}>
                        <TextField
                          fullWidth
                          margin="normal"
                          id="vendorEmail"
                          name="vendorEmail"
                          label="Enter email"
                          variant="outlined"
                          onChange={(event) => handleVendorEmailChange(event, AcCd)}
                          value={vendorEmailList?.[AcCd]}
                        />
                      </Grid>
                    </Grid>
                    <Grid item md={12}>
                      <Button
                        onClick={() => handleOnClick({ AcCd, AcNm, AcTypeNm, email: vendorEmailList?.[AcCd]?.trim() })}
                        fullWidth
                        variant="contained"
                        disabled={vendorRegLoading === AcCd && isSearchSubmitPending}
                      >
                        {vendorRegLoading === AcCd && isSearchSubmitPending ? (
                          <CircularProgress size="20px" sx={{ transform: 'translateY(10px)' }} />
                        ) : (
                          'Register'
                        )}
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              );
            })}
            {searchResult?.data && !searchResult?.data?.length && <Typography variant="h4">No vendor found!</Typography>}
            <Divider />
          </Box>
        )}
      </CustomModal>
    </>
  );
};

export default VendorsPage;
