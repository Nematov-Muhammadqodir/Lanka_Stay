import { Stack, Typography } from "@mui/material";
import React from "react";
import ThemeParksCard from "./ThemeParksCard";
import AttractionsIcon from "@mui/icons-material/Attractions";

const ThemeParksList = () => {
  const data = [1, 2, 3];
  return (
    <Stack alignItems={"center"} mt={5} gap={1}>
      <Stack
        alignSelf={"flex-start"}
        flexDirection={"row"}
        alignItems={"center"}
        pl={3}
        gap={1}
      >
        <AttractionsIcon sx={{ fontSize: 30 }} />
        <Typography className="xxlText">Theme parks and resorts</Typography>
      </Stack>
      <Stack flexDirection={"row"} justifyContent={"space-between"} width={800}>
        {data.map((item, index) => {
          return <ThemeParksCard key={index} />;
        })}
      </Stack>
    </Stack>
  );
};

export default ThemeParksList;
