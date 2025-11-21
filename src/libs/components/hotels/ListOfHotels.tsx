import { Stack } from "@mui/material";
import React, { useState } from "react";
import HotelsHeader from "./HotelsHeader";
import SmallInfo from "./SmallInfo";
import HotelsGrid from "./Grid/HotelsGrid";
import HotelsList from "./List/HotelsList";
import { PartnerProperty } from "../../types/partnerInput/partnerProperty";

export interface ListOfHotelsProps {
  data: any;
}

const ListOfHotels = ({ data }: ListOfHotelsProps) => {
  const [grid, setGrid] = useState(false);

  const dataa = data?.getAllAvailableProperties
    ? data.getAllAvailableProperties.map((item: any) => item)
    : []; // default to empty array
  return (
    <Stack gap={2}>
      <HotelsHeader grid={grid} setGrid={setGrid} />
      <SmallInfo />
      {grid ? <HotelsGrid data={dataa} /> : <HotelsList data={dataa} />}
    </Stack>
  );
};

export default ListOfHotels;
