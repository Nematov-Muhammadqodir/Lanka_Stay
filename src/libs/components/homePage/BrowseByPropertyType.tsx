import { CircularProgress, Stack, Typography } from "@mui/material";
import React from "react";
import BrowseByPropertyTypeCard from "./BrowseByPropertyTypeCard";
import { useQuery } from "@apollo/client";
import { GET_PROPERTY_TYPE_STATS } from "@/apollo/user/query";

const BrowseByPropertyType = () => {
  const { data, loading } = useQuery(GET_PROPERTY_TYPE_STATS);
  const types = data?.getPropertyTypeStats ?? [];

  return (
    <Stack
      className="container"
      sx={{ mt: "50px !important", mb: "50px !important" }}
    >
      <Stack>
        <Typography sx={{ fontSize: 24, fontWeight: 700 }}>
          Browse by property type
        </Typography>
        <Typography fontSize={14} color="text.secondary" mt={0.5}>
          Find the perfect stay for your next trip
        </Typography>
      </Stack>

      {loading ? (
        <Stack alignItems="center" py={4}>
          <CircularProgress size={30} />
        </Stack>
      ) : types.length === 0 ? (
        <Stack alignItems="center" py={4}>
          <Typography color="text.secondary">
            No property types available yet
          </Typography>
        </Stack>
      ) : (
        <Stack
          sx={{
            flexDirection: "row",
            gap: 2,
            mt: 2,
            justifyContent: "start",
            overflowX: "auto",
            pb: 1,
          }}
        >
          {types.map((type: any) => (
            <BrowseByPropertyTypeCard key={type.propertyType} type={type} />
          ))}
        </Stack>
      )}
    </Stack>
  );
};

export default BrowseByPropertyType;
