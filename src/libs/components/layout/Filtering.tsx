import {
  Button,
  IconButton,
  Input,
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
import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import PinDropIcon from "@mui/icons-material/PinDrop";
import WhereToVoteIcon from "@mui/icons-material/WhereToVote";
import SearchIcon from "@mui/icons-material/Search";

export default function Filtering() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [anchorElPerson, setAnchorElPerson] = useState<null | HTMLElement>(
    null
  );
  const [anchorElLocation, setAnchorElLocation] = useState<null | HTMLElement>(
    null
  );
  const open = Boolean(anchorEl);
  const openPerson = Boolean(anchorElPerson);
  const openLocation = Boolean(anchorElLocation);
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
  const handlePersonClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElPerson(event.currentTarget);
  };
  const handleLocationClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElLocation(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handlePersonClose = () => {
    setAnchorElPerson(null);
  };
  const handleLocationClose = () => {
    setAnchorElLocation(null);
  };
  return (
    <Stack
      className="container"
      width={"100%"}
      sx={{
        backgroundColor: "secondary.main",
        marginTop: "100px !important",
        height: "117px",
        borderRadius: "42px",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingX: "40px",
        boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.25)",
      }}
    >
      <Stack>
        <Tooltip title="Check Available Days">
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
              color: "black",
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
      <Stack>
        <Tooltip title="Select Amount of People">
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
              color: "black",
            }}
            onClick={handlePersonClick}
          >
            <EmojiPeopleIcon />
            <Typography
              fontSize={"12px"}
              textTransform={"capitalize"}
              letterSpacing={1}
            >
              Person 2
            </Typography>
            <KeyboardArrowDownIcon />
          </Button>
        </Tooltip>
        <Menu
          anchorEl={anchorElPerson}
          id="account-menu"
          open={openPerson}
          onClose={handlePersonClose}
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
            <Stack gap={2}>
              <Stack
                flexDirection={"row"}
                justifyContent={"space-between"}
                width={350}
                alignItems={"center"}
                height={30}
                paddingY={"30px"}
                paddingX={"20px"}
              >
                <Typography sx={{ fontWeight: 700 }}>Adults</Typography>
                <Stack
                  flexDirection={"row"}
                  alignItems={"center"}
                  width={100}
                  justifyContent={"space-between"}
                  sx={{
                    border: "1px solid",
                    borderColor: "grey.300",
                    borderRadius: 2,
                    paddingX: 1,
                  }}
                >
                  <Button>
                    <RemoveIcon />
                  </Button>
                  <Typography>2</Typography>
                  <Button>
                    <AddIcon />
                  </Button>
                </Stack>
              </Stack>
              <Stack
                flexDirection={"row"}
                justifyContent={"space-between"}
                width={350}
                alignItems={"center"}
                height={30}
                paddingY={"30px"}
                paddingX={"20px"}
              >
                <Typography sx={{ fontWeight: 700 }}>Children</Typography>
                <Stack
                  flexDirection={"row"}
                  alignItems={"center"}
                  width={100}
                  justifyContent={"space-between"}
                  sx={{
                    border: "1px solid",
                    borderColor: "grey.300",
                    borderRadius: 2,
                    paddingX: 1,
                  }}
                >
                  <Button>
                    <RemoveIcon />
                  </Button>
                  <Typography>2</Typography>
                  <Button>
                    <AddIcon />
                  </Button>
                </Stack>
              </Stack>
              <Stack
                flexDirection={"row"}
                justifyContent={"space-between"}
                width={350}
                alignItems={"center"}
                height={30}
                paddingY={"30px"}
                paddingX={"20px"}
              >
                <Typography sx={{ fontWeight: 700 }}>Rooms</Typography>
                <Stack
                  flexDirection={"row"}
                  alignItems={"center"}
                  width={100}
                  justifyContent={"space-between"}
                  sx={{
                    border: "1px solid",
                    borderColor: "grey.300",
                    borderRadius: 2,
                    paddingX: 1,
                  }}
                >
                  <Button>
                    <RemoveIcon />
                  </Button>
                  <Typography>2</Typography>
                  <Button>
                    <AddIcon />
                  </Button>
                </Stack>
              </Stack>
            </Stack>
          </MenuItem>
        </Menu>
      </Stack>
      <Stack>
        <Tooltip title="Select Amount of People">
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
              color: "black",
            }}
            onClick={handleLocationClick}
          >
            <PinDropIcon />
            <Typography
              fontSize={"12px"}
              textTransform={"capitalize"}
              letterSpacing={1}
            >
              Location
            </Typography>
          </Button>
        </Tooltip>
        <Menu
          anchorEl={anchorElLocation}
          id="account-menu"
          open={openLocation}
          onClose={handleLocationClose}
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
            <Stack gap={2} width={431} height={"auto"}>
              <Stack marginBottom={1}>
                <Input placeholder="Search for location!" />
              </Stack>
              <Stack>
                <Typography sx={{ fontWeight: "bold", color: "text.primary" }}>
                  Trending Destinations
                </Typography>
              </Stack>
              <Stack gap={2} alignItems={"center"}>
                <Button
                  onClick={(event) => {
                    event.stopPropagation();
                    console.log("Busan clicked!");
                  }}
                  sx={{
                    gap: 1,
                    textTransform: "capitalize",
                    borderBottom: 1,
                    width: "100%",
                    justifyContent: "flex-start",
                    borderRadius: 0,
                    borderColor: "grey.300",
                  }}
                >
                  <WhereToVoteIcon />
                  <Typography fontWeight={700}>Busan</Typography>
                </Button>
                <Button
                  onClick={(event) => {
                    event.stopPropagation();
                    console.log("Busan clicked!");
                  }}
                  sx={{
                    gap: 1,
                    textTransform: "capitalize",
                    borderBottom: 1,
                    width: "100%",
                    justifyContent: "flex-start",
                    borderRadius: 0,
                    borderColor: "grey.300",
                  }}
                >
                  <WhereToVoteIcon />
                  <Typography fontWeight={700}>Seoul</Typography>
                </Button>
                <Button
                  onClick={(event) => {
                    event.stopPropagation();
                    console.log("Busan clicked!");
                  }}
                  sx={{
                    gap: 1,
                    textTransform: "capitalize",
                    borderBottom: 1,
                    width: "100%",
                    justifyContent: "flex-start",
                    borderRadius: 0,
                    borderColor: "grey.300",
                  }}
                >
                  <WhereToVoteIcon />
                  <Typography fontWeight={700}>Tokyo</Typography>
                </Button>
                <Button
                  onClick={(event) => {
                    event.stopPropagation();
                    console.log("Busan clicked!");
                  }}
                  sx={{
                    gap: 1,
                    textTransform: "capitalize",
                    borderBottom: 1,
                    width: "100%",
                    justifyContent: "flex-start",
                    borderRadius: 0,
                    borderColor: "grey.300",
                  }}
                >
                  <WhereToVoteIcon />
                  <Typography fontWeight={700}>Kyoto</Typography>
                </Button>
                <Button
                  onClick={(event) => {
                    event.stopPropagation();
                    console.log("Busan clicked!");
                  }}
                  sx={{
                    gap: 1,
                    textTransform: "capitalize",
                    borderBottom: 1,
                    width: "100%",
                    justifyContent: "flex-start",
                    borderRadius: 0,
                    borderColor: "grey.300",
                  }}
                >
                  <WhereToVoteIcon />
                  <Typography fontWeight={700}>Fukuoka</Typography>
                </Button>
                <Button
                  onClick={(event) => {
                    event.stopPropagation();
                    console.log("Busan clicked!");
                  }}
                  sx={{
                    gap: 1,
                    textTransform: "capitalize",
                    borderBottom: 1,
                    width: "100%",
                    justifyContent: "flex-start",
                    borderRadius: 0,
                    borderColor: "grey.300",
                  }}
                >
                  <WhereToVoteIcon />
                  <Typography fontWeight={700}>Osaka</Typography>
                </Button>
              </Stack>
            </Stack>
          </MenuItem>
        </Menu>
      </Stack>
      <Stack>
        <Button
          variant="contained"
          sx={{
            width: "132px",
            height: "54px",
            color: "primary",
            gap: 1,
            pl: "25px",
            borderRadius: "12px",
            backgroundColor: "secondary.main",
            boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.25)", // deeper, smoother
            transition: "all 0.3s ease", // smooth animation
            "&:hover": {
              boxShadow: "0px 12px 30px rgba(0, 0, 0, 0.35)", // stronger glow
              transform: "translateY(-3px)", // slight lift on hover
              backgroundColor: "#fafafa",
            },
          }}
        >
          <Typography>Search</Typography>
          <SearchIcon />
        </Button>
      </Stack>
    </Stack>
  );
}
