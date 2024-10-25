import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1
});

const InputFileUpload = (props) => {
  const { accept = '', handleUpload, handleFileChange, files = [], isUploading } = props;
  const isFileSelected = files.length;

  return (
    <>
      {isFileSelected ? (
        <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', gap: '10px' }}>
          <Button disabled={isUploading} color="success" onClick={() => handleUpload()} variant="contained" startIcon={<CloudUploadIcon />}>
            Upload file
          </Button>
          <Button color="primary" component="label" role={undefined} variant="text" tabIndex={-1} startIcon={<AttachFileIcon />}>
            Reselect file
            <VisuallyHiddenInput type="file" accept={accept} onChange={handleFileChange} />
          </Button>
        </Box>
      ) : (
        <Button color="primary" component="label" role={undefined} variant="contained" tabIndex={-1} startIcon={<AttachFileIcon />}>
          Select file
          <VisuallyHiddenInput type="file" accept={accept} onChange={handleFileChange} />
        </Button>
      )}
    </>
  );
};

InputFileUpload.propTypes = {
  accept: PropTypes.string,
  handleFileChange: PropTypes.func,
  handleUpload: PropTypes.func,
  isUploading: PropTypes.bool,
  files: PropTypes.array
};

export default InputFileUpload;
