import { Pagination, Stack, Typography } from "@mui/material";
import React from "react";
import AttractionsReviewCard from "./Menu/AttractionsReviewCard";

const AttractionsReviewsList = () => {
  const data = [1, 2];

  return (
    <Stack mt={5} gap={1}>
      <Stack>
        <Typography className="bold-text">What guests loved most</Typography>
      </Stack>
      <Stack flexDirection={"row"} flexWrap={"wrap"} gap={2}>
        {data.map((item, index) => {
          return <AttractionsReviewCard />;
        })}
      </Stack>
      <Stack alignItems={"center"} mt={2}>
        <Pagination count={10} variant="outlined" />
      </Stack>
    </Stack>
  );
};

export default AttractionsReviewsList;
