import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import axios from 'axios';
import CustomPagination from '../../src/components/Pagination/CustomPagination';
import SingleContent from '../../src/components/SingleContent/SingleContent';
import styles from './search.module.css';
import TextField from '@mui/material/TextField';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import MovieIcon from '@mui/icons-material/Movie';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import Head from 'next/head';

const Search = () => {
  const [type, setType] = useState(0);
  const [searchText, setSearchText] = useState('');
  const [page, setPage] = useState({
    tv: 1,
    movie: 1,
  });
  const [content, setContent] = useState([]);
  const [numOfPages, setNumOfPages] = useState();

  // karena untuk menampilkan 2 tampilan yg berbeda menggunakan 1 komponen pagination, maka diperlukan
  // initialState untuk 2 type tsb yaitu beruba object dg key tv dan movie
  // nilai state type diinisialisasikan dg nilai awal 0, jika 0 maka type-nya adalah movie
  // berarti nilai dari parameter typePage adalah 'movie', maka page[typePage] akan mengambil value dari key 'movie'
  const darkTheme = createTheme({
    palette: {
      type: 'dark',
      primary: {
        main: '#fff',
      },
    },
  });

  const fetchSearch = async (typePage) => {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/search/${type ? 'tv' : 'movie'}?api_key=${
          process.env.NEXT_PUBLIC_API_KEY
        }&language=en-US&query=${searchText}&page=${page[typePage]}&include_adult=false`
      );
      setContent(data.results);
      setNumOfPages(data.total_pages);
      console.log(777, typePage);
      console.log(777, data.results);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    window.scroll(0, 0);
    fetchSearch(type === 0 ? 'movie' : 'tv');
  }, [type, page]);

  return (
    <div>
      <Head>
        <title>Search Movie</title>
      </Head>
      <ThemeProvider theme={darkTheme}>
        <div className={styles.search}>
          <TextField
            style={{ flex: 1, backgroundColor: 'white' }}
            label="Search"
            variant="filled"
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Button onClick={fetchSearch} variant="contained" style={{ marginLeft: 10 }}>
            <SearchIcon fontSize="large" />
          </Button>
        </div>
        <Tabs
          value={type}
          indicatorColor="primary"
          textColor="primary"
          onChange={(event, newValue) => {
            setType(newValue);
          }}
          style={{ paddingBottom: 5 }}
          aria-label="icon label tabs example"
          centered
        >
          <Tab
            icon={<MovieIcon />}
            style={{ width: '100%', color: 'white' }}
            label="Search Movies"
          />
          <Tab
            icon={<LiveTvIcon />}
            style={{ width: '100%', color: 'white' }}
            label="Search TV Series"
          />
        </Tabs>
      </ThemeProvider>
      <div className={styles.trending}>
        {content &&
          content.map((each) => (
            <SingleContent
              key={each.id}
              id={each.id}
              poster={each.poster_path}
              title={each.title || each.name}
              date={each.first_air_date || each.release_date}
              media_type={type ? 'tv' : 'movie'}
              vote_average={each.vote_average}
              movie={each}
            />
          ))}
      </div>
      {numOfPages > 1 && (
        <CustomPagination
          setPage={setPage}
          numOfPages={numOfPages}
          type={type === 0 ? 'movie' : 'tv'}
          page={page}
        />
      )}
    </div>
  );
};

export default Search;
