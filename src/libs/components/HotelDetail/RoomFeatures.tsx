import React from "react";
import VillaIcon from "@mui/icons-material/Villa";
import BalconyIcon from "@mui/icons-material/Balcony";
import PoolIcon from "@mui/icons-material/Pool";
import BathtubIcon from "@mui/icons-material/Bathtub";
import TvIcon from "@mui/icons-material/Tv";
import CoffeeMakerIcon from "@mui/icons-material/CoffeeMaker";
import WifiIcon from "@mui/icons-material/Wifi";
import DeckIcon from "@mui/icons-material/Deck";
import { Stack, Typography } from "@mui/material";
import { PropertyRoom } from "../../types/partnerInput/partnerProperty";

/**
 * This map uses BACKEND enum values (strings),
 * not frontend enum keys.
 */
const FACILITY_MAP: Record<string, { icon: JSX.Element; label: string }> = {
  Balcony: {
    icon: <BalconyIcon sx={{ fontSize: 16 }} />,
    label: "Balcony",
  },
  View: {
    icon: <PoolIcon sx={{ fontSize: 16 }} />,
    label: "Pool View",
  },
  "Flat-screen TV": {
    icon: <TvIcon sx={{ fontSize: 16 }} />,
    label: "Flat-screen TV",
  },
  Terrace: {
    icon: <DeckIcon sx={{ fontSize: 16 }} />,
    label: "Terrace",
  },
  "Tea/Coffee Maker": {
    icon: <CoffeeMakerIcon sx={{ fontSize: 16 }} />,
    label: "Coffee Machine",
  },
  "Free Wi-Fi": {
    icon: <WifiIcon sx={{ fontSize: 16 }} />,
    label: "Free WiFi",
  },
};

interface RoomFeaturesProps {
  propertyRoom?: PropertyRoom;
}

const RoomFeatures = ({ propertyRoom }: RoomFeaturesProps) => {
  if (!propertyRoom) return null;

  const facilities = propertyRoom.roomFacilities ?? [];

  return (
    <Stack flexDirection="row" flexWrap="wrap" gap={1} mt={2}>
      {/* Room Size — hardcoded example */}
      <Stack flexDirection="row" gap={0.5} alignItems="center">
        <VillaIcon sx={{ fontSize: 16 }} />
        <Typography className="small-text">
          34 m<sup style={{ fontSize: 12 }}>2</sup>
        </Typography>
      </Stack>

      {/* Bathroom */}
      <Stack flexDirection="row" gap={0.5} alignItems="center">
        <BathtubIcon sx={{ fontSize: 16 }} />
        <Typography className="small-text">
          {propertyRoom.isBathroomPrivate ? "" : "No "}Private Bathroom
        </Typography>
      </Stack>

      {/* Loop through mapped facilities */}
      {Object.entries(FACILITY_MAP).map(([backendValue, def]) => {
        const exists = facilities.includes(backendValue);

        return (
          <Stack
            key={backendValue}
            flexDirection="row"
            gap={0.5}
            alignItems="center"
          >
            {def.icon}
            <Typography className="small-text">
              {exists ? "" : "No "}
              {def.label}
            </Typography>
          </Stack>
        );
      })}
    </Stack>
  );
};

export default RoomFeatures;
