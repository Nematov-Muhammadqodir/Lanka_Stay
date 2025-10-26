import { Stack, Typography } from "@mui/material";
import React from "react";

const GeniusLoyalty = () => {
  return (
    <Stack
      p={2}
      border={"1px solid"}
      mt={4}
      borderRadius={2}
      borderColor={"text.disabled"}
    >
      <Stack borderBottom={"1px solid"} pb={2} borderColor={"text.disabled"}>
        <Typography className="bold-text-medium">
          This booking counts!
        </Typography>
        <Typography className="small-text">
          Stays, flights, rental cars, taxis and attractions - every booking you
          complete counts towards your progress in Genius.
        </Typography>
      </Stack>
      <Typography className="small-text" mt={1}>
        LankaStay.com's loyalty programme
      </Typography>
    </Stack>
  );
};

export default GeniusLoyalty;
