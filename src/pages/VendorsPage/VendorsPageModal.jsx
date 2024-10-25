import * as React from 'react';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4
};

const VendorsPageModal = ({ open, handleClose, formik }) => {
  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
      <Box sx={style}>
        <Typography variant="h6" component="h2" gutterBottom>
          Enter Your Details
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            id="vendorId"
            name="vendorId"
            label="Vendor Id"
            variant="outlined"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.vendorId}
            error={formik.touched.vendorId && Boolean(formik.errors.vendorId)}
            helperText={formik.touched.vendorId && formik.errors.vendorId}
          />
          <TextField
            fullWidth
            margin="normal"
            id="vendorName"
            name="vendorName"
            label="Vendor Name"
            variant="outlined"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.vendorName}
            error={formik.touched.vendorName && Boolean(formik.errors.vendorName)}
            helperText={formik.touched.vendorName && formik.errors.vendorName}
          />
          <TextField
            fullWidth
            margin="normal"
            id="firstName"
            name="firstName"
            label="First Name"
            variant="outlined"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.firstName}
            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
            helperText={formik.touched.firstName && formik.errors.firstName}
          />
          <TextField
            fullWidth
            margin="normal"
            id="lastName"
            name="lastName"
            label="Last Name"
            variant="outlined"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.lastName}
            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
            helperText={formik.touched.lastName && formik.errors.lastName}
          />
          <TextField
            fullWidth
            margin="normal"
            id="email"
            name="email"
            label="Email"
            variant="outlined"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />

          <Button color="primary" variant="contained" fullWidth type="submit" sx={{ mt: 2 }}>
            Submit
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

VendorsPageModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  formik: PropTypes.shape({
    handleChange: PropTypes.func.isRequired,
    handleBlur: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    values: PropTypes.shape({
      vendorId: PropTypes.string.isRequired,
      vendorName: PropTypes.string.isRequired,
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired
    }).isRequired,
    errors: PropTypes.shape({
      vendorId: PropTypes.string,
      vendorName: PropTypes.string,
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      email: PropTypes.string
    }).isRequired,
    touched: PropTypes.shape({
      vendorId: PropTypes.bool.isRequired,
      vendorName: PropTypes.bool.isRequired,
      firstName: PropTypes.bool.isRequired,
      lastName: PropTypes.bool.isRequired,
      email: PropTypes.bool.isRequired
    }).isRequired
  }).isRequired
};

export default VendorsPageModal;
