"use client";
import { useEffect, useState } from "react";
import React from "react";
import styles from "../../app/(main layout)/track/[courier]/[trackingId]/courierresult.module.css";
import { Loader } from "../loader/loader";
import Link from "next/link";

export const Error = ({ error, url }) => {
  return (
    <>
      {url && (
        <div className={styles["courier-url"]}>
          <p className={styles["error"]}>{`${error} `}</p>
          <span className={styles["live-tracking"]}>Live Tracking - </span>
          <Link href={url} target="blank" className={styles["click-here"]}>
            {url}
          </Link>
        </div>
      )}
    </>
  );
};
