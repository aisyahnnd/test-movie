import * as React from 'react';
import { useState, useEffect } from 'react';
import { database } from '../lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { MovieCard } from '../src/components/Movie/MovieCard';
import { useAuth } from '../context/AuthUserContext';

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

    // console.log(777,'auth',authUser)
    // const mov = movies.filter((v) => {
    //     return v.data.user === authUser.uid
    // })
    // console.log(777,'auth',mov)

    return (
        <>
            <div>
                <h4>List Movies</h4>
                {/* <ul style={{ color: "white" }}>
                    {movies.map(movie => (
                        <li key={movie.id}>{ movie.data.movie.title }</li>
                        <MovieCard movie={movie} key={movie.id} />
                    ))}
                </ul> */}
                { authUser ? 
                <div>
                    {movies.filter((mov) => {
                        return mov.data.user === authUser.uid
                    }).map(movie => (
                        // <li key={movie.id}>{ movie.data.movie.title }</li>
                        <MovieCard movie={movie.data.movie} key={movie.data.id} />
                    ))}
                </div> : null
                }
            </div>
        </>
    );
}