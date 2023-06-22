"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { courierProviders } from "@/utility/CourierProviders";
import { FaTruck, FaMapMarkerAlt } from "react-icons/fa";
import styles from "./Form.module.css";

const Form = ({
  showSelect,
  placeholderText,
  courierProvider,
  inputTrackingId,
}) => {
  const [trackingId, setTrackingId] = useState(inputTrackingId || "");
  const [selectedCourier, setSelectedCourier] = useState(courierProvider || "");
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push(`/track/${selectedCourier}/${trackingId}`);
  };

  return (
    <div className={styles["form-container"]}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="trackingId"
          placeholder={placeholderText || "Enter Tracking Number"}
          value={trackingId}
          onChange={(e) => setTrackingId(e.target.value)}
          required
        />
        {showSelect && (
          <select
            value={selectedCourier}
            onChange={(e) => setSelectedCourier(e.target.value)}
            required
          >
            <option>Select a Courier Provider</option>
            {courierProviders.map((provider, index) => (
              <option key={index} value={provider.link}>
                {provider.name}
              </option>
            ))}
          </select>
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
