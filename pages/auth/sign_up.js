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
    width: 500,
    bgcolor: 'common.white',
    boxShadow: 24,
    p: 4,
    color: 'black',
};

const SignUp = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [passwordOne, setPasswordOne] = useState("");
    const [passwordTwo, setPasswordTwo] = useState("");
    const router = useRouter();
    //Optional error handling
    const [error, setError] = useState(null);
    const { createUserWithEmailAndPassword } = useAuth();
    const [showPassword, setShowPassword, setOpen] = useState(false);
    const databaseRef = collection(database, 'userLogin');

    const onSubmit = async (event) => {
        setError(null);
        if(passwordOne === passwordTwo) {
            createUserWithEmailAndPassword(email, passwordOne)
            .then(() => {
                addDoc(databaseRef, {
                    name: name, 
                    email: email,
                    password: passwordTwo
                })

                console.log("Success. The user is created in firebase")
                router.push("/auth/login");
            })
            .catch(error => {
                setError(error.message)
            });
        } else {
            setError("Password do not match") 
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
                        { error && 
                            <Stack sx={{ width: '100%' }} spacing={2}>
                                <Alert severity="error">{error}</Alert>
                            </Stack>
                        }
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
                            name="passwordOne"
                            value={passwordOne}
                            onChange={(event) => setPasswordOne(event.target.value)}
                            id="signUpPassword"
                            placeholder="Password"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <Button onClick={() => setShowPassword(!showPassword)}>
                                            {showPassword ? 'Hide' : 'Show'}
                                        </Button>
                                    </InputAdornment>
                                )
                            }}
                            />
                        </FormControl>
                        <FormControl sx={{ mb: 2 }} fullWidth>
                            <TextField
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            value={passwordTwo}
                            onChange={(event) => setPasswordTwo(event.target.value)}
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
  )
}

export default SignUp;
