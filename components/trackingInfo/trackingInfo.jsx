"use client";

import { useEffect, useState } from "react";
import styles from "../../app/(main layout)/track/[courier]/[trackingId]/courierresult.module.css";
import { Loader } from "../loader/loader";

export const TrackingInfo = ({ trackingInfo }) => {
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    if (trackingInfo) {
      setTimeout(() => {
        setShowResult(true);
      }, 20000);
    }
  }, []);
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
        </>
      )}
    </>
  );
};
