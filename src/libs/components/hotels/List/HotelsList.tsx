import { Stack } from "@mui/material";
import React from "react";
import ListCard from "./ListCard";

const HotelsList = () => {
  const data = [1, 2, 3, 4];
  return (
    <Stack gap={2}>
      {data.map((item, i) => {
        return <ListCard key={i} />;
      })}
    </Stack>
  );
};

export default HotelsList;
