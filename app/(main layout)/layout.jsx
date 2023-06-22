import React from 'react'
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from 'react-icons/fa';
import Navbar from '../../components/Navbar'
import styles from './layout.module.css'
import Sidebar from '../../components/Sidebar';

const PrimaryLayout = ({children}) => {
  return (
    
            <div className={styles["container"]}>
                <header>
                    <Navbar/>
                </header>
                <div className= {styles["content"]}>
                    <Sidebar/>
                    <main className ={styles['main-section']}>
                      {children}
                    </main>
                </div>
                <footer className={styles["footer"]}>
          <div className={styles['footer-container']}>
        <div className={styles.row}>
          <div className={styles['col-md-6']}>
            <p>TrackCourier.co &copy; 2023. All Rights Reserved.</p>
          </div>
          <div className={styles['col-md-6']}>
            <ul className={styles['social-media']}>
              <li><a href="#"><FaFacebookF /></a></li>
              <li><a href="#"><FaInstagram /></a></li>
              <li><a href="#"><FaTwitter /></a></li>
              <li><a href="#"><FaLinkedinIn /></a></li>
            </ul>
          </div>
        </div>
          </div>
        </footer>
            </div>
       
  )
}

export default PrimaryLayout