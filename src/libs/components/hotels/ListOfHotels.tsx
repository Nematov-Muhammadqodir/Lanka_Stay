import { Stack } from "@mui/material";
import React, { useState } from "react";
import HotelsHeader from "./HotelsHeader";
import SmallInfo from "./SmallInfo";
import HotelsGrid from "./Grid/HotelsGrid";
import HotelsList from "./List/HotelsList";

const ListOfHotels = () => {
  const [grid, setGrid] = useState(false);
  return (
    <Stack gap={2}>
      <HotelsHeader grid={grid} setGrid={setGrid} />
      <SmallInfo />
      {grid ? <HotelsGrid /> : <HotelsList />}
    </Stack>
  );
};

export default ListOfHotels;
