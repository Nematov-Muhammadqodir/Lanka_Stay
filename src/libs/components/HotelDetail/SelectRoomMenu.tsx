import { Box, Button, Menu, MenuItem, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const SelectRoomMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Stack width={65} alignItems={"center"}>
      <Box border={"1px solid"} borderColor={"secondary"} borderRadius={1}>
        <Button sx={{ height: 10 }} onClick={handleClick}>
          <Stack flexDirection={"row"}>
            <Typography>0</Typography>
            <ArrowDropDownIcon />
          </Stack>
        </Button>
      </Box>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <MenuItem onClick={handleClose}>
          <Stack
            flexDirection={"row"}
            width={180}
            justifyContent={"space-between"}
          >
            <Typography>1</Typography>
            <Typography>KRW (153,000)</Typography>
          </Stack>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Stack
            flexDirection={"row"}
            width={180}
            justifyContent={"space-between"}
          >
            <Typography>2</Typography> <Typography>KRW (303,000)</Typography>
          </Stack>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Stack
            flexDirection={"row"}
            width={180}
            justifyContent={"space-between"}
          >
            <Typography>3</Typography>
            <Typography>KRW (453,000)</Typography>
          </Stack>
        </MenuItem>
      </Menu>
    </Stack>
  );
};

export default SelectRoomMenu;
