import React from "react";

interface MapProps {
  country?: string;
  city?: string;
  propertyName?: string;
  region?: string;
  postCode?: string;
}

const CustomMap = ({ country, city, propertyName, region, postCode }: MapProps) => {
  const query = encodeURIComponent(
    [propertyName, city, region, country].filter(Boolean).join(", ")
  );

  return (
    <iframe
      width="100%"
      height="100%"
      style={{ border: 0 }}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      src={`https://maps.google.com/maps?q=${query}&z=15&ie=UTF8&iwloc=B&output=embed`}
      title={propertyName || "Map"}
      allowFullScreen
    />
  );
};

export default CustomMap;
