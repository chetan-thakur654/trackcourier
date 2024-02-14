"use client";
import React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { usePathname, useSearchParams } from "next/navigation";
import styles from "./ads.module.css";

const SmallGoogleAd = () => {
  const currentPath = usePathname();

  useEffect(() => {
    window.adsbygoogle = window.adsbygoogle || [];
    window.adsbygoogle.push({});
  }, [currentPath]);

  return (
    <div className={styles["small_ad_container"]} key={currentPath}>
      <ins
        className={`adsbygoogle ${styles["customize_small_ad"]}`}
        style={{ display: "block", width: "100%" }}
        data-ad-client="ca-pub-9178289074565401"
        data-ad-slot="1756083532"
        // data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
};

export default SmallGoogleAd;
