import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import Image from "next/image";

const ThemeParksCard = () => {
  return (
    <Stack
      width={220}
      height={280}
      sx={{ border: "1px solid", borderRadius: 3, position: "relative" }}
    >
      <Image
        src={"/img/attractions/shrek.jpg"}
        alt="left-image"
        width={218}
        height={280}
        style={{ objectFit: "cover", borderRadius: 10 }}
      />
      {/* Bottom Gradient Overlay */}
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          height: "50%", // covers only bottom half
          background:
            "linear-gradient(to top, rgba(0, 0, 0, 0.7), rgba(0,0,0,0))",
          borderRadius: 3,
        }}
      />
      <Stack
        position={"absolute"}
        top={140}
        sx={{ color: "secondary.contrastText", width: "90%", p: 1, gap: 1 }}
      >
        <Typography className="bold-text">
          Admission to Shrek's Adventure! Busan
        </Typography>
        <Stack flexDirection={"row"} gap={1} alignItems={"center"}>
          <Typography className="small-text">From</Typography>
          <Typography className="bold-text">KRW 40,106</Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default ThemeParksCard;
