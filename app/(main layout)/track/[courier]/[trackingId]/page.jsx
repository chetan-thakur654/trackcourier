// 'use client'
import Link from "next/link";
import { redirect } from "next/navigation";
import Form from "@/components/Form";
import { courierProviders } from "@/utility/CourierProviders";
import styles from "../courierresult.module.css";
import { keywords } from "@/utility/MetaKeyword";
import { courierUrls } from "@/utility/CourierUrls";

export async function generateMetadata({ params, searchParams }) {
  const { courier, trackingId } = params;
  const courierName = courier
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

  return {
    title: `${trackingId} | ${courierName}`,
    description: `Track your ${courierName.replace(
      " Tracking",
      ``
    )} package with ease on trackcourier.co. Get real-time updates on the status of your shipment, delivery date, and estimated arrival time. Our dedicated ${courierName} page is the perfect tool to help you stay informed about your package. Discover the latest updates about your shipment, including any delays or issues that may affect its delivery`,
    keywords: keywords.courierProviderPage.map(
      (keyword) => courierName.replace("Tracking", "").toLowerCase() + keyword
    ),
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_BASE_PATH}/courier/${courier}`,
    },
  };
}

// async function getTrackingResult(courierProvider, trackingId) {
//   const data = await fetch(
//     `http://localhost:3000/api/tracking-result/${courierProvider}/${trackingId}`
//   );

//   if (!data.ok) {
//     throw new Error("Failed to fetch data");
//   }

//   return data.json();
// }

const CourierResult = ({ params }) => {
  const { courier, trackingId } = params;

  // Check if the courier provider is valid
  const isValidProvider = courierProviders.some(
    (provider) => provider.link === courier
  );

  // If the provider is not valid, redirect to 404 page
  if (!isValidProvider) {
    redirect("/");
  }
  // const trackingInfo = await getTrackingResult(courier, trackingId);

  const courierName = courier
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
  // const[trackingInfo, setTrackingInfo ] = useState(null)

  return (
    <>
      <Form
        showSelect={true}
        inputTrackingId={trackingId}
        courierProvider={courier}
      />

      <div className={`${styles.block}`}>
        <div className={styles["courier-result"]}>
          <div className={styles["tracking-info"]}>
            <Link href={"/"}>{courierName.replace("Tracking", "")}</Link>
            <span>- {trackingId}</span>
          </div>
          <div className={styles["live-tracking-info"]}>
            <span className={styles["live-tracking"]}>Live Tracking -</span>
            <Link
              href={courierUrls[courier]}
              target="blank"
              className={styles["click-here"]}
            >
              Click here
            </Link>
          </div>
        </div>
        {/* {trackingInfo ? (
          <>
            <div
              className={`${styles["result-head"]} ${
                trackingInfo.deliveryStatus === "Shipment Delivered"
                  ? styles["courier-delivered"]
                  : ""
              }`}
            >
              <div
                className={`${styles["result-head-child"]} ${styles["courier-status"]}`}
              >
                {" "}
                <span>{trackingInfo.deliveryStatus}</span>
              </div>
              <div
                className={`${styles["result-head-child"]} ${styles["scheduled-delivery"]}`}
              >
                {" "}
                <span>
                  Scheduled Delivery: {trackingInfo.scheduledDelivery}
                </span>
              </div>
            </div>
            <div className={styles["result-body"]}>
              <div className={styles.checkpoints}>
                <ul className={styles.checkpoints__list}>
                  {trackingInfo.checkpoints.map((checkpoint) => (
                    <li className={styles.checkpoint}>
                      <div className={styles.checkpoint__time}>
                        <strong>{checkpoint.date}</strong>
                        <div className={styles.hint}>{checkpoint.time}</div>
                      </div>
                      <div
                        className={`${styles.checkpoint__icon} ${styles.intransit}`}
                      ></div>
                      <div className={styles.checkpoint__content}>
                        <strong>
                          <span>{checkpoint.activity}</span>{" "}
                          <span className={styles.checkpoint__couriername}>
                            {checkpoint.courierName}
                          </span>{" "}
                        </strong>
                        <div className={styles["hint"]}>
                          {checkpoint.location}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </>
        ) : (
          <div className={styles["loader-container"]}>
            <div class={styles["lds-roller"]}>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
            <div class={styles["loader-text"]}>
              Hold on tight, we're fetching your tracking data!
            </div>
          </div>
        )} */}
      </div>
    </>
  );
};

export default CourierResult;
