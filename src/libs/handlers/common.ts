export const getCoordinates = async (
  country?: string,
  region?: string,
  city?: string,
  postCode?: string
) => {
  // Try most specific first, then fall back to broader queries
  const queries = [
    [postCode, city, region, country],
    [city, region, country],
    [city, country],
    [region, country],
    [city],
    [country],
  ];

  for (const parts of queries) {
    const query = encodeURIComponent(
      parts.filter((p) => p && p.trim()).join(", ")
    );
    if (!query) continue;

    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${query}&limit=1`
      );
      const data = await res.json();
      if (data.length > 0) {
        return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
      }
    } catch {
      continue;
    }
  }

  return { lat: 0, lng: 0 };
};
