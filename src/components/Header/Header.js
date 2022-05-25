import React, { useEffect, useState } from "react";
import { useAuth } from '../../../context/AuthUserContext';
import { useRouter } from 'next/router';
import styles from './Header.module.css';
import Link from 'next/link';


export default function Header() {
    const [navbar, setNavbar] = useState(false);
    const { authUser, loading, signOut } = useAuth();
    const router = useRouter();

    // Listen for changes on loading and authUser, redirect if needed
    useEffect(() => {
        window.addEventListener('scroll', changeBackground);

        if (!loading && !authUser)
        // router.push('/')
        console.log('Please login first');
    }, [authUser, loading])
    // console.log(777,'auth',authUser);

    const changeBackground = () => {
        if (window.scrollY >= 3000) {
            setNavbar(true);
        } else {
            setNavbar(false);
        }
    }
    
    return (
        <>
        <nav className={navbar ? styles.navbar.active : styles.navbar}>
            <div className={styles.leftItem}>
                MOVIES APP
            </div>
            <header className={styles.container}>
                <ul className={styles.list}>
                    <li className={styles.item}><Link href="/">Trending</Link></li>
                    <li className={styles.item}><Link href="/favorite">Favorite</Link></li>
                    <li className={styles.item}><Link href="/search">Search</Link></li>
                    { authUser ? <li className={styles.item}><Link href="/"><a onClick={signOut}>Sign Out</a></Link></li> :
                    <li className={styles.item}><Link href="/auth/login">Sign In</Link></li>
                    }
                </ul>
            </header>
        
        </nav>
        </>
    );
}