import {
  Button,
  Input,
  Menu,
  MenuItem,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
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
import { useQuery } from "@apollo/client";
import { GET_ALL_AVAILABLE_PROPERTIES, GET_AVAILABLE_CITIES } from "@/apollo/user/query";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

export default function Filtering() {
  const router = useRouter();
  const { t } = useTranslation("common");
  const dispatch = useDispatch();
  const filters = useSelector((state: RootState) => state.filters);
  const inputRef = useRef<HTMLInputElement>(null);

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

  useEffect(() => {
    if (openLocation) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 0);
    }
  }, [openLocation]);

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
    if (!mounted) return t("filter.person");
    const total = (filters.adults || 0) + (filters.children || 0);
    return `${total} ${total !== 1 ? t("filter.persons") : t("filter.person")}`;
  };

  /** APOLLO REQUESTS **/
  // const {
  //   loading: getAllAvailablePropertiesLoading,
  //   data: getAllAvailablePropertiesData,
  //   error: getAllAvailablePropertiesError,
  //   refetch: getAllAvailablePropertiesRefetch,
  // } = useQuery(GET_ALL_AVAILABLE_PROPERTIES, {
  //   fetchPolicy: "network-only",
  //   variables: {
  //     input: {
  //       propertyRegion: filters.propertyRegion,
  //       from: filters.startDate,
  //       until: filters.endDate,
  //       adults: filters.adults,
  //       children: filters.children,
  //       page: filters.page,
  //       limit: filters.limit,
  //     },
  //   },
  //   notifyOnNetworkStatusChange: true,
  //   onCompleted: (data: T) => {
  //     console.log(
  //       "data.getAllAvailableProperties",
  //       data.getAllAvailableProperties
  //     );
  //   },
  // });

  const { data: citiesData } = useQuery(GET_AVAILABLE_CITIES);
  const availableCities: string[] = citiesData?.getAvailableCities ?? [];
  const [citySearch, setCitySearch] = useState("");
  const filteredCities = citySearch
    ? availableCities.filter((c) =>
        c.toLowerCase().includes(citySearch.toLowerCase())
      )
    : availableCities;

  const { data, loading, refetch } = useQuery(GET_ALL_AVAILABLE_PROPERTIES, {
    skip: !filters.propertyRegion, // skip if no region
    variables: {
      input: {
        propertyRegion: filters.propertyRegion,
        from: filters.startDate,
        until: filters.endDate,
        adults: filters.adults,
        children: filters.children,
        page: filters.page,
        limit: filters.limit,
      },
    },
  });

  // useEffect(() => {
  //   if (
  //     filters.propertyRegion ||
  //     filters.adults ||
  //     filters.children ||
  //     filters.endDate ||
  //     filters.startDate ||
  //     filters.limit ||
  //     filters.page
  //   ) {
  //     refetch();
  //   }
  // }, [
  //   filters.propertyRegion,
  //   filters.startDate,
  //   filters.endDate,
  //   filters.adults,
  //   filters.children,
  // ]);

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
              {t("filter.checkAvailable")}
            </Typography>
          </Button>
        </Tooltip>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          slotProps={{
            paper: {
              sx: {
                borderRadius: 3,
                boxShadow: "0 12px 40px rgba(0,0,0,0.15)",
                overflow: "hidden",
                "& .rdrCalendarWrapper": {
                  backgroundColor: "background.paper",
                  color: "text.primary",
                },
                "& .rdrMonthAndYearPickers select": {
                  color: "text.primary",
                  backgroundColor: "background.paper",
                },
                "& .rdrDayNumber span": {
                  color: "text.primary",
                },
                "& .rdrDayPassive .rdrDayNumber span": {
                  color: "text.disabled",
                },
                "& .rdrMonthName": {
                  color: "text.primary",
                },
                "& .rdrWeekDay": {
                  color: "text.secondary",
                },
                "& .rdrDayToday .rdrDayNumber span::after": {
                  backgroundColor: "primary.main",
                },
                "& .rdrMonth": {
                  backgroundColor: "background.paper",
                },
                "& .rdrDateDisplayWrapper": {
                  backgroundColor: "background.default",
                },
                "& .rdrDateDisplayItem": {
                  backgroundColor: "background.paper",
                  borderColor: "divider",
                },
                "& .rdrDateDisplayItem input": {
                  color: "text.primary",
                },
                "& .rdrNextPrevButton": {
                  backgroundColor: "action.hover",
                },
                "& .rdrPprevButton i": {
                  borderColor: "transparent transparent transparent",
                  borderRightColor: "text.secondary",
                },
                "& .rdrNextButton i": {
                  borderColor: "transparent transparent transparent",
                  borderLeftColor: "text.secondary",
                },
              },
            },
          }}
        >
          <Stack sx={{ p: 1 }}>
            <DateRange
              ranges={range}
              onChange={(item: any) => {
                const start = item.selection.startDate?.toISOString();
                const end = item.selection.endDate?.toISOString();
                setRange([item.selection]);
                dispatch(setDates({ startDate: start, endDate: end }));
              }}
            />
          </Stack>
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
              {!mounted ? t("filter.location") : filters.propertyRegion || t("filter.location")}
            </Typography>
          </Button>
        </Tooltip>
        <Menu
          anchorEl={anchorElLocation}
          open={openLocation}
          onClose={handleLocationClose}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          slotProps={{
            paper: {
              sx: {
                borderRadius: 3,
                boxShadow: "0 12px 40px rgba(0,0,0,0.15)",
                maxHeight: 400,
              },
            },
          }}
        >
          <Stack gap={1.5} width={350} px={2} py={1.5}>
            <Input
              autoFocus
              inputRef={inputRef}
              placeholder={t("filter.searchCity")}
              value={citySearch}
              onChange={(e) => setCitySearch(e.target.value)}
              sx={{ fontSize: 14 }}
            />
            <Typography fontSize={13} fontWeight={700} color="text.secondary">
              {citySearch ? t("filter.searchResults") : t("filter.availableDestinations")}
            </Typography>
            <Stack sx={{ maxHeight: 260, overflowY: "auto" }} gap={0.5}>
              {filteredCities.length === 0 ? (
                <Typography fontSize={13} color="text.disabled" py={2} textAlign="center">
                  {t("filter.noCities")}
                </Typography>
              ) : (
                filteredCities.map((city) => (
                  <Button
                    key={city}
                    onClick={(e) => {
                      e.stopPropagation();
                      dispatch(setLocation(city));
                      setCitySearch("");
                      handleLocationClose();
                    }}
                    sx={{
                      gap: 1,
                      textTransform: "none",
                      width: "100%",
                      justifyContent: "flex-start",
                      borderRadius: 1.5,
                      py: 1,
                      color: "text.primary",
                      "&:hover": { backgroundColor: "action.hover" },
                    }}
                  >
                    <WhereToVoteIcon sx={{ fontSize: 18, color: "primary.main" }} />
                    <Typography fontSize={14} fontWeight={600}>
                      {city}
                    </Typography>
                  </Button>
                ))
              )}
            </Stack>
          </Stack>
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
          disabled={loading}
          onClick={() => {
            refetch({
              input: {
                propertyRegion: filters.propertyRegion,
                from: filters.startDate,
                until: filters.endDate,
                adults: filters.adults,
                children: filters.children,
                page: filters.page,
                limit: filters.limit,
              },
            });
            router.push("/hotels");
          }}
        >
          <Typography>{t("filter.search")}</Typography>
          <SearchIcon />
        </Button>
      </Stack>
    </Stack>
  );
}
