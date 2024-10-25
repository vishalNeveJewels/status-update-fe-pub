import React, { useEffect, useState } from 'react';
import AuthWrapper from './AuthWrapper';
import { Button, FormHelperText, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, Stack, Typography } from '@mui/material';
import { Formik } from 'formik';
import * as Yup from 'yup';
import AnimateButton from 'components/@extended/AnimateButton';
import { useNavigate, useParams } from 'react-router-dom';
import EyeOutlined from '@ant-design/icons/EyeOutlined';
import EyeInvisibleOutlined from '@ant-design/icons/EyeInvisibleOutlined';
import { useMutation } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { putData } from 'api/apiService';
import { RESET_PASSWORD } from 'api/apiEndpoints';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

Yup.addMethod(Yup.Schema, 'isPasswordStrong', function (options, errorMessage = 'password must me stronger') {
  return this.test('test-is-password-strong', errorMessage, function (value) {
    const { path, createError } = this;

    let isStrong = true;

    // if field optional
    if (typeof value === 'undefined') {
      return true;
    }

    if (options?.minLowercase) {
      if (!/[a-z]/.test(String(value))) {
        isStrong = false;
      }
    }
    if (options?.minUppercase) {
      if (!/[A-Z]/.test(String(value))) {
        isStrong = false;
      }
    }
    if (options?.minNumbers) {
      if (!/\d/.test(String(value))) {
        isStrong = false;
      }
    }
    if (options?.minSymbols) {
      if (!/\W/.test(String(value))) {
        isStrong = false;
      }
    }

    return (
      isStrong ||
      createError({
        path,
        message: errorMessage
      })
    );
  });
});

const ResetPassSuccessScreen = () => {
  const navigate = useNavigate();

  return (
    <Grid width={350} container rowSpacing={3}>
      <Grid item xs={12}>
        <Typography textAlign="center" variant="h2">
          Success!
        </Typography>
      </Grid>
      <Grid sx={{ textAlign: 'center' }} item xs={12}>
        <CheckCircleOutlineIcon color="success" sx={{ fontSize: 80 }} />
        <Typography textAlign="center" variant="body1">
          Your password has been successfully reset. You can now use your new password to log in to your account.
        </Typography>
      </Grid>
      <Grid item xs={12} sx={{ textAlign: 'center' }}>
        <Button onClick={() => navigate('/login')} variant="contained">
          Login to my account
        </Button>
      </Grid>
    </Grid>
  );
};

const ResetPassword = () => {
  const [showPassword, setShowPassword] = useState({ pass: false, conPass: false });
  const { enqueueSnackbar: snack } = useSnackbar();

  const { token } = useParams();

  const handleResetPass = async (data) => {
    const res = await putData(`${RESET_PASSWORD}/${token}`, data);
    return res;
  };

  const { mutate, isSuccess } = useMutation({
    mutationFn: handleResetPass,
    onSuccess: () => {
      snack('Password reset successfully!', { variant: 'success' });
    },
    onError: (error) => {
      const errorMessage = error.response?.data?.msg || 'Something went wrong';
      snack(errorMessage, { variant: 'error' });
    }
  });

  const handleClickShowPassword = (key) => {
    setShowPassword((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/');
    }
  }, [navigate]);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <AuthWrapper>
      {isSuccess ? (
        <ResetPassSuccessScreen />
      ) : (
        <Grid width={320} container spacing={3}>
          <Grid item xs={12}>
            <Typography textAlign="center" variant="h3">
              Change your password
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Formik
              initialValues={{
                password: '',
                confirmPass: ''
              }}
              validationSchema={Yup.object().shape({
                password: Yup.string()
                  .min(8, 'password must contain 8 or more characters with at least one of each: uppercase, lowercase, number and special')
                  .isPasswordStrong(
                    {
                      minUppercase: 1,
                      minLowercase: 1,
                      minNumbers: 1,
                      minSymbols: 1
                    },
                    'password should contain at least 1 lower case letter, 1 upper case letter, 1 digit and 1 symbol'
                  )
                  .required('Password is mandatory'),
                confirmPass: Yup.string()
                  .oneOf([Yup.ref('password'), null], 'Passwords must match')
                  .required('Confirm password is required')
              })}
              onSubmit={(userData) => {
                mutate({ password: userData.password });
              }}
            >
              {({ errors, handleBlur, handleChange, handleSubmit, touched, values }) => (
                <form noValidate onSubmit={handleSubmit}>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="password-login">New Password</InputLabel>
                        <OutlinedInput
                          fullWidth
                          error={Boolean(touched.password && errors.password)}
                          id="-password-login"
                          type={showPassword.pass ? 'text' : 'password'}
                          value={values.password}
                          name="password"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={() => handleClickShowPassword('pass')}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                                color="secondary"
                              >
                                {showPassword.pass ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                              </IconButton>
                            </InputAdornment>
                          }
                          placeholder="Enter new password"
                        />
                      </Stack>
                      {touched.password && errors.password && (
                        <FormHelperText error id="standard-weight-helper-text-password-login">
                          {errors.password}
                        </FormHelperText>
                      )}
                    </Grid>
                    <Grid item xs={12}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="email-login">Confirm Password</InputLabel>
                        <OutlinedInput
                          id="confirmPass"
                          type={showPassword.conPass ? 'text' : 'password'}
                          value={values.confirmPass}
                          name="confirmPass"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={() => handleClickShowPassword('conPass')}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                                color="secondary"
                              >
                                {showPassword.conPass ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                              </IconButton>
                            </InputAdornment>
                          }
                          placeholder="Enter confirm password"
                          fullWidth
                          error={Boolean(touched.confirmPass && errors.confirmPass)}
                        />
                      </Stack>
                      {touched.confirmPass && errors.confirmPass && (
                        <FormHelperText error id="standard-weight-helper-text-email-login">
                          {errors.confirmPass}
                        </FormHelperText>
                      )}
                    </Grid>
                    <Grid item xs={12}>
                      <AnimateButton>
                        <Button disableElevation fullWidth size="large" type="submit" variant="contained" color="primary">
                          Change Password
                        </Button>
                      </AnimateButton>
                    </Grid>
                  </Grid>
                </form>
              )}
            </Formik>
          </Grid>
        </Grid>
      )}
    </AuthWrapper>
  );
};

export default ResetPassword;
