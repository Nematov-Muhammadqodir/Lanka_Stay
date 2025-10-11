import { Pagination, Stack, Typography } from "@mui/material";
import React from "react";
import StillInterestedCard from "./StillInterestedCard";

const StillInterestedList = () => {
  const data = Array.from({ length: 24 }, (_, i) => i + 1);

  // Pagination states
  const [page, setPage] = React.useState(1);
  const itemsPerPage = 4;

  // Calculate which items to show for current page
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = data.slice(startIndex, endIndex);

  // Total pages
  const pageCount = Math.ceil(data.length / itemsPerPage);

  const handleChange = (event: any, value: any) => {
    setPage(value);
    console.log("value", value);
  };
  return (
    <Stack
      className="container"
      sx={{ mt: "50px !important", mb: "50px !important" }}
    >
      <Stack>
        <Typography sx={{ fontSize: 24, fontWeight: 700 }}>
          Still interested in these properties?
        </Typography>
      </Stack>
      <Stack
        sx={{
          flexDirection: "row",
          flexWrap: "wrap",
          gap: 2,
          mt: 2,
          justifyContent: "start",
        }}
      >
        {currentItems.map((item, index) => (
          <StillInterestedCard key={index} />
        ))}
      </Stack>
      <Stack spacing={2} mt={2} alignItems="center">
        <Pagination
          count={pageCount}
          page={page}
          onChange={handleChange}
          color="secondary"
        />
      </Stack>
    </Stack>
  );
};

export default StillInterestedList;
