import { Box, Button, Menu, MenuItem, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import HdrStrongIcon from "@mui/icons-material/HdrStrong";
import ReviewBar from "./ReviewBar";
import GuestReviewMenu from "./GuestReviewMenu";

const GuestReviews = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Stack className="container" mt={"50px !important"} gap={2}>
      <Typography className="bold-text">Guest reviews</Typography>
      <Stack flexDirection={"row"} gap={1} alignItems={"center"}>
        <Box
          sx={{
            backgroundColor: "primary.main",
            color: "secondary.contrastText",
            fontSize: 15,
            padding: 1,
            borderRadius: 1,
            fontWeight: 700,
          }}
        >
          8.9
        </Box>
        <Typography className="small-bold-text">Fabulous</Typography>
        <HdrStrongIcon />
        <Typography>1,309 reviews</Typography>
        <Button
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
          sx={{
            textTransform: "capitalize",
            color: "primary.main",
            textDecoration: "underline",
          }}
        >
          Read all reviews
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          slotProps={{}}
        >
          <MenuItem onClick={handleClose}>
            <GuestReviewMenu />
          </MenuItem>
        </Menu>
      </Stack>
      <Typography className="bold-text">Categories:</Typography>
      <Stack flexDirection={"row"} flexWrap={"wrap"} gap={3}>
        <ReviewBar label={"Staff"} value={8.0} />
        <ReviewBar label={"Facilities"} value={8.9} />
        <ReviewBar label={"Cleanliness"} value={9.2} />
        <ReviewBar label={"Comfort"} value={9.0} />
        <ReviewBar label={"Value for money"} value={9.1} />
        <ReviewBar label={"Location"} value={9.8} />
        <ReviewBar label={"Free WiFi"} value={9.9} />
      </Stack>
    </Stack>
  );
};

export default GuestReviews;
