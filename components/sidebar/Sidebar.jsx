"use client";
import { FiChevronRight } from "react-icons/fi";
import styles from "./Sidebar.module.css";
import { CourierList } from "../courierList/CourierList";

const Sidebar = ({ isOpen, toggleDropdown }) => {
  return (
    <div className={styles.sidebar}>
      <button onClick={toggleDropdown}>
        <FiChevronRight className={styles["arrow-icon"]} />
        Couriers
      </button>

      <CourierList />
    </div>
  );
};

export default Sidebar;
