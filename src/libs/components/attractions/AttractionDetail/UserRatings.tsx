import { Box, Button, Drawer, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import HdrStrongIcon from "@mui/icons-material/HdrStrong";
import ReviewBar from "../../HotelDetail.tsx/ReviewBar";
import GuestReviewMenu from "../../HotelDetail.tsx/GuestReviewMenu";
import StarIcon from "@mui/icons-material/Star";
import TourReviewMenu from "./TourReviewMenu";
import AttractionsReviewBar from "../AttractionsReviewBar";

const UserRatings = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Stack className="container" mt={"50px !important"} gap={2} width={"100%"}>
      <Typography className="bold-text">Guest reviews</Typography>
      <Stack flexDirection={"row"} gap={1} alignItems={"center"}>
        <StarIcon sx={{ color: "#FEBB05" }} />
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
        <Drawer
          anchor="right"
          open={open}
          onClose={handleClose}
          PaperProps={{
            sx: {
              width: 900,
              borderTopLeftRadius: 20,
              borderBottomLeftRadius: 20,
              overflow: "hidden",
            },
          }}
        >
          <TourReviewMenu handleClose={handleClose} />
        </Drawer>
      </Stack>
      <Stack flexDirection={"row"} flexWrap={"wrap"} gap={3} width={"60%"}>
        <AttractionsReviewBar label={"Good value"} value={4.4} />
        <AttractionsReviewBar label={"Facilities"} value={4.5} />
        <AttractionsReviewBar label={"Quality of service"} value={4.5} />
        <AttractionsReviewBar label={"Ease of access"} value={4.6} />
      </Stack>
    </Stack>
  );
};

export default UserRatings;
