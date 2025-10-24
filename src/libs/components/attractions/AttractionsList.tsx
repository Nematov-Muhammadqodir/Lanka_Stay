import { Stack } from "@mui/material";
import React from "react";
import AttractionsListCard from "./AttractionsCard";

const AttractionsList = () => {
  const data = [1, 2, 3, 4, 5];
  return (
    <Stack gap={2}>
      {data.map((item, index) => {
        return <AttractionsListCard />;
      })}
    </Stack>
  );
};

export default AttractionsList;
