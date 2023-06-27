"use client";
import React, { useState, useEffect, lazy, Suspense, useRef } from "react";
import { FiChevronRight } from "react-icons/fi";
import Link from "next/link";
import styles from "./Sidebar.module.css";
import { courierProviders } from "@/utility/CourierProviders";
// const CourierList = lazy(() => import('./CourierList').then(module => ({ default: module.CourierList })));

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [chunksLoaded, setChunksLoaded] = useState(0);
  const [chunkSize, setChunkSize] = useState(40);
  const [totalChunks, setTotalChunks] = useState(
    Math.ceil(courierProviders.length / chunkSize)
  );
  const [showCourierProviders, setShowCourierProviders] = useState([]);
  useEffect(() => {
    const startIndex = chunksLoaded * chunkSize;
    const endIndex = (chunksLoaded + 1) * chunkSize;
    const chunk = courierProviders.slice(startIndex, endIndex);
    setShowCourierProviders([...showCourierProviders, ...chunk]);
  }, [chunksLoaded]);

  const ulRef = useRef(null);
  // console.log(ulRef.current.scrollHeight - ulRef.current.scrollTop === ulRef.current.clientHeight)
  const handleScroll = () => {
    if (
      ulRef.current.scrollHeight - ulRef.current.scrollTop ===
      ulRef.current.clientHeight
    ) {
      if (chunksLoaded < totalChunks) {
        setChunksLoaded((prevLoadedChunks) => prevLoadedChunks + 1);
      }
    }
  };
  useEffect(() => {
    ulRef.current.addEventListener("scroll", handleScroll);
    return () => ulRef.current.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleDropdown = () => {
    console.log("clicked on  button");
    // if (window.innerWidth < 768) {
    setIsOpen(!isOpen);
    // }
  };

  return (
    <aside className={styles.sidebar}>
      <button onClick={toggleDropdown}>
        {/* {window.innerWidth < 768 ? ( */}
        <FiChevronRight className={styles["arrow-icon"]} />
        {/* // ) : null} */}
        Couriers
      </button>
      <ul
        ref={ulRef}
        className={`${styles.sidebar__list} ${
          isOpen ? styles["sidebar__list__open"] : ""
        }`}
      >
        {showCourierProviders.map((provider, index) => (
          <li key={index}>
            <Link href={`/courier/${provider.link}`}>{provider.name}</Link>
          </li>
        ))}
      </ul>
      {isOpen && (
        <div className={styles.sidebar__overlay} onClick={toggleDropdown}></div>
      )}
    </aside>
  );
};

export default Sidebar;
