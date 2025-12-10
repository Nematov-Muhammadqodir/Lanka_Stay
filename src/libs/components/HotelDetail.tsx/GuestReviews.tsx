import { Box, Button, Drawer, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import HdrStrongIcon from "@mui/icons-material/HdrStrong";
import ReviewBar from "./ReviewBar";
import GuestReviewMenu from "./GuestReviewMenu";
import { HotelReviewsProps } from "@/src/pages/hotels/hotelDetail/[id]";

const GuestReviews = ({
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
  console.log("hotelReviewInput in GuestReviews:", hotelReviewInput);

  const ratings = [
    staffRating,
    facilitiesRating,
    cleanlessRating,
    comfortRating,
    valueOfMoneyRating,
    locationRating,
    freeWiFiRating,
  ];

  // Calculate average score
  const totalScore =
    ratings.reduce((sum, val) => sum + (val || 0), 0) / ratings.length;

  // Round to 1 decimal place
  const formattedTotalScore = Number(totalScore.toFixed(1));
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Stack className="container" mt={"50px !important"} gap={2}>
      <Typography className="bold-text">Guest reviews</Typography>
      <Stack flexDirection={"row"} gap={1} alignItems={"center"}>
        <Box
          sx={{
            backgroundColor: "primary.main",
            color: "secondary.contrastText",
            fontSize: 15,
            padding: 1,
            borderRadius: 1,
            fontWeight: 700,
          }}
        >
          {formattedTotalScore}
        </Box>
        <Typography className="small-bold-text">Fabulous</Typography>
        <HdrStrongIcon />
        <Typography>{totalReviews} reviews</Typography>
        <Button
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
          sx={{
            textTransform: "capitalize",
            color: "primary.main",
            textDecoration: "underline",
          }}
        >
          Read all reviews
        </Button>
        <Drawer
          anchor="right" // 👈 this positions it to the right
          open={open}
          onClose={handleClose}
          PaperProps={{
            sx: {
              width: 900,
              borderTopLeftRadius: 20,
              borderBottomLeftRadius: 20,
              overflow: "hidden",
            },
          }}
        >
          <GuestReviewMenu
            handleClose={handleClose}
            hotelReviewInput={hotelReviewInput}
          />
        </Drawer>
      </Stack>
      <Typography className="bold-text">Categories:</Typography>
      <Stack flexDirection={"row"} flexWrap={"wrap"} gap={3}>
        <ReviewBar label={"Staff"} value={staffRating} />
        <ReviewBar label={"Facilities"} value={facilitiesRating} />
        <ReviewBar label={"Cleanliness"} value={cleanlessRating} />
        <ReviewBar label={"Comfort"} value={comfortRating} />
        <ReviewBar label={"Value for money"} value={valueOfMoneyRating} />
        <ReviewBar label={"Location"} value={locationRating} />
        <ReviewBar label={"Free WiFi"} value={freeWiFiRating} />
      </Stack>
    </Stack>
  );
};

export default GuestReviews;
