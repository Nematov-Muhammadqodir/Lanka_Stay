import { Stack, Typography, CircularProgress } from "@mui/material";
import React from "react";
import AttractionsListCard from "./AttractionsCard";
import { useQuery } from "@apollo/client";
import { GET_ALL_ATTRACTIONS } from "@/apollo/user/query";
import { AttractionFilters } from "@/src/pages/attractions";

interface AttractionsListProps {
  filters: AttractionFilters;
}

const AttractionsList = ({ filters }: AttractionsListProps) => {
  const input: any = { page: 1, limit: 20 };
  if (filters.selectedType) input.attractionType = filters.selectedType;
  if (filters.sort) input.sort = filters.sort;
  if (filters.freeCancellation) input.freeCancellation = true;
  if (filters.priceMin != null) input.priceMin = filters.priceMin;
  if (filters.priceMax != null) input.priceMax = filters.priceMax;
  if (filters.attractionCountry) input.attractionCountry = filters.attractionCountry;

  const { data, loading } = useQuery(GET_ALL_ATTRACTIONS, {
    variables: { input },
  });

  const attractions = data?.getAllAttractions?.list ?? [];

  if (loading) {
    return (
      <Stack alignItems="center" py={4}>
        <CircularProgress />
      </Stack>
    );
  }

  if (attractions.length === 0) {
    return (
      <Stack alignItems="center" py={4}>
        <Typography color="text.secondary">
          No attractions found matching your filters
        </Typography>
      </Stack>
    );
  }

  return (
    <Stack gap={2}>
      {attractions.map((attraction: any) => (
        <AttractionsListCard key={attraction._id} attraction={attraction} />
      ))}
    </Stack>
  );
};

export default AttractionsList;
