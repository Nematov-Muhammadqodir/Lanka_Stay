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

const RoomFeatures = () => {
  return (
    <Stack flexDirection={"row"} flexWrap={"wrap"} gap={1} mt={2}>
      <Stack flexDirection={"row"} gap={0.5} alignItems={"center"}>
        <VillaIcon sx={{ fontSize: 16 }} />
        <Typography className="small-text">
          34 m<sup style={{ fontSize: 12 }}>2</sup>
        </Typography>
      </Stack>
      <Stack flexDirection={"row"} gap={0.5} alignItems={"center"}>
        <BalconyIcon sx={{ fontSize: 16 }} />
        <Typography className="small-text">Balcony</Typography>
      </Stack>
      <Stack flexDirection={"row"} gap={0.5} alignItems={"center"}>
        <PoolIcon sx={{ fontSize: 16 }} />
        <Typography className="small-text">Pool View</Typography>
      </Stack>
      <Stack flexDirection={"row"} gap={0.5} alignItems={"center"}>
        <BathtubIcon sx={{ fontSize: 16 }} />
        <Typography className="small-text">Private Bathroom</Typography>
      </Stack>
      <Stack flexDirection={"row"} gap={0.5} alignItems={"center"}>
        <TvIcon sx={{ fontSize: 16 }} />
        <Typography className="small-text">Flat-screen TV</Typography>
      </Stack>
      <Stack flexDirection={"row"} gap={0.5} alignItems={"center"}>
        <DeckIcon sx={{ fontSize: 16 }} />
        <Typography className="small-text">Terrace</Typography>
      </Stack>
      <Stack flexDirection={"row"} gap={0.5} alignItems={"center"}>
        <CoffeeMakerIcon sx={{ fontSize: 16 }} />
        <Typography className="small-text">Coffee machine</Typography>
      </Stack>
      <Stack flexDirection={"row"} gap={0.5} alignItems={"center"}>
        <WifiIcon sx={{ fontSize: 16 }} />
        <Typography className="small-text">Free WiFi</Typography>
      </Stack>
    </Stack>
  );
};

export default RoomFeatures;
