import { Stack } from "@mui/material";
import React, { ComponentType } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { renderToString } from "react-dom/server";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import FmdGoodIcon from "@mui/icons-material/FmdGood";

// Function to create icon from MUI component
const createIconFromMuiComponent = (color: string = "#1976d2") => {
  const iconHtml = renderToString(
    <FmdGoodIcon style={{ fontSize: 40, color }} />
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

interface MapProps {
  country?: string;
  lat: number;
  lng: number;
}

const CustomMap = ({ country, lat, lng }: MapProps) => {
  return (
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
};

export default CustomMap;
