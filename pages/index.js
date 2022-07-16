import React from 'react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthUserContext';
import Head from 'next/head';
import Trending from './trending';
import Typography from '@mui/material/Typography';

export default function Home() {
  const { authUser, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !authUser)
      // router.push('/')
      console.log('Please login first');
  }, [authUser, loading]);
  // console.log(777, authUser);

  return (
    <React.Fragment>
      <Head>
        <title>Movie App</title>
      </Head>
      <div>
        {loading ? (
          <Typography> </Typography>
        ) : (
          <>
            <Typography align="left" style={{ paddingLeft: 20, paddingTop: 20 }}>
              {authUser && <div>Congratulations {authUser?.email}! You are logged in.</div>}
            </Typography>
          </>
        )}
      </div>
      <Trending />
    </React.Fragment>
  );
}
