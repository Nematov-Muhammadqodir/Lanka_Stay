import { Button, Drawer, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import HdrStrongIcon from "@mui/icons-material/HdrStrong";
import StarIcon from "@mui/icons-material/Star";
import TourReviewMenu from "./TourReviewMenu";
import AttractionsReviewBar from "../AttractionsReviewBar";
import { Attraction } from "../../../types/attraction/attraction";

interface UserRatingsProps {
  attraction?: Attraction | null;
  comments?: any[];
}

const UserRatings = ({ attraction, comments }: UserRatingsProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const totalReviews = attraction?.totalReviews ?? 0;
  const avgRating = attraction?.averageRating ?? 0;

  const ratingLabel =
    avgRating >= 4.5
      ? "Superb"
      : avgRating >= 4
      ? "Fabulous"
      : avgRating >= 3.5
      ? "Very Good"
      : avgRating >= 3
      ? "Good"
      : "Pleasant";

  return (
    <Stack className="container" mt={"50px !important"} gap={2} width={"100%"}>
      <Typography className="bold-text">Guest reviews</Typography>
      <Stack flexDirection={"row"} gap={1} alignItems={"center"}>
        <StarIcon sx={{ color: "#FEBB05" }} />
        <Typography className="small-bold-text">{ratingLabel}</Typography>
        <HdrStrongIcon />
        <Typography>
          {totalReviews} {totalReviews === 1 ? "review" : "reviews"}
        </Typography>
        <Button
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
          <TourReviewMenu
            handleClose={handleClose}
            attraction={attraction}
          />
        </Drawer>
      </Stack>
      <Stack flexDirection={"row"} flexWrap={"wrap"} gap={3} width={"60%"}>
        <AttractionsReviewBar label={"Good value"} value={attraction?.valueRating ?? 0} />
        <AttractionsReviewBar label={"Facilities"} value={attraction?.facilitiesRating ?? 0} />
        <AttractionsReviewBar label={"Quality of service"} value={attraction?.qualityRating ?? 0} />
        <AttractionsReviewBar label={"Ease of access"} value={attraction?.accessRating ?? 0} />
      </Stack>
    </Stack>
  );
};

export default UserRatings;
