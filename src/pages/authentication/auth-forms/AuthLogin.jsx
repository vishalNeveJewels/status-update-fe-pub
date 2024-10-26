import PropTypes from 'prop-types';
import React, { useEffect, useRef } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

// material-ui
import Button from '@mui/material/Button';
// import Checkbox from '@mui/material/Checkbox';
// import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
// import Typography from '@mui/material/Typography';

import { useMutation } from '@tanstack/react-query';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useSnackbar } from 'notistack';

// project import
import AnimateButton from 'components/@extended/AnimateButton';
import useDisableSpaceBar from 'hooks/useDisableSpaceBar';

//api call import
import { postData } from '../../../api/apiService';
import { LOGIN_USER } from '../../../api/apiEndpoints';

//localstorage utils import
import { setItemInLocalStorage } from '../../../utils/localStorageUtils';

// assets
import EyeOutlined from '@ant-design/icons/EyeOutlined';
import EyeInvisibleOutlined from '@ant-design/icons/EyeInvisibleOutlined';
import { userTypes } from 'utils/constants';

// ============================|| JWT - LOGIN ||============================ //

export default function AuthLogin() {
  // const [checked, setChecked] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const passwordInputRef = useRef(null);

  const { enqueueSnackbar: snack } = useSnackbar();
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  let navigate = useNavigate();

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSignIn = async (data) => {
    return await postData(LOGIN_USER, data);
  };

  const handleSuccess = ({ data }) => {
    // Set the token in localStorage
    setItemInLocalStorage('token', data?.token);

    const userType = userTypes[data?.userType];

    if (userType) {
      // Set user type in localStorage
      setItemInLocalStorage('userTypeIs', {
        userTypeName: userType.name,
        userTypeValue: userType.value,
        ...(data?.vendorId ? { vendorId: data?.vendorId } : {})
      });

      // Notify success
      snack('SignIn success!', { variant: 'success' });

      // Navigate based on user type
      if (data?.userType === 1 || data?.userType === 2) {
        navigate('/vendors');
      } else if (data?.userType === 3) {
        setItemInLocalStorage('vendorName', data?.vendorName);
        navigate(`/vendors/${data?.vendorId}/upload`);
      }
    }
  };

  const { mutate } = useMutation({
    mutationFn: handleSignIn,
    onSuccess: handleSuccess,
    onError: (error) => {
      const errorMessage = error.response?.data?.msg || 'Something went wrong';
      snack(errorMessage, { variant: 'error' });
    }
  });

  useDisableSpaceBar(null, passwordInputRef);

  useEffect(() => {
    console.log({ 'From ecosystem file': import.meta.env.NODE_ENV });
    console.log({ 'From env': import.meta.env.VITE_BASE_URL });
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/');
    }
  }, [navigate]);

  return (
    <>
      <Formik
        initialValues={{
          email: '',
          password: '',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
          password: Yup.string().max(255).required('Password is required')
        })}
        onSubmit={(userData) => {
          mutate(userData);
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, touched, values }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="email-login">Email Address2 {import.meta.env.NODE_ENV}</InputLabel>
                  <OutlinedInput
                    id="email-login"
                    type="email"
                    value={values.email}
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter email address"
                    fullWidth
                    error={Boolean(touched.email && errors.email)}
                  />
                </Stack>
                {touched.email && errors.email && (
                  <FormHelperText error id="standard-weight-helper-text-email-login">
                    {errors.email}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="password-login">Password</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.password && errors.password)}
                    id="-password-login"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="off"
                    value={values.password}
                    name="password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                          color="secondary"
                        >
                          {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                        </IconButton>
                      </InputAdornment>
                    }
                    placeholder="Enter password"
                    ref={passwordInputRef}
                  />
                </Stack>
                {touched.password && errors.password && (
                  <FormHelperText error id="standard-weight-helper-text-password-login">
                    {errors.password}
                  </FormHelperText>
                )}
              </Grid>

              <Grid item xs={12} sx={{ mt: -1 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                  {/* <FormControlLabel
                    control={
                      <Checkbox
                        checked={checked}
                        onChange={(event) => setChecked(event.target.checked)}
                        name="checked"
                        color="primary"
                        size="small"
                      />
                    }
                    label={<Typography variant="h6">Keep me sign in</Typography>}
                  /> */}
                  <Link
                    sx={{ color: 'primary.main', textDecoration: 'none' }}
                    variant="h6"
                    to="/forgot-password"
                    component={RouterLink}
                    color="text.primary"
                  >
                    Forgot Password?
                  </Link>
                </Stack>
              </Grid>
              {errors.submit && (
                <Grid item xs={12}>
                  <FormHelperText error>{errors.submit}</FormHelperText>
                </Grid>
              )}
              <Grid item xs={12}>
                <AnimateButton>
                  <Button disableElevation fullWidth size="large" type="submit" variant="contained" color="primary">
                    Login
                  </Button>
                </AnimateButton>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </>
  );
}

AuthLogin.propTypes = { isDemo: PropTypes.bool };
