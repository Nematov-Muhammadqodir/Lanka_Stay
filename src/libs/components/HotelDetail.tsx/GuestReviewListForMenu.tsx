import { Button, Menu, MenuItem, Stack, Typography } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useState } from "react";
import GuestReviewItemMenu from "./GuestReviewItemMenu";

const GuestReviewListForMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Stack mt={2}>
      <Stack
        flexDirection={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Typography sx={{ fontWeight: 700, fontSize: 20 }}>
          Guest reviews
        </Typography>
        <Stack flexDirection={"row"} gap={1} alignItems={"center"}>
          <Typography className="small-bold-text">Sort reviews by:</Typography>
          <Button
            variant="outlined"
            sx={{ borderColor: "text.primary" }}
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <Stack flexDirection={"row"} gap={1}>
              <Typography textTransform={"capitalize"}>
                Most Relevant
              </Typography>
              <KeyboardArrowDownIcon />
            </Stack>
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            slotProps={{
              paper: {
                elevation: 0,
                sx: {
                  overflow: "visible",
                  mt: 1.5,
                  borderRadius: 1,
                  border: "1px solid #ddd",
                  boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
                  "& .MuiMenuItem-root": {
                    fontSize: 14,
                    color: "#333",
                    "&:hover": {
                      backgroundColor: "#f5f5f5",
                    },
                  },
                  "&:before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              },
            }}
          >
            <MenuItem onClick={handleClose}>Newest first</MenuItem>
            <MenuItem onClick={handleClose}>Oldest first</MenuItem>
            <MenuItem onClick={handleClose}>Highest scores</MenuItem>
            <MenuItem onClick={handleClose}>Lower scores</MenuItem>
          </Menu>
        </Stack>
      </Stack>
      <Stack>
        <GuestReviewItemMenu />
        <GuestReviewItemMenu />
        <GuestReviewItemMenu />
        <GuestReviewItemMenu />
      </Stack>
    </Stack>
  );
};

export default GuestReviewListForMenu;
