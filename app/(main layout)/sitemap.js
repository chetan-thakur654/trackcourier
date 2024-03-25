const URL = "https://trackcourier.co";

const pagesUrl = ["", "about-us", "contact-us", "privacy-policy"];
export default async function sitemap() {
  const pages = pagesUrl.map((link) => ({
    url: `${URL}/${link}`,
    lastModified: new Date().toISOString(),
  }));

  return [...pages];
}
