import { Box, Button, IconButton, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import Image from "next/image";
import Rating from "@mui/material/Rating";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useRouter } from "next/router";
import { RootState } from "@/store";
import { useSelector } from "react-redux";
import { formatKoreanWon } from "@/src/libs/handlers/priceHandler";
import { useMutation, useReactiveVar } from "@apollo/client";
import { LIKE_TARGET_PROPERTY } from "@/apollo/user/mutation";
import { userVar } from "@/apollo/store";
import { sweetMixinErrorAlert } from "@/src/libs/sweetAlert";
import { resolveImageUrl } from "@/src/libs/handlers/imageHandler";

const ListCard = ({ item }: { item: any }) => {
  const filters = useSelector((state: RootState) => state.filters);
  const router = useRouter();
  const user = useReactiveVar(userVar);
  const [likeProperty] = useMutation(LIKE_TARGET_PROPERTY);
  const [liked, setLiked] = useState(
    item?.meLiked?.[0]?.myFavorite ?? false
  );

  const handleClick = () => {
    router.push(`/hotels/hotelDetail/${item._id}`);
  };

  const handleLike = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!user?._id) {
      await sweetMixinErrorAlert("Please login first");
      return;
    }
    try {
      await likeProperty({ variables: { input: item._id } });
      setLiked(!liked);
    } catch (err: any) {
      console.error("Like error:", err);
    }
  };

  return (
    <Stack
      p={1}
      px={1.5}
      height={275}
      width={"100%"}
      border={"1px solid"}
      borderColor={"text.disabled"}
      borderRadius={3}
      justifyContent={"center"}
      onClick={handleClick}
      sx={{
        transition: "all 0.3s ease",
        cursor: "pointer",
        "&:hover": {
          transform: "scale(1.02)",
          boxShadow: "0 6px 18px rgba(0, 0, 0, 0.15)",
          borderColor: "primary.main",
        },
      }}
    >
      <Stack flexDirection={"row"} gap={2} position={"relative"}>
        <Image
          src={
            item.propertyImages?.[0]
              ? resolveImageUrl(item.propertyImages[0])
              : "/img/hotel.jpg"
          }
          alt="left-image"
          width={298}
          height={238}
          style={{ objectFit: "cover", borderRadius: 10, flexShrink: 0 }}
        />
        <IconButton
          onClick={handleLike}
          sx={{
            position: "absolute",
            top: 10,
            left: 245,
            backgroundColor: "rgba(255,255,255,0.9)",
            "&:hover": { backgroundColor: "white" },
            width: 40,
            height: 40,
          }}
        >
          {liked ? (
            <FavoriteIcon sx={{ color: "#D40F1D" }} />
          ) : (
            <FavoriteBorderIcon sx={{ color: "#D40F1D" }} />
          )}
        </IconButton>
        <Stack
          flexDirection={"row"}
          justifyContent={"space-between"}
          width={"100%"}
        >
          <Stack className="middle" gap={1}>
            <Stack flexDirection={"row"} gap={1}>
              <Typography className="bold-text" color={"primary.main"}>
                {item.propertyName}
              </Typography>
              <Rating name="read-only" value={item.propertyStars} readOnly />
            </Stack>
            <Stack flexDirection={"row"} gap={1}>
              <Typography className="small-bold-text" color={"primary.main"}>
                {item.propertyCity}, {item.propertyRegion}
              </Typography>
            </Stack>
            <Stack flexDirection={"row"} gap={1}>
              <BeachAccessIcon />
              <Typography className="small-text">
                {item.propertyCountry}
              </Typography>
            </Stack>
            <Stack flexDirection={"row"} gap={1} color={"primary.main"}>
              <RestaurantIcon />
              <Typography className="small-bold-text">
                Breakfast {item.breakfastIncluded ? "" : "not"} included
              </Typography>
            </Stack>
          </Stack>
          <Stack className="right" textAlign={"right"}>
            <Stack justifyContent={"space-between"} height={"100%"}>
              <Stack>
                <Stack
                  flexDirection={"row"}
                  alignItems={"center"}
                  gap={1}
                  justifyContent={"end"}
                >
                  <Stack>
                    <Typography className="bold-text">
                      {item.totalReviews > 0 ? "Very good" : "New"}
                    </Typography>
                    <Typography className="small-text">
                      {item.totalReviews ?? 0} reviews
                    </Typography>
                  </Stack>
                  <Stack
                    border={"1px solid"}
                    width={40}
                    height={40}
                    justifyContent={"center"}
                    alignItems={"center"}
                    borderRadius={1}
                    sx={{ backgroundColor: "primary.main", color: "white" }}
                  >
                    <Typography className="bold-text">
                      {item.totalReviews > 0
                        ? (item.staffRating ?? 0).toFixed(1)
                        : "-"}
                    </Typography>
                  </Stack>
                </Stack>
              </Stack>
              <Stack>
                <Typography className="bold-text">
                  {item.propertyRooms?.[0]
                    ? formatKoreanWon(item.propertyRooms[0].roomPricePerNight)
                    : "N/A"}
                </Typography>
                <Typography className="small-text">
                  Includes taxes and charges
                </Typography>
                <Button
                  variant="contained"
                  sx={{ mt: 2 }}
                  onClick={handleClick}
                >
                  <Stack flexDirection={"row"} gap={1} alignItems={"center"}>
                    <Typography
                      sx={{
                        textTransform: "capitalize",
                        fontSize: 16,
                        fontWeight: "bold",
                        color: "secondary.contrastText",
                      }}
                    >
                      See Availability
                    </Typography>
                    <NavigateNextIcon
                      sx={{ color: "secondary.contrastText" }}
                    />
                  </Stack>
                </Button>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default ListCard;
