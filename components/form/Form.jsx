"use client";
import React, { useCallback, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { courierProviders } from "@/utility/CourierProviders";
import { FaMapMarkerAlt } from "react-icons/fa";
import styles from "./Form.module.css";
import { Spinner } from "../loader/spinner";

const Form = ({
  showSelect,
  placeholderText,
  courierProvider,
  inputTrackingId,
}) => {
  const [trackingId, setTrackingId] = useState(inputTrackingId || "");
  const [selectedCourier, setSelectedCourier] = useState(courierProvider || "");
  const [trackingIdError, setTrackingIdError] = useState(false);
  const [selectedCourierError, setSelectedCourierError] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const currentPath = usePathname();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Validation
      const isTrackingIdEmpty = trackingId.trim() === "";
      const isSelectedCourierEmpty = selectedCourier.trim() === "";

      // Update error states
      setTrackingIdError(isTrackingIdEmpty);
      setSelectedCourierError(isSelectedCourierEmpty);

      // If form is invalid, stop
      if (isTrackingIdEmpty || isSelectedCourierEmpty) {
        throw new Error();
      }

      if (
        currentPath == `/track/${courierProvider}/${trackingId}` &&
        trackingId == currentPath.split("/")[3] &&
        selectedCourier == currentPath.split("/")[2]
      ) {
        // No need to redirect, display a message or perform other actions
        throw new Error("you are in the same page");
      }
      setLoading(true);

      // Show loader

      const targetUrl = `/track/${selectedCourier}/${trackingId}`;

      router.push(targetUrl);
    } catch (error) {
      return;
    }

    // Hide loader after navigation (optional)
  };

  const handleChange = (setter, errorSetter, e) => {
    errorSetter(false);
    setter(e.target.value);
  };

  return (
    <div className={styles["form-container"]}>
      <form onSubmit={handleSubmit}>
        {/* Tracking ID input */}
        <input
          type="text"
          name="trackingId"
          placeholder={placeholderText || "Enter Tracking Number"}
          value={trackingId}
          onChange={(e) => handleChange(setTrackingId, setTrackingIdError, e)}
          className={`${styles.input} ${trackingIdError ? styles.error : ""}`}
        />
        {trackingIdError && (
          <span className={styles["error-message"]}>
            Please Enter Tracking Number.
          </span>
        )}

        {/* Courier Provider select */}
        {showSelect && (
          <select
            className={`${styles.input} ${
              selectedCourierError ? styles.error : ""
            } ${styles.scrollableSelect}`}
            value={selectedCourier}
            onChange={(e) =>
              handleChange(setSelectedCourier, setSelectedCourierError, e)
            }
            // style={{ height: selectHeight }}
          >
            <option value="" disabled>
              Select Courier Provider
            </option>
            {courierProviders.map((provider, index) => (
              <option key={index} value={provider.link}>
                {provider.name}
              </option>
            ))}
          </select>
        )}
        {selectedCourierError && (
          <span className={styles["error-message"]}>
            Select Courier Provider
          </span>
        )}

        <button
          style={{ opacity: loading ? 0.8 : 1 }}
          type="submit"
          disabled={loading}
        >
          {loading ? (
            <Spinner />
          ) : (
            <>
              <FaMapMarkerAlt size={16} color="#ffff" />
              Track
            </>
          )}
        </button>
        {/* <button type="submit" disabled={loading}>
          <Spinner />
        </button> */}
      </form>
    </div>
  );
};

export default Form;
