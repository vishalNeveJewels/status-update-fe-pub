import React from 'react';
import { Box, IconButton, Modal } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  pt: 1,
  borderRadius: 4
};

const CustomModal = ({ open, onClose, children, sx = {} }) => {
  const handleClose = () => {
    onClose();
  };

  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description">
      <Box sx={{ ...style, ...sx }}>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <IconButton sx={{ marginRight: '-1.5rem' }} aria-label="close" onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        {children}
      </Box>
    </Modal>
  );
};

CustomModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  children: PropTypes.any,
  sx: PropTypes.object
};

export default CustomModal;
