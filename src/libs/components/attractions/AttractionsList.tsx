import { Stack, Typography, CircularProgress } from "@mui/material";
import React from "react";
import AttractionsListCard from "./AttractionsCard";
import { useQuery } from "@apollo/client";
import { GET_ALL_ATTRACTIONS } from "@/apollo/user/query";

const AttractionsList = () => {
  const { data, loading, error } = useQuery(GET_ALL_ATTRACTIONS, {
    variables: { input: { page: 1, limit: 20 } },
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
        <Typography color="text.secondary">No attractions found</Typography>
      </Stack>
    );
  }

  return (
    <Stack gap={2}>
      {attractions.map((attraction: any) => {
        return <AttractionsListCard key={attraction._id} attraction={attraction} />;
      })}
    </Stack>
  );
};

export default AttractionsList;
