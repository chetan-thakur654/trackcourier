import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";
import Navbar from "@/components/Navbar";
import styles from "@/style/layout.module.css";
import Sidebar from "@/components/Sidebar";
import Link from "next/link";

const PrimaryLayout = ({ children }) => {
  return (
    <div className={styles["container"]}>
      <header>
        <Navbar />
      </header>
      <div className={styles["content"]}>
        <Sidebar />
        <main className={styles["main-section"]}>{children}</main>
      </div>
      <footer className={styles["footer"]}>
        <div className={styles["footer-container"]}>
          <div className={styles.row}>
            <div className={styles["col-md-6"]}>
              <p>TrackCourier.co &copy; 2023. All Rights Reserved.</p>
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
    </div>
  );
};

export default PrimaryLayout;
