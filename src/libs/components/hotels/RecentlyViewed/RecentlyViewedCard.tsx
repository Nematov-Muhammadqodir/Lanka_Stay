import React from "react";
import { Stack, Typography } from "@mui/material";
import Image from "next/image";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { formatKoreanWon } from "@/src/libs/handlers/priceHandler";
import { formatShortDate } from "@/src/libs/utils";
import { resolveImageUrl } from "@/src/libs/handlers/imageHandler";

interface RecentlyViewedCardProps {
  item: any;
}

const RecentlyViewedCard = ({ item }: RecentlyViewedCardProps) => {
  const firstRoom = item?.propertyRooms?.[0];
  const roomPrice = firstRoom?.roomPricePerNight
    ? Number(firstRoom.roomPricePerNight)
    : 0;

  const ratings = [
    item?.staffRating,
    item?.facilitiesRating,
    item?.cleanlessRating,
    item?.comfortRating,
    item?.valueOfMoneyRating,
    item?.locationRating,
    item?.freeWiFiRating,
  ].filter((r) => r != null && r > 0);

  const avgRating =
    ratings.length > 0
      ? (ratings.reduce((sum: number, val: number) => sum + val, 0) / ratings.length).toFixed(1)
      : "0";

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
    <Stack width={200} height={"auto"}>
      <Image
        src={
          item?.propertyImages[0]
            ? resolveImageUrl(item.propertyImages[0])
            : "/img/hotel.jpg"
        }
        alt="left-image"
        width={200}
        height={125}
        style={{
          objectFit: "cover",
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
        }}
      />
      <Stack
        p={1}
        gap={1}
        border={"1px solid"}
        borderColor={"text.disabled"}
        borderTop={"none"}
        sx={{ borderBottomLeftRadius: 12, borderBottomRightRadius: 12 }}
      >
        <Typography
          className="bold-text-medium"
          sx={{ textTransform: "uppercase" }}
        >
          {item.propertyName}
        </Typography>
        {Number(avgRating) > 0 && (
          <Stack
            flexDirection={"row"}
            alignItems={"center"}
            gap={1}
            width={"auto"}
          >
            <Stack
              border={"1px solid"}
              width={30}
              height={30}
              justifyContent={"center"}
              alignItems={"center"}
              borderRadius={1}
              sx={{ backgroundColor: "primary.main", color: "white" }}
            >
              <Typography className="small-bold-text">{avgRating}</Typography>
            </Stack>
            <Typography className="small-bold-text">{ratingLabel}</Typography>
          </Stack>
        )}
        <Stack flexDirection={"row"} alignItems={"center"}>
          <LocationOnIcon sx={{ fontSize: 16, color: "text.secondary" }} />
          <Typography className="small-text">
            {item?.propertyCity}, {item?.propertyCountry}
          </Typography>
        </Stack>
        <Stack alignItems={"flex-end"}>
          <Typography className="small-text">Starting from</Typography>
          <Typography className="bold-text-medium">
            {" "}
            {formatKoreanWon(String(roomPrice))}
          </Typography>
        </Stack>
        <Stack
          flexDirection={"row"}
          gap={1}
          sx={{ backgroundColor: "secondary.main", p: 1, borderRadius: 3 }}
        >
          <RemoveRedEyeIcon />
          <Typography className="small-text">
            Last viewed: {formatShortDate(item?.createdAt)}
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default RecentlyViewedCard;
