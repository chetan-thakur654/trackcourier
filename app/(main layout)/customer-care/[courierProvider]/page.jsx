import styles from "./customer-care.module.css";
import { couriers } from "@/utility/contactInfo";
import { courierNameData } from "@/utility/courierName";
import { redirect } from "next/navigation";
import Link from "next/link";
import AdsenseComp from "@/components/ads/googleAds";

export async function generateMetadata({ params, searchParams }) {
  const { courierProvider } = params;

  const courierName = courierNameData(courierProvider);

  return {
    title: `${courierName} Customer Care | TrackCourier.co`,
    description: `${courierName.toLowerCase()} customer care number, office addresses for a personalized visit, and email for any queries.`,
    keywords: `${courierName.toLowerCase()} customer care number, ${courierName.toLowerCase()} email, ${courierName.toLowerCase()} office address, ${courierName.toLowerCase()} office near me`,
    alternates: {
      canonical: `https://trackcourier.co/customer-care/${courierProvider}`,
      // languages: {
      //   'en-US': '/en-US',
      //   'de-DE': '/de-DE',
      // },
    },
  };
}

const CustomerCare = ({ params }) => {
  const { courierProvider } = params;

  const courierName = courierNameData(courierProvider);
  // console.log(data);

  // const courierName = courierProvider
  //   .replace(/-/g, " ")
  //   .replace(/\b\w/g, (c) => c.toUpperCase())
  //   .replace(" Tracking", "");

  const contactInfo = couriers.find(
    (courier) => courier.name === courierProvider
  );

  if (!contactInfo) {
    redirect("/");

    return null; // Return null to prevent rendering the component
  }

  // Find the index of the object with name "Chetan" in the array
  const courierIndex = couriers.findIndex(
    (courier) => courier.name === courierProvider
  );
  let selectedCourier = [];

  if (courierIndex !== -1 && courierIndex + 10 < couriers.length) {
    // Get the objects from "Chetan" to the next 4 objects
    selectedCourier = couriers.slice(courierIndex + 1, courierIndex + 10);
  } else {
    selectedCourier = couriers.slice(0, 10);
  }
  // console.log(selectedCourier);
  // console.log(courierIndex);

  return (
    <div className={styles["customer-care"]}>
      <section className="main-section">
        <h1>{`${courierName} Customer Care `}</h1>
        <p>
          <Link href={`/courier/${courierProvider}`}>
            {`${courierName}'s `}{" "}
          </Link>
          dedicated customer care number, office addresses for a personalized
          visit, and email for any queries.
        </p>
        <AdsenseComp />
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
      </section>
      <section className="explore-section">
        <h2>Explore More Courier's Customer Care Details:</h2>
        <p>
          Discover customer care details for other leading courier services.
          Whether you're tracking a shipment or have inquiries, we've got you
          covered. Click on the links below for comprehensive customer care
          information:
        </p>

        {courierIndex >= 0 && (
          <ul className={styles["courier-list"]}>
            {selectedCourier.map((courier) => (
              <li>
                <Link href={`/customer-care/${courier.name}`}>
                  {`${courier.name
                    .replace(/-/g, " ")
                    .replace(/\b\w/g, (c) => c.toUpperCase())
                    .replace(" Tracking", "")} Customer Care Detail`}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

export default CustomerCare;
