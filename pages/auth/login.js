import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useForm } from 'react-hook-form'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import Typography from '@mui/material/Typography'
import InputAdornment from '@mui/material/InputAdornment'
import FormControl from '@mui/material/FormControl'
import TextField from '@mui/material/TextField'
import FormError from '../Forms/Error'
import Link from 'next/link'
import { SignIn, GetSignInErrorMessage } from '../services/firebase'

import { app } from '../../firebaseConfig';
import {
  getAuth,
  signInWithEmailAndPassword
} from 'firebase/auth'
import { useRouter } from 'next/router';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'common.white',
  boxShadow: 24,
  p: 4,
  color: 'black',
};

const Login = () => {
  const [showPassword, setShowPassword, setOpen] = useState(false)
  const { register, resetField, handleSubmit, formState: { errors } } = useForm({
    mode: "onChange",
      defaultValues: {
        email: "",
        password: ""
      }
  })

  const auth = getAuth();
  const router = useRouter();

  const onSubmit = async (values) => {
    const { email, password } = values

    try {
      await signInWithEmailAndPassword(auth, email, password)
      .then((response) => {
          alert('Successful Login!');
          resetField("email");
          resetField("password");

          console.log(response.user)
          sessionStorage.setItem('Token', response.user.accessToken);
          console.log('Login Sukses');
          router.push('/')
      })
    } catch (error) {
      alert('Wrong email or password!');
    }
  }

//   useEffect(() => {
//     let token = sessionStorage.getItem('Token')

//     if(token){
//         router.push('/')
//         console.log('Login Sukses');
//     }
//   }, [])


  return (
      <>
      <Box sx={style}>
        <Typography variant="h4" component="h1" sx={{ mb: 4 }}>
          Sign In
        </Typography>
        <Grid sx={{ mb: 2 }}>
          <form onSubmit={handleSubmit(onSubmit)}>
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
            <Button type="submit" variant="contained" size="large" fullWidth>
              Sign in
            </Button>
          </form>
        </Grid>
        <Grid>
          <Link variant="body1" color="primary" component="a" href="/auth/register">
            <a>&nbsp;Sign up now.</a>
          </Link>
        </Grid>
      </Box>
      </>
  )
}

export default Login;