import React from "react";
import dynamic from "next/dynamic";

interface MapProps {
  country?: string;
  lat: number;
  lng: number;
}

// This is just a type-safe wrapper, the actual component is loaded dynamically below
const CustomMap = ({ country, lat, lng }: MapProps) => {
  return null; // This never actually renders
};

export default dynamic<MapProps>(
  () =>
    import("react-leaflet").then((mod) => {
      const { MapContainer, TileLayer, Marker, Popup } = mod;
      const L = require("leaflet");
      require("leaflet/dist/leaflet.css");
      const { renderToString } = require("react-dom/server");
      const FmdGoodIcon = require("@mui/icons-material/FmdGood").default;

      // Function to create icon from MUI component
      const createIconFromMuiComponent = (color: string = "#1976d2") => {
        const iconHtml = renderToString(
          React.createElement(FmdGoodIcon, { style: { fontSize: 40, color } })
        );

        return L.divIcon({
          html: iconHtml,
          className: "custom-marker-icon",
          iconSize: [40, 40],
          iconAnchor: [20, 40],
          popupAnchor: [0, -40],
        });
      };

      // Custom marker icon
      const getMarkerIcon = (country: string) => {
        if (country === "South Korea") {
          return createIconFromMuiComponent("#dc2626");
        }
        return createIconFromMuiComponent("#1976d2");
      };

      return ({ country, lat, lng }: MapProps) => (
        <MapContainer
          center={[lat, lng]}
          zoom={15}
          style={{ height: 200, width: 390 }}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[lat, lng]} icon={getMarkerIcon(country || "")}>
            <Popup>{country}</Popup>
          </Marker>
        </MapContainer>
      );
    }),
  {
    ssr: false,
    loading: () => (
      <div style={{ height: 200, width: 390 }}>Loading map...</div>
    ),
  }
);
