import AboutThisHotel from "@/src/libs/components/HotelDetail.tsx/AboutThisHotel";
import HotelInfoSection from "@/src/libs/components/HotelDetail.tsx/HotelInfoSection";
import PropertyOverview from "@/src/libs/components/HotelDetail.tsx/PropertyOverview";
import withLayoutSecondary from "@/src/libs/components/layout/LayoutSecondary";
import { Stack } from "@mui/material";
import React from "react";

const HotelDetail = () => {
  return (
    <Stack>
      <PropertyOverview />
      <HotelInfoSection />
      <AboutThisHotel />
    </Stack>
  );
};

export default withLayoutSecondary(HotelDetail);
