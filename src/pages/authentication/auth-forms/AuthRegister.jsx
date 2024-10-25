import React, { useEffect, useState, useRef } from 'react';

// material-ui
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project import
import AnimateButton from 'components/@extended/AnimateButton';
import { strengthColor, strengthIndicator } from 'utils/password-strength';
import useDisableSpaceBar from 'hooks/useDisableSpaceBar';

// assets
import EyeOutlined from '@ant-design/icons/EyeOutlined';
import EyeInvisibleOutlined from '@ant-design/icons/EyeInvisibleOutlined';
import { useMutation } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { postData } from 'api/apiService';
import { REGISTER_USER } from 'api/apiEndpoints';
import { useNavigate } from 'react-router';

// ============================|| JWT - REGISTER ||============================ //
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

const handleSignup = async (formData) => {
  const response = await postData(REGISTER_USER, formData);
  return response.data;
};

export default function AuthRegister() {
  const [level, setLevel] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const passwordInputRef = useRef(null);

  const { enqueueSnackbar: snack } = useSnackbar();
  const navigation = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: handleSignup,
    onSuccess: () => {
      snack('Signup success!', { variant: 'success' });
      navigation('/login');
    },
    onError: (error) => {
      const msg = error.response?.data?.msg;
      const errorMessage = Array.isArray(msg) ? msg[0]?.msg : msg;
      snack(errorMessage || 'Signup failed!', { variant: 'error' });
      console.log('got error', error);
    }
  });

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const changePassword = (value) => {
    const temp = strengthIndicator(value);
    setLevel(strengthColor(temp));
  };

  useEffect(() => {
    changePassword('');
  }, []);

  useDisableSpaceBar(null, passwordInputRef);

  const handleFormSubmit = async (values) => {
    values.userType = 1;
    mutate(values);
  };

  return (
    <>
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          password: ''
        }}
        onSubmit={handleFormSubmit}
        validationSchema={Yup.object().shape({
          firstName: Yup.string().trim().matches(/^\S*$/, 'First name cannot contain spaces').max(255).required('First Name is required'),
          lastName: Yup.string().trim().matches(/^\S*$/, 'Last name cannot contain spaces').max(255).required('Last Name is required'),
          email: Yup.string()
            .trim()
            .matches(/^\S+@\S+\.\S+$/, 'Email cannot contain spaces')
            .email('Must be a valid email')
            .max(255)
            .required('Email is required'),
          password: Yup.string()
            .trim()
            .min(8, 'password must contain 8 or more characters with at least one of each: uppercase, lowercase, number and special')
            .isPasswordStrong(
              {
                minUppercase: 1,
                minLowercase: 1,
                minNumbers: 1,
                minSymbols: 1
              },
              'Password should contain at least 1 lower case letter, 1 upper case letter, 1 digit and 1 symbol'
            )
            .required('Field is mandatory')
        })}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="firstName-signup">First Name*</InputLabel>
                  <OutlinedInput
                    id="firstName-login"
                    type="firstName"
                    value={values.firstName.trim()}
                    name="firstName"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="John"
                    fullWidth
                    error={Boolean(touched.firstName && errors.firstName)}
                  />
                </Stack>
                {touched.firstName && errors.firstName && (
                  <FormHelperText error id="helper-text-firstName-signup">
                    {errors.firstName}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="lastName-signup">Last Name*</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.lastName && errors.lastName)}
                    id="lastName-signup"
                    type="lastName"
                    value={values.lastName.trim()}
                    name="lastName"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Doe"
                    inputProps={{}}
                  />
                </Stack>
                {touched.lastName && errors.lastName && (
                  <FormHelperText error id="helper-text-lastName-signup">
                    {errors.lastName}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="email-signup">Email Address*</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.email && errors.email)}
                    id="email-login"
                    type="email"
                    value={values.email}
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="demo@company.com"
                    inputProps={{}}
                  />
                </Stack>
                {touched.email && errors.email && (
                  <FormHelperText error id="helper-text-email-signup">
                    {errors.email}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="password-signup">Password</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.password && errors.password)}
                    id="password-signup"
                    type={showPassword ? 'text' : 'password'}
                    value={values.password.trim()}
                    name="password"
                    onBlur={handleBlur}
                    onChange={(e) => {
                      handleChange(e);
                      changePassword(e.target.value);
                    }}
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
                    placeholder="******"
                    inputProps={{}}
                    inputRef={passwordInputRef}
                  />
                </Stack>
                {touched.password && errors.password && (
                  <FormHelperText error id="helper-text-password-signup">
                    {errors.password}
                  </FormHelperText>
                )}
                <FormControl fullWidth sx={{ mt: 2 }}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item>
                      <Box sx={{ bgcolor: level?.color, width: 85, height: 8, borderRadius: '7px' }} />
                    </Grid>
                    <Grid item>
                      <Typography variant="subtitle1" fontSize="0.75rem">
                        {level?.label}
                      </Typography>
                    </Grid>
                  </Grid>
                </FormControl>
              </Grid>
              {errors.submit && (
                <Grid item xs={12}>
                  <FormHelperText error>{errors.submit}</FormHelperText>
                </Grid>
              )}
              <Grid item xs={12}>
                <AnimateButton>
                  <Button
                    disableElevation
                    disabled={isPending || isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    color="primary"
                  >
                    Create Account
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
