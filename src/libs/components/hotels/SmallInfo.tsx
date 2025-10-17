import { Stack, Typography } from "@mui/material";
import React from "react";

const SmallInfo = () => {
  return (
    <Stack
      border={"1px solid"}
      borderRadius={2}
      p={1}
      sx={{ backgroundColor: "secondary.main" }}
    >
      <Typography>
        Commission paid and other benefits may affect an accommodation's
        ranking.
      </Typography>
    </Stack>
  );
};

export default SmallInfo;
