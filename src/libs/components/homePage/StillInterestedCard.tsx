import { Box, Stack, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { PartnerProperty } from "../../types/partnerInput/partnerProperty";
import { useRouter } from "next/router";
import { LIKE_TARGET_PROPERTY } from "@/apollo/user/mutation";
import { useMutation, useReactiveVar } from "@apollo/client";
import { Messages } from "../../config";
import { userVar } from "@/apollo/store";

interface StillInterestedCardProps {
  property?: PartnerProperty;
  likePropertyHandler?: any;
}

const StillInterestedCard = ({
  property,
  likePropertyHandler,
}: StillInterestedCardProps) => {
  console.log("propertyyy", property);
  const user = useReactiveVar(userVar);
  const router = useRouter();

  const ratings = [
    property?.staffRating,
    property?.facilitiesRating,
    property?.cleanlessRating,
    property?.comfortRating,
    property?.valueOfMoneyRating,
    property?.locationRating,
    property?.freeWiFiRating,
  ].filter((r) => r != null && r > 0);

  const avgRating =
    ratings.length > 0
      ? (ratings.reduce((sum, val) => sum + val!, 0) / ratings.length).toFixed(1)
      : "0";

  const totalReviews = property?.totalReviews ?? 0;

  const ratingLabel =
    Number(avgRating) >= 9
      ? "Superb"
      : Number(avgRating) >= 8
      ? "Fabulous"
      : Number(avgRating) >= 7
      ? "Very Good"
      : Number(avgRating) >= 6
      ? "Good"
      : Number(avgRating) > 0
      ? "Pleasant"
      : "";

  return (
    <Stack
      sx={{
        width: "247px",
        height: "338px",
        border: "1px solid #eee",
        borderRadius: "8px",
        boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.25)",
        cursor: "pointer",
        transition: "transform 0.3s ease",
        "&:hover": {
          transform: "scale(1.03)",
        },
      }}
      onClick={() => router.push(`/hotels/hotelDetail/${property?._id}`)}
    >
      <Stack
        sx={{
          width: "100%",
          height: 210,
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
        }}
      >
        <Image
          src={
            property?.propertyImages?.[0]
              ? `${process.env.NEXT_PUBLIC_API_URL}/${property.propertyImages[0]}`
              : "/img/hotel.jpg"
          }
          alt="property-image"
          width={247}
          height={211}
          style={{
            objectFit: "cover",
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
          }}
        />
        <Box
          position={"absolute"}
          top={5}
          right={5}
          sx={{
            width: 40,
            height: 40,
            backgroundColor: "white",
            textAlign: "center",
            borderRadius: "50%",
            pt: "8px",
          }}
          onClick={(e) => {
            e.stopPropagation();
            likePropertyHandler(user, property?._id);
          }}
        >
          {property?.meLiked && property?.meLiked[0]?.myFavorite ? (
            <FavoriteIcon sx={{ color: "#C0392B" }} />
          ) : (
            <FavoriteBorderIcon />
          )}
        </Box>
      </Stack>
      <Stack sx={{ padding: "10px", gap: "3px" }}>
        <Typography
          fontWeight={700}
          width={"100%"}
          height={45}
          overflow={"hidden"}
        >
          {property?.propertyName}
        </Typography>
        <Typography fontSize={12}>
          {property?.propertyRegion}, {property?.propertyCountry}
        </Typography>
        {Number(avgRating) > 0 && (
          <Stack flexDirection={"row"}>
            <Box
              sx={{
                width: 28,
                height: 28,
                backgroundColor: "primary.main",
                border: "1px solid #eee",
                borderRadius: "6px",
                mr: 1,
                mt: 0.3,
                textAlign: "center",
                justifyContent: "center",
                borderBottomLeftRadius: 0,
              }}
            >
              <Typography
                fontSize={12}
                justifyContent={"center"}
                alignItems={"center"}
                display={"flex"}
                color={"secondary.contrastText"}
                paddingTop={0.3}
              >
                {avgRating}
              </Typography>
            </Box>
            <Typography fontSize={13}>
              {ratingLabel} <br />
              {totalReviews} {totalReviews === 1 ? "review" : "reviews"}
            </Typography>
          </Stack>
        )}
      </Stack>
    </Stack>
  );
};

export default StillInterestedCard;
