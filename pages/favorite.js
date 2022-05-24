import * as React from 'react';
import { useState, useEffect } from 'react';
import { database } from '../lib/firebase';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { MovieCard } from '../src/components/Movie/MovieCard';
import { useAuth } from '../context/AuthUserContext';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';

export default function Favorite() {
    const [movies, setMovies] = useState([]);
    const { authUser, loading, signOut } = useAuth();

    function getMovies() {
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
        getMovies();
    },[])

    useEffect(() => {
        console.log(movies);
    },[movies])

    useEffect(() => {
        if (!loading && !authUser)
        // router.push('/')
        console.log('Please login first');
    }, [authUser, loading])

    const handleDelete = (id) => {
        const docRef = doc(database, 'movies', id);
        deleteDoc(docRef)
        .then(() => {
            console.log('Document deleted');
            window.location.reload(true);
        })
        .catch(error => console.log(error.message)) 
    }
    // console.log(777,'auth',authUser)
    // const mov = movies.filter((v) => {
    //     return v.data.user === authUser.uid
    // })
    // console.log(777,'movmov',getMovies)

    return (
        <>
            <div>
                <div className="heading">
                    <h2>List Favorite Movies</h2>
                </div>
                {/* <ul style={{ color: "white" }}>
                    {movies.map(movie => (
                        <li key={movie.id}>{ movie.data.movie.title }</li>
                        <MovieCard movie={movie} key={movie.id} />
                    ))}
                </ul> */}
                { authUser ? 
                <div>
                    {movies && movies.length > 0 ? movies.filter((mov) => {
                        return mov.data.user === authUser.uid
                    }).map(movie => (
                        // <li key={movie.id}>{ movie.data.movie.title }</li>
                        <>
                            <MovieCard movie={movie.data.movie} key={movie.data.id} />
                        
                
                            <Button
                                onClick={() => handleDelete(movie.id)}
                                style={{ marginLeft: 0 }}
                            >
                                <CloseIcon />
                            </Button>
                        
                            
                        
                        </>
                    )) : 
                        <h3 className="heading">No movies in your list! Add some!</h3>
                    }
                </div> : <h3 className="heading">Log in first to add your favorite movie!</h3>
                }
            </div>
        </>
    );
}