import React from 'react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthUserContext';
import Head from 'next/head';
import Trending from './Trending';
import Typography from '@mui/material/Typography';

export default function Home() {
  const { authUser, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !authUser) console.log('Please login first');
  }, [authUser, loading]);

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
            <Typography align="left" style={{ paddingLeft: 20, paddingTop: 100 }}>
              {authUser && <div>Congratulations {authUser?.email}! You are logged in.</div>}
            </Typography>
          </>
        )}
      </div>
      <Trending />
    </React.Fragment>
  );
}
