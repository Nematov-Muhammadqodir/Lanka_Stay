import {
  Button,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

export default function Filtering() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Stack
      className="container"
      width={"100%"}
      padding={2}
      spacing={2}
      sx={{
        backgroundColor: "secondary.main",
        marginTop: "100px !important",
        height: "117px",
        borderRadius: "42px",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingX: "40px",
      }}
    >
      <Stack>
        <Tooltip title="Account settings">
          <Button
            variant="contained"
            sx={{
              borderRadius: "12px",
              height: "60px",
              width: "211px",
              backgroundColor: "white",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)",
              "&:hover": {
                boxShadow: "0px 6px 14px rgba(0, 0, 0, 0.25)",
                backgroundColor: "#f9f9f9",
              },
              gap: "10px",
            }}
            onClick={handleClick}
          >
            <CalendarMonthIcon />
            <Typography
              fontSize={"12px"}
              textTransform={"capitalize"}
              letterSpacing={1}
            >
              Check Available
            </Typography>
          </Button>
        </Tooltip>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          //   onClick={handleClose}
          slotProps={{
            paper: {
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.5,
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                "&::before": {
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
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <MenuItem>
            <DateRange
              ranges={range}
              onChange={(item: any) => setRange([item.selection])}
            />
          </MenuItem>
        </Menu>
      </Stack>
      <Stack></Stack>
      <Stack></Stack>
    </Stack>
  );
}
