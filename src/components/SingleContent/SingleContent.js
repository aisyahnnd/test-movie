import Badge from '@mui/material/Badge';
import { img_500, unavailable } from '../../config/config';
import ContentModal from '../ContentModal/ContentModal';
import styles from './SingleContent.module.css';
import Box from '@mui/material/Box';

const SingleContent = ({ id, poster, title, media_type, vote_average, movie }) => {
  //   console.log('single:', movie);
  return (
    <ContentModal media_type={media_type} id={id} movie={movie}>
      <Box
        className={styles.media}
        sx={{
          width: 250,
          height: 400,
          paddingTop: 3,
        }}
      >
        <Badge badgeContent={vote_average} color={vote_average > 6.5 ? 'primary' : 'secondary'} />
        <img
          className={styles.poster}
          src={poster ? `${img_500}${poster}` : unavailable}
          alt={title}
        />
      </Box>
    </ContentModal>
  );
};

export default SingleContent;
