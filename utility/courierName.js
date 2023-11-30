export const courierNameData = (courierProvider) => {
  const courierName = courierProvider
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .replace(" Tracking", "");
  return courierName;
};
