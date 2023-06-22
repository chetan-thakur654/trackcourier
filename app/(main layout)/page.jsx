// 'use client';
import Form from "../../components/Form";
import { keywords } from "@/utility/MetaKeyword";
import styles from "../page.module.css";
import Head from "next/head";

export const metadata = {
  title: "TrackCourier.co",
  description:
    "Track your courier with ease on our website. We support over 200 courier providers including FedEx, DHL, USPS, Delhivery, and Blue Dart. Simply enter your tracking number and courier provider to get real-time updates on the delivery status. Our streamlined tracking process ensures you stay informed every step of the way.",
  keywords: keywords.homepage,

  icons: {
    icon: "/icon.ico",
  },
  alternates: {
    canonical: `http:localhost.com`,
    // languages: {
    //   'en-US': '/en-US',
    //   'de-DE': '/de-DE',
    // },
  },
};

const Homepage = () => {
  return (
    <>
      <div className={styles.hero}>
        <h1>
          200+ Couriers, One Tracker: The Fastest Way to Track Your Packages
          Online
        </h1>
      </div>

      <Form showSelect={true} />
      <div className={styles.description}>
        <p>
          "Track your 'FedEx', 'DHL','USPS' and 200+ shipments with ease using
          TrackCourier.co's online tracking system. We support package tracking,
          shipment tracking, and parcel tracking for various courier providers.
          Get delivery status, courier real-time updates, and tracking
          information all in one place. Use our tracking tool for hassle-free
          courier tracking."
        </p>
      </div>
    </>
  );
};

export default Homepage;
