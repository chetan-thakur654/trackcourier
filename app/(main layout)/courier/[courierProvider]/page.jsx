import React from "react";
import Form from "@/components/form/Form";
import { redirect } from "next/navigation";
import { courierProviders } from "@/utility/CourierProviders";
import styles from "./courierProvider.module.css";
import { keywords } from "@/utility/MetaKeyword";
import { couriers } from "@/utility/contactInfo";
import { courierNameData } from "@/utility/courierName";
import Link from "next/link";
import AdsenseComp from "@/components/ads/googleAds";
import SmallGoogleAd from "@/components/ads/smallAd";

export async function generateMetadata({ params, searchParams }) {
  const { courierProvider } = params;

  const courierName = courierNameData(courierProvider);

  return {
    title: `${courierName} Tracking`,
    description: `Track your ${courierName.toLowerCase()} delivery status on trackcourier.co. Just enter your ${courierName.toLowerCase()} tracking number and get real-time updates of ${courierName.toLowerCase()} tracking shipment, delivery date, and estimated arrival time. Our dedicated ${courierName.toLowerCase()} tracking page is the perfect tool to help you stay informed about your package. Discover the latest updates about your shipment, including any delays or issues that may affect its delivery`,
    keywords: keywords.courierProviderPage.map((keyword) => {
      if (courierName.includes("Courier")) {
        return `${courierName.replace("Courier", "").toLowerCase()}${keyword}`;
      } else {
        return `${courierName.replace("Tracking", "").toLowerCase()}${keyword}`;
      }
    }),
    alternates: {
      canonical: `https://trackcourier.co/courier/${courierProvider}`,
    },
  };
}

const CourierProvider = ({ params }) => {
  const { courierProvider } = params;

  const courierName = courierNameData(courierProvider);
  // const courierName = courierProvider
  //   .replace(/-/g, " ")
  //   .replace(/\b\w/g, (c) => c.toUpperCase());

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

  //get the Contact information about a particular courier provider
  const contactInfo = couriers.find(
    (courier) => courier.name === courierProvider
  );

  return (
    <>
      <div className={styles.hero}>
        {/* <img src={process.env.PUBLIC_URL + '/logo192.png'} alt="Courier Provider Logo" className="provider-logo" /> */}
        <h1>{`${courierName} Tracking`}</h1>
      </div>
      <Form
        showSelect={false}
        courierProvider={courierProvider}
        placeholderText={`Enter ${courierName} Tracking Number`}
      />
      <AdsenseComp />

      <div className={`${styles.description} ${styles.section}`}>
        <p>
          Track your <strong>{courierName}</strong>
          {` packages, shipments, parcels, courier, and consignments with ease
          using `}
          <Link href="/">TrackCourier.co's</Link>
          {` state-of-the-art 
          ${courierName} tracking tool. Stay updated with real-time delivery status and
          receive timely ${courierName} tracking updates. Access comprehensive tracking
          information effortlessly and enjoy the convenience of our
          user-friendly platform. Simplify your ${courierName} tracking experience and
          never lose sight of your valuable shipments again.`}
        </p>
      </div>
      {contactInfo && (
        <div className={styles.section}>
          <h2>{`${courierName} Customer Care Information`}</h2>

          <p>
            <Link href={`/customer-care/${courierProvider}`}>
              {`${courierName}'s customer care`}
            </Link>
            {` information and contact details for different cities, featuring essential
            information such as ${courierName} contact
            numbers, email addresses, and office locations.`}
          </p>

          <div className={styles.table}>
            <table>
              <thead>
                <tr>
                  <th>City</th>
                  <th>Contact Numbers</th>
                  <th>Emails</th>
                  <th>Address</th>
                </tr>
              </thead>
              <tbody>
                {contactInfo.contact_info.map((courier) => (
                  <tr>
                    <td>{courier.city}</td>
                    <td>
                      {courier.contact_no.map((contact) => (
                        <Link
                          title={`${courierName} Customer Care Number ${courier.city}`}
                          href={`tel:${contact}`}
                        >
                          {contact}
                        </Link>
                      ))}
                    </td>
                    <td>
                      <Link
                        title={`${courierName} Email Address ${courier.city}`}
                        href={`mailto:${courier.email}`}
                      >
                        {courier.email}
                      </Link>
                    </td>
                    <td>{courier.address}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {/* <div className={styles.section}>
        <h2>About Fedex</h2>
      </div>
      <div className={styles.section}>
        <h2>Frequently Asked Questions</h2>
      </div> */}
    </>
  );
};

export default CourierProvider;
