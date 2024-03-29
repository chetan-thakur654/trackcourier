"use client";
import React from "react";
import Script from "next/script";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";
import Navbar from "@/components/navbar/Navbar";
import styles from "@/style/layout.module.css";
import Sidebar from "@/components/sidebar/Sidebar";
import { useState, useEffect } from "react";
import Link from "next/link";

const PrimaryLayout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    // if (window.innerWidth < 768) {
    setIsOpen(!isOpen);
    // }
  };

  useEffect(() => {
    if (isOpen) {
      // Disable scrolling when the fixed menu is active
      document.body.style.overflow = "hidden";
    } else {
      // Re-enable scrolling when the fixed menu is inactive
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  return (
    <>
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9178289074565401"
        crossorigin="anonymous"
      ></Script>
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-E6S2NPJ82S"
      ></Script>
      <Script>
        {`
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-E6S2NPJ82S');
`}
      </Script>
      <div className={styles["container"]}>
        <header className={styles["header"]}>
          <Navbar />
        </header>
        <aside>
          <div
            className={`${styles["sidebar-container"]} ${
              isOpen ? styles["sidebar-container-open"] : ""
            }`}
          >
            <Sidebar isOpen={isOpen} toggleDropdown={toggleDropdown} />
          </div>
          {isOpen && (
            <div
              className={styles.sidebar__overlay}
              onClick={toggleDropdown}
            ></div>
          )}
        </aside>
        <main className={styles["content"]}>
          <div className={styles["main-section"]}>{children}</div>
          <footer className={styles["footer"]}>
            <div className={styles["footer-container"]}>
              <div className={styles.row}>
                <div className={styles["col-md-6"]}>
                  <p>TrackCourier.co &copy; 2024. All Rights Reserved.</p>
                </div>
                <div className={styles["col-md-6"]}>
                  <ul className={styles["social-media"]}>
                    <li>
                      <Link
                        href="https://www.facebook.com/profile.php?id=100093927715098"
                        target="blank"
                      >
                        <FaFacebookF />
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="https://www.instagram.com/trackcourier.co/"
                        target="blank"
                      >
                        <FaInstagram />
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="https://twitter.com/trackcourier_co"
                        target="blank"
                      >
                        <FaTwitter />
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </footer>
        </main>
      </div>
    </>
  );
};

export default PrimaryLayout;
