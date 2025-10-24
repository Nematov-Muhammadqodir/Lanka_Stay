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
const AttractionsFilter = () => {
  const [val, setVal] = React.useState<number>(MIN);
  const handleChange = (_: Event, newValue: number | number[]) => {
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

        <Stack py={1} px={2} sx={{ width: "100%" }}>
          <Typography className="small-bold-text">Time of day</Typography>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox />}
              label="Morning: (before 12:00)"
              value={"hotels"}
              onChange={(e: any) => {
                console.log("e", e.target.value);
              }}
            />
            <FormControlLabel
              control={<Checkbox />}
              label="Afternoon: (after 12:00)"
              value={"hotels"}
              onChange={(e: any) => {
                console.log("e", e.target.value);
              }}
            />
            <FormControlLabel
              control={<Checkbox />}
              label="Evening & night: (after 18:00)"
              value={"hotels"}
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

        <Stack py={1} px={2} sx={{ width: "100%" }}>
          <Typography className="small-bold-text">Review score</Typography>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox />}
              label="4.5 & up"
              value={"4.5"}
              onChange={(e: any) => {
                console.log("e", e.target.value);
              }}
            />
            <FormControlLabel
              control={<Checkbox />}
              label="4 & up"
              value={"4"}
              onChange={(e: any) => {
                console.log("e", e.target.value);
              }}
            />
            <FormControlLabel
              value={"3.5"}
              control={<Checkbox />}
              label="3.5 & up"
              onChange={(e: any) => {
                console.log("e", e.target.value);
              }}
            />
            <FormControlLabel
              value={"3"}
              control={<Checkbox />}
              label="3 & up"
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
          <Typography className="small-bold-text">Languages</Typography>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox />}
              label="English"
              value={"English"}
              onChange={(e: any) => {
                console.log("e", e.target.value);
              }}
            />
            <FormControlLabel
              control={<Checkbox />}
              label="Uzbek"
              value={"Uzbek"}
              onChange={(e: any) => {
                console.log("e", e.target.value);
              }}
            />
            <FormControlLabel
              control={<Checkbox />}
              label="Korean"
              value={"Korean"}
              onChange={(e: any) => {
                console.log("e", e.target.value);
              }}
            />
          </FormGroup>
        </Stack>

        <Stack gap={1} py={1} px={2} sx={{ width: "100%" }}>
          <Typography className="small-bold-text">Location</Typography>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox />}
              label="Uzbekistan"
              value={"Uzbekistan"}
              onChange={(e: any) => {
                console.log("e", e.target.value);
              }}
            />
            <FormControlLabel
              control={<Checkbox />}
              label="Korea"
              value={"Korea"}
              onChange={(e: any) => {
                console.log("e", e.target.value);
              }}
            />
            <FormControlLabel
              control={<Checkbox />}
              label="Japan"
              value={"Japan"}
              onChange={(e: any) => {
                console.log("e", e.target.value);
              }}
            />
            <FormControlLabel
              control={<Checkbox />}
              label="Europe"
              value={"Europe"}
              onChange={(e: any) => {
                console.log("e", e.target.value);
              }}
            />
            <FormControlLabel
              control={<Checkbox />}
              label="North America"
              value={"North America"}
              onChange={(e: any) => {
                console.log("e", e.target.value);
              }}
            />
            <FormControlLabel
              control={<Checkbox />}
              label="South America"
              value={"South America"}
              onChange={(e: any) => {
                console.log("e", e.target.value);
              }}
            />
            <FormControlLabel
              control={<Checkbox />}
              label="Africa"
              value={"Africa"}
              onChange={(e: any) => {
                console.log("e", e.target.value);
              }}
            />
            <FormControlLabel
              control={<Checkbox />}
              label="Oceania"
              value={"Oceania"}
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

export default AttractionsFilter;
