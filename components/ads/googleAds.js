"use client";
import React from "react";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import styles from "./ads.module.css";

const AdsenseComp = () => {
  // const [ads, setAds] = useState(false);

  const currentPath = usePathname();

  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     setAds((ads) => !ads);
  //   }, 20000); // Run the effect every three seconds (3000 milliseconds)

  //   // Clean up the interval to prevent memory leaks
  //   return () => clearInterval(intervalId);
  // });

  useEffect(() => {
    window.adsbygoogle = window.adsbygoogle || [];
    window.adsbygoogle.push({});
  }, [currentPath]);

  return (
    <>
      <div className={styles["customize_bigger_ad"]}>
        <ins
          className="adsbygoogle"
          style={{ display: "block", height: "280px" }}
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
