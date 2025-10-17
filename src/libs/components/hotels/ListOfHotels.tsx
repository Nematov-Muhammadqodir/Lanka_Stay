import { Stack } from "@mui/material";
import React from "react";
import HotelsHeader from "./HotelsHeader";
import SmallInfo from "./SmallInfo";

const ListOfHotels = () => {
  return (
    <Stack>
      <HotelsHeader />
      <SmallInfo />
    </Stack>
  );
};

export default ListOfHotels;
