import { Stack, Typography } from "@mui/material";
import React from "react";

const HouseRulesHeader = () => {
  return (
    <Stack>
      <Typography className="bold-text">House rules</Typography>
      <Typography>
        The Grand Sumorum takes special requests - add in the next step!
      </Typography>
    </Stack>
  );
};

export default HouseRulesHeader;
