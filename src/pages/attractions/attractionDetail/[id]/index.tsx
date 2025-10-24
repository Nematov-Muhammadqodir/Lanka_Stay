import React from "react";
import FAQ from "@/src/libs/components/HotelDetail.tsx/FAQ/FAQ";
import { Stack } from "@mui/material";
import withLayoutAttractions from "@/src/libs/components/layout/attractions/AttractionsLayout";
import AttractionOverView from "@/src/libs/components/attractions/AttractionDetail/AttractionOverView";
import AttractionInfoSection from "@/src/libs/components/attractions/AttractionDetail/AttractionInfoSection";
import TourHighlights from "@/src/libs/components/attractions/AttractionDetail/TourHighlights";
import TicketInfo from "@/src/libs/components/attractions/AttractionDetail/TicketInfo";

const AttractionDetail = () => {
  return (
    <Stack className="container">
      <AttractionOverView />
      <AttractionInfoSection />
      <Stack
        flexDirection={"row"}
        className="attractions-main-container"
        justifyContent={"space-between"}
      >
        <Stack className="left-side" width={"60%"}>
          <TourHighlights />
        </Stack>
        <Stack className="right-side" width={"38%"} border={"1px solid"}>
          <TicketInfo />
        </Stack>
      </Stack>
      <FAQ />
    </Stack>
  );
};

export default withLayoutAttractions(AttractionDetail);
