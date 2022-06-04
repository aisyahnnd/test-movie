import { useState, useEffect } from 'react';
import axios from 'axios';
import SingleContent from '../../src/components/SingleContent/SingleContent';
import CustomPagination from '../../src/components/Pagination/CustomPagination';
import styles from './trending.module.css';

const Trending = () => {
  const [page, setPage] = useState({ index: 1 });
  const [content, setContent] = useState([]);

  const fetchTrending = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.NEXT_PUBLIC_API_KEY}&page=${page.index}`
    );

    setContent(data.results);
  };
  //   console.log('trending:', content);

  useEffect(() => {
    window.scroll(0, 0);
    fetchTrending();
  }, [page]);

  return (
    <>
      <div className={styles.trending}>
        {content &&
          content.map((each) => (
            <SingleContent
              id={each.id}
              poster={each.poster_path}
              title={each.title || each.name}
              media_type={each.media_type}
              vote_average={each.vote_average}
              movie={each}
            />
          ))}
      </div>
      <CustomPagination setPage={setPage} type={'index'} page={page} />
    </>
  );
};

export default Trending;
