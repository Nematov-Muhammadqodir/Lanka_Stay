import { Stack } from "@mui/material";
import React from "react";
import AttractionsFilter from "./AttractionsFilter";
import AttractionSorting from "./AttractionsSorting";
import AttractionsList from "./AttractionsList";
import ThemeParksList from "./ThemeParks-Resorts/ThemeParksList";
import { AttractionFilters } from "@/src/pages/attractions";

interface AttractionsContainerProps {
  filters: AttractionFilters;
  updateFilter: (key: keyof AttractionFilters, value: any) => void;
}

const AttractionsContainer = ({
  filters,
  updateFilter,
}: AttractionsContainerProps) => {
  return (
    <Stack
      sx={{
        flexDirection: { xs: "column", md: "row" },
        justifyContent: "space-between",
        gap: { xs: 2, md: 0 },
        mt: 2,
        mb: 10,
      }}
    >
      <Stack sx={{ width: { xs: "100%", md: 400 }, mt: { xs: 0, md: 2 } }}>
        <AttractionsFilter filters={filters} updateFilter={updateFilter} />
      </Stack>
      <Stack sx={{ width: { xs: "100%", md: 870 }, gap: 2 }}>
        <AttractionSorting
          sort={filters.sort}
          onSortChange={(val) => updateFilter("sort", val)}
        />
        <AttractionsList filters={filters} />
        <ThemeParksList />
      </Stack>
    </Stack>
  );
};

export default AttractionsContainer;
