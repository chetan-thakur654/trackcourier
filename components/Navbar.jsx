'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import styles from './Navbar.module.css'

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles['navbar-logo']}>
        <Link href="/">TrackCourier.Co</Link>
      </div>
      <label className={styles['navbar-toggle']} onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </label>
      <ul className={`${styles['navbar-menu']} ${showMenu ? styles.active : ''}`}>
        
        <li className={styles['navbar-item']}>
          <Link href="/about-us">About Us</Link>
        </li>
        <li className={styles['navbar-item']}>
          <Link href="/contact-us">Contact Us</Link>
        </li>
        <li className={styles['navbar-item']}>
          <Link href="/privacy-policy">Privacy Policy</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
