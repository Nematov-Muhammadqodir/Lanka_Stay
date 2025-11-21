import { Stack, Pagination } from "@mui/material";
import React, { useState } from "react";
import ListCard from "./ListCard";

const HotelsList = ({ data }: { data: any[] }) => {
  const [page, setPage] = useState(1);
  const itemsPerPage = 7;
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = data.slice(startIndex, endIndex);
  const pageCount = Math.ceil(data.length / itemsPerPage);
  const handleChange = (event: any, value: any) => {
    setPage(value);
    console.log("value", value);
  };
  return (
    <Stack>
      <Stack gap={2}>
        {currentItems.map((item, i) => {
          return <ListCard key={i} />;
        })}
      </Stack>
      <Stack spacing={2} mt={3} alignItems="center">
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

export default HotelsList;
