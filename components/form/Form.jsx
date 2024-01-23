"use client";
import React, { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { courierProviders } from "@/utility/CourierProviders";
import { FaMapMarkerAlt } from "react-icons/fa";
import styles from "./Form.module.css";

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
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    const isTrackingIdEmpty = trackingId.trim() === "";
    const isSelectedCourierEmpty = selectedCourier.trim() === "";

    // Update error states
    setTrackingIdError(isTrackingIdEmpty);
    setSelectedCourierError(isSelectedCourierEmpty);

    // If form is invalid, stop
    if (isTrackingIdEmpty || isSelectedCourierEmpty) {
      return;
    }

    // Navigate to the next page
    router.push(`/track/${selectedCourier}/${trackingId}`);
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

        {/* Submit button */}
        <button type="submit">
          <FaMapMarkerAlt size={16} color="#ffff" />
          Track
        </button>
      </form>
    </div>
  );
};

export default Form;
