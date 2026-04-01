const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

export const getCoordinates = async (
  country?: string,
  region?: string,
  city?: string,
  postCode?: string
) => {
  const structuredQueries = [
    { city, state: region, country, postalcode: postCode },
    { city, country },
    { city: city },
    { country: country },
  ];

  for (let i = 0; i < structuredQueries.length; i++) {
    const params = structuredQueries[i];
    const filtered = Object.entries(params).filter(
      ([, v]) => v && v.trim()
    );
    if (filtered.length === 0) continue;

    const qs = filtered
      .map(([k, v]) => `${k}=${encodeURIComponent(v!.trim())}`)
      .join("&");

    try {
      const res = await fetch(`/api/geocode?${qs}`);
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
      }
    } catch {
      // continue to next query
    }

    // Small delay between requests to avoid rate limiting
    if (i < structuredQueries.length - 1) {
      await delay(300);
    }
  }

  return { lat: 0, lng: 0 };
};
