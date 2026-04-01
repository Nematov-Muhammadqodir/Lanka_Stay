import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import Image from "next/image";
import { PartnerProperty } from "../../types/partnerInput/partnerProperty";
import CustomMap from "./CustomMap";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

export interface ReviewMapContainerProps {
  partnerProperty?: PartnerProperty;
}

const ReviewMapContainer = (props: ReviewMapContainerProps) => {
  const { partnerProperty } = props;

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
      width={390}
      height={510}
      justifyContent={"space-between"}
    >
      <Stack
        className="review-container"
        height={300}
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
                ? "Superb"
                : Number(avgScore) >= 8
                ? "Fabulous"
                : Number(avgScore) >= 7
                ? "Very Good"
                : Number(avgScore) >= 6
                ? "Good"
                : "Pleasant"}
            </Typography>
            <Typography fontSize={12} color="text.secondary">
              {totalReviews} {totalReviews === 1 ? "review" : "reviews"}
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
            Guests who stayed here loved
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
                      ? `${process.env.NEXT_PUBLIC_API_URL}/${latestComment.memberData.guestImage}`
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
              No reviews yet
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
            Location Score
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

      <Box height={200} width={390}>
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
