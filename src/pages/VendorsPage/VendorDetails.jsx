/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getItemFromLocalStorage } from 'utils/localStorageUtils';
// material-ui
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import HistoryIcon from '@mui/icons-material/History';
import { Map as MapIcon, Assignment as AssignmentIcon, UploadFile as UploadFileIcon } from '@mui/icons-material';
import CustomModal from 'components/customModal/CustomModal';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Box, Button } from '@mui/material';
import { useSnackbar } from 'notistack';
import { getData, putData } from 'api/apiService';
import { COLUMN_FIELDS_RESET, FETCH_SPECIFIC_VENDOR } from 'api/apiEndpoints';

// project import
import MainCard from 'components/MainCard';

// Import the SCSS file
import styles from './VenderDetail.module.scss';
import HandleInvalidVendorId from 'components/HandleInvalidVendorId';

const resetBtnCss = {
  position: 'absolute',
  top: {
    xs: 80,
    sm: 90
  },
  right: {
    xs: 100,
    sm: 25
  },
  px: {
    xs: 1,
    sm: 4
  }
};

const VenderDetail = () => {
  const [userTypeValue, setUserTypeValue] = useState(null);
  const [confirmResetModal, setConfirmResetModal] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const { enqueueSnackbar: snack } = useSnackbar();
  const queryClient = useQueryClient();

  const { error, data } = useQuery({
    queryKey: ['fetchSpecificVendor'],
    queryFn: async () => {
      return await getData(FETCH_SPECIFIC_VENDOR(id));
    },
    retry: 0
  });

  const { mutate: mutateResetColumn } = useMutation({
    mutationFn: async () => {
      const res = await putData(COLUMN_FIELDS_RESET(id));
      return res;
    },
    onSuccess: ({ msg }) => {
      snack(msg || 'Column reset successfully!', { variant: 'success' });
      setConfirmResetModal(false);
      queryClient.invalidateQueries({ queryKey: ['fetchSpecificVendor'] });
    },
    onError: (error) => {
      const msg = error.response?.data?.msg;
      const errorMessage = Array.isArray(msg) ? msg[0]?.msg : msg;
      snack(errorMessage || 'Column reset failed!', { variant: 'error' });
      console.log('got error', error);
    }
  });

  const handleMapColumnClick = () => {
    navigate(`/vendors/${id}/column-map`);
  };

  const handleMapStatusClick = () => {
    navigate(`/vendors/${id}/status-map`);
  };

  const handleUploadFileClick = () => {
    navigate(`/vendors/${id}/upload`);
  };

  const handleUploadFileHistoryClick = () => {
    navigate(`/vendors/${id}/upload-history`);
  };

  useEffect(() => {
    const localStorageData = getItemFromLocalStorage('userTypeIs');
    setUserTypeValue(localStorageData?.userTypeValue);
  }, [id]);

  const ClickableCard = ({ title, onClick, icon }) => (
    <Grid item xs={12} sm={6} md={4}>
      <MainCard className={styles.venderDetailContainer} onClick={onClick}>
        <Stack direction="row" alignItems="center" spacing={2}>
          {icon}
          <Typography variant="h6" className={styles.venderDetailTypography}>
            {title}
          </Typography>
        </Stack>
      </MainCard>
    </Grid>
  );

  const handleReset = () => {
    mutateResetColumn();
  };

  const ConfirmResetModal = () => (
    <CustomModal
      open={confirmResetModal}
      onClose={() => setConfirmResetModal(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{
        width: '50%',
        '@media (max-width:600px)': {
          width: '95%'
        },
        textAlign: 'center'
      }}
    >
      <Typography mb={3} variant="h4">
        Are you certain you want to reset the configuration for this vendor?
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
        <Button variant="contained" color="error" onClick={() => setConfirmResetModal(false)}>
          Cancel
        </Button>
        <Button variant="contained" onClick={() => handleReset()}>
          Reset
        </Button>
      </Box>
    </CustomModal>
  );

  return (
    <HandleInvalidVendorId error={error}>
      <Box>
        <Box sx={{ positon: 'relative' }}>
          <Typography sx={{ ...resetBtnCss, left: 250 }} variant="h4">
            {data?.data?.vendorName}
          </Typography>
          <Button sx={resetBtnCss} variant="contained" onClick={() => setConfirmResetModal(true)}>
            reset vendor config
          </Button>
        </Box>
        <Grid mt={3} container spacing={2}>
          {userTypeValue === 1 && (
            <ClickableCard title="Map Column" onClick={handleMapColumnClick} icon={<MapIcon className={styles.icon} />} />
          )}
          <ClickableCard title="Map Status" onClick={handleMapStatusClick} icon={<AssignmentIcon className={styles.icon} />} />
          <ClickableCard title="Upload File" onClick={handleUploadFileClick} icon={<UploadFileIcon className={styles.icon} />} />
          <ClickableCard title="Upload History" onClick={handleUploadFileHistoryClick} icon={<HistoryIcon className={styles.icon} />} />
        </Grid>
        <ConfirmResetModal />
      </Box>
    </HandleInvalidVendorId>
  );
};

export default VenderDetail;
