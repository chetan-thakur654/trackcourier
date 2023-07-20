"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { courierProviders } from "@/utility/CourierProviders";
import { FaTruck, FaMapMarkerAlt } from "react-icons/fa";
import styles from "@/style/Form.module.css";

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

    // Check if trackingId and selectedCourier are empty
    const isTrackingIdEmpty = trackingId.trim() === "";
    const isSelectedCourierEmpty = selectedCourier.trim() === "";

    // Update the error states based on the validation results
    setTrackingIdError(isTrackingIdEmpty);
    setSelectedCourierError(isSelectedCourierEmpty);

    // If either trackingId or selectedCourier is empty, do not navigate
    if (isTrackingIdEmpty || isSelectedCourierEmpty) {
      return;
    }

    // If the form is valid, navigate to the next page
    router.push(`/track/${selectedCourier}/${trackingId}`);
  };

  // handling trackingId change

  const handleTrackingIdChange = (e) => {
    setTrackingIdError(false);
    setTrackingId(e.target.value);
  };

  // handling SelectedCourier Change
  const handleCourierChange = (e) => {
    setSelectedCourierError(false);
    setSelectedCourier(e.target.value);
  };

  return (
    <div className={styles["form-container"]}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="trackingId"
          placeholder={placeholderText || "Enter Tracking ID"}
          value={trackingId}
          onChange={handleTrackingIdChange}
          className={`${styles.input} ${trackingIdError ? styles.error : ""}`}
        />
        {trackingIdError && (
          <span className={styles["error-message"]}>
            Please Enter Tracking ID.
          </span>
        )}
        {showSelect && (
          <select
            className={`${styles.input} ${
              selectedCourierError ? styles.error : ""
            }`}
            value={selectedCourier}
            onChange={handleCourierChange}
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
        <button type="submit">
          <FaMapMarkerAlt size={16} color="#ffff" />
          Track
        </button>
      </form>
    </div>
  );
};

export default Form;
