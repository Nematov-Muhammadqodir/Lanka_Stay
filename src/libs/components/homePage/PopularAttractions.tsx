import { useState } from "react";
import { Pagination, Stack, Typography } from "@mui/material";
import PopularAttractionCard from "./PopularAttractionCard";

const PopularAttractions = () => {
  const data = Array.from({ length: 7 }, (_, i) => i + 1);
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;
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
      className="container"
      sx={{ mt: "50px !important", mb: "50px !important", overflow: "hidden" }}
    >
      <Stack>
        <Typography sx={{ fontSize: 24, fontWeight: 700 }}>
          Popular attractions in South Korea
        </Typography>
        <Typography sx={{ fontSize: 16, fontWeight: 500 }}>
          Experience everything this city has to offer
        </Typography>
      </Stack>
      <Stack
        sx={{
          flexDirection: "row",
          gap: 1,
          mt: 2,
          justifyContent: "start",
        }}
      >
        {currentItems.map((item, index) => (
          <PopularAttractionCard key={index} />
        ))}
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

export default PopularAttractions;
