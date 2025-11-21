import {
  Button,
  Input,
  Menu,
  MenuItem,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import {
  saveFiltersToLocalStorage,
  setAdults,
  setChildren,
  setDates,
  setLocation,
} from "@/src/slices/filteringSlice";

export default function Filtering() {
  const dispatch = useDispatch();
  const filters = useSelector((state: RootState) => state.filters);
  console.log("FILTERS", filters);

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

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
      startDate: filters.startDate ? new Date(filters.startDate) : undefined,
      endDate: filters.endDate ? new Date(filters.endDate) : undefined,
      key: "selection",
    },
  ]);

  useEffect(() => saveFiltersToLocalStorage(filters), [filters]);

  const handleClick = (event: React.MouseEvent<HTMLElement>) =>
    setAnchorEl(event.currentTarget);
  const handlePersonClick = (event: React.MouseEvent<HTMLElement>) =>
    setAnchorElPerson(event.currentTarget);
  const handleLocationClick = (event: React.MouseEvent<HTMLElement>) =>
    setAnchorElLocation(event.currentTarget);

  const handleClose = () => setAnchorEl(null);
  const handlePersonClose = () => setAnchorElPerson(null);
  const handleLocationClose = () => setAnchorElLocation(null);

  const getPeopleText = () => {
    if (!mounted) return "Person";
    const total = (filters.adults || 0) + (filters.children || 0);
    return `${total} Person${total !== 1 ? "s" : ""}`;
  };

  return (
    <Stack
      className="container"
      width="100%"
      sx={{
        backgroundColor: "secondary.main",
        marginTop: "100px !important",
        height: "117px",
        borderRadius: "42px",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingX: "40px",
        boxShadow: "0px 8px 20px rgba(0,0,0,0.25)",
      }}
    >
      {/* Date Picker */}
      <Stack>
        <Tooltip title="Check Available Days">
          <Button
            variant="contained"
            sx={{
              borderRadius: "12px",
              height: "60px",
              width: "211px",
              backgroundColor: "white",
              boxShadow: "0px 4px 10px rgba(0,0,0,0.15)",
              "&:hover": {
                boxShadow: "0px 6px 14px rgba(0,0,0,0.25)",
                backgroundColor: "#f9f9f9",
              },
              gap: "10px",
              color: "black",
            }}
            onClick={handleClick}
          >
            <CalendarMonthIcon />
            <Typography
              fontSize="12px"
              textTransform="capitalize"
              letterSpacing={1}
            >
              Check Available
            </Typography>
          </Button>
        </Tooltip>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <MenuItem>
            <DateRange
              ranges={range}
              onChange={(item: any) => {
                const start = item.selection.startDate?.toISOString();
                const end = item.selection.endDate?.toISOString();
                setRange([item.selection]);
                dispatch(setDates({ startDate: start, endDate: end }));
              }}
            />
          </MenuItem>
        </Menu>
      </Stack>

      {/* People Selector */}
      <Stack>
        <Tooltip title="Select Amount of People">
          <Button
            variant="contained"
            sx={{
              borderRadius: "12px",
              height: "60px",
              width: "211px",
              backgroundColor: "white",
              boxShadow: "0px 4px 10px rgba(0,0,0,0.15)",
              "&:hover": {
                boxShadow: "0px 6px 14px rgba(0,0,0,0.25)",
                backgroundColor: "#f9f9f9",
              },
              gap: "10px",
              color: "black",
            }}
            onClick={handlePersonClick}
          >
            <EmojiPeopleIcon />
            <Typography
              fontSize="12px"
              textTransform="capitalize"
              letterSpacing={1}
            >
              {getPeopleText()}
            </Typography>
            <KeyboardArrowDownIcon />
          </Button>
        </Tooltip>
        <Menu
          anchorEl={anchorElPerson}
          open={openPerson}
          onClose={handlePersonClose}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <Stack gap={2} padding="10px">
            {["Adults", "Children"].map((type) => {
              const value =
                type === "Adults" ? filters.adults || 0 : filters.children || 0;
              const setter = type === "Adults" ? setAdults : setChildren;
              return (
                <Stack
                  key={type}
                  flexDirection="row"
                  justifyContent="space-between"
                  width={350}
                  alignItems="center"
                  paddingY="10px"
                  paddingX="20px"
                >
                  <Typography sx={{ fontWeight: 700 }}>{type}</Typography>
                  <Stack
                    flexDirection="row"
                    alignItems="center"
                    width={100}
                    justifyContent="space-between"
                    sx={{
                      border: "1px solid",
                      borderColor: "grey.300",
                      borderRadius: 2,
                      paddingX: 1,
                    }}
                  >
                    <Button onClick={() => dispatch(setter(value - 1))}>
                      <RemoveIcon />
                    </Button>
                    <Typography>{value}</Typography>
                    <Button onClick={() => dispatch(setter(value + 1))}>
                      <AddIcon />
                    </Button>
                  </Stack>
                </Stack>
              );
            })}
          </Stack>
        </Menu>
      </Stack>

      {/* Location */}
      <Stack>
        <Tooltip title="Select Location">
          <Button
            variant="contained"
            sx={{
              borderRadius: "12px",
              height: "60px",
              width: "211px",
              backgroundColor: "white",
              boxShadow: "0px 4px 10px rgba(0,0,0,0.15)",
              "&:hover": {
                boxShadow: "0px 6px 14px rgba(0,0,0,0.25)",
                backgroundColor: "#f9f9f9",
              },
              gap: "10px",
              color: "black",
            }}
            onClick={handleLocationClick}
          >
            <PinDropIcon />
            <Typography fontSize="12px" textTransform="capitalize">
              {!mounted ? "Location" : filters.propertyRegion || "Location"}
            </Typography>
          </Button>
        </Tooltip>
        <Menu
          anchorEl={anchorElLocation}
          open={openLocation}
          onClose={handleLocationClose}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <MenuItem>
            <Stack gap={2} width={431}>
              <Input
                placeholder="Search for location!"
                onChange={(e) => dispatch(setLocation(e.target.value))}
              />
              <Typography sx={{ fontWeight: "bold" }}>
                Trending Destinations
              </Typography>
              {["Busan", "Seoul", "Tokyo", "Kyoto", "Fukuoka", "Osaka"].map(
                (city) => (
                  <Button
                    key={city}
                    onClick={(e) => {
                      e.stopPropagation();
                      dispatch(setLocation(city));
                      handleLocationClose();
                    }}
                    sx={{
                      gap: 1,
                      textTransform: "capitalize",
                      width: "100%",
                      justifyContent: "flex-start",
                      borderRadius: 0,
                    }}
                  >
                    <WhereToVoteIcon />
                    <Typography fontWeight={700}>{city}</Typography>
                  </Button>
                )
              )}
            </Stack>
          </MenuItem>
        </Menu>
      </Stack>

      {/* Search */}
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
            boxShadow: "0px 8px 20px rgba(0,0,0,0.25)",
            transition: "all 0.3s ease",
            "&:hover": {
              boxShadow: "0px 12px 30px rgba(0,0,0,0.35)",
              transform: "translateY(-3px)",
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
