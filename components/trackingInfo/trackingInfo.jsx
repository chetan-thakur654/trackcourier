"use client";
import { useEffect, useState } from "react";
import styles from "../../app/(main layout)/track/[courier]/[trackingId]/courierresult.module.css";
import { Loader } from "../loader/loader";
import Link from "next/link";
import { Error } from "../error/error";
import getTrackingResult from "@/utility/getTrackingResult";
import { useParams } from "next/navigation";

const TrackingInfo = ({ fetchedData }) => {
  // const { courier, trackingId } = useParams();
  const [isLoading, setIsLoading] = useState(true); // Initial loading state
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        setData(fetchedData);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle errors appropriately
      } finally {
        setTimeout(() => setIsLoading(false), 15000); // Hide loader after data fetch or error
      }
    };

    fetchData();
  }, [fetchedData]);

  const { trackingInfo, url, error } = data;

  return (
    <>
      {isLoading ? (
        <Loader />
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
