import React from "react";
import { Stack, Typography } from "@mui/material";
import Image from "next/image";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { formatKoreanWon } from "@/src/libs/handlers/priceHandler";
import { GET_PARTNER_PROPERTY } from "@/apollo/user/query";
import { useQuery } from "@apollo/client";
import { formatShortDate } from "@/src/libs/utils";

interface RecentlyViewedCardProps {
  item: any;
}

const RecentlyViewedCard = ({ item }: RecentlyViewedCardProps) => {
  const firstRoom = item?.propertyRooms?.[0];
  const roomPrice = firstRoom?.roomPricePerNight
    ? Number(firstRoom.roomPricePerNight)
    : 0;
  return (
    <Stack width={200} height={"auto"}>
      <Image
        src={
          item?.propertyImages[0]
            ? `${process.env.NEXT_PUBLIC_API_URL}/${item.propertyImages[0]}`
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
            <Typography className="small-bold-text">8.3</Typography>
          </Stack>
          <Typography className="small-bold-text">Very good</Typography>
        </Stack>
        <Stack flexDirection={"row"} alignItems={"center"}>
          <LocationOnIcon />
          <Typography className="small-text">8.9 km from the centre</Typography>
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
