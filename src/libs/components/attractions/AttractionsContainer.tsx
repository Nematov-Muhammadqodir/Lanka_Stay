import { Stack } from "@mui/material";
import React from "react";
import AttractionsFilter from "./AttractionsFilter";
import AttractionSorting from "./AttractionsSorting";
import AttractionsList from "./AttractionsList";
import ThemeParksList from "./ThemeParks-Resorts/ThemeParksList";

const AttractionsContainer = () => {
  return (
    <Stack
      flexDirection={"row"}
      sx={{ justifyContent: "space-between" }}
      mt={2}
      mb={10}
    >
      <Stack width={400} mt={2}>
        <AttractionsFilter />
      </Stack>
      <Stack width={870} gap={2}>
        <AttractionSorting />
        <AttractionsList />
        <ThemeParksList />
      </Stack>
    </Stack>
  );
};

export default AttractionsContainer;
