import { Box, Button, Stack, Typography } from "@mui/material";
import React from "react";
import HdrStrongIcon from "@mui/icons-material/HdrStrong";
import ReviewBar from "./ReviewBar";

const GuestReviewsForMenu = () => {
  return (
    <Stack mt={"50px !important"} gap={2}>
      <Typography className="bold-text">Categories:</Typography>
      <Stack flexDirection={"row"} flexWrap={"wrap"} gap={3}>
        <ReviewBar label={"Staff"} value={8.0} />
        <ReviewBar label={"Facilities"} value={8.9} />
        <ReviewBar label={"Cleanliness"} value={9.2} />
        <ReviewBar label={"Comfort"} value={9.0} />
        <ReviewBar label={"Value for money"} value={9.1} />
        <ReviewBar label={"Location"} value={9.8} />
        <ReviewBar label={"Free WiFi"} value={9.9} />
      </Stack>
    </Stack>
  );
};

export default GuestReviewsForMenu;
