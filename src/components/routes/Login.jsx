import React, { useContext, useEffect, useState } from 'react';
// eslint-disable-next-line no-unused-vars
import PropTypes from 'prop-types';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import {
  Avatar, Box, Button, Container, Grid, Link, TextField, Typography,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { AuthContext } from '../../contexts/AuthContext';

function Login() {
  console.log('REDNERRRRRR');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setError] = useState('');

  const { login, error } = useContext(AuthContext);
  console.log(error);

  const location = useLocation();
  const navigate = useNavigate();

  const from = location?.state?.from?.pathname || '/';

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await login(email, password);
      console.log('NAVIGATE');
      navigate(from, { replace: true });
    } catch (e) {
      console.log(`Something went wrong:\n\n${e.message}`);
    }
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  useEffect(() => {
    console.log('EFFECT');
    if (!error) setError('');
    if (error === 'auth/invalid-email') setError('The email provided was invalid.');
    if (error === 'auth/wrong-password') setError('The password provided was incorrect.');
    if (error === 'auth/internal-error') setError('Could not sign you in. Please try again.');
  }, [error]);

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>

        <Typography mt={3} sx={{ alignSelf: 'baseline' }} color="red">{errorMessage}</Typography>

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={handleEmailChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={handlePasswordChange}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            {/* <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid> */}
            <Grid item>
              <Link component={RouterLink} to="/signup" state={{ from: location?.state?.from }} variant="body2">
                Don&apos;t have an account? Sign Up
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

Login.propTypes = {};

export default Login;
