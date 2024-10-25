import React, { useEffect, useState } from 'react';
import AuthWrapper from './AuthWrapper';
import { Button, FormHelperText, Grid, OutlinedInput, Stack, Typography } from '@mui/material';
import { Formik } from 'formik';
import * as Yup from 'yup';
import AnimateButton from 'components/@extended/AnimateButton';
import { useMutation } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { postData } from 'api/apiService';
import { FORGOT_PASSWORD } from 'api/apiEndpoints';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import PropTypes from 'prop-types';

const handleForgotPass = async (data) => {
  return await postData(FORGOT_PASSWORD, data);
};

const ResetEmailSuccessScreen = ({ resendEmail, isPending }) => {
  return (
    <Grid width={350} container rowSpacing={3}>
      <Grid item xs={12}>
        <Typography textAlign="center" variant="h3">
          We&apos;ve sent a reset password link to your email
        </Typography>
      </Grid>
      <Grid sx={{ textAlign: 'center' }} item xs={12}>
        <MarkEmailReadIcon color="primary" sx={{ fontSize: 80 }} />
        <Typography textAlign="center" variant="body1">
          Please check the email inbox you signed up with. You may need to check the spam folder.
        </Typography>
      </Grid>
      <Grid item xs={12} sx={{ textAlign: 'center' }}>
        <Button disabled={isPending} onClick={() => resendEmail()} variant="contained">
          Resend Email
        </Button>
      </Grid>
    </Grid>
  );
};

const ForgotPassword = () => {
  const { enqueueSnackbar: snack } = useSnackbar();
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Forgot Password';
  }, []);

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: handleForgotPass,
    onSuccess: () => {
      snack('Link has been sent!', { variant: 'success' });
    },
    onError: (error) => {
      const errorMessage = error.response?.data?.msg || 'Something went wrong';
      snack(errorMessage, { variant: 'error' });
    }
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/');
    }
  }, [navigate]);

  const handleResendEmail = () => {
    mutate({ email });
  };

  return (
    <AuthWrapper>
      {isSuccess ? (
        <ResetEmailSuccessScreen isPending={isPending} resendEmail={handleResendEmail} />
      ) : (
        <Grid width={320} container spacing={3}>
          <Grid item xs={12}>
            <Typography textAlign="center" variant="h3">
              Forgot password?
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1">
              Enter the email address associated with this account, and we&apos;ll send you a link to reset your password.
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Formik
              initialValues={{
                email: ''
              }}
              validationSchema={Yup.object().shape({
                email: Yup.string().email('Must be a valid email').max(255).required('Email is required')
              })}
              onSubmit={(userData) => {
                setEmail(userData);
                mutate(userData);
              }}
            >
              {({ errors, handleBlur, handleChange, handleSubmit, touched, values }) => (
                <form noValidate onSubmit={handleSubmit}>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <Stack spacing={1}>
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
                      <AnimateButton>
                        <Button
                          disabled={isPending}
                          disableElevation
                          fullWidth
                          size="large"
                          type="submit"
                          variant="contained"
                          color="primary"
                        >
                          Send link
                        </Button>
                      </AnimateButton>
                    </Grid>
                  </Grid>
                </form>
              )}
            </Formik>
          </Grid>
          <Grid item xs={12} sx={{ textAlign: 'center' }}>
            <Typography component={Link} to="/register" variant="body1" sx={{ textDecoration: 'none' }} color="primary">
              Don&apos;t have an account?
            </Typography>
          </Grid>
        </Grid>
      )}
    </AuthWrapper>
  );
};

ResetEmailSuccessScreen.propTypes = { resendEmail: PropTypes.func, isPending: PropTypes.bool };

export default ForgotPassword;
