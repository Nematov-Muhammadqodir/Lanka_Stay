import { Stack, Typography } from "@mui/material";
import React from "react";
import AttractionsReviewBar from "../../AttractionsReviewBar";
import { Attraction } from "../../../../types/attraction/attraction";

interface TourReviewsForMenuProps {
  attraction?: Attraction | null;
}

const TourReviewsForMenu = ({ attraction }: TourReviewsForMenuProps) => {
  const avgRating = attraction?.averageRating ?? 0;

  return (
    <Stack mt={"20px !important"} gap={2}>
      <Typography sx={{ fontWeight: 700, fontSize: 20 }}>
        User ratings
      </Typography>
      <Stack flexDirection={"row"} flexWrap={"wrap"} gap={3}>
        <AttractionsReviewBar label={"Good value"} value={attraction?.valueRating ?? 0} />
        <AttractionsReviewBar label={"Facilities"} value={attraction?.facilitiesRating ?? 0} />
        <AttractionsReviewBar label={"Quality of service"} value={attraction?.qualityRating ?? 0} />
        <AttractionsReviewBar label={"Ease of access"} value={attraction?.accessRating ?? 0} />
      </Stack>
    </Stack>
  );
};

export default TourReviewsForMenu;
