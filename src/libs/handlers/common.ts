export const getCoordinates = async (country?: string, region?: string) => {
  const query = encodeURIComponent(`${region}, ${country}`);
  const res = await fetch(
    `https://nominatim.openstreetmap.org/search?format=json&q=${query}`
  );
  const data = await res.json();
  if (data.length > 0) {
    return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
  }
  return { lat: 0, lng: 0 }; // fallback
};
