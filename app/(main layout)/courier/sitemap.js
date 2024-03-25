import { courierProviders } from "../../../utility/CourierProviders";
const URL = "https://trackcourier.co";

export default async function sitemap() {
  const pages = courierProviders.map((courier) => ({
    url: `${URL}/courier/${courier.link}`,
    lastModified: new Date().toISOString(),
  }));

  return [...pages];
}
