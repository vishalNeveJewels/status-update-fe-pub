import React from 'react';
import { Box, Typography } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const InvalidVendor = () => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', height: '70vh' }}>
      <ErrorOutlineIcon sx={{ color: 'red', fontSize: 50 }} />
      <Typography color="red" variant="h4">
        Invalid vendor id
      </Typography>
    </Box>
  );
};

export default InvalidVendor;
