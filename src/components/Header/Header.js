import React, { useState } from 'react';
import { useAuth } from '../../../context/AuthUserContext';
import styles from './Header.module.css';
import Link from 'next/link';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

export default function Header() {
  const { authUser, signOut } = useAuth();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <nav className={styles.navbar}>
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
              <Link href="/Search">
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
          <div className={styles.icon} hidden>
            <Button
              id="basic-button"
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
              style={{ color: 'white' }}
            >
              <MenuIcon />
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <MenuItem onClick={handleClose}>
                <Link href="/">
                  <a>Trending</a>
                </Link>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Link href="/Favorite">
                  <a>Favorite</a>
                </Link>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Link href="/Search">
                  <a>Search</a>
                </Link>
              </MenuItem>
              {authUser ? (
                <MenuItem onClick={handleClose}>
                  <Link href="/">
                    <a onClick={signOut}>Sign Out</a>
                  </Link>
                </MenuItem>
              ) : (
                <MenuItem onClick={handleClose}>
                  <Link href="/auth/login">
                    <a>Sign In</a>
                  </Link>
                </MenuItem>
              )}
            </Menu>
          </div>
        </header>
      </nav>
    </>
  );
}
