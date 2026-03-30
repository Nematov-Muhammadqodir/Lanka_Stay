import React from "react";

interface MapProps {
  country?: string;
  city?: string;
  propertyName?: string;
  lat: number;
  lng: number;
}

const CustomMap = ({ country, city, propertyName, lat, lng }: MapProps) => {
  const query = encodeURIComponent(
    [propertyName, city, country].filter(Boolean).join(", ")
  );

  return (
    <iframe
      width="100%"
      height="100%"
      style={{ border: 0 }}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      src={`https://www.openstreetmap.org/export/embed.html?bbox=${lng - 0.01}%2C${lat - 0.01}%2C${lng + 0.01}%2C${lat + 0.01}&layer=mapnik&marker=${lat}%2C${lng}`}
      title={propertyName || "Map"}
    />
  );
};

export default CustomMap;
