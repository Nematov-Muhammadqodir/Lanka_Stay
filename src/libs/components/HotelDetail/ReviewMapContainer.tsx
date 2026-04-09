import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import Image from "next/image";
import { useTranslation } from "next-i18next";
import { PartnerProperty } from "../../types/partnerInput/partnerProperty";
import CustomMap from "./CustomMap";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { resolveImageUrl } from "@/src/libs/handlers/imageHandler";

export interface ReviewMapContainerProps {
  partnerProperty?: PartnerProperty;
}

const ReviewMapContainer = (props: ReviewMapContainerProps) => {
  const { partnerProperty } = props;
  const { t } = useTranslation("common");

  const comments = useSelector(
    (state: RootState) => state.comments.data?.list
  );

  const latestComment = comments?.[0];

  const ratings = [
    partnerProperty?.staffRating,
    partnerProperty?.facilitiesRating,
    partnerProperty?.cleanlessRating,
    partnerProperty?.comfortRating,
    partnerProperty?.valueOfMoneyRating,
    partnerProperty?.locationRating,
    partnerProperty?.freeWiFiRating,
  ].filter((r) => r != null);

  const avgScore =
    ratings.length > 0
      ? (ratings.reduce((sum, val) => sum + val, 0) / ratings.length).toFixed(1)
      : "0";

  const totalReviews = partnerProperty?.totalReviews ?? 0;

  const locationScore = partnerProperty?.locationRating?.toFixed(1) ?? avgScore;
  return (
    <Stack
      className="right-review-map-container"
      sx={{
        width: { xs: "100%", md: 390 },
        height: { xs: "auto", md: 510 },
        gap: { xs: 2, md: 0 },
      }}
      justifyContent={"space-between"}
    >
      <Stack
        className="review-container"
        sx={{ height: { xs: "auto", md: 300 } }}
        border={"1px solid"}
        borderColor={"divider"}
        borderRadius={1}
        overflow="hidden"
      >
        <Stack
          flexDirection={"row"}
          alignItems={"center"}
          gap={1}
          justifyContent={"flex-end"}
          padding={1}
          borderBottom={"1px solid"}
          borderColor={"divider"}
        >
          <Stack>
            <Typography fontWeight={700}>
              {Number(avgScore) >= 9
                ? t("hotel.superb")
                : Number(avgScore) >= 8
                ? t("hotel.fabulous")
                : Number(avgScore) >= 7
                ? t("hotel.veryGood")
                : Number(avgScore) >= 6
                ? t("hotel.good")
                : t("hotel.pleasant")}
            </Typography>
            <Typography fontSize={12} color="text.secondary">
              {totalReviews} {totalReviews === 1 ? t("hotel.review") : t("hotel.reviews")}
            </Typography>
          </Stack>
          <Box
            padding={"5px"}
            sx={{ backgroundColor: "primary.main", borderRadius: 1 }}
          >
            <Typography color={"primary.contrastText"} fontWeight={600}>
              {avgScore}
            </Typography>
          </Box>
        </Stack>
        <Stack
          gap={2}
          padding={1}
          borderBottom={"1px solid"}
          borderColor={"divider"}
          flex={1}
        >
          <Typography fontSize={13} fontWeight={600}>
            {t("hotel.guestsLoved")}
          </Typography>
          {latestComment ? (
            <Stack gap={1}>
              <Typography height={90} overflow={"auto"} fontSize={14}>
                &ldquo;{latestComment.commentContent}&rdquo;
              </Typography>
              <Stack flexDirection={"row"} gap={1} alignItems="center">
                <Image
                  src={
                    latestComment.memberData?.guestImage
                      ? resolveImageUrl(latestComment.memberData.guestImage)
                      : "/img/Villa.jpg"
                  }
                  alt="user-image"
                  width={30}
                  height={30}
                  style={{ objectFit: "cover", borderRadius: 200 }}
                />
                <Typography fontWeight={700} fontSize={14}>
                  {latestComment.memberData?.guestName ?? "Guest"}
                </Typography>
                <Typography fontSize={13} color="text.secondary">
                  {latestComment.memberData?.guestCountry ?? ""}
                </Typography>
              </Stack>
            </Stack>
          ) : (
            <Typography fontSize={14} color="text.secondary">
              {t("hotel.noReviews")}
            </Typography>
          )}
        </Stack>
        <Stack
          gap={1}
          justifyContent={"center"}
          alignItems={"center"}
          padding={1}
          flexDirection={"row"}
        >
          <Typography fontWeight={700} fontSize={14}>
            {t("hotel.locationScore")}
          </Typography>
          <Box
            padding={"5px"}
            sx={{ backgroundColor: "primary.main", borderRadius: 1 }}
          >
            <Typography color={"primary.contrastText"} fontWeight={600}>
              {locationScore}
            </Typography>
          </Box>
        </Stack>
      </Stack>

      <Box sx={{ height: 200, width: { xs: "100%", md: 390 } }}>
        <CustomMap
          country={partnerProperty?.propertyCountry}
          city={partnerProperty?.propertyCity}
          region={partnerProperty?.propertyRegion}
          postCode={partnerProperty?.propertyPostCode}
          propertyName={partnerProperty?.propertyName}
        />
      </Box>
    </Stack>
  );
};

export default ReviewMapContainer;
