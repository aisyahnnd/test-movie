import * as React from 'react';
import { useState, useEffect } from 'react';
import { GlobalProvider } from "../src/context/GlobalState";
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthUserContext';
import Head from 'next/head';
import Trending from "./trending/trending";
import Typography from '@mui/material/Typography';


export default function Home() {
  const { authUser, loading, signOut } = useAuth();
  const router = useRouter();

  // Listen for changes on loading and authUser, redirect if needed
  useEffect(() => {
    if (!loading && !authUser)
      router.push('/')
  }, [authUser, loading])
  console.log(777, authUser)

  return (
    <React.Fragment>
    <GlobalProvider>
      <Head>
        <title>Movie App</title>
      </Head>
        { loading ? 
            <Typography> </Typography> :
        <>
            <Typography align="left" style={{ paddingLeft: 20, paddingTop: 20, }}>
              { authUser && <div>Congratulations {authUser?.email}! You are logged in.</div> }
            </Typography>
        </>
        }
      <Trending />
    </GlobalProvider>  
    </React.Fragment>
  );
}
