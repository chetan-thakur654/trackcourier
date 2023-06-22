import { NextResponse } from "next/server";
import puppeteer from "puppeteer";

export async function GET(req, { params }) {
  const { courier, trackingId } = params;

  // Determine which courier provider was selected
  switch (courier) {
    case "blue-dart-courier-tracking":
      // Perform web scraping logic for blue dart courier
      try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        // Navigate to the Blue Dart tracking page and wait for it to load
        await page.goto("https://www.bluedart.com", {
          waitUntil: "networkidle0",
          timeout: 60000,
        });

        // Enter the tracking ID in the input field
        await page.type("#trackingNoTrackDart", "76743718273");

        // Click on the search button
        await page.click("#goBtnTrackDart");

        // Wait for the tracking information to load
        await page.waitForSelector(".trackDart-box", { visible: true });

        // Extract the package status from the page using Puppeteer's DOM manipulation functions
        const trackingInfo = await page.evaluate(() => {
          const deliveryStatus = document.querySelector(
            `#SHIP76743718273 > div.table-responsive > table > tbody > tr:nth-child(5) > td`
          ).innerText;
          const scheduledDelivery = document.querySelector(
            "#SHIP76743718273 > div.table-responsive > table > tbody > tr:nth-child(6) > td"
          ).textContent;
          const checkpoints = Array.from(
            document.querySelectorAll(
              "#SCAN76743718273 > div > table > tbody > tr"
            )
          )
            .slice(0, -1)
            .map((checkpoint) => ({
              date: checkpoint.querySelector("td:nth-child(3)").textContent,
              time: checkpoint.querySelector("td:nth-child(4)").textContent,
              activity: checkpoint.querySelector("td:nth-child(2)").textContent,
              courierName: "Blue Dart",
              location: checkpoint.querySelector("td:nth-child(1)").textContent,
            }));

          return { deliveryStatus, scheduledDelivery, checkpoints };
        });

        // Close the browser
        await browser.close();

        return NextResponse.json(trackingInfo);
      } catch (err) {
        console.error(err);
        res.status(500).send("An error occurred while tracking your package.");
      }
      break;

    case "drtc-courier-tracking":
      try {
        // Perform web scraping logic for DRTC courier
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        // Navigate to the Blue Dart tracking page and wait for it to load
        await page.goto("https://www.drtctracking.com", {
          waitUntil: "networkidle0",
          timeout: 60000,
        });

        // Enter the tracking ID in the input field
        await page.type("#sourcebranchcode", "kim");
        await page.type("#biltystateno", "01");
        await page.type("#biltyno", "11030");

        // Click on the search button
        await page.click("#bttnsubmit");

        // Wait for the tracking information to load
        await page.waitForSelector("#content > table", { visible: true });

        // Extract the package status from the page using Puppeteer's DOM manipulation functions
        const trackingInfo = await page.evaluate(() => {
          const deliveryStatus = "In Transit";
          const scheduledDelivery = "Not Available";
          const checkpoints = Array.from(
            document.querySelectorAll("#content > table > tbody > tr")
          )
            .slice(3)
            .map((checkpoint) => ({
              date: checkpoint.querySelector("td:nth-child(1)").innerText,
              activity: checkpoint.querySelector("td:nth-child(2)").innerText,
              courierName: "DRTC",
              location: checkpoint
                .querySelector("td:nth-child(2)")
                .innerText.split(" ")
                .pop(),
            }));

          return { deliveryStatus, scheduledDelivery, checkpoints };
        });

        // Close the browser
        await browser.close();

        return NextResponse.json(trackingInfo);
      } catch (err) {
        console.error(err);
        res.status(500).send("An error occurred while tracking your package.");
      }
      break;

    case "dtdc-courier-tracking":
      try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        // Navigate to the Blue Dart tracking page and wait for it to load
        await page.goto(
          "https://tracking.dtdc.com/ctbs-tracking/customerInterface.tr?submitName=showCITrackingDetails&cType=Consignment&cnNo=C35453561#C35453561",
          { waitUntil: "networkidle0", timeout: 60000 }
        );

        await page.click(".accordion-toggle");

        await page.waitForSelector("#C35453561_displayBar", { visible: true });

        // Extract the package status from the page using Puppeteer's DOM manipulation functions
        const trackingInfo = await page.evaluate(() => {
          const deliveryStatus = document.querySelector("#lsSt").innerText;
          const scheduledDelivery = "Not Available";
          const elements = document.querySelectorAll(
            "#activityDetailsForChildCn_C35453561 > tr"
          );
          const checkpoints = Array.from(elements)
            .filter((element, index) => index % 2 === 0)
            .map((checkpoint) => ({
              date: checkpoint
                .querySelector("td:nth-child(1)")
                .innerText.split("|")[0],
              time: checkpoint
                .querySelector("td:nth-child(1)")
                .innerText.split("|")[1],
              activity: checkpoint.querySelector("td:nth-child(2)").innerText,
              courierName: "DTDC",
              location: checkpoint.querySelector("td:nth-child(5)").innerText,
            }));

          return { deliveryStatus, scheduledDelivery, checkpoints };
        });

        // Close the browser
        await browser.close();

        return NextResponse.json(trackingInfo);
      } catch (err) {
        console.error(err);
        res.status(500).send("An error occurred while tracking your package.");
      }
      break;

    case "madhur-courier-tracking":
      try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        await page.goto(
          "https://www.madhurcouriers.in/(S(s1q5tkugzqjwlc34kknbfowa))/CNoteTracking"
        );

        await page.waitForSelector("#ContentPlaceHolder1_txtCNote", {
          visible: true,
        });

        await page.type("#ContentPlaceHolder1_txtCNote", "p304343988");

        await page.click("#ContentPlaceHolder1_btnSearch");

        await page.waitForSelector("#ContentPlaceHolder1_gvBookings", {
          visible: true,
        });

        const trackingInfo = await page.evaluate(() => {
          const deliveryStatus = "In Transit";
          const scheduledDelivery = "Not Available";
          const checkpoints = Array.from(
            document.querySelectorAll(
              "#ContentPlaceHolder1_gvBookings > tbody > tr"
            )
          )
            .splice(1)
            .map((checkpoint) => ({
              date: checkpoint.querySelector("td:nth-child(2)").innerText,
              activity: checkpoint.querySelector("td:nth-child(4)").innerText,
              courier: "Madhur Courier",
              location: "N/A",
            }));
          return { deliveryStatus, scheduledDelivery, checkpoints };
        });

        await browser.close();
        return NextResponse.json(trackingInfo);
      } catch (err) {
        console.error(err);
        res.status(500).send("An error occurred while tracking your package.");
      }
      break;
    //   case '4x tracking':
    //     // Perform web scraping logic for FedEx
    //     // ...
    //     break;

    //   case 'abf freight tracking':
    //     // Perform web scraping logic for FedEx
    //     // ...
    //     break;

    //   case 'accurate freight tracking':
    //     // Perform web scraping logic for FedEx
    //     // ...
    //     break;

    //   case 'airpak express tracking':
    //     // Perform web scraping logic for FedEx
    //     // ...
    //     break;

    //   case 'anjani courier tracking':
    //     // Perform web scraping logic for FedEx
    //     // ...
    //     break;

    //   case 'apc postal tracking':
    //     // Perform web scraping logic for FedEx
    //     // ...
    //     break;

    //   case 'aramex australia tracking':
    //     // Perform web scraping logic for FedEx
    //     // ...
    //     break;

    //   case 'aramex courier tracking':
    //     // Perform web scraping logic for FedEx
    //     // ...
    //     break;

    //   case 'arc carrier tracking':
    //     // Perform web scraping logic for FedEx
    //     // ...
    //     break;

    //   case 'asendia usa tracking':
    //     // Perform web scraping logic for FedEx
    //     // ...
    //     break;

    //   case 'ats amazon shipping':
    //     // Perform web scraping logic for FedEx
    //     // ...
    //     break;

    //   case 'australia post tracking':
    //     // Perform web scraping logic for FedEx
    //     // ...
    //     break;

    //   case 'better trucks tracking':
    //     // Perform web scraping logic for FedEx
    //     // ...
    //     break;

    //   case 'border express tracking':
    //     // Perform web scraping logic for FedEx
    //     // ...
    //     break;

    //   case 'bonds courier tracking':
    //     // Perform web scraping logic for FedEx
    //     // ...
    //     break;

    //   case 'brazil correios tracking':
    //     // Perform web scraping logic for FedEx
    //     // ...
    //     break;

    //   case 'canada post tracking':
    //     // Perform web scraping logic for FedEx
    //     // ...
    //     break;

    //   case 'city link express tracking':
    //     // Perform web scraping logic for FedEx
    //     // ...
    //     break;

    //   case 'cma cgm tracking':
    //     // Perform web scraping logic for FedEx
    //     // ...
    //     break;

    //   case 'con way freight tracking':
    //     // Perform web scraping logic for FedEx
    //     // ...
    //     break;

    //   case 'couriers please tracking':
    //     // Perform web scraping logic for FedEx
    //     // ...
    //     break;

    //   case 'courier post tracking':
    //     // Perform web scraping logic for FedEx
    //     // ...
    //     break;

    //   case 'china post tracking':
    //     // Perform web scraping logic for FedEx
    //     // ...
    //     break;

    //   case 'cj packet tracking':
    //     // Perform web scraping logic for FedEx
    //     // ...
    //     break;

    //   case 'delhivery courier tracking':
    //     // Perform web scraping logic for FedEx
    //     // ...
    //     break;

    //   case 'delex tracking':
    //     // Perform web scraping logic for FedEx
    //     // ...
    //     break;

    //   case 'deutsche post dhl tracking':
    //     // Perform web scraping logic for FedEx
    //     // ...
    //     break;

    //   case 'dhl active tracing':
    //     // Perform web scraping logic for FedEx
    //     // ...
    //     break;

    //   case 'dhl ecommerce asia tracking':
    //     // Perform web scraping logic for FedEx
    //     // ...
    //     break;

    //   case 'dhl express tracking':
    //     // Perform web scraping logic for FedEx
    //     // ...
    //     break;

    //   case 'dhl pieceid tracking':
    //     // Perform web scraping logic for FedEx
    //     // ...
    //     break;

    //   case 'dhl global forwarding tracking':
    //     // Perform web scraping logic for FedEx
    //     // ...
    //     break;

    //   case 'dhl global mail tracking':
    //     // Perform web scraping logic for FedEx
    //     // ...
    //     break;

    //   case 'diacom canada tracking':
    //     // Perform web scraping logic for FedEx
    //     // ...
    //     break;

    //   case 'dotzot tracking':
    //     // Perform web scraping logic for FedEx
    //     // ...
    //     break;

    //   case 'dpd tracking':
    //     // Perform web scraping logic for FedEx
    //     // ...
    //     break;

    //   case 'dpd uk tracking':
    //     // Perform web scraping logic for FedEx
    //     // ...
    //     break;

    //   case 'dpd us tracking':
    //     // Perform web scraping logic for FedEx
    //     // ...
    //     break;

    //   case 'dtdc express global tracking':
    //     // Perform web scraping logic for FedEx
    //     // ...
    //     break;

    //   case 'dtdc australia tracking':
    //     // Perform web scraping logic for FedEx
    //     // ...
    //     break;

    //   case 'dtdc singapore tracking':
    //     // Perform web scraping logic for FedEx
    //     // ...
    //     break;

    //   case 'dtdc uae tracking':
    //     // Perform web scraping logic for FedEx
    //     // ...
    //     break;

    //   case 'dtdc usa tracking':
    //     // Perform web scraping logic for FedEx
    //     // ...
    //     break;

    //   case 'ecom express tracking':
    //     // Perform web scraping logic for FedEx
    //     // ...
    //     break;

    //   case 'ekart logistics courier tracking':
    //     // Perform web scraping logic for FedEx
    //     // ...
    //     break;

    //   case 'fedex india tracking':
    //     // Perform web scraping logic for FedEx
    //     // ...
    //     break;

    //   case 'fedex tracking':
    //     // Perform web scraping logic for FedEx
    //     // ...
    //     break;

    //   case 'fedex freight tracking':
    //     // Perform web scraping logic for FedEx
    //     // ...
    //     break;

    //   case 'fedex uk tracking':
    //     // Perform web scraping logic for FedEx
    //     // ...
    //     break;

    //   case 'fedex us tracking':
    //     // Perform web scraping logic for FedEx
    //     // ...
    //     break;

    //   case 'fedex cross border tracking':
    //     // Perform web scraping logic for FedEx
    //     // ...
    //     break;

    //   case 'first flight tracking':
    //     // Perform web scraping logic for FedEx
    //     // ...
    //     break;

    //   case 'flyking courier tracking':
    //     // Perform web scraping logic for FedEx
    //     // ...
    //     break;

    //   case 'garudavega tracking':
    //     // Perform web scraping logic for FedEx
    //     // ...
    //     break;

    //   case 'gati tracking':
    //     // Perform web scraping logic for FedEx
    //     // ...
    //     break;

    //   case 'gati kwe tracking':
    //     // Perform web scraping logic for FedEx
    //     // ...
    //     break;

    //   case 'gdex tracking':
    //     // Perform web scraping logic for FedEx
    //     // ...
    //     break;

    //   case 'gls tracking':
    //     // Perform web scraping logic for FedEx
    //     // ...
    //     break;

    //   case 'gls czech republic tracking':
    //     // Perform web scraping logic for FedEx
    //     // ...
    //     break;

    //   case 'gms worldwide tracking':
    //     // Perform web scraping logic for FedEx
    //     // ...
    //     break;

    //   case 'gojavas courier tracking':
    //     // Perform web scraping logic for FedEx
    //     // ...
    //     break;

    //   case 'hermes germany tracking':
    //     // Perform web scraping logic for FedEx
    //     // ...
    //     break;

    //   case 'hermes world tracking':
    //     // Perform web scraping logic for FedEx
    //     // ...
    //     break;

    //   case 'india post tracking':
    //     // Perform web scraping logic for FedEx
    //     // ...
    //     break;

    //   case 'india post international tracking':
    //     // Perform web scraping logic for FedEx
    //     // ...
    //     break;

    //   case 'jaipur golden tracking':
    //     // Perform web scraping logic for FedEx
    //     // ...
    //     break;

    //   case 'janco ecommerce tracking':
    //     // Perform web scraping logic for FedEx
    //     // ...
    //     break;

    //   case 'japan post tracking':
    //     // Perform web scraping logic for FedEx
    //     // ...
    //     break;

    //   case 'jt express malaysia tracking':
    //     // Perform web scraping logic for FedEx
    //     // ...
    //     break;

    //     case 'la poste tracking':
    //     // Perform web scraping logic for FedEx
    //     // ...
    //     break;

    //     case 'lasership courier tracking':
    //     // Perform web scraping logic for FedEx
    //     // ...
    //     break;

    //     case 'leopard courier tracking':
    //     // Perform web scraping logic for FedEx
    //     // ...
    //     break;

    //     case 'lexship courier tracking':
    //     // Perform web scraping logic for FedEx
    //     // ...
    //     break;

    //     case 'malaysia post flexipack tracking':
    //     // Perform web scraping logic for FedEx
    //     // ...
    //     break;

    //     case 'maruti courier tracking':
    //     // Perform web scraping logic for FedEx
    //     // ...
    //     break;

    //     case 'nandan courier tracking':
    //     // Perform web scraping logic for FedEx
    //     // ...
    //     break;

    //     case 'new zealand post tracking':
    //     // Perform web scraping logic for FedEx
    //     // ...
    //     break;

    //     case 'nextsmartship tracking':
    //     // Perform web scraping logic for FedEx
    //     // ...
    //     break;

    //     case 'nitco tracking':
    //     // Perform web scraping logic for FedEx
    //     // ...
    //     break;

    //     case 'nova poshta international tracking':
    //     // Perform web scraping logic for FedEx
    //     // ...
    //     break;

    //     case 'nuvoex tracking':
    //     // Perform web scraping logic for FedEx
    //     // ...
    //     break;

    //     case 'old dominion tracking':
    //     // Perform web scraping logic for FedEx
    //     // ...
    //     break;

    //     case 'om logistics courier tracking':
    //     // Perform web scraping logic for FedEx
    //     // ...
    //     break;

    //     case 'overnite courier tracking':
    //     // Perform web scraping logic for FedEx
    //     // ...
    //     break;

    //     case 'pickrr courier tracking':
    //     // Perform web scraping logic for FedEx
    //     // ...
    //     break;

    //     case 'pitney bowes tracking':
    //     // Perform web scraping logic for FedEx
    //     // ...
    //     break;

    //     case 'polar express tracking':
    //     // Perform web scraping logic for FedEx
    //     // ...
    //     break;

    //     case 'poslaju tracking':
    //     // Perform web scraping logic for FedEx
    //     // ...
    //     break;

    //     case 'poste italiane tracking':
    //     // Perform web scraping logic for FedEx
    //     // ...
    //     break;

    //     case 'professional courier tracking':
    //     // Perform web scraping logic for FedEx
    //     // ...
    //     break;

    //     case 'professional kuwait tracking':
    //     // Perform web scraping logic for FedEx
    //     // ...
    //     break;

    //     case 'professional singapore tracking':
    //     // Perform web scraping logic for FedEx
    //     // ...
    //     break;

    //     case 'professional srilanka tracking':
    //     // Perform web scraping logic for FedEx
    //     // ...
    //     break;

    //     case 'professional uae tracking':
    //     // Perform web scraping logic for FedEx
    //     // ...
    //     break;

    //     case 'professional usa tracking':
    //     // Perform web scraping logic for FedEx
    //     // ...
    //     break;

    //     case 'procure logistics tracking':
    //     // Perform web scraping logic for FedEx
    //     // ...
    //     break;

    //     case 'purolator tracking':
    //     // Perform web scraping logic for FedEx
    //     // ...
    //     break;

    //     case 'rl carriers tracking':
    //     // Perform web scraping logic for FedEx
    //     // ...
    //     break;

    //     case 'rivigo tracking':
    //     // Perform web scraping logic for FedEx
    //     // ...
    //     break;

    //     case 'safexpress india tracking':
    //     // Perform web scraping logic for FedEx
    //     // ...
    //     break;

    //     case 'safexpress tracking':
    //     // Perform web scraping logic for FedEx
    //     // ...
    //     break;

    //     case 'sagawa tracking':
    //     // Perform web scraping logic for FedEx
    //     // ...
    //     break;

    //     case 'saia tracking':
    //     // Perform web scraping logic for FedEx
    //     // ...
    //     break;

    //     case 'sameday tracking':
    //     // Perform web scraping logic for FedEx
    //     // ...
    //     break;

    //     case 'saudi post tracking':
    //     // Perform web scraping logic for FedEx
    //     // ...
    //     break;

    //     case 'shadowfax tracking':
    //     // Perform web scraping logic for FedEx
    //     // ...
    //     break;

    //     case 'shiprocket tracking':
    //     // Perform web scraping logic for FedEx
    //     // ...
    //     break;

    //     case 'shree anjani courier tracking':
    //     // Perform web scraping logic for FedEx
    //     // ...
    //     break;

    //     case 'shree mahavir courier tracking':
    //     // Perform web scraping logic for FedEx
    //     // ...
    //     break;

    //     case 'shree maruti courier tracking':
    //     // Perform web scraping logic for FedEx
    //     // ...
    //     break;

    //     case 'shree nandan courier tracking':
    //     // Perform web scraping logic for FedEx
    //     // ...
    //     break;

    //     case 'shree tirupati courier tracking':
    //     // Perform web scraping logic for FedEx
    //     // ...
    //     break;

    //     case 'skyking tracking':
    //     // Perform web scraping logic for FedEx
    //     // ...
    //     break;

    //     case 'skyman tracking':
    //     // Perform web scraping logic for FedEx
    //     // ...
    //     break;

    //     case 'skynet worldwide express tracking':
    //     // Perform web scraping logic for FedEx
    //     // ...
    //     break;

    //     case 'skynet australia':
    //     // Perform web scraping logic for FedEx
    //     // ...
    //     break;

    //     case 'skynet germany':
    //     // Perform web scraping logic for FedEx
    //     // ...
    //     break;

    //     case 'skynet india':
    //     // Perform web scraping logic for FedEx
    //     // ...
    //     break;

    //     case 'skynet malaysia':
    //     // Perform web scraping logic for FedEx
    //     // ...
    //     break;

    //     case 'skynet mexico':
    //     // Perform web scraping logic for FedEx
    //     // ...
    //     break;

    //     case 'skynet nigeria':
    //     // Perform web scraping logic for FedEx
    //     // ...
    //     break;

    //     case 'skynet pakistan':
    //     // Perform web scraping logic for FedEx
    //     // ...
    //     break;

    //     case 'skynet philippines':
    //     // Perform web scraping logic for FedEx
    //     // ...
    //     break;

    //     case 'skynet singapore':
    //     // Perform web scraping logic for FedEx
    //     // ...
    //     break;

    //     case 'skynet uae':
    //     // Perform web scraping logic for FedEx
    //     // ...
    //     break;

    //     case 'skynet usa':
    //     // Perform web scraping logic for FedEx
    //     // ...
    //     break;

    //     case 'skynet yemen':
    //     // Perform web scraping logic for FedEx
    //     // ...
    //     break;

    //     case 'spee dee delivery':
    //     // Perform web scraping logic for FedEx
    //     // ...
    //     break;

    //     case 'speed post tracking':
    //     // Perform web scraping logic for FedEx
    //     // ...
    //     break;

    //     case 'spoton courier tracking':
    //     // Perform web scraping logic for FedEx
    //     // ...
    //     break;

    //     case 'smsa express tracking':
    //     // Perform web scraping logic for FedEx
    //     // ...
    //     break;

    //     case 'st courier tracking':
    //     // Perform web scraping logic for FedEx
    //     // ...
    //     break;

    //     case 'swiss post tracking':
    //     // Perform web scraping logic for FedEx
    //     // ...
    //     break;

    //     case 'tci express courier tracking':
    //     // Perform web scraping logic for FedEx
    //     // ...
    //     break;

    //     case 'tci freight tracking':
    //     // Perform web scraping logic for FedEx
    //     // ...
    //     break;

    //     case 'tcs courier tracking':
    //     // Perform web scraping logic for FedEx
    //     // ...
    //     break;

    //     case 'tci xps courier tracking':
    //     // Perform web scraping logic for FedEx
    //     // ...
    //     break;

    //     case 'tirupati courier tracking':
    //     // Perform web scraping logic for FedEx
    //     // ...
    //     break;

    //     case 'tnt tracking':
    //     // Perform web scraping logic for FedEx
    //     // ...
    //     break;

    //     case 'tnt reference tracking':
    //     // Perform web scraping logic for FedEx
    //     // ...
    //     break;

    //     case 'tnt uk tracking':
    //     // Perform web scraping logic for FedEx
    //     // ...
    //     break;

    //     case 'trackon courier tracking':
    //     // Perform web scraping logic for FedEx
    //     // ...
    //     break;

    //     case 'ups tracking':
    //     // Perform web scraping logic for FedEx
    //     // ...
    //     break;

    //     case 'usps tracking':
    //     // Perform web scraping logic for FedEx
    //     // ...
    //     break;

    //     case 'v xpress tracking':
    //     // Perform web scraping logic for FedEx
    //     // ...
    //     break;

    //     case 'vichare courier tracking':
    //     // Perform web scraping logic for FedEx
    //     // ...
    //     break;

    //     case 'vrl logistics courier tracking':
    //     // Perform web scraping logic for FedEx
    //     // ...
    //     break;

    //     case 'vtrans tracking':
    //     // Perform web scraping logic for FedEx
    //     // ...
    //     break;

    //     case 'winit tracking':
    //     // Perform web scraping logic for FedEx
    //     // ...
    //     break;

    //     case 'xpressbees tracking':
    //     // Perform web scraping logic for FedEx
    //     // ...
    //     break;

    //     case 'yamato japan tracking':
    //     // Perform web scraping logic for FedEx
    //     // ...
    //     break;

    //     case 'yrc Frieght tracking':
    //     // Perform web scraping logic for FedEx
    //     // ...
    //     break;

    //     case 'yun express tracking':
    //     // Perform web scraping logic for FedEx
    //     // ...
    //     break;

    //     case 'zto express tracking':
    //     // Perform web scraping logic for FedEx
    //     // ...
    //     break;
    default:
      res
        .status(404)
        .json({ message: "The selected courier provider is not supported." });
  }
}
