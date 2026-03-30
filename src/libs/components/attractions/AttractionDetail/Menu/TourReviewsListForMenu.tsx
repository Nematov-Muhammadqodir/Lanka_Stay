import {
  Button,
  Menu,
  MenuItem,
  Pagination,
  Stack,
  Typography,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useState } from "react";
import GuestReviewItemMenu from "../../../HotelDetail/GuestReviewItemMenu";
import TourReviewItemForMenu from "./TourReviewItemForMenu";

const TourReviewListForMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Stack>
      <Stack>
        <TourReviewItemForMenu />
        <TourReviewItemForMenu />
        <TourReviewItemForMenu />
        <TourReviewItemForMenu />
      </Stack>
      <Stack
        mt={2}
        alignItems={"center"}
        border={"1px solid"}
        p={1}
        borderColor={"text.disabled"}
        borderRadius={3}
      >
        <Pagination count={10} variant="outlined" shape="rounded" />
      </Stack>
    </Stack>
  );
};

export default TourReviewListForMenu;
