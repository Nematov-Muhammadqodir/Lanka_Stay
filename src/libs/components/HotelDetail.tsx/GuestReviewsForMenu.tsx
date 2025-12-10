import { Box, Button, Stack, Typography } from "@mui/material";
import React from "react";
import HdrStrongIcon from "@mui/icons-material/HdrStrong";
import ReviewBar from "./ReviewBar";
import { HotelReviewsProps } from "@/src/pages/hotels/hotelDetail/[id]";

const GuestReviewsForMenu = ({
  hotelReviewInput,
}: {
  hotelReviewInput: HotelReviewsProps;
}) => {
  const {
    staffRating,
    facilitiesRating,
    cleanlessRating,
    comfortRating,
    valueOfMoneyRating,
    locationRating,
    freeWiFiRating,
    totalReviews,
  } = hotelReviewInput;
  return (
    <Stack mt={"50px !important"} gap={2}>
      <Typography sx={{ fontWeight: 700, fontSize: 20 }}>
        Categories:
      </Typography>
      <Stack flexDirection={"row"} flexWrap={"wrap"} gap={3}>
        <ReviewBar label={"Staff"} value={staffRating ? staffRating : 0} />
        <ReviewBar
          label={"Facilities"}
          value={facilitiesRating ? facilitiesRating : 0}
        />
        <ReviewBar
          label={"Cleanliness"}
          value={cleanlessRating ? cleanlessRating : 0}
        />
        <ReviewBar
          label={"Comfort"}
          value={comfortRating ? comfortRating : 0}
        />
        <ReviewBar
          label={"Value for money"}
          value={valueOfMoneyRating ? valueOfMoneyRating : 0}
        />
        <ReviewBar
          label={"Location"}
          value={locationRating ? locationRating : 0}
        />
        <ReviewBar
          label={"Free WiFi"}
          value={freeWiFiRating ? freeWiFiRating : 0}
        />
      </Stack>
    </Stack>
  );
};

export default GuestReviewsForMenu;
