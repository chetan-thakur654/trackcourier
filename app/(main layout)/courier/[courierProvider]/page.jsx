import React from "react";
import Form from "@/components/Form";
import { redirect } from "next/navigation";
import { courierProviders } from "@/utility/CourierProviders";
import styles from "@/style/courierProvider.module.css";
import { keywords } from "@/utility/MetaKeyword";
import Link from "next/link";

export async function generateMetadata({ params, searchParams }) {
  const { courierProvider } = params;
  const courierName = courierProvider
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

  return {
    title: courierName,
    description: `Track your ${courierName.replace(
      " Tracking",
      ``
    )} package with ease on trackcourier.co. Just enter your ${courierName
      .replace(" Tracking", ``)
      .toLowerCase()} tracking number and get real-time updates of ${courierName
      .replace(" Tracking", ``)
      .toLowerCase()} shipment, delivery date, and estimated arrival time. Our dedicated ${courierName.toLowerCase()} page is the perfect tool to help you stay informed about your package. Discover the latest updates about your shipment, including any delays or issues that may affect its delivery`,
    keywords: keywords.courierProviderPage.map((keyword) => {
      if (courierName.includes("Courier")) {
        return `${courierName
          .replace("Courier Tracking", "")
          .toLowerCase()}${keyword}`;
      } else {
        return `${courierName.replace("Tracking", "").toLowerCase()}${keyword}`;
      }
    }),
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_BASE_PATH}/courier/${courierProvider}`,
      // languages: {
      //   'en-US': '/en-US',
      //   'de-DE': '/de-DE',
      // },
    },
  };
}

const CourierProvider = ({ params }) => {
  const { courierProvider } = params;
  const courierName = courierProvider
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

  // Initialize Next.js router
  //  const router = useRouter();

  // Check if the courier provider is valid
  const isValidProvider = courierProviders.some(
    (provider) => provider.link === courierProvider
  );

  // If the provider is not valid, redirect to 404 page
  if (!isValidProvider) {
    redirect("/");

    return null; // Return null to prevent rendering the component
  }

  return (
    <div>
      <div className={styles.hero}>
        {/* <img src={process.env.PUBLIC_URL + '/logo192.png'} alt="Courier Provider Logo" className="provider-logo" /> */}
        <h1>{courierName}</h1>
      </div>
      <Form
        showSelect={false}
        courierProvider={courierProvider}
        placeholderText={`Enter ${courierName.replace(
          "Tracking",
          ""
        )}Tracking ID`}
      />
      <div className={styles.description}>
        <p>
          Track your <strong>{courierName.replace("Tracking", "")}</strong>{" "}
          packages, shipments, parcels, courier and consignments with ease using{" "}
          <Link href="/">TrackCourier.co's</Link> state-of-the-art tracking
          tool. Stay updated with real-time delivery status and receive timely
          courier updates. Access comprehensive tracking information
          effortlessly and enjoy the convenience of our user-friendly platform.
          Simplify your tracking experience and never lose sight of your
          valuable shipments again.
        </p>
      </div>
    </div>
  );
};

export default CourierProvider;
