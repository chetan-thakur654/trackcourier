"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu((prevState) => !prevState);
  };

  const closeMenu = () => {
    setShowMenu(false);
  };

  useEffect(() => {
    if (showMenu) {
      // Disable scrolling when the fixed menu is active
      document.body.style.overflow = "hidden";
    } else {
      // Re-enable scrolling when the fixed menu is inactive
      document.body.style.overflow = "auto";
    }
  }, [showMenu]);

  return (
    <nav className={`${styles.navbar} ${showMenu ? styles.active : ""}`}>
      <div className={styles["navbar-container"]}>
        <div className={styles["navbar-logo"]}>
          <Link href="/">TrackCourier.Co</Link>
        </div>
        <div className={styles["navbar-toggle"]} onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <ul className={styles["navbar-menu"]}>
          <li className={styles["navbar-item"]}>
            <Link href="/about-us">About Us</Link>
          </li>
          <li className={styles["navbar-item"]}>
            <Link href="/contact-us">Contact Us</Link>
          </li>
          <li className={styles["navbar-item"]}>
            <Link href="/privacy-policy">Privacy Policy</Link>
          </li>
        </ul>
      </div>
      {showMenu && (
        <div className={styles["navbar-overlay"]} onClick={closeMenu}></div>
      )}
    </nav>
  );
};

export default Navbar;
