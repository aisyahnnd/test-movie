import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import InputAdornment from '@mui/material/InputAdornment'
import FormControl from '@mui/material/FormControl'
import TextField from '@mui/material/TextField'
import FormError from '../Forms/Error'
import Link from 'next/link'

import { SignUp, database } from '../../firebaseConfig';
import { auth } from '../../firebaseConfig';
import {
  collection,
  addDoc
} from 'firebase/firestore';
import {
  getAuth,
  createUserWithEmailAndPassword
} from 'firebase/auth';
// import { getAuth } from 'firebase/auth';
import { useRouter } from 'next/router';

import { useAuth } from '../../context/AuthUserContext';

const style = {
  position: 'absolute',
  top: '55%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'common.white',
  boxShadow: 24,
  p: 4,
  color: 'black',
};

const Register = () => {
  const [showPassword, setShowPassword] = useState(false)
  const { register, resetField, handleSubmit, formState: { errors } } = useForm({
      mode: "onChange",
      defaultValues: {
        name: "",
        email: "",
        password: ""
      }
  });
  const databaseRef = collection(database, 'userLogin');
  const FirebaseAuth = getAuth();
  const router = useRouter();

  const [error, setError] = useState(null);
//   const { createUserWithEmailAndPassword } = useAuth();

//   console.log(777, createUserWithEmailAndPassword)
  const onSubmit = async (values) => {
    const { name, email, password } = values;

    setError(null);
    try {
      await addDoc(databaseRef, {
        name: name, 
        email: email,
        password: password
      })
      .then(() => {
          alert('Successful Registration!');
          resetField("name");
          resetField("email");
          resetField("password");
      })

      createUserWithEmailAndPassword(FirebaseAuth, email, password)
      .then(authUser => {
        console.log("Success. The user is created in firebase")
        router.push("/auth/login");
      })
      .catch(error => {
        setError(error.message)
      });
    //   .then((response) => {
    //     console.log(response.user)
    //     sessionStorage.setItem('Token', response.user.accessToken);
    //     router.push('/')
    //   })
    } catch (error) {
        setError(error.message)
    }
  }

  // const onSubmit = async (values) => {
  //   const { name, email, password } = values;
    
  //   try {
  //     await addDoc(databaseRef, {
  //       name: name,
  //       email: email,
  //       password: password
  //     }).then(() => {
  //       alert('Successful Registration!');
  //       resetField("name");
  //       resetField("email");
  //       resetField("password");
  //     });
  //   } catch (error) {}
  // }

  return (
      <>
      <Box sx={style}>
        <Typography variant="h4" component="h1" sx={{ mb: 4 }}>
          Sign Up
        </Typography>
        <Grid sx={{ mb: 2 }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl sx={{ mb: 2 }} fullWidth>
              <TextField
                id="name"
                type="text"
                name="name"
                label="Name"
                variant="filled"
                {...register("name", { required: true })}
              />
              <FormError error={errors.name} />
            </FormControl>
            <FormControl sx={{ mb: 2 }} fullWidth>
              <TextField
                id="email"
                type="email"
                name="email"
                label="Email"
                variant="filled"
                {...register("email", { required: true })}
              />
              <FormError error={errors.email} />
            </FormControl>
            <FormControl sx={{ mb: 4 }} fullWidth>
              <TextField
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                label="Password"
                variant="filled"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Button onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? 'Hide' : 'Show'}
                      </Button>
                    </InputAdornment>
                  )
                }}
                {...register("password", { required: true, minLength: 8 })}
              />
              <FormError error={errors.password} />
            </FormControl>
            <Button onClick={onSubmit} type="submit" variant="contained" size="large" fullWidth>
              Sign up
            </Button>
          </form>
        </Grid>
        <Grid>
          <Link variant="body1" color="primary" component="a" href="/auth/login">
            <a>&nbsp;Sign in now.</a>
          </Link>
        </Grid>
      </Box>
      </>
  )
}

export default Register;