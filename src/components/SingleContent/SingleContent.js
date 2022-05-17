import Badge from '@mui/material/Badge';
import { img_300, unavailable } from "../../config/config";
import ContentModal from "../ContentModal/ContentModal";
import styles from './SingleContent.module.css';

import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Image from 'next/image'

const SingleContent = ({
    id,
    poster,
    title,
    date,
    media_type,
    vote_average,
}) => {

return (
    <ContentModal media_type={media_type} id={id}>
        <Box sx={{
            width: 300,
            height: 550,
            paddingTop: 3,
        }}>
            <Badge
                badgeContent={vote_average}
                color={vote_average > 6 ? "primary" : "secondary"}
            />
            <img
                className={styles.poster}
                src={poster ? `${img_300}${poster}` : unavailable}
                alt={title}
            />
            <b className={styles.title}>{title}</b>
            <span className={styles.subTitle}>
                {media_type === "tv" ? "TV Series" : "Movie"}
                <span className={styles.subTitle}>{date}</span>
            </span>
        </Box>
    </ContentModal>
  );
};

export default SingleContent;
