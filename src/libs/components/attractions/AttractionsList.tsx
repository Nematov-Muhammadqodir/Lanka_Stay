import { Stack, Typography, CircularProgress } from "@mui/material";
import React from "react";
import AttractionsListCard from "./AttractionsCard";
import { useQuery } from "@apollo/client";
import { GET_ALL_ATTRACTIONS } from "@/apollo/user/query";

interface AttractionsListProps {
  selectedType: string | null;
  sort: string | null;
}

const AttractionsList = ({ selectedType, sort }: AttractionsListProps) => {
  const input: any = { page: 1, limit: 20 };
  if (selectedType) {
    input.attractionType = selectedType;
  }
  if (sort) {
    input.sort = sort;
  }

  const { data, loading, error } = useQuery(GET_ALL_ATTRACTIONS, {
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

  if (error) {
    return (
      <Stack alignItems="center" py={4}>
        <Typography color="error">Failed to load attractions</Typography>
      </Stack>
    );
  }

  if (attractions.length === 0) {
    return (
      <Stack alignItems="center" py={4}>
        <Typography color="text.secondary">
          {selectedType
            ? "No attractions found for this type"
            : "No attractions found"}
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
