import { Box, Button, Drawer, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { useTranslation } from "next-i18next";
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
  const { t } = useTranslation("common");
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
      <Typography className="bold-text">{t("hotel.guestReviews")}</Typography>
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
        <Typography className="small-bold-text">
          {formattedTotalScore >= 9
            ? t("hotel.superb")
            : formattedTotalScore >= 8
            ? t("hotel.fabulous")
            : formattedTotalScore >= 7
            ? t("hotel.veryGood")
            : formattedTotalScore >= 6
            ? t("hotel.good")
            : t("hotel.pleasant")}
        </Typography>
        <HdrStrongIcon />
        <Typography>{totalReviews} {t("hotel.reviews")}</Typography>
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
          {t("hotel.readAllReviews")}
        </Button>
        <Drawer
          anchor="right" // 👈 this positions it to the right
          open={open}
          onClose={handleClose}
          PaperProps={{
            sx: {
              width: { xs: "100%", md: 900 },
              maxWidth: "100%",
              borderTopLeftRadius: { xs: 0, md: 20 },
              borderBottomLeftRadius: { xs: 0, md: 20 },
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
      <Typography className="bold-text">{t("hotel.categories")}</Typography>
      <Stack flexDirection={"row"} flexWrap={"wrap"} gap={3}>
        <ReviewBar label={t("hotel.staff")} value={staffRating} />
        <ReviewBar label={t("hotel.facilitiesRating")} value={facilitiesRating} />
        <ReviewBar label={t("hotel.cleanliness")} value={cleanlessRating} />
        <ReviewBar label={t("hotel.comfort")} value={comfortRating} />
        <ReviewBar label={t("hotel.valueForMoney")} value={valueOfMoneyRating} />
        <ReviewBar label={t("hotel.locationLabel")} value={locationRating} />
        <ReviewBar label={t("hotel.freeWifi")} value={freeWiFiRating} />
      </Stack>
    </Stack>
  );
};

export default GuestReviews;
