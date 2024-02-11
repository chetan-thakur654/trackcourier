// 'use client';
import Form from "@/components/form/Form";
import { keywords } from "@/utility/MetaKeyword";
import styles from "@/style/page.module.css";
import Script from "next/script";
import AdsenseComp from "@/components/ads/googleAds";

export const metadata = {
  title: "Courier Tracking | TrackCourier.co",
  description:
    "Track over 1500+ couriers with ease using trackcourier.co's online courier tracking system. Enter your tracking number, select your courier provider and get real time delivery status, real time updates, and tracking information all in one place. We support package tracking, courier tracking, shipment tracking, cargo tracking and parcel tracking for various courier providers. Use our tracking tool for hassle-free courier tracking",
  keywords: keywords.homepage,

  icons: {
    icon: "/icon.ico",
  },
  alternates: {
    canonical: "https://trackcourier.co/",
  },
};

const Homepage = () => {
  return (
    <>
      <div className={styles.hero}>
        <h1>
          1500+ Couriers, One Tracker : All-in-One Courier Tracking Online
        </h1>
      </div>

      <Form showSelect={true} />
      <AdsenseComp />

      <div className={styles.description}>
        <p>
          "Welcome to TrackCourier.co - Your One-Stop Destination for Seamless
          Courier Tracking Online!
        </p>
        <p>
          At TrackCourier.co, we offer a comprehensive online courier tracking
          system that allows you to effortlessly track over 1500 couriers all
          around the world. With our user-friendly platform, you can access
          real-time updates, delivery status, and tracking information all in
          one convenient place.
        </p>
        <p>
          Whether you're waiting for an important package or managing multiple
          shipments, our tracking tool provides hassle-free courier tracking at
          your fingertips. Stay informed, stay connected, and never miss a
          delivery again. Join thousands of satisfied users who rely on
          TrackCourier.co for reliable package tracking.
        </p>
        <p>
          Let us simplify your shipping experience and make tracking your
          parcels a breeze."
        </p>
      </div>
    </>
  );
};

export default Homepage;
