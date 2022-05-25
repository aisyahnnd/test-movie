import * as React from 'react';
import { useEffect, useState, useContext } from 'react';
import { GlobalContext } from "../../context/GlobalState";
import { addDoc, collection, getDocs, doc, setDoc } from 'firebase/firestore';
import { database } from '../../../lib/firebase';
import { useAuth } from '../../../context/AuthUserContext';
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
import Paper from '@mui/material/Paper';


export default function TransitionsModal({ children, media_type, id, movie }) {
    const [open, setOpen] = useState(false);
    const [content, setContent] = useState();

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const { authUser, loading } = useAuth();
    const [movies, setMovies] = useState([]);

    const fetchData = async () => {
        const { data } = await axios.get(
            `https://api.themoviedb.org/3/${media_type}/${id}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US`
        );

        setContent(data);
    };
    
    const handleSubmit = async () => {
        const docRef = collection(database, 'movies')
        await addDoc(docRef, { movie, userId: authUser.uid, email: authUser.email })
        .then(response => {
            console.log(999,response)
        })
        .catch(error => {
            console.log(error.message)
        })
    }

    function getData() {
        const movieCollectionRef = collection(database, 'movies')
        getDocs(movieCollectionRef)
        .then(response => {
            const movs = response.docs.map(doc => ({
                data: doc.data(),
                id: doc.id,
            }))
            setMovies(movs)
        })
        .catch(error => console.log(error.message))
    }

    useEffect(() => {
        fetchData();

        if (!loading && !authUser)
        // router.push('/')
        console.log('Please login first');
    }, [authUser, loading]);

    useEffect(() => {
        getData();
    },[movies])
    
    let storedMovieFavorite = movies.find(fal => {
        return (
            authUser ? fal.data.userId === authUser.uid && fal.data.movie.id === movie.id : null
        );  
    })
   
    const favoriteDisabled = storedMovieFavorite ? true : false;

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
                className={styles.modal}
            >

            <Fade in={open}>
                {content && (
                    <Paper sx={{
                        width: "60%",
                        height: "70%",
                        backgroundColor: "#39445a",
                        borderRadius: 10,
                        color: "white",
                        padding: 2,
                        border: "5px red",
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
                                disabled={favoriteDisabled}
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
                    </Paper>
                )}
            </Fade>
            </Modal>
        </>
    );
}
  