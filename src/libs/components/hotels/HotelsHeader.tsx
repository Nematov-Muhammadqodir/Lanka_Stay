import { Stack, Typography } from "@mui/material";
import React from "react";
import Switch from "@mui/material/Switch";

const label = { inputProps: { "aria-label": "Switch demo" } };

interface HotelsHeaderProps {
  grid: boolean;
  setGrid: React.Dispatch<React.SetStateAction<boolean>>;
}

const HotelsHeader = ({ grid, setGrid }: HotelsHeaderProps) => {
  const handleToggle = () => setGrid((prev) => !prev);
  return (
    <Stack
      width={"100%"}
      flexDirection={"row"}
      justifyContent={"space-between"}
      alignItems={"center"}
    >
      <Typography className="bold-text">Busan: 70 properies found</Typography>
      <Stack flexDirection={"row"} alignItems={"center"}>
        <Switch {...label} checked={grid} onChange={handleToggle} />
        <Typography>Grid</Typography>
      </Stack>
    </Stack>
  );
};

export default HotelsHeader;
