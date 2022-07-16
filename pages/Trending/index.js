import { useState, useEffect } from 'react';
import axios from 'axios';
import SingleContent from '../../src/components/SingleContent/SingleContent';
import CustomPagination from '../../src/components/Pagination/CustomPagination';
import styles from './Trending.module.css';

const Trending = () => {
  const [page, setPage] = useState({ index: 1 });
  const [content, setContent] = useState([]);
  const [numOfPages, setNumOfPages] = useState();

  useEffect(() => {
    window.scroll(0, 0);
    fetchTrending();
  }, [page]);

  const fetchTrending = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.NEXT_PUBLIC_API_KEY}&page=${page.index}`
    );

    setContent(data.results);
    setNumOfPages(data.total_pages);
  };

  return (
    <>
      <div className={styles.trending}>
        {content &&
          content.map((each) => (
            <SingleContent
              id={each.id}
              key={each.id}
              poster={each.poster_path}
              title={each.title || each.name}
              media_type={each.media_type}
              vote_average={each.vote_average}
              movie={each}
            />
          ))}
      </div>
      <CustomPagination numOfPages={numOfPages} setPage={setPage} type={'index'} page={page} />
    </>
  );
};

export default Trending;
