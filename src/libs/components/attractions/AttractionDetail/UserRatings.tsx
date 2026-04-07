import { Button, Drawer, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import HdrStrongIcon from "@mui/icons-material/HdrStrong";
import StarIcon from "@mui/icons-material/Star";
import TourReviewMenu from "./TourReviewMenu";
import AttractionsReviewBar from "../AttractionsReviewBar";
import { Attraction } from "../../../types/attraction/attraction";
import { useTranslation } from "next-i18next";

interface UserRatingsProps {
  attraction?: Attraction | null;
  comments?: any[];
}

const UserRatings = ({ attraction, comments }: UserRatingsProps) => {
  const { t } = useTranslation("common");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const totalReviews = attraction?.totalReviews ?? 0;
  const avgRating = attraction?.averageRating ?? 0;

  const ratingLabel =
    avgRating >= 4.5
      ? t("attraction.ratingSuperb")
      : avgRating >= 4
      ? t("attraction.ratingFabulous")
      : avgRating >= 3.5
      ? t("attraction.ratingVeryGood")
      : avgRating >= 3
      ? t("attraction.ratingGood")
      : t("attraction.ratingPleasant");

  return (
    <Stack className="container" mt={"50px !important"} gap={2} width={"100%"}>
      <Typography className="bold-text">{t("attraction.guestReviews")}</Typography>
      <Stack flexDirection={"row"} gap={1} alignItems={"center"}>
        <StarIcon sx={{ color: "#FEBB05" }} />
        <Typography className="small-bold-text">{ratingLabel}</Typography>
        <HdrStrongIcon />
        <Typography>
          {totalReviews} {totalReviews === 1 ? t("attraction.review") : t("attraction.reviews")}
        </Typography>
        <Button
          onClick={handleClick}
          sx={{
            textTransform: "capitalize",
            color: "primary.main",
            textDecoration: "underline",
          }}
        >
          {t("attraction.readAllReviews")}
        </Button>
        <Drawer
          anchor="right"
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
          <TourReviewMenu
            handleClose={handleClose}
            attraction={attraction}
          />
        </Drawer>
      </Stack>
      <Stack flexDirection={"row"} flexWrap={"wrap"} gap={3} width={"60%"}>
        <AttractionsReviewBar label={t("attraction.goodValue")} value={attraction?.valueRating ?? 0} />
        <AttractionsReviewBar label={t("attraction.facilities")} value={attraction?.facilitiesRating ?? 0} />
        <AttractionsReviewBar label={t("attraction.qualityOfService")} value={attraction?.qualityRating ?? 0} />
        <AttractionsReviewBar label={t("attraction.easeOfAccess")} value={attraction?.accessRating ?? 0} />
      </Stack>
    </Stack>
  );
};

export default UserRatings;
