import { Stack } from "@mui/material";
import React from "react";
import AttractionsFilter from "./AttractionsFilter";

const AttractionsContainer = () => {
  return (
    <Stack flexDirection={"row"} sx={{ justifyContent: "space-between" }}>
      <Stack width={300} mt={2}>
        <AttractionsFilter />
      </Stack>
      <Stack>Body</Stack>
    </Stack>
  );
};

export default AttractionsContainer;
