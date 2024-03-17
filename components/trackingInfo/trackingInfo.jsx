"use client";
import { useEffect, useState, useRef } from "react";
import styles from "../../app/(main layout)/track/[courier]/[trackingId]/courierresult.module.css";
import { Loader } from "../loader/loader";
import Link from "next/link";
import { Error } from "../error/error";
import getTrackingResult from "@/utility/getTrackingResult";
import { useParams } from "next/navigation";

const TrackingInfo = ({ fetchedData }) => {
  // const { courier, trackingId } = useParams();
  const [isLoading, setIsLoading] = useState(true); // Initial loading state
  const [progress, setProgress] = useState(0);
  const [data, setData] = useState({});

  const progressRef = useRef(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setData(fetchedData);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle errors appropriately
      } finally {
        const progressInterval = setInterval(() => {
          if (progressRef.current < 100) {
            progressRef.current += 1;
            setProgress(progressRef.current);
          } else {
            clearInterval(progressInterval); // Stop progress when complete
          }
        }, 150);

        setTimeout(() => {
          setIsLoading(false);
          clearInterval(progressInterval); // Ensure progress stops
        }, 15000);
      }
    };

    fetchData();
  }, [fetchedData]);

  const { trackingInfo, url, error } = data;

  return (
    <>
      {isLoading ? (
        <>
          {/* <Loader /> */}
          <div className={styles["progress-container"]}>
            <div
              className={styles["progress-bar"]}
              style={{ width: `${progress}%` }}
            ></div>
            <span className={styles["progress-text"]}>Loading...</span>
          </div>
        </>
      ) : (
        <div>
          {trackingInfo ? (
            <div>
              <div
                className={`${styles["result-head"]} ${
                  trackingInfo.deliveryStatus === "Shipment Delivered"
                    ? styles["courier-delivered"]
                    : ""
                }`}
              >
                {trackingInfo?.deliveryStatus && (
                  <div
                    className={`${styles["result-head-child"]} ${styles["courier-status"]}`}
                  >
                    {" "}
                    <span>Status : {trackingInfo?.deliveryStatus}</span>
                  </div>
                )}
                {trackingInfo?.from && (
                  <div className={`${styles["result-head-child"]}`}>
                    {" "}
                    <span>
                      From : {trackingInfo?.from} | To : {trackingInfo?.to}
                    </span>
                  </div>
                )}
              </div>
              <div className={styles["result-body"]}>
                <div className={styles.checkpoints}>
                  <ul className={styles.checkpoints__list}>
                    {trackingInfo?.checkpoints?.map((checkpoint, index) => (
                      <li className={styles.checkpoint} key={index}>
                        <div className={styles.checkpoint__time}>
                          <strong>{checkpoint.date}</strong>
                          <div className={styles.hint}>{checkpoint.time}</div>
                        </div>
                        <div
                          className={`${styles.checkpoint__icon} ${styles.intransit}`}
                        ></div>
                        <div className={styles.checkpoint__content}>
                          <strong>
                            <span>{checkpoint?.activity}</span>{" "}
                            <span className={styles.checkpoint__couriername}>
                              {checkpoint?.courierName}
                            </span>{" "}
                          </strong>
                          <div className={styles["hint"]}>
                            {checkpoint?.location}
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ) : !error && url ? (
            <div className={styles["courier-url"]}>
              <span className={styles["live-tracking"]}>Live Tracking- </span>
              <Link href={url} target="blank" className={styles["click-here"]}>
                {url}
              </Link>
            </div>
          ) : (
            <Error error={error} url={url} />
          )}
        </div>
      )}
    </>
  );
};

export default TrackingInfo;
