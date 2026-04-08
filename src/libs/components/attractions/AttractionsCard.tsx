import { Box, Button, IconButton, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import Image from "next/image";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useRouter } from "next/router";
import TimerIcon from "@mui/icons-material/Timer";
import StarIcon from "@mui/icons-material/Star";
import EventRepeatIcon from "@mui/icons-material/EventRepeat";
import { formatKoreanWon } from "@/src/libs/handlers/priceHandler";
import { useMutation, useReactiveVar } from "@apollo/client";
import { LIKE_TARGET_ATTRACTION } from "@/apollo/user/mutation";
import { userVar } from "@/apollo/store";
import { sweetMixinErrorAlert } from "@/src/libs/sweetAlert";
import { useTranslation } from "next-i18next";

interface AttractionsListCardProps {
  attraction: any;
}

const AttractionsListCard = ({ attraction }: AttractionsListCardProps) => {
  const { t } = useTranslation("common");
  const router = useRouter();
  const user = useReactiveVar(userVar);
  const [liked, setLiked] = useState(
    attraction?.meLiked?.[0]?.myFavorite ?? false
  );
  const [likeAttraction] = useMutation(LIKE_TARGET_ATTRACTION);

  const imageUrl =
    attraction.attractionImages && attraction.attractionImages.length > 0
      ? `${process.env.NEXT_PUBLIC_API_URL}/${attraction.attractionImages[0]}`
      : "/img/hotel.jpg";

  const handleClick = () => {
    router.push(`/attractions/attractionDetail/${attraction._id}`);
  };

  const handleLike = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!user?._id) {
      await sweetMixinErrorAlert("Please login first");
      return;
    }
    try {
      await likeAttraction({ variables: { input: attraction._id } });
      setLiked(!liked);
    } catch (err: any) {
      console.error("Like error:", err);
    }
  };

  return (
    <Stack
      onClick={handleClick}
      position="relative"
      sx={{
        pt: { xs: 2, md: 3 },
        px: { xs: 1.5, md: 2.5 },
        pb: { xs: 2, md: 0 },
        height: { xs: "auto", md: 250 },
        width: "100%",
        border: "1px solid",
        borderColor: "text.disabled",
        borderRadius: 3,
        justifyContent: "flex-start",
        transition: "all 0.3s ease",
        cursor: "pointer",
        "&:hover": {
          transform: "scale(1.02)",
          boxShadow: "0 6px 18px rgba(0, 0, 0, 0.15)",
          borderColor: "primary.main",
        },
      }}
    >
      {/* Like button - top right corner */}
      <IconButton
        onClick={handleLike}
        sx={{
          position: "absolute",
          top: 10,
          right: 10,
          zIndex: 1,
          backgroundColor: "rgba(255,255,255,0.9)",
          "&:hover": { backgroundColor: "rgba(255,255,255,1)" },
          width: 38,
          height: 38,
        }}
      >
        {liked ? (
          <FavoriteIcon sx={{ color: "#D40F1D", fontSize: 22 }} />
        ) : (
          <FavoriteBorderIcon sx={{ color: "#D40F1D", fontSize: 22 }} />
        )}
      </IconButton>

      <Stack
        sx={{
          flexDirection: { xs: "column", md: "row" },
          gap: 2,
        }}
      >
        <Stack
          sx={{
            width: { xs: "100%", md: 175 },
            height: { xs: 200, md: 175 },
            position: "relative",
            flexShrink: 0,
          }}
        >
          <Image
            src={imageUrl}
            alt={attraction.attractionName || "Attraction"}
            fill
            style={{ objectFit: "cover", borderRadius: 5 }}
          />
        </Stack>
        <Stack
          sx={{
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            width: "100%",
            gap: { xs: 1.5, md: 0 },
          }}
        >
          <Stack className="middle" gap={0.5} flex={1}>
            <Stack flexDirection={"row"} gap={1}>
              <Typography className="bold-text">
                {attraction.attractionName || "Untitled Attraction"}
              </Typography>
            </Stack>
            <Stack flexDirection={"row"} gap={1}>
              <Typography className="small-bold-text">
                {attraction.attractionCity || "Unknown City"}
              </Typography>
            </Stack>
            <Stack flexDirection={"row"} gap={1}>
              <Typography className="small-text">
                {attraction.attractionDescription
                  ? attraction.attractionDescription.length > 150
                    ? attraction.attractionDescription.substring(0, 150) + "..."
                    : attraction.attractionDescription
                  : t("attraction.noDescriptionAvailable")}
              </Typography>
            </Stack>
            <Stack
              sx={{
                flexDirection: { xs: "column", md: "row" },
                justifyContent: "space-between",
                gap: { xs: 1.5, md: 0 },
              }}
            >
              <Stack>
                {attraction.attractionDuration && (
                  <Stack flexDirection={"row"} gap={1}>
                    <TimerIcon />
                    <Typography className="small-text">
                      {t("attraction.duration")}: {attraction.attractionDuration}
                    </Typography>
                  </Stack>
                )}
                <Stack flexDirection={"row"} gap={1} alignItems={"center"}>
                  <StarIcon sx={{ color: "#FEBB05" }} />
                  <Typography className="small-bold-text">
                    {attraction.averageRating ?? 0} (
                    {attraction.totalReviews ?? 0} {t("attraction.reviews")})
                  </Typography>
                </Stack>
                {attraction.freeCancellation && (
                  <Stack
                    flexDirection={"row"}
                    gap={1}
                    alignItems={"center"}
                    sx={{ color: "#018233" }}
                  >
                    <EventRepeatIcon />
                    <Typography className="small-text">
                      {t("attraction.freeCancellationAvailable")}
                    </Typography>
                  </Stack>
                )}
              </Stack>

              <Stack
                className="right"
                sx={{
                  textAlign: { xs: "left", md: "right" },
                  alignItems: { xs: "flex-start", md: "flex-end" },
                  width: { xs: "100%", md: "auto" },
                }}
              >
                <Stack justifyContent={"space-between"} height={"100%"}>
                  <Stack>
                    <Typography className="bold-text">
                      {formatKoreanWon(
                        String(attraction.attractionAdultPrice ?? 0)
                      )}
                    </Typography>
                    <Typography className="small-text">
                      {t("attraction.includesTaxes")}
                    </Typography>
                    <Button
                      variant="outlined"
                      sx={{
                        mt: 2,
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleClick();
                      }}
                    >
                      <Stack
                        flexDirection={"row"}
                        gap={1}
                        alignItems={"center"}
                      >
                        <Typography
                          sx={{
                            textTransform: "capitalize",
                            fontSize: 16,
                            fontWeight: "bold",
                          }}
                        >
                          {t("attraction.seeAvailability")}
                        </Typography>
                        <NavigateNextIcon />
                      </Stack>
                    </Button>
                  </Stack>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default AttractionsListCard;
