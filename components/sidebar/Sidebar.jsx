"use client";
import React, { useState, useEffect, lazy, Suspense, useRef } from "react";
import { FiChevronRight } from "react-icons/fi";
import Link from "next/link";
import styles from "./Sidebar.module.css";
import { courierProviders } from "@/utility/CourierProviders";
// const CourierList = lazy(() => import('./CourierList').then(module => ({ default: module.CourierList })));

const Sidebar = ({ isOpen, toggleDropdown }) => {
  // const [chunksLoaded, setChunksLoaded] = useState(0);
  // const [chunkSize, setChunkSize] = useState(20);
  // const [totalChunks, setTotalChunks] = useState(
  //   Math.ceil(courierProviders.length / chunkSize)
  // );
  const [showCourierProviders, setShowCourierProviders] =
    useState(courierProviders);
  // useEffect(() => {
  //   const startIndex = chunksLoaded * chunkSize;
  //   const endIndex = (chunksLoaded + 1) * chunkSize;
  //   const chunk = courierProviders.slice(startIndex, endIndex);
  //   setShowCourierProviders([...showCourierProviders, ...chunk]);
  // }, [chunksLoaded]);

  // const ulRef = useRef(null);
  // // console.log(ulRef.current.scrollHeight - ulRef.current.scrollTop === ulRef.current.clientHeight)
  // const handleScroll = () => {
  //   if (
  //     ulRef.current.scrollHeight - ulRef.current.scrollTop ===
  //     ulRef.current.clientHeight
  //   ) {
  //     if (chunksLoaded < totalChunks) {
  //       setChunksLoaded((prevLoadedChunks) => prevLoadedChunks + 1);
  //     }
  //   }
  // };
  // useEffect(() => {
  //   ulRef.current.addEventListener("scroll", handleScroll);
  //   return () => ulRef.current.removeEventListener("scroll", handleScroll);
  // }, []);

  return (
    <div className={styles.sidebar}>
      <button onClick={toggleDropdown}>
        {/* {window.innerWidth < 768 ? ( */}
        <FiChevronRight className={styles["arrow-icon"]} />
        {/* // ) : null} */}
        Couriers
      </button>
      <ul className={`${styles.sidebar__list}`}>
        {showCourierProviders.map((provider, index) => (
          <li key={index}>
            <Link href={`/courier/${provider.link}`}>{provider.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
