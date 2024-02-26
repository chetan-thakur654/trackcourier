"use client";
import React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { usePathname, useSearchParams } from "next/navigation";
import styles from "./ads.module.css";

const SmallGoogleAd = () => {
  const currentPath = usePathname();
  const [ads, setAds] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setAds((ads) => !ads);
    }, 20000); // Run the effect every three seconds (3000 milliseconds)

    // Clean up the interval to prevent memory leaks
    return () => clearInterval(intervalId);
  });

  useEffect(() => {
    window.adsbygoogle = window.adsbygoogle || [];
    window.adsbygoogle.push({});
  }, [currentPath, ads]);

  return (
    <div className={styles["small_ad_container"]} key={ads}>
      <ins
        className={`adsbygoogle ${styles["customize_small_ad"]}`}
        style={{ display: "block", height: "100px" }}
        data-ad-client="ca-pub-9178289074565401"
        data-ad-slot="1756083532"
        // data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
};

export default SmallGoogleAd;
