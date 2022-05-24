import Badge from '@mui/material/Badge';
import { img_500, unavailable } from "../../config/config";
import ContentModal from "../ContentModal/ContentModal";
import styles from './SingleContent.module.css';
import Box from '@mui/material/Box';


const SingleContent = ({
    id,
    poster,
    title,
    date,
    media_type,
    vote_average,
    type,
    movie,
}) => {

return (
    <ContentModal media_type={media_type} id={id} movie={movie} >
        <Box sx={{
            width: 250,
            height: 400,
            paddingTop: 3,
        }}>
            <img
                className={styles.poster}
                src={poster ? `${img_500}${poster}` : unavailable}
                alt={title}
            />
            <Badge
                badgeContent={vote_average}
                color={vote_average > 6.5 ? "primary" : "secondary"}
            />
            {/* <div>
                <b className={styles.title}>{title}</b>
            <span className={styles.subTitle}>
                {media_type === "tv" ? "TV Series" : "Movie"}
                <span className={styles.subTitle}>{date}</span>
            </span>
            </div> */}
            
        </Box>
        
    </ContentModal>
  );
};

export default SingleContent;
