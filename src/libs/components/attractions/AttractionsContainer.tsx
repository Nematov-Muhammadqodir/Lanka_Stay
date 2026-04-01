import { Stack } from "@mui/material";
import React from "react";
import AttractionsFilter from "./AttractionsFilter";
import AttractionSorting from "./AttractionsSorting";
import AttractionsList from "./AttractionsList";
import ThemeParksList from "./ThemeParks-Resorts/ThemeParksList";

interface AttractionsContainerProps {
  selectedType: string | null;
  sort: string | null;
  onSortChange: (sort: string | null) => void;
}

const AttractionsContainer = ({
  selectedType,
  sort,
  onSortChange,
}: AttractionsContainerProps) => {
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
        <AttractionSorting sort={sort} onSortChange={onSortChange} />
        <AttractionsList selectedType={selectedType} sort={sort} />
        <ThemeParksList />
      </Stack>
    </Stack>
  );
};

export default AttractionsContainer;
