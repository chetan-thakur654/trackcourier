import React from "react";
import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import styles from "@/style/contact-us.module.css";

export const metadata = {
  title: "Contact Us | TrackCourier.co",
  description: "Contace Us page of trackcourier.co",
  alternates: {
    canonical: `https://trackcourier.co/contact-us`,
  },
};

const ContactUs = () => {
  return (
    <>
      <div className={styles["contact-us-page"]}>
        <div className="contact-us-page__header">
          <h1>Contact Us</h1>
          <p>
            We're happy to answer any questions you have or provide you with an
            estimate. Just send us a message in the form below.
          </p>
        </div>
        <div className="contact-us-page__content">
          <div className="contact-us-page__info">
            <div className="contact-us-page__info-box">
              <FaEnvelope />
              <h3>Email</h3>
              <p>info@trackcourier.co</p>
            </div>
          </div>
          <div className={styles["contact-us-page__form"]}>
            <form>
              <input type="text" placeholder="Your Name" />
              <input type="email" placeholder="Your Email" />
              <input type="text" placeholder="Subject" />
              <textarea placeholder="Message"></textarea>
              <button type="submit">Send Message</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactUs;
