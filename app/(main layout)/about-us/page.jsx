import React from "react";

export const metadata = {
  title: "About Us | TrackCourier.co",
  description: "About Us page of trackcourier.co",
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_BASE_PATH}/about-us`,
  },
};

const AboutUs = () => {
  return (
    <>
      <div>
        <h1>About TrackCourier.co</h1>
        <p>
          Welcome to TrackCourier.co – Your one-stop solution for tracking
          couriers from over 200 courier providers.
        </p>
        <p>
          At TrackCourier.co, we understand that tracking your courier can be a
          hassle. That’s why we have created a platform that allows you to track
          all your shipments in one place, no matter the courier provider.
          Whether you are tracking a small package or a large shipment, we’ve
          got you covered.
        </p>
        <p>
          Our platform is designed to be user-friendly and easy to navigate, so
          you can find the information you need quickly and easily. With
          real-time updates, you can stay up-to-date on the status of your
          shipments and receive alerts when there are any changes.
        </p>
        <p>
          We believe that our customers are our top priority, and we are
          committed to providing exceptional service to every customer. Our team
          of experts is always available to answer your questions and provide
          support whenever you need it.
        </p>
        <p>
          We believe that our customers are our top priority, and we are
          committed to providing exceptional service to every customer. Our team
          of experts is always available to answer your questions and provide
          support whenever you need it.
        </p>
        <p>
          Thank you for choosing TrackCourier.co – We look forward to helping
          you track your courier with ease and efficiency.
        </p>
      </div>
    </>
  );
};

export default AboutUs;
