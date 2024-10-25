import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';

// material-ui
import { ButtonBase } from '@mui/material';
import Stack from '@mui/material/Stack';

// project import
import Logo from './LogoMain';

// ==============================|| MAIN LOGO ||============================== //

const LogoSection = ({ sx }) => {
  const navigate = useNavigate();
  return (
    <ButtonBase disableRipple sx={sx}>
      <Stack onClick={() => navigate('/vendors')} direction="row" spacing={1} alignItems="center">
        <Logo />
        {/* <Chip
          label={import.meta.env.VITE_APP_VERSION}
          variant="outlined"
          size="small"
          color="secondary"
          sx={{ mt: 0.5, ml: 1, fontSize: '0.725rem', height: 20, '& .MuiChip-label': { px: 0.5 } }}
        /> */}
      </Stack>
    </ButtonBase>
  );
};

LogoSection.propTypes = {
  sx: PropTypes.object,
  to: PropTypes.string
};

export default LogoSection;
