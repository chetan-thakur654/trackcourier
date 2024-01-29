"use client";

import { useEffect, useState } from "react";
import styles from "../../app/(main layout)/track/[courier]/[trackingId]/courierresult.module.css";
import { Loader } from "../loader/loader";
import Link from "next/link";

export const TrackingInfo = ({ trackingInfo, url }) => {
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    setShowResult(true);
  }, [trackingInfo]);
  return (
    <>
      {!showResult ? (
        <Loader />
      ) : (
        <>
          <div
            className={`${styles["result-head"]} ${
              trackingInfo.deliveryStatus === "Shipment Delivered"
                ? styles["courier-delivered"]
                : ""
            }`}
          >
            <div
              className={`${styles["result-head-child"]} ${styles["courier-status"]}`}
            >
              {" "}
              <span>{trackingInfo.deliveryStatus}</span>
            </div>
            {trackingInfo.scheduleDelivery && (
              <div
                className={`${styles["result-head-child"]} ${styles["scheduled-delivery"]}`}
              >
                {" "}
                <span>
                  Scheduled Delivery: {trackingInfo?.scheduledDelivery}
                </span>
              </div>
            )}
          </div>
          <div className={styles["result-body"]}>
            <div className={styles.checkpoints}>
              <ul className={styles.checkpoints__list}>
                {trackingInfo.checkpoints.map((checkpoint) => (
                  <li className={styles.checkpoint}>
                    <div className={styles.checkpoint__time}>
                      <strong>{checkpoint.date}</strong>
                      <div className={styles.hint}>{checkpoint.time}</div>
                    </div>
                    <div
                      className={`${styles.checkpoint__icon} ${styles.intransit}`}
                    ></div>
                    <div className={styles.checkpoint__content}>
                      <strong>
                        <span>{checkpoint.activity}</span>{" "}
                        <span className={styles.checkpoint__couriername}>
                          {checkpoint.courierName}
                        </span>{" "}
                      </strong>
                      <div className={styles["hint"]}>
                        {checkpoint.location}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className={styles["courier-result"]}>
            <span className={styles["live-tracking"]}>
              If There is Any Error ! Check Official Website -{" "}
            </span>
            <Link href={url} target="blank" className={styles["click-here"]}>
              {url}
            </Link>
          </div>
        </>
      )}
    </>
  );
};
