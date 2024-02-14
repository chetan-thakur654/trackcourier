"use client";
import React from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { usePathname, useSearchParams } from "next/navigation";
import styles from "./ads.module.css";

const AdsenseComp = () => {
  const router = useRouter();

  const currentPath = usePathname();

  useEffect(() => {
    window.adsbygoogle = window.adsbygoogle || [];
    window.adsbygoogle.push({});
  }, [currentPath]);

  return (
    <div className={styles["customize_bigger_ad"]} key={currentPath}>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-9178289074565401"
        data-ad-slot="9855663897"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
};

export default AdsenseComp;