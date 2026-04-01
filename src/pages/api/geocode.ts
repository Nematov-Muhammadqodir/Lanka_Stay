import type { NextApiRequest, NextApiResponse } from "next";

const cache = new Map<string, { data: any; ts: number }>();
const CACHE_TTL = 1000 * 60 * 60; // 1 hour

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { city, state, country, postalcode, q } = req.query;

  const params = new URLSearchParams({ format: "json", limit: "1" });

  if (q) {
    params.set("q", String(q));
  } else {
    if (city) params.set("city", String(city));
    if (state) params.set("state", String(state));
    if (country) params.set("country", String(country));
    if (postalcode) params.set("postalcode", String(postalcode));
  }

  const cacheKey = params.toString();

  // Return cached result if available
  const cached = cache.get(cacheKey);
  if (cached && Date.now() - cached.ts < CACHE_TTL) {
    return res.status(200).json(cached.data);
  }

  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?${cacheKey}`,
      {
        headers: {
          "User-Agent": "LankaStay/1.0 (hotel booking platform)",
          Accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      console.error(`Nominatim error: ${response.status} ${response.statusText}`);
      return res.status(200).json([]);
    }

    const data = await response.json();
    cache.set(cacheKey, { data, ts: Date.now() });
    return res.status(200).json(data);
  } catch (err: any) {
    console.error("Geocode fetch error:", err.message);
    return res.status(200).json([]);
  }
}
