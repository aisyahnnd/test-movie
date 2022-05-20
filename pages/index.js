import Head from 'next/head';
import getConfig from 'next/config';
import Movie from '../src/components/Movie';
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import SimpleBottomNavigation from '../src/components/MainNav';
import Trending from "./Trending/Trending";
import Search from "./Search/Search";
import Movies from "./Movies/Movies";
import Link from 'next/link';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { GlobalProvider } from "../src/context/GlobalState";

const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();

export default function Home() {
  return (
    <GlobalProvider>
        <Trending />
    </GlobalProvider>   
  );
}
