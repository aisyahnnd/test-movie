import Head from 'next/head';
import getConfig from 'next/config';
import Movie from '../src/components/Movie';
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();

export default function Home(initialData) {
  const [searchResult, setSearchResults] = useState([]);
  const [formInput, setFormInputs] = useState({}); 
  const [searchTerm, setSearchTerms] = useState(''); 

  useEffect(() => {
    setSearchResults(initialData.trendingMovies.results)
  },[initialData])

  const handleInputs = (event) => {
    let {name, value} = event.target;
    setFormInputs = ({
      ...formInput,
      [name]: value,
    });
    setSearchTerms(event.target.value);
  }

  const search = async (event) => {
    event.preventDefault();
    let movies = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&query=${formInput.searchTerm}&page-1&include_adult=false`);
    movies = await movies.json();
    console.log('movies:', movies)
    setSearchResults(movies.results);
  }

  return (
    <Container className='container'>
      <Head>
        <title>Movies App</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="/styles.css" /> 
      </Head>
      <h1>Movies App</h1>
        <Box
            onSubmit={search}
            component="form"
            sx={{
              '& > :not(style)': { m: 1, width: '125ch' },
            }}
            noValidate
            autoComplete="off"
        >
            <TextField className="search" name="searchTerm" value={searchTerm} onChange={handleInputs} type="text" required />
            <Button className="button-search">Search</Button>
        </Box>
          <div className="movie-search-results-grid">
            {searchResult.map((each, index) => {
              return(
                <Box sx={{ flexGrow: 1 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={4}>
                      <Movie 
                        index={each.id}
                        title={each.title}
                        poster_path={each.poster_path}
                        overview={each.overview}
                      />
                    </Grid>
                  </Grid>
                </Box>
              )
            })}
          </div>
      
    </Container>
  )
}

export async function getServerSideProps() {
  let trendingMovies = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${serverRuntimeConfig.apiKey}`);
  trendingMovies = await trendingMovies.json()
  console.log(trendingMovies);
  return {
    props: {trendingMovies: trendingMovies}, // will be passed to the page component as props
  }
}
