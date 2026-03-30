import { Box, Button, Stack, Typography } from "@mui/material";
import React from "react";
import HdrStrongIcon from "@mui/icons-material/HdrStrong";
import ReviewBar from "../../../HotelDetail/ReviewBar";
import AttractionsReviewBar from "../../AttractionsReviewBar";

const TourReviewsForMenu = () => {
  return (
    <Stack mt={"20px !important"} gap={2}>
      <Typography sx={{ fontWeight: 700, fontSize: 20 }}>
        User ratings
      </Typography>
      <Stack flexDirection={"row"} flexWrap={"wrap"} gap={3}>
        <AttractionsReviewBar label={"Good value"} value={4.4} />
        <AttractionsReviewBar label={"Facilities"} value={4.5} />
        <AttractionsReviewBar label={"Quality of service"} value={4.5} />
        <AttractionsReviewBar label={"Ease of access"} value={4.6} />
      </Stack>
    </Stack>
  );
};

export default TourReviewsForMenu;
