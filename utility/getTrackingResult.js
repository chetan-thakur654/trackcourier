async function getTrackingResult(courierProvider, trackingId) {
  const { signal } = new AbortController();
  try {
    const response = await fetch(
      `http://localhost:3000/api/track/${courierProvider}/${trackingId}`,
      { signal, next: { revalidate: 7200 } }
    );

    const data = await response.json();

    return data;
  } catch (error) {
    return error;
  }
}

export default getTrackingResult;