import { Stack, Pagination } from "@mui/material";
import React, { useState } from "react";
import ListCard from "./ListCard";

const HotelsList = ({ data }: { data: any[] }) => {
  const [page, setPage] = useState(1);
  const itemsPerPage = 12;
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = data.slice(startIndex, endIndex);
  const pageCount = Math.ceil(data.length / itemsPerPage);
  const handleChange = (_: any, value: number) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <Stack>
      <Stack gap={2}>
        {currentItems.map((item, i) => {
          return <ListCard key={i} item={item} />;
        })}
      </Stack>
      {pageCount > 1 && (
        <Stack spacing={2} mt={3} alignItems="center">
          <Pagination
            count={pageCount}
            page={page}
            onChange={handleChange}
            color="primary"
          />
        </Stack>
      )}
    </Stack>
  );
};

export default HotelsList;
