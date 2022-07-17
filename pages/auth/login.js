import React from 'react';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../context/AuthUserContext';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Link from 'next/link';
import Head from 'next/head';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'common.white',
  boxShadow: 24,
  p: 4,
  color: 'black',
};

export default function LogIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const router = useRouter();
  const { signInWithEmailAndPassword } = useAuth();
  const [showPassword, setShowPassword, setOpen] = useState(false);

  const onSubmit = (event) => {
    setError(null);
    signInWithEmailAndPassword(email, password)
      .then((authUser) => {
        console.log('Success. The user is created in firebase');
        router.push('/');
      })
      .catch((error) => {
        setError(error.message);
      });
    event.preventDefault();
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Head>
        <title>Login</title>
      </Head>
      <img src="https://rb.gy/p2hphi" className="bg-image" alt="background-image" />

      <Container maxWidth="sm">
        <Box sx={style}>
          <Typography variant="h4" component="h1" sx={{ mb: 4 }}>
            Sign In
          </Typography>
          <Grid sx={{ mb: 2 }}>
            <form onSubmit={onSubmit}>
              {error && (
                <Stack sx={{ width: '100%' }} spacing={2}>
                  <Alert severity="error">{error}</Alert>
                </Stack>
              )}
              <FormControl sx={{ mb: 2 }} fullWidth>
                <TextField
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  name="email"
                  id="loginEmail"
                  placeholder="Email"
                />
              </FormControl>
              <FormControl sx={{ mb: 4 }} fullWidth>
                <TextField
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  id="loginPassword"
                  placeholder="Password"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Button onClick={() => setShowPassword(!showPassword)}>
                          {showPassword ? 'Hide' : 'Show'}
                        </Button>
                      </InputAdornment>
                    ),
                  }}
                />
              </FormControl>
              <Button type="submit" variant="contained" size="large" fullWidth>
                Sign in
              </Button>
            </form>
          </Grid>
          <Grid>
            No account? {''}
            <Link variant="body1" color="primary" component="a" href="/auth/SignUp">
              <a>Create one</a>
            </Link>
          </Grid>
        </Box>
      </Container>
    </React.Fragment>
  );
}
