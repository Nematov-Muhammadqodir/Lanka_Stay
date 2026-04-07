import { Stack, Typography } from "@mui/material";
import React from "react";
import AttractionsReviewBar from "../../AttractionsReviewBar";
import { Attraction } from "../../../../types/attraction/attraction";
import { useTranslation } from "next-i18next";

interface TourReviewsForMenuProps {
  attraction?: Attraction | null;
}

const TourReviewsForMenu = ({ attraction }: TourReviewsForMenuProps) => {
  const { t } = useTranslation("common");
  const avgRating = attraction?.averageRating ?? 0;

  return (
    <Stack mt={"20px !important"} gap={2}>
      <Typography sx={{ fontWeight: 700, fontSize: 20 }}>
        {t("attraction.userRatings")}
      </Typography>
      <Stack flexDirection={"row"} flexWrap={"wrap"} gap={3}>
        <AttractionsReviewBar label={t("attraction.goodValue")} value={attraction?.valueRating ?? 0} />
        <AttractionsReviewBar label={t("attraction.facilities")} value={attraction?.facilitiesRating ?? 0} />
        <AttractionsReviewBar label={t("attraction.qualityOfService")} value={attraction?.qualityRating ?? 0} />
        <AttractionsReviewBar label={t("attraction.easeOfAccess")} value={attraction?.accessRating ?? 0} />
      </Stack>
    </Stack>
  );
};

export default TourReviewsForMenu;
