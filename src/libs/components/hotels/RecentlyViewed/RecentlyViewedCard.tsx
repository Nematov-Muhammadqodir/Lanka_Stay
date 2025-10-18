import React from "react";
import { Stack, Typography } from "@mui/material";
import Image from "next/image";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

const RecentlyViewedCard = () => {
  return (
    <Stack width={200} height={"auto"}>
      <Image
        src={"/img/hotel.jpg"}
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
          L7 Haeundae by lotte hotels
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
          <Typography className="bold-text-medium">KRW 180.000</Typography>
        </Stack>
        <Stack
          flexDirection={"row"}
          gap={1}
          sx={{ backgroundColor: "secondary.main", p: 1, borderRadius: 3 }}
        >
          <RemoveRedEyeIcon />
          <Typography className="small-text">Last viewed: 12 Oct</Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default RecentlyViewedCard;
