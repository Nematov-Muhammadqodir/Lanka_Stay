import React from "react";
import AboutThisHotel from "@/src/libs/components/HotelDetail.tsx/AboutThisHotel";
import AllAvailableRooms from "@/src/libs/components/HotelDetail.tsx/AllAvailableRooms";
import FAQ from "@/src/libs/components/HotelDetail.tsx/FAQ/FAQ";
import GreatForYourStay from "@/src/libs/components/HotelDetail.tsx/GreatForYourStay";
import GuestReviews from "@/src/libs/components/HotelDetail.tsx/GuestReviews";
import HotelInfoSection from "@/src/libs/components/HotelDetail.tsx/HotelInfoSection";
import HouseRules from "@/src/libs/components/HotelDetail.tsx/HouseRules/HouseRules";
import LegalInformation from "@/src/libs/components/HotelDetail.tsx/Legal_Information/LegalInformation";
import PropertyOverview from "@/src/libs/components/HotelDetail.tsx/PropertyOverview";
import ReviewsList from "@/src/libs/components/HotelDetail.tsx/ReviewsList";
import { Stack } from "@mui/material";
import withLayoutAttractions from "@/src/libs/components/layout/attractions/AttractionsLayout";
import AttractionOverView from "@/src/libs/components/attractions/AttractionDetail/AttractionOverView";
import AttractionInfoSection from "@/src/libs/components/attractions/AttractionDetail/AttractionInfoSection";

const AttractionDetail = () => {
  return (
    <Stack>
      <AttractionOverView />
      <AttractionInfoSection />
      <FAQ />
    </Stack>
  );
};

export default withLayoutAttractions(AttractionDetail);
