import styles from './Header.module.css';
import Link from 'next/link';
import React, { useEffect, useState } from "react";

export default function Header() {
    const [navbar, setNavbar] = useState(false);

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
    
    return (
        <>
        <nav className={navbar ? styles.navbar.active : styles.navbar}>
            <header className={styles.container}>
                
            <ul className={styles.list}>
                <li className={styles.item}><Link href="/">Movies</Link></li>
                <li className={styles.item}><Link href="/Favorite/Watchlist">Favorite</Link></li>
                <li className={styles.item}><Link href="/Search/Search">Search</Link></li>
                <li className={styles.item}><Link href="/">Login</Link></li>
            </ul>

            </header>
        
        </nav>
        </>
        
    );
}