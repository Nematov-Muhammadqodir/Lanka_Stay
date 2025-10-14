import AboutThisHotel from "@/src/libs/components/HotelDetail.tsx/AboutThisHotel";
import AllAvailableRooms from "@/src/libs/components/HotelDetail.tsx/AllAvailableRooms";
import GreatForYourStay from "@/src/libs/components/HotelDetail.tsx/GreatForYourStay";
import GuestReviewMenu from "@/src/libs/components/HotelDetail.tsx/GuestReviewMenu";
import GuestReviews from "@/src/libs/components/HotelDetail.tsx/GuestReviews";
import HotelInfoSection from "@/src/libs/components/HotelDetail.tsx/HotelInfoSection";
import PropertyOverview from "@/src/libs/components/HotelDetail.tsx/PropertyOverview";
import ReviewsList from "@/src/libs/components/HotelDetail.tsx/ReviewsList";
import withLayoutSecondary from "@/src/libs/components/layout/LayoutSecondary";
import { Stack } from "@mui/material";
import React from "react";

const HotelDetail = () => {
  return (
    <Stack>
      <PropertyOverview />
      <HotelInfoSection />
      <AboutThisHotel />
      <GreatForYourStay />
      <AllAvailableRooms />
      <GuestReviews />
      <ReviewsList />
    </Stack>
  );
};

export default withLayoutSecondary(HotelDetail);
