import { Box, Rating, Stack, Typography } from "@mui/material";
import React from "react";
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

const GridCard = ({ item }: { item: any }) => {
  const [value, setValue] = React.useState<number | null>(4);
  const filters = useSelector((state: RootState) => state.filters);
  const router = useRouter();
  const handleClick = () => {
    router.push(`/hotels/hotelDetail/id=${item._id}`); // 🔹 replace "1" with dynamic id later
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
      <Image
        src={
          item.propertyImages
            ? `${process.env.NEXT_PUBLIC_API_URL}/${item.propertyImages[0]}`
            : "/img/hotel.jpg"
        }
        alt="left-image"
        width={312}
        height={260}
        style={{
          objectFit: "cover",
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
        }}
      />
      <Box
        width={40}
        height={40}
        position={"absolute"}
        top={10}
        left={260}
        textAlign={"center"}
        pt={1}
        bgcolor={"secondary.contrastText"}
        borderRadius={"50%"}
      >
        <FavoriteIcon sx={{ color: "#D40F1D" }} />
      </Box>

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
                <Typography className="bold-text">8.3</Typography>
              </Stack>
              <Typography className="bold-text">Very good</Typography>
              <MoreHorizIcon />
              <Typography className="small-text">124 reviews</Typography>
            </Stack>
          </Stack>
          <Typography className="small-bold-text" color={"primary.main"}>
            Comfort 8.9
          </Typography>
          <Stack>
            <Typography className="small-bold-text" color={"primary.main"}>
              {item.propertyCity}, {item.propertyRegion}
            </Typography>
            <Typography className="small-text">7.7 km from centre</Typography>
          </Stack>
          <Stack flexDirection={"row"} gap={1}>
            <Typography className="small-bold-text">Metro access</Typography>
            <Typography className="small-text">Beach nearby</Typography>
          </Stack>
          <Stack flexDirection={"row"} gap={1}>
            <BeachAccessIcon />
            <Typography className="small-text">2.3 km from beach</Typography>
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
          <Stack flexDirection={"row"} gap={1} justifyContent={"flex-end"}>
            <Typography className="small-text">
              {" "}
              {Number(filters.endDate?.split("-")[2].split("T")[0]) -
                Number(filters.startDate?.split("-")[2].split("T")[0])}{" "}
              nights,
            </Typography>
            <Typography className="small-text">
              {item.propertyRooms[0].numberOfGuestsCanStay} adults
            </Typography>
          </Stack>
          <Stack alignItems={"flex-end"}>
            <Typography className="bold-text">
              {formatKoreanWon(item.propertyRooms[0].roomPricePerNight)}
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
