import Link from "next/link";
import Form from "@/components/form/Form";
import styles from "./courierresult.module.css";
import { keywords } from "@/utility/MetaKeyword";
import Frame from "@/components/iframe/iFrame";
import { TrackingInfo } from "@/components/trackingInfo/trackingInfo";
import { Error } from "@/components/error/error";
import getTrackingResult from "@/utility/getTrackingResult";

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

async function CourierResult({ params }) {
  const { courier, trackingId } = params;

  const data = await getTrackingResult(courier, trackingId);

  const { trackingInfo, url, error } = data;

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
            <Link href={"/"}>
              {courier
                .replace(/-/g, " ")
                .replace(/\b\w/g, (c) => c.toUpperCase())
                .replace("Tracking", "")}
            </Link>
            <span>- {trackingId}</span>
          </div>
        </div>
        {trackingInfo ? (
          <TrackingInfo trackingInfo={trackingInfo} url={url} />
        ) : !error && url ? (
          <Frame url={url} />
        ) : (
          <Error error={error} url={url} />
        )}
      </div>
    </>
  );
}

export default CourierResult;
