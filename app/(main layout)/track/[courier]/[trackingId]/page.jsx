import Link from "next/link";
import Form from "@/components/form/Form";
import styles from "./courierresult.module.css";
import { keywords } from "@/utility/MetaKeyword";
import TrackingInfo from "@/components/trackingInfo/trackingInfo";
import AdsenseComp from "@/components/ads/googleAds";
import getTrackingResult from "@/utility/getTrackingResult";

export async function generateMetadata({ params }) {
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
      canonical: `https://trackcourier.co/courier/${courier}`,
    },
  };
}

async function CourierResult({ params }) {
  const { courier, trackingId } = params;
  const fetchedData = await getTrackingResult(courier, trackingId);
  return (
    <>
      <Form
        showSelect={true}
        inputTrackingId={trackingId}
        courierProvider={courier}
      />

      <AdsenseComp />
      <div className={styles["courier-result"]}>
        <div className={styles["tracking-info"]}>
          <Link href={"/"}>
            {courier
              .replace(/-/g, " ")
              .replace(/\b\w/g, (c) => c.toUpperCase())
              .replace("Tracking", "")}
          </Link>
          <span>- {trackingId}</span>
        </div>
      </div>
      <AdsenseComp />
      <div className={`${styles.block}`}>
        <TrackingInfo fetchedData={fetchedData} />
      </div>
    </>
  );
}

export default CourierResult;
