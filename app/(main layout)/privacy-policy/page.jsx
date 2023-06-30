import React from "react";

export const metadata = {
  title: "Privacy Policy | TrackCourier.co",
  description: "Privacy policy page of trackcourier.co",
  alternates: {
    canonical: `https://trackcourier.co//privacy-policy`,
  },
};

const PrivacyPolicy = () => {
  return (
    <>
      <div className="privacy-policy-page-container">
        <h1>Privacy Policy</h1>
        <p>
          At TrackCourier.co, we take your privacy very seriously. This Privacy
          Policy describes our policies and procedures on the collection, use,
          and disclosure of your information when you use our website.
        </p>
        <h2>Information Collection and Use</h2>
        <p>
          We collect several different types of information for various purposes
          to provide and improve our website and services to you.
        </p>
        <h3>Personal Data</h3>
        <p>
          While using our website, we may ask you to provide us with certain
          personally identifiable information that can be used to contact or
          identify you. Personally identifiable information may include, but is
          not limited to:
        </p>
        <ul>
          <li>Email address</li>
          <li>First name and last name</li>
          <li>Phone number</li>
          <li>Address, state, province, ZIP/postal code, city</li>
          <li>Cookies and Usage Data</li>
        </ul>
        <p>
          We may use your Personal Data to contact you with newsletters,
          marketing or promotional materials and other information that may be
          of interest to you. You may opt out of receiving any, or all, of these
          communications from us by following the unsubscribe link or
          instructions provided in any email we send.
        </p>
        <h3>Usage Data</h3>
        <p>
          We may also collect information on how the website is accessed and
          used ("Usage Data"). This Usage Data may include information such as
          your computer's Internet Protocol address (e.g. IP address), browser
          type, browser version, the pages of our website that you visit, the
          time and date of your visit, the time spent on those pages, unique
          device identifiers and other diagnostic data.
        </p>
        <h2>Use of Cookies</h2>
        <p>
          We use cookies and similar tracking technologies to track the activity
          on our website and hold certain information.
        </p>
        <p>
          Cookies are files with a small amount of data which may include an
          anonymous unique identifier. Cookies are sent to your browser from a
          website and stored on your device. Tracking technologies also used are
          beacons, tags, and scripts to collect and track information and to
          improve and analyze our website.
        </p>
        <p>
          You can instruct your browser to refuse all cookies or to indicate
          when a cookie is being sent. However, if you do not accept cookies,
          you may not be able to use some portions of our website.
        </p>
        <h2>Data Retention</h2>
        <p>
          We will retain your Personal Data only for as long as is necessary for
          the purposes set out in this Privacy Policy. We will also retain and
          use your Personal Data to the extent necessary to comply with our
          legal obligations, resolve disputes, and enforce our legal agreements
          and policies.
        </p>
        <h2>Data Security</h2>
        <p>
          The security of your data is important to us, but remember that no
          method of transmission over the internet, or method of electronic
          storage is 100% secure. While we strive to use commercially acceptable
          means to protect your Personal Data, we cannot guarantee its absolute
          security.
        </p>
        <h2>Third-Party Links</h2>
        <p>
          Our website may contain links to other websites that are not operated
          by us. If you click a third-party link, you will be directed to that
          third party's site. We strongly advise you to review the Privacy
          Policy of every site you visit.
        </p>
        <h2>Changes to This Privacy Policy</h2>
        <p>
          We may update our Privacy Policy from time to time. We will notify you
          of any changes by posting the new Privacy Policy on this page.
        </p>
      </div>
    </>
  );
};

export default PrivacyPolicy;
