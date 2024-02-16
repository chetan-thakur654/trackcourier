"use client";
import React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { usePathname, useSearchParams } from "next/navigation";
import styles from "./ads.module.css";

const AdsenseComp = () => {
  const router = useRouter();
  const [ads, setAds] = useState(false);

  const currentPath = usePathname();

  useEffect(() => {
    const intervalId = setInterval(() => {
      setAds((ads) => !ads);
    }, 15000); // Run the effect every three seconds (3000 milliseconds)

    // Clean up the interval to prevent memory leaks
    return () => clearInterval(intervalId);
  });

  useEffect(() => {
    window.adsbygoogle = window.adsbygoogle || [];
    window.adsbygoogle.push({});
  }, [currentPath, ads]);

  return (
    <>
      <div className={styles["customize_bigger_ad"]} key={ads}>
        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client="ca-pub-9178289074565401"
          data-ad-slot="9855663897"
          data-ad-format="auto"
          data-full-width-responsive="true"
        ></ins>
      </div>
    </>
  );
};

export default AdsenseComp;
