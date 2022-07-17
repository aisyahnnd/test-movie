import * as React from 'react';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../context/AuthUserContext';
import { database } from '../../lib/firebase';
import { collection, addDoc } from 'firebase/firestore';
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
  top: '56%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'common.white',
  boxShadow: 24,
  p: 4,
  color: 'black',
};

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [retypePassword, setRetypePassword] = useState('');
  const router = useRouter();
  //Optional error handling
  const [error, setError] = useState(null);
  const { createUserWithEmailAndPassword } = useAuth();
  const [showPassword, setShowPassword, setOpen] = useState(false);
  const databaseRef = collection(database, 'userLogin');

  const onSubmit = (event) => {
    setError(null);
    if (password === retypePassword) {
      createUserWithEmailAndPassword(email, password)
        .then((doc) => {
          // console.log({doc: doc.user.uid})
          addDoc(databaseRef, {
            name: name,
            email: email,
            uid: doc.user.uid,
            role: 'user',
          });

          console.log('Success. The user is created in firebase');
          router.push('/auth/login');
        })
        .catch((error) => {
          setError(error.message);
        });
    } else {
      setError('Password do not match');
    }
    event.preventDefault();
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Head>
        <title>Sign Up</title>
      </Head>

      <Container maxWidth="sm">
        <Box sx={style}>
          <Typography variant="h4" component="h1" sx={{ mb: 4 }}>
            Sign Up
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
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  name="name"
                  id="signUpName"
                  placeholder="Name"
                />
              </FormControl>
              <FormControl sx={{ mb: 2 }} fullWidth>
                <TextField
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  name="email"
                  id="signUpEmail"
                  placeholder="Email"
                />
              </FormControl>
              <FormControl sx={{ mb: 2 }} fullWidth>
                <TextField
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  id="signUpPassword"
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
              <FormControl sx={{ mb: 2 }} fullWidth>
                <TextField
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={retypePassword}
                  onChange={(event) => setRetypePassword(event.target.value)}
                  id="signUpPassword2"
                  placeholder="Confirm Password"
                />
              </FormControl>
              <Button type="submit" variant="contained" size="large" fullWidth>
                Sign up
              </Button>
            </form>
          </Grid>
          <Grid>
            Have an account? {''}
            <Link variant="body1" color="primary" component="a" href="/auth/login">
              <a>Sign in now</a>
            </Link>
          </Grid>
        </Box>
      </Container>
    </React.Fragment>
  );
};

export default SignUp;
