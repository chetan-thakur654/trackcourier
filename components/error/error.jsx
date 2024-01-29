"use client";
import { useEffect, useState } from "react";
import React from "react";
import styles from "../../app/(main layout)/track/[courier]/[trackingId]/courierresult.module.css";
import { Loader } from "../loader/loader";
import Link from "next/link";

export const Error = ({ error, url }) => {
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    if (error) {
      setShowError(true);
    }
  }, []);

  return (
    <>
      {!showError ? (
        <Loader />
      ) : (
        <>
          <p className={styles["error"]}>{`${error} `}</p>
          {url && (
            <div className={styles["courier-result"]}>
              <span className={styles["live-tracking"]}>
                Track On Official Website -{" "}
              </span>
              <Link href={url} target="blank" className={styles["click-here"]}>
                {url}
              </Link>
            </div>
          )}
        </>
      )}
    </>
  );
};
