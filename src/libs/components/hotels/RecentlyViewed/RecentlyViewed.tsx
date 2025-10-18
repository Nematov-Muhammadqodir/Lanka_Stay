import { Stack, Typography, Pagination } from "@mui/material";
import React, { useState } from "react";
import RecentlyViewedCard from "./RecentlyViewedCard";

const RecentlyViewed = () => {
  const data = Array.from({ length: 7 }, (_, i) => i + 1);
  const [page, setPage] = useState(1);
  const itemsPerPage = 4;
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = data.slice(startIndex, endIndex);
  const pageCount = Math.ceil(data.length / itemsPerPage);
  const handleChange = (event: any, value: any) => {
    setPage(value);
    console.log("value", value);
  };
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
        You've recently viewed Hotels
      </Typography>
      <Stack alignItems={"center"}>
        <Stack
          className="recentlyViewedHotelCardsContainer"
          sx={{
            flexDirection: "row",
            justifyContent: "flex-start",
            height: "auto",
            gap: 5,
          }}
        >
          {currentItems.map((item, index) => {
            return <RecentlyViewedCard key={index} />;
          })}
        </Stack>
      </Stack>
      <Stack spacing={2} mt={2} alignItems="center">
        <Pagination
          count={pageCount}
          page={page}
          onChange={handleChange}
          color="primary"
        />
      </Stack>
    </Stack>
  );
};

export default RecentlyViewed;
