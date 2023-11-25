import React from "react";
import Form from "@/components/Form";
import { redirect } from "next/navigation";
import { courierProviders } from "@/utility/CourierProviders";
import styles from "@/style/courierProvider.module.css";
import { keywords } from "@/utility/MetaKeyword";
import { couriers } from "@/utility/contactInfo";
import Link from "next/link";

export async function generateMetadata({ params, searchParams }) {
  const { courierProvider } = params;
  const courierName = courierProvider
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

  return {
    title: `${courierName} | TrackCourier.co`,
    description: `Experience the simplicity of tracking your ${courierName
      .replace(" Tracking", "")
      .toLowerCase()} package on TrackCourier.co. Just enter your ${courierName.toLowerCase()} number and get real-time updates of ${courierName
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
      canonical: `https://trackcourier.co/courier/${courierProvider}`,
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

  //get the Contact information about a particular courier provider
  const contactInfo = couriers.find(
    (courier) => courier.name === courierProvider
  );

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
      <div className={`${styles.description} ${styles.section}`}>
        <p>
          Track your <strong>{courierName.replace("Tracking", "")}</strong>
          packages, shipments, parcels, courier, and consignments with ease
          using TrackCourier.co's state-of-the-art {courierName} tool. Stay
          updated with real-time delivery status and receive timely{" "}
          {courierName} updates. Access comprehensive tracking information
          effortlessly and enjoy the convenience of our user-friendly platform.
          Simplify your {courierName} experience and never lose sight of your
          valuable shipments again.
        </p>
      </div>
      {contactInfo && (
        <div className={styles.section}>
          <h2 title={`${courierName.replace("Tracking", "")}Contact Detail`}>
            {courierName.replace("Tracking", "")} Customer Care Information
          </h2>
          <p>
            {courierName.replace("Tracking", "")}'s customer care information
            and contact detail for different cities, featuring essential
            information such as {courierName.replace("Tracking", "")} contact
            numbers, email addresses, and office locations.
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
                          title={`${courierName.replace(
                            "Tracking",
                            ""
                          )}Customer Care Number ${courier.city}`}
                          href={`tel:${contact}`}
                        >
                          {contact}
                        </Link>
                      ))}
                    </td>
                    <td>
                      <Link
                        title={`${courierName.replace(
                          "Tracking",
                          ""
                        )} Email Address ${courier.city}`}
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
    </div>
  );
};

export default CourierProvider;
