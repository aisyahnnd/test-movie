import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../context/AuthUserContext';
import styles from './Header.module.css';
import Link from 'next/link';

export default function Header() {
  const [navbar, setNavbar] = useState(false);
  const { authUser, signOut } = useAuth();

  useEffect(() => {
    window.addEventListener('scroll', changeBackground);
  }, []);

  const changeBackground = () => {
    if (window.scrollY >= 3000) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  return (
    <>
      <nav className={navbar ? styles.navbar.active : styles.navbar}>
        <div className={styles.leftItem}>MOVIES APP</div>
        <header className={styles.container}>
          <ul className={styles.list}>
            <li className={styles.item}>
              <Link href="/">
                <a>Trending</a>
              </Link>
            </li>
            <li className={styles.item}>
              <Link href="/favorite">
                <a>Favorite</a>
              </Link>
            </li>
            <li className={styles.item}>
              <Link href="/search">
                <a>Search</a>
              </Link>
            </li>
            {authUser ? (
              <li className={styles.item}>
                <Link href="/">
                  <a onClick={signOut}>Sign Out</a>
                </Link>
              </li>
            ) : (
              <li className={styles.item}>
                <Link href="/auth/login">
                  <a>Sign In</a>
                </Link>
              </li>
            )}
          </ul>
        </header>
      </nav>
    </>
  );
}
