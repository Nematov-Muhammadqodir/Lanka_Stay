import { Stack, Typography, Pagination } from "@mui/material";
import React, { useState } from "react";
import RecentlyViewedCard from "./RecentlyViewedCard";
import { GET_VISITED_PROPERTIES } from "@/apollo/user/query";
import { useQuery } from "@apollo/client";

const RecentlyViewed = () => {
  const { data, loading } = useQuery(GET_VISITED_PROPERTIES, {
    variables: {
      input: {
        page: 1,
        limit: 50, // get enough data then paginate on frontend
      },
    },
  });

  const visitedList = data?.getVisitedProperties?.list || [];

  const [page, setPage] = useState(1);
  const itemsPerPage = 4;

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const currentItems = visitedList.slice(startIndex, endIndex);
  const pageCount = Math.ceil(visitedList.length / itemsPerPage);

  const handleChange = (_event: any, value: number) => {
    setPage(value);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <Stack
      border={"1px solid"}
      p={2}
      borderRadius={3}
      gap={2}
      borderColor={"text.disabled"}
      height={"auto"}
    >
      <Typography className="bold-text">
        You've Recently Viewed Hotels
      </Typography>

      {/* Cards */}
      <Stack alignItems={"center"}>
        <Stack
          className="recentlyViewedHotelCardsContainer"
          sx={{
            flexDirection: "row",
            justifyContent: "flex-start",
            flexWrap: "wrap",
            height: "auto",
            gap: 5,
          }}
        >
          {currentItems.map((item: any, index: any) => (
            <RecentlyViewedCard key={index} item={item} />
          ))}
        </Stack>
      </Stack>

      {/* Pagination */}
      <Stack spacing={2} mt={2} alignItems="center">
        <Pagination
          count={pageCount}
          page={page}
          onChange={handleChange}
          color="primary"
          shape="rounded"
        />
      </Stack>
    </Stack>
  );
};

export default RecentlyViewed;
