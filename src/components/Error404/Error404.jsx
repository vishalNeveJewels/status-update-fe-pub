import React from 'react';
import { Button, Container, Typography, Grid, useTheme } from '@mui/material';
import { styled } from '@mui/system';
import astronautSvg from 'assets/images/icons/astronaut.svg';
import { useNavigate } from 'react-router';

const StyledContainer = styled(Container)(() => ({
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}));

const StyledButton = styled(Button)(({ theme }) => ({
  zIndex: 1,
  overflow: 'hidden',
  background: 'transparent',
  position: 'relative',
  padding: '8px 50px',
  borderRadius: '30px',
  cursor: 'pointer',
  fontSize: '1em',
  letterSpacing: '2px',
  transition: '0.2s ease',
  fontWeight: 'bold',
  margin: '5px 0px',
  border: `4px solid ${theme.palette.primary.main}`,
  color: theme.palette.primary.main,
  '&:before': {
    content: '""',
    position: 'absolute',
    left: 0,
    top: 0,
    width: '0%',
    height: '100%',
    background: theme.palette.primary.main,
    zIndex: -1,
    transition: '0.2s ease'
  },
  '&:hover': {
    color: theme.palette.common.white,
    background: theme.palette.primary.main,
    '&:before': {
      width: '100%'
    }
  }
}));

const Error404 = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <StyledContainer maxWidth="md">
      <Grid container sx={{ mt: 12 }} spacing={0}>
        <Grid item md={6}>
          <img src={astronautSvg} alt="astronaut" />
        </Grid>
        <Grid item md={6} container alignItems="center" justifyContent="center">
          <div>
            <Typography variant="h1" sx={{ fontSize: '7.5em', margin: '15px 0px', fontWeight: 'bold', color: theme.palette.primary.main }}>
              404
            </Typography>
            <Typography variant="h2" sx={{ fontWeight: 'bold', color: theme.palette.primary.main }}>
              UH OH! You&apos;re lost.
            </Typography>
            <Typography sx={{ color: theme.palette.primary.main }}>
              The page you are looking for does not exist. How you got here is a mystery. But you can click the button below to go back to
              the homepage.
            </Typography>
            <StyledButton onClick={() => navigate('/')}>HOME</StyledButton>
          </div>
        </Grid>
      </Grid>
    </StyledContainer>
  );
};

export default Error404;
