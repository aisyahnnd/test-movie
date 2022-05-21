import styles from './Header.module.css';
import Link from 'next/link';
import React, { useEffect, useState } from "react";
import Button from '@mui/material/Button';
// import firebase from "firebase/app";
// import "firebase/auth";
// import { SignOut } from '../../../firebaseConfig';
// import { initializeApp } from "firebase/app";
// import {
//     getAuth,
//     signOut
//   } from 'firebase/auth';
// import { useFirebaseAuth } from '../../../lib/useFirebaseAuth';

export default function Header() {
    const [navbar, setNavbar] = useState(false);
    // const auth = getAuth();
    // console.log('auth',auth)

    const changeBackground = () => {
        if (window.scrollY >= 3000) {
            setNavbar(true);
        } else {
            setNavbar(false);
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', changeBackground);
    },[]);

    let token = '';
    if (typeof window !== 'undefined') {
        token = window.sessionStorage.getItem('Token')
    }

    // const onSubmit = async () => {
    //     try {
    //         await signOut(auth)
    //         .then(clear);
    //     } catch (error) {}
    // }

    const handleClick = async () => {
        console.log('Haloooo')
        // await firebase.auth().signOut().then(() => {
        //     console.log('Sign out sukses')
        // }).catch((error) => {
        //     console.log(error.message);
        // });
    }
    
    return (
        <>
        <nav className={navbar ? styles.navbar.active : styles.navbar}>
            <header className={styles.container}>
                
            <ul className={styles.list}>
                <li className={styles.item}><Link href="/">Movies</Link></li>
                <li className={styles.item}><Link href="/favorite/watchlist">Favorite</Link></li>
                <li className={styles.item}><Link href="/search/search">Search</Link></li>
                { token?.length > 0 ? <li className={styles.item}><Link href="#"><a onClick={handleClick}>Logout</a></Link></li> :
                <li className={styles.item}><Link href="/auth/login">Login</Link></li>
                }
                {/* <li className={styles.item}><Button>Logout</Button></li> */}
            </ul>

            </header>
        
        </nav>
        </>
        
    );
}