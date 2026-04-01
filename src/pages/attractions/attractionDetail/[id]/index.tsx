import React from "react";
import { Stack } from "@mui/material";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import { GET_ATTRACTION } from "@/apollo/user/query";
import withLayoutAttractions from "@/src/libs/components/layout/attractions/AttractionsLayout";
import AttractionOverView from "@/src/libs/components/attractions/AttractionDetail/AttractionOverView";
import AttractionInfoSection from "@/src/libs/components/attractions/AttractionDetail/AttractionInfoSection";
import TourHighlights from "@/src/libs/components/attractions/AttractionDetail/TourHighlights";
import TicketInfo from "@/src/libs/components/attractions/AttractionDetail/TicketInfo";
import UserRatings from "@/src/libs/components/attractions/AttractionDetail/UserRatings";
import AttractionsReviewsList from "@/src/libs/components/attractions/AttractionDetail/AttractionsReviewsList";
import AttractionsFAQ from "@/src/libs/components/attractions/AttractionDetail/FAQ/AttractionsFAQ";

const AttractionDetail = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data, loading } = useQuery(GET_ATTRACTION, {
    variables: { input: id as string },
    skip: !id,
  });

  const attraction = data?.getAttraction ?? null;

  return (
    <Stack className="container">
      <AttractionOverView attraction={attraction} />
      <AttractionInfoSection attraction={attraction} />
      <Stack
        flexDirection={"row"}
        className="attractions-main-container"
        justifyContent={"space-between"}
      >
        <Stack className="left-side" width={"72%"}>
          <TourHighlights attraction={attraction} />
          <UserRatings attraction={attraction} />
          <AttractionsReviewsList attractionId={attraction?._id} />
        </Stack>
        <Stack className="right-side" width={"23%"} alignItems={"end"}>
          <TicketInfo attraction={attraction} />
        </Stack>
      </Stack>
      <AttractionsFAQ attraction={attraction} />
    </Stack>
  );
};

export default withLayoutAttractions(AttractionDetail);
