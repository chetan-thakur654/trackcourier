import { NextResponse } from "next/server";
import { courierScrapers } from "@/apiUtility/courierScrapers";
import puppeteer from "puppeteer";

// Launch a headless browser with Puppeteer
const browserInstance = puppeteer.launch({
  headless: true,
  // args: ["--no-sandbox", "--disable-setuid-sandbox"],
});

export async function GET(NextRequest, { params }) {
  const { courier, trackingNo } = params;

  let page;
  let dynamicUrl;
  try {
    // Check if there is a scraper for the specified courier
    const courierScraper = courierScrapers[courier];

    if (!courierScraper) {
      throw new Error(`No information found for courier: ${courier}`);
    }

    dynamicUrl = courierScraper ? courierScraper.url(trackingNo) : null;

    if (!courierScraper.scrapeData) {
      // If no scrapeData function is found or no dynamic URL, return the dynamic URL as a response
      return NextResponse.json({ url: dynamicUrl });
    }

    const browser = await browserInstance;
    page = await browser.newPage();

    // Invoke the corresponding scraper function for the courier
    const trackingInfo = await courierScraper.scrapeData(trackingNo, page);

    // Check if tracking information is found
    if (
      !trackingInfo ||
      !trackingInfo.checkpoints ||
      trackingInfo.checkpoints.length === 0
    ) {
      throw new Error(
        "No tracking information found. Please check your tracking ID."
      );
    }

    return NextResponse.json({ trackingInfo, url: dynamicUrl });
  } catch (err) {
    return NextResponse.json(
      { error: err.message, url: dynamicUrl },
      { status: 500 }
    );
  } finally {
    // Close the page and browser
    if (page) {
      await page.close();
    }
  }
}
