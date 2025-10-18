import { Box, Rating, Stack, Typography } from "@mui/material";
import React from "react";
import Image from "next/image";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

const GridCard = () => {
  const [value, setValue] = React.useState<number | null>(4);
  return (
    <Stack
      width={314}
      height={600}
      border={"1px solid"}
      borderColor={"text.disabled"}
      borderRadius={3}
      position={"relative"}
    >
      <Image
        src={"/img/hotel.jpg"}
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
              Hotel Noah
            </Typography>
            <Rating name="read-only" value={value} readOnly />
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
              Jung-gu, Busan
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
              Breakfast included
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
            <Typography className="small-text">9 nights,</Typography>
            <Typography className="small-text">2 adults</Typography>
          </Stack>
          <Stack alignItems={"flex-end"}>
            <Typography className="bold-text">KRW 828,820</Typography>
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
