"use client";
import { useState } from "react";
import styles from "../../app/(main layout)/track/[courier]/[trackingId]/courierresult.module.css";
import Link from "next/link";

const Frame = ({ url }) => {
  const [show, setShow] = useState(false);

  const handleLoad = () => {
    console.log("loaded");
    setShow(true);
  };

  return (
    <>
      <div>
        <div
          style={{ display: !show ? "block" : "none" }}
          className={styles["loader-container"]}
        >
          <div class={styles["lds-roller"]}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <div class={styles["loader-text"]}>
            Hold on tight, we're fetching your tracking data!
          </div>
        </div>
        <iframe
          id="myIframe"
          src={url}
          style={{ display: show ? "block" : "none" }}
          frameBorder="0"
          scrolling="no"
          width="100%"
          height="1380px"
          onLoad={handleLoad}
        />
        {show && (
          <div className={styles["courier-result"]}>
            <span className={styles["live-tracking"]}>
              If There is Any Error ! Track On Official Website -{" "}
            </span>
            <Link href={url} target="blank" className={styles["click-here"]}>
              {url}
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default Frame;
