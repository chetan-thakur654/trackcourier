"use client";
import React from "react";
import styles from "../../app/(main layout)/track/[courier]/[trackingId]/courierresult.module.css";

export const Loader = () => {
  return (
    <div className={styles["loader-container"]}>
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
        Hold On Tight, It Will Take Few Seconds!
      </div>
    </div>
  );
};
