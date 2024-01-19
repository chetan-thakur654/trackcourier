"use client";
import styles from "../sidebar/Sidebar.module.css";
import { courierProviders } from "@/utility/CourierProviders";
import React, { useState, useEffect } from "react";
import Link from "next/link";

export const CourierList = () => {
  const [visibleProviders, setVisibleProviders] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const itemsPerPage = 20; // Number of items to load per page
  useEffect(() => {
    // Function to load courier providers for the given page
    const loadProviders = () => {
      const startIndex = (pageNumber - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const providersToDisplay = courierProviders.slice(startIndex, endIndex);
      setVisibleProviders((prevProviders) => [
        ...prevProviders,
        ...providersToDisplay,
      ]);
    };

    // Load providers for the initial page
    loadProviders();
  }, [pageNumber]);

  // Function to handle scroll events
  const handleScroll = (e) => {
    // Check if the user has scrolled to the bottom of the sidebar
    if (e.target.scrollTop + e.target.clientHeight === e.target.scrollHeight) {
      // Increment the page number to load more providers
      setPageNumber((prevPageNumber) => prevPageNumber + 1);
    }
  };

  return (
    <>
      <ul className={`${styles.sidebar__list}`} onScroll={handleScroll}>
        {visibleProviders.map((provider, index) => (
          <li key={index}>
            <Link href={`/courier/${provider.link}`}>{provider.name}</Link>
          </li>
        ))}
      </ul>
    </>
  );
};
