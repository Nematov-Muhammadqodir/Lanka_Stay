import { Stack } from "@mui/material";
import React from "react";
import GridCard from "./GridCard";

const HotelsGrid = () => {
  const data = [1, 2, 3, 4, 5];
  return (
    <Stack
      flexDirection={"row"}
      gap={2}
      flexWrap={"wrap"}
      justifyContent={"space-between"}
    >
      {data.map((item, i) => {
        return <GridCard key={i} />;
      })}
    </Stack>
  );
};

export default HotelsGrid;
