import {
  filterSliceValue,
  setDates,
  setAdults,
  setChildren,
  setLocation,
  setPage,
  setLimit,
  setPropertyCity,
  setPropertyType,
  setPropertyStars,
  setBreakfastIncluded,
  setParkingIncluded,
  setAllowChildren,
  setAllowPets,
} from "@/src/slices/filteringSlice";
import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Stack,
  Typography,
} from "@mui/material";
import Slider from "@mui/material/Slider";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const MAX = 4000000.0;
const MIN = 50000.0;
const marks = [
  {
    value: MIN,
    label: "",
  },
  {
    value: MAX,
    label: "",
  },
];
const Filter = () => {
  const filterSliceInput = useSelector(filterSliceValue);
  console.log("filterSliceInput", filterSliceInput);
  const [val, setVal] = React.useState<number>(MIN);
  const dispatch = useDispatch();
  const handleChange = (_: any, newValue: number | number[]) => {
    if (typeof newValue === "number") {
      setVal(newValue);
    }
  };
  return (
    <Stack width={"100%"}>
      <Stack>
        <Box width={"100%"} height={200} borderRadius={4}>
          <iframe
            width="100%"
            height="180"
            style={{ border: 0, borderRadius: 7 }}
            loading="lazy"
            src="https://www.openstreetmap.org/export/embed.html?bbox=126.563%2C33.247%2C126.580%2C33.256&layer=mapnik"
          ></iframe>
        </Box>
      </Stack>
      <Stack
        border={"1px solid"}
        borderColor={"text.disabled"}
        borderRadius={2}
        alignItems={"center"}
        gap={1}
      >
        <Box pt={1} pl={1} alignSelf={"start"} justifyContent={"center"}>
          <Typography className="bold-text-medium" alignSelf={"start"}>
            Filter by:
          </Typography>
        </Box>
        <Box
          border={"1px solid"}
          width={"100%"}
          borderColor={"text.disabled"}
        ></Box>
        <Stack gap={1}>
          <Typography className="small-bold-text">
            Your budget (per night)
          </Typography>
          <Stack flexDirection={"row"} justifyContent={"space-around"}>
            <Typography>KRW 30,000</Typography>
            <Typography>-</Typography>
            <Typography>KRW 400,000+</Typography>
          </Stack>
          <Box sx={{ width: 270 }}>
            <Slider
              marks={marks}
              step={10}
              value={val}
              valueLabelDisplay="auto"
              min={MIN}
              max={MAX}
              onChange={handleChange}
            />
          </Box>
        </Stack>

        <Box
          border={"1px solid"}
          width={"100%"}
          borderColor={"secondary.main"}
        ></Box>

        <Stack gap={1} py={1} px={2} sx={{ width: "100%" }}>
          <Typography className="small-bold-text">Popular filters</Typography>
          <FormGroup>
            {[
              "Hotel",
              "Guest House",
              "Bed and Breakfast",
              "Homestay",
              "Hostel",
              "Aparthotel",
              "Capsule Hotel",
              "Country House",
              "Farm Stay",
              "Inn",
              "Love Hotel",
              "Motel",
              "Riad",
              "Ryokan",
              "Lodge",
            ].map((type) => (
              <FormControlLabel
                key={type}
                control={
                  <Checkbox
                    checked={
                      filterSliceInput.propertyType?.includes(type) || false
                    }
                    onChange={() => dispatch(setPropertyType(type))}
                  />
                }
                label={type}
              />
            ))}
          </FormGroup>
        </Stack>

        <Box
          border={"1px solid"}
          width={"100%"}
          borderColor={"secondary.main"}
        ></Box>

        <Stack gap={1} py={1} px={2} sx={{ width: "100%" }}>
          <Typography className="small-bold-text">Review score</Typography>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox />}
              label="Superb: 9+"
              value={"9"}
              onChange={(e: any) => {
                console.log("e", e.target.value);
              }}
            />
            <FormControlLabel
              control={<Checkbox />}
              label="Very good: 8+"
              value={"8"}
              onChange={(e: any) => {
                console.log("e", e.target.value);
              }}
            />
            <FormControlLabel
              value={"7"}
              control={<Checkbox />}
              label="Good: 7+"
              onChange={(e: any) => {
                console.log("e", e.target.value);
              }}
            />
            <FormControlLabel
              value={"6"}
              control={<Checkbox />}
              label="Pleasant: 6+"
              onChange={(e: any) => {
                console.log("e", e.target.value);
              }}
            />
          </FormGroup>
        </Stack>

        <Box
          border={"1px solid"}
          width={"100%"}
          borderColor={"secondary.main"}
        ></Box>

        <Stack gap={1} py={1} px={2} sx={{ width: "100%" }}>
          <Typography className="small-bold-text">Beach access</Typography>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox />}
              label="Beach Front"
              value={true}
              onChange={(e: any) => {
                console.log("e", e.target.value);
              }}
            />
          </FormGroup>
        </Stack>

        <Box
          border={"1px solid"}
          width={"100%"}
          borderColor={"secondary.main"}
        ></Box>

        <Stack gap={1} py={1} px={2} sx={{ width: "100%" }}>
          <Stack>
            <Typography className="small-bold-text">
              Highly rated features
            </Typography>
            <Typography className="small-text">
              Based on guest reviews
            </Typography>
          </Stack>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={filterSliceInput.breakfastIncluded || false}
                  onChange={(e) =>
                    dispatch(setBreakfastIncluded(e.target.checked))
                  }
                />
              }
              label="Tasty breakfast"
            />
          </FormGroup>
        </Stack>

        <Box
          border={"1px solid"}
          width={"100%"}
          borderColor={"secondary.main"}
        ></Box>

        <Stack gap={1} py={1} px={2} sx={{ width: "100%" }}>
          <Typography className="small-bold-text">Travel group</Typography>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={filterSliceInput.allowPets || false}
                  onChange={(e) => dispatch(setAllowPets(e.target.checked))}
                />
              }
              label="Pets allowed"
              value={true}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={!filterSliceInput.allowChildren}
                  onChange={(e) =>
                    dispatch(setAllowChildren(!e.target.checked))
                  }
                />
              }
              label="Adults only"
              value={true}
            />
          </FormGroup>
        </Stack>

        <Box
          border={"1px solid"}
          width={"100%"}
          borderColor={"secondary.main"}
        ></Box>

        <Stack gap={1} py={1} px={2} sx={{ width: "100%" }}>
          <Typography className="small-bold-text">Brands</Typography>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox />}
              label="L7 Hotels"
              value={"L7 Hotels"}
              onChange={(e: any) => {
                console.log("e", e.target.value);
              }}
            />
            <FormControlLabel
              control={<Checkbox />}
              label="Signiel"
              value={"Signiel"}
              onChange={(e: any) => {
                console.log("e", e.target.value);
              }}
            />
          </FormGroup>
        </Stack>

        <Box
          border={"1px solid"}
          width={"100%"}
          borderColor={"secondary.main"}
        ></Box>

        <Stack gap={1} py={1} px={2} sx={{ width: "100%" }}>
          <Typography className="small-bold-text">Facilities</Typography>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox />}
              label="Parking"
              value={true}
              onChange={(e: any) => {
                console.log("e", e.target.value);
              }}
            />
            <FormControlLabel
              control={<Checkbox />}
              label="Restaurant"
              value={true}
              onChange={(e: any) => {
                console.log("e", e.target.value);
              }}
            />
            <FormControlLabel
              control={<Checkbox />}
              label="Room service"
              value={true}
              onChange={(e: any) => {
                console.log("e", e.target.value);
              }}
            />
            <FormControlLabel
              control={<Checkbox />}
              label="24-hour front desk"
              value={true}
              onChange={(e: any) => {
                console.log("e", e.target.value);
              }}
            />
            <FormControlLabel
              control={<Checkbox />}
              label="Fitness centre"
              value={true}
              onChange={(e: any) => {
                console.log("e", e.target.value);
              }}
            />
            <FormControlLabel
              control={<Checkbox />}
              label="Airport shuttle"
              value={true}
              onChange={(e: any) => {
                console.log("e", e.target.value);
              }}
            />
            <FormControlLabel
              control={<Checkbox />}
              label="Hot tub/Jacuzzi"
              value={true}
              onChange={(e: any) => {
                console.log("e", e.target.value);
              }}
            />
          </FormGroup>
        </Stack>

        <Box
          border={"1px solid"}
          width={"100%"}
          borderColor={"secondary.main"}
        ></Box>

        <Stack gap={1} py={1} px={2} sx={{ width: "100%" }}>
          <Typography className="small-bold-text">
            Swimming pool type
          </Typography>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox />}
              label="Swimming pool"
              value={true}
              onChange={(e: any) => {
                console.log("e", e.target.value);
              }}
            />
            <FormControlLabel
              control={<Checkbox />}
              label="Heated pool"
              value={true}
              onChange={(e: any) => {
                console.log("e", e.target.value);
              }}
            />
            <FormControlLabel
              control={<Checkbox />}
              label="Indoor pool"
              value={true}
              onChange={(e: any) => {
                console.log("e", e.target.value);
              }}
            />
            <FormControlLabel
              control={<Checkbox />}
              label="Outdoor pool"
              value={true}
              onChange={(e: any) => {
                console.log("e", e.target.value);
              }}
            />
            <FormControlLabel
              control={<Checkbox />}
              label="Private pool"
              value={true}
              onChange={(e: any) => {
                console.log("e", e.target.value);
              }}
            />
            <FormControlLabel
              control={<Checkbox />}
              label="Infinity pool"
              value={true}
              onChange={(e: any) => {
                console.log("e", e.target.value);
              }}
            />
          </FormGroup>
        </Stack>

        <Box
          border={"1px solid"}
          width={"100%"}
          borderColor={"secondary.main"}
        ></Box>

        <Stack gap={1} py={1} px={2} sx={{ width: "100%" }}>
          <Typography className="small-bold-text">Meals</Typography>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox />}
              label="Self catering"
              value={true}
              onChange={(e: any) => {
                console.log("e", e.target.value);
              }}
            />
            <FormControlLabel
              control={<Checkbox />}
              label="Breakfast included"
              value={true}
              onChange={(e: any) => {
                console.log("e", e.target.value);
              }}
            />
          </FormGroup>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Filter;
