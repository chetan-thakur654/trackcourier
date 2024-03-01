async function getTrackingResult(courierProvider, trackingId) {
  const { signal } = new AbortController();
  try {
    const response = await fetch(
      `http://161.35.186.249/api/track/${courierProvider}/${trackingId}`,
      { signal, next: { revalidate: 7200 } }
      // `http://localhost:3001/api/track/${courierProvider}/${trackingId}`,
      // { signal, cache: "no-store" }
    );

    const data = await response.json();

    return data;
  } catch (error) {
    return error;
  }
}

export default getTrackingResult;
