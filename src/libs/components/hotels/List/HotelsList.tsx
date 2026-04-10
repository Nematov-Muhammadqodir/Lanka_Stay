import { Stack } from "@mui/material";
import React from "react";
import ListCard from "./ListCard";

const HotelsList = ({ data }: { data: any[] }) => {
  return (
    <Stack gap={2}>
      {data.map((item, i) => (
        <ListCard key={i} item={item} />
      ))}
    </Stack>
  );
};

export default HotelsList;
