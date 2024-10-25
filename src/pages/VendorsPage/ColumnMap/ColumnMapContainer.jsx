import React, { useState } from 'react';
import { Box, Button, Grid, Typography } from '@mui/material';
import ColumnMapAtoms from './ColumnMapAtoms';
import { useSnackbar } from 'notistack';
import { useMutation } from '@tanstack/react-query';
import { putData } from 'api/apiService';
import { COLUMN_FIELDS_UPDATE } from 'api/apiEndpoints';
import { useNavigate, useParams } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import PropTypes from 'prop-types';

const allRows = [{ standard_column: 'o_num' }, { standard_column: 'status' }];

const columnListInitialValue = allRows.reduce((acc, curr) => {
  acc[curr.standard_column] = '';
  return acc;
}, {});

const ColumnMapContainer = (props) => {
  const { columnApiRes } = props;
  const [columnList, setColumnList] = useState({ ...columnListInitialValue });
  const [muiList, setMuiList] = useState({ ...columnListInitialValue });

  const { id } = useParams();
  const { enqueueSnackbar: snack } = useSnackbar();
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: async (data) => {
      const res = await putData(COLUMN_FIELDS_UPDATE(id), data);
      return res;
    },
    onSuccess: ({ msg }) => {
      snack(msg || 'Field updated successfully!', { variant: 'success' });
      navigate(`/vendors/${id}/status-map`);
    },
    onError: (error) => {
      const msg = error.response?.data?.msg;
      const errorMessage = Array.isArray(msg) ? msg[0]?.msg : msg;
      snack(errorMessage || 'Field updated failed!', { variant: 'error' });
      console.log('got error', error);
    }
  });

  const handleSubmitDisable = () => {
    let isDisable = false;
    Object.keys(columnList).forEach((item) => {
      if (!columnList[item]?.length) {
        isDisable = true;
      }
    });
    return isDisable || isPending;
  };

  const handleFormSubmit = () => {
    const columnMap = {};
    Object.keys(columnList).forEach((item) => {
      columnMap[columnList[item]] = item;
    });

    const payload = {
      columnMap,
      updatedColumnData: columnList
    };

    mutate(payload);
  };

  return (
    <Grid container>
      <Grid item xs={12} sx={{ textAlign: 'center' }}>
        <Typography sx={{ textAlign: 'center' }} variant="h2">
          Column Map
        </Typography>
        <Box sx={{ positon: 'relative' }}>
          <Button
            sx={{
              position: 'absolute',
              width: '100px',
              top: {
                xs: 80,
                sm: 90
              },
              right: {
                xs: 18,
                sm: 75
              },
              px: {
                xs: 1,
                sm: 4
              }
            }}
            variant="contained"
            disabled={handleSubmitDisable()}
            onClick={() => handleFormSubmit()}
          >
            {isPending ? <CircularProgress size="20px" sx={{ transform: 'translateY(10px)' }} /> : 'Submit'}
          </Button>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={4}>
          <Grid item xs={6} sm={6}>
            <Typography sx={{ textAlign: 'start', mt: 4, ml: 10 }} variant="h4">
              Standard columns
            </Typography>
          </Grid>
          <Grid item xs={6} sm={6}>
            <Typography sx={{ textAlign: 'center', mt: 4 }} variant="h4">
              Vendor file columns
            </Typography>
          </Grid>
          {allRows.map(({ standard_column }) => {
            return (
              <ColumnMapAtoms
                key={standard_column}
                {...{ columnList, setColumnList, columnApiRes, standard_column, muiList, setMuiList }}
              />
            );
          })}
        </Grid>
      </Grid>
    </Grid>
  );
};

ColumnMapContainer.propTypes = { columnApiRes: PropTypes.object };

export default ColumnMapContainer;
