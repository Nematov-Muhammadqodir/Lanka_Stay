import { Stack, Typography } from "@mui/material";
import React from "react";
import Switch from "@mui/material/Switch";

const label = { inputProps: { "aria-label": "Switch demo" } };

const HotelsHeader = () => {
  return (
    <Stack
      width={"100%"}
      flexDirection={"row"}
      justifyContent={"space-between"}
      alignItems={"center"}
    >
      <Typography className="bold-text">Busan: 70 properies found</Typography>
      <Stack flexDirection={"row"} alignItems={"center"}>
        <Switch {...label} />
        <Typography>Grid</Typography>
      </Stack>
    </Stack>
  );
};

export default HotelsHeader;
