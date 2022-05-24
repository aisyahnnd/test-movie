import * as React from 'react';
import { useEffect, useState, useContext } from 'react';
import { GlobalContext } from "../../context/GlobalState";
import axios from 'axios';
import Backdrop from '@mui/material/Backdrop';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import {
    img_500,
    unavailable,
    unavailableLandscape,
} from "../../config/config";
import styles from './ContentModal.module.css';

import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import { database } from '../../../lib/firebase';
import { useAuth } from '../../../context/AuthUserContext';


export default function TransitionsModal({ children, media_type, id, movie }) {
    const { addMovieToWatchlist, watchlist } = useContext(GlobalContext);
    // console.log(777,'watchlist', addMovieToWatchlist);

    let storedMovie = watchlist.find((fal) => fal.id === movie.id);
    // console.log(777,'moviemov', storedMovie);

    const watchlistDisabled = storedMovie ? true : false;
    const [open, setOpen] = useState(false);
    const [content, setContent] = useState();

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const { authUser, loading, signOut } = useAuth();

    const fetchData = async () => {
        const { data } = await axios.get(
            `https://api.themoviedb.org/3/${media_type}/${id}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US`
        );

        setContent(data);
        
        // await setDoc(doc(database, "movies", "movie-id"), data);
        console.log(777,'data:', data);
    };

    useEffect(() => {
        fetchData();

        if (!loading && !authUser)
        // router.push('/')
        console.log('Please login first');
    }, [authUser, loading]);

    
    const handleSubmit = async () => {
        //e.preventDefault()
        // const docRef = await addDoc(doc(database, "movies"), {
        //     movie
        // })
        const docRef = collection(database, 'movies')
        await addDoc(docRef, { movie, user: authUser.uid })
        .then(response => {
            console.log(999,response)
        })
        .catch(error => {
            console.log(error.message)
        })

        //console.log("Document written with ID: ", docRef.id);
        // const moviesCollRef = collection(database, 'movies')
        // addDoc(moviesCollRef, {title})
        // .then(response => {
        //     console.log(response)
        // })
        // .catch(error => {
        //     console.log(error.message)
        // })
    }

    return (
        <>
            <div
                className={styles.media}
                style={{ cursor: "pointer" }}
                color="inherit"
                onClick={handleOpen}
            >
                {children}
            </div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >

            <Fade in={open}>
                {content && (
                    <Box sx={{
                        width: "60%",
                        height: "70%",
                        backgroundColor: "white",
                        borderRadius: 10,
                        color: "black",
                        padding: 1,
                    }}>
                    <div className={styles.ContentModal}>
                        <img
                            src={
                            content.poster_path
                                ? `${img_500}/${content.poster_path}`
                                : unavailable
                            }
                            alt={content.name || content.title}
                            className={styles.ContentModal__portrait}
                        />
                        <img
                            src={
                            content.backdrop_path
                                ? `${img_500}/${content.backdrop_path}`
                                : unavailableLandscape
                            }
                            alt={content.name || content.title}
                            className={styles.ContentModal__landscape}
                        />
                        <div className={styles.ContentModal__about}>
                            <span className={styles.ContentModal__title}>
                                {content.name || content.title} - {''}
                                    {(
                                        content.first_air_date ||
                                        content.release_date ||
                                        "-----"
                                    ).substring(0, 4)}
                            </span>
                            
                            <span className={styles.ContentModal__description}>
                                {content.overview}
                            </span>
                            { authUser ? 
                            <Button
                                variant="contained"
                                color="primary"
                                target="__blank"
                                disabled={watchlistDisabled}
                                onClick={() => handleSubmit()}
                                >
                                ADD TO FAVORITE
                            </Button> :
                            <Button
                                variant="contained"
                                color="primary"
                                target="__blank"
                                disabled
                                >
                                ADD TO FAVORITE
                            </Button>
                            }
                        </div>
                    </div>
                    </Box>
                )}
            </Fade>
            </Modal>
        </>
    );
}
  