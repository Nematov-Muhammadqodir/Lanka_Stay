import { Stack } from "@mui/material";
import React from "react";
import GridCard from "./GridCard";

const HotelsGrid = ({ data }: { data: any[] }) => {
  return (
    <Stack
      flexDirection={"row"}
      gap={2}
      flexWrap={"wrap"}
      justifyContent={"space-between"}
    >
      {data.map((item: any, i) => (
        <GridCard key={i} item={item} />
      ))}
    </Stack>
  );
};

export default HotelsGrid;
