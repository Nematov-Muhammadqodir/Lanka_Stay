import { Box, IconButton, Rating, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import Image from "next/image";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { formatKoreanWon } from "@/src/libs/handlers/priceHandler";
import { useMutation, useReactiveVar } from "@apollo/client";
import { LIKE_TARGET_PROPERTY } from "@/apollo/user/mutation";
import { userVar } from "@/apollo/store";
import { sweetMixinErrorAlert } from "@/src/libs/sweetAlert";

const GridCard = ({ item }: { item: any }) => {
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
      width={314}
      height={620}
      border={"1px solid"}
      borderColor={"text.disabled"}
      borderRadius={3}
      position={"relative"}
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
      <Box
        sx={{
          width: "100%",
          height: 260,
          position: "relative",
          flexShrink: 0,
        }}
      >
        <Image
          src={
            item.propertyImages?.[0]
              ? `${process.env.NEXT_PUBLIC_API_URL}/${item.propertyImages[0]}`
              : "/img/hotel.jpg"
          }
          alt="left-image"
          fill
          style={{
            objectFit: "cover",
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
          }}
        />
      </Box>

      <IconButton
        onClick={handleLike}
        sx={{
          position: "absolute",
          top: 10,
          right: 10,
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

      <Stack height={"100%"} justifyContent={"space-between"}>
        <Stack p={2} gap={0.5}>
          <Stack
            flexDirection={"row"}
            gap={1}
            alignItems={"center"}
            flexWrap={"wrap"}
          >
            <Typography className="bold-text" color={"primary.main"}>
              {item.propertyName}
            </Typography>
            <Rating name="read-only" value={item.propertyStars} readOnly />
          </Stack>
          <Stack flexDirection={"row"} gap={1} alignItems={"center"}>
            <Stack
              flexDirection={"row"}
              alignItems={"center"}
              gap={1}
              justifyContent={"end"}
            >
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
                  {item.totalReviews > 0 ? (item.staffRating ?? 0).toFixed(1) : "-"}
                </Typography>
              </Stack>
              <Typography className="bold-text">
                {item.totalReviews > 0 ? "Very good" : "New"}
              </Typography>
              <MoreHorizIcon />
              <Typography className="small-text">
                {item.totalReviews ?? 0} reviews
              </Typography>
            </Stack>
          </Stack>
          <Stack>
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
        <Box
          border={"1px solid"}
          width={"100%"}
          borderColor={"secondary.main"}
        ></Box>
        <Stack p={2}>
          <Stack alignItems={"flex-end"}>
            <Typography className="bold-text">
              {item.propertyRooms?.[0]
                ? formatKoreanWon(item.propertyRooms[0].roomPricePerNight)
                : "Price unavailable"}
            </Typography>
            <Typography className="small-text">
              Includes taxes and charges
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default GridCard;
