import React, { useState } from "react";
import withLayoutCreateAccountMain from "@/src/libs/components/layout/registerProperty/create-account/CreateAccountMainLayout";
import {
  Button,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import SingleBedIcon from "@mui/icons-material/SingleBed";
import KingBedIcon from "@mui/icons-material/KingBed";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useRouter } from "next/router";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import LayoutCreateAccountMain from "@/src/libs/components/layout/registerProperty/create-account/CreateAccountMainLayout";

const RoomDetails = () => {
  const router = useRouter();
  const [bedType, setBedType] = React.useState("");
  const [value, setValue] = useState(1);
  const [isSmokingAllowed, setIsSmokingAllowed] = useState<boolean>(false);

  const handleChange = (event: SelectChangeEvent) => {
    setBedType(event.target.value as string);
  };
  const handleIsSmokingAllowedChange = (event: SelectChangeEvent) => {
    setIsSmokingAllowed(event.target.value === "true");
  };
  return (
    <LayoutCreateAccountMain>
      <Stack sx={{ backgroundColor: "#FAF8FA", height: "auto", pb: 20 }}>
        <Stack className="container">
          <Stack sx={{ mt: 10, gap: 2 }}>
            <Typography sx={{ fontSize: 40, fontWeight: 700 }}>
              Room details
            </Typography>
            <Stack
              width={500}
              height={"auto"}
              border={"1px solid black"}
              sx={{ backgroundColor: "white" }}
              p={2}
              gap={1.5}
              borderRadius={2}
              borderColor={"#E7E7E7"}
              justifyContent={"space-between"}
            >
              <Typography className="bold-text-medium">
                What type of unit is this?
              </Typography>
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Room Type
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={bedType}
                    label="Room Type"
                    onChange={handleChange}
                  >
                    <MenuItem value={10}>Single</MenuItem>
                    <MenuItem value={20}>Double</MenuItem>
                    <MenuItem value={30}>Family</MenuItem>
                    <MenuItem value={30}>Twin</MenuItem>
                    <MenuItem value={30}>Twin/Double</MenuItem>
                    <MenuItem value={30}>Triple</MenuItem>
                    <MenuItem value={30}>Quadruple</MenuItem>
                    <MenuItem value={30}>Suite</MenuItem>
                    <MenuItem value={30}>Studio</MenuItem>
                    <MenuItem value={30}>Apartment</MenuItem>
                    <MenuItem value={30}>Dormitory Room</MenuItem>
                    <MenuItem value={30}>Bed in Dormitory</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Typography className="bold-text-medium">
                How many rooms of this type do you have?
              </Typography>
              <Box sx={{ maxWidth: 120 }}>
                <FormControl fullWidth>
                  <TextField type="number" />
                </FormControl>
              </Box>
            </Stack>

            <Stack
              width={500}
              height={"auto"}
              border={"1px solid black"}
              sx={{ backgroundColor: "white" }}
              p={2}
              gap={2.5}
              borderRadius={2}
              borderColor={"#E7E7E7"}
            >
              <Typography className="bold-text-medium">
                Which beds are available in this room?
              </Typography>
              <Stack
                flexDirection={"row"}
                sx={{ justifyContent: "space-between", alignItems: "center" }}
              >
                <Stack
                  flexDirection={"row"}
                  sx={{ gap: 1.5, alignItems: "center" }}
                >
                  <SingleBedIcon sx={{ fontSize: 50, color: "#A2A2A2" }} />
                  <Stack>
                    <Typography className="bold-text-medium">
                      Single bed
                    </Typography>
                    <Typography className="small-text">
                      90 - 130 cm wide
                    </Typography>
                  </Stack>
                </Stack>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  border="1px solid #ccc"
                  borderRadius="8px"
                  width={150}
                  padding="4px 2px"
                >
                  <IconButton onClick={() => setValue(value - 1)}>
                    <RemoveIcon sx={{ color: "#4f46e5" }} />
                  </IconButton>

                  <Typography fontSize={20} fontWeight={500}>
                    2
                  </Typography>

                  <IconButton onClick={() => setValue(value + 1)}>
                    <AddIcon sx={{ color: "#4f46e5" }} />
                  </IconButton>
                </Box>
              </Stack>

              <Stack
                flexDirection={"row"}
                sx={{ justifyContent: "space-between", alignItems: "center" }}
              >
                <Stack
                  flexDirection={"row"}
                  sx={{ gap: 1.5, alignItems: "center" }}
                >
                  <KingBedIcon sx={{ fontSize: 50, color: "#A2A2A2" }} />
                  <Stack>
                    <Typography className="bold-text-medium">
                      Double bed
                    </Typography>
                    <Typography className="small-text">
                      131 - 150 cm wide
                    </Typography>
                  </Stack>
                </Stack>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  border="1px solid #ccc"
                  borderRadius="8px"
                  width={150}
                  padding="4px 2px"
                >
                  <IconButton onClick={() => setValue(value - 1)}>
                    <RemoveIcon sx={{ color: "#4f46e5" }} />
                  </IconButton>

                  <Typography fontSize={20} fontWeight={500}>
                    2
                  </Typography>

                  <IconButton onClick={() => setValue(value + 1)}>
                    <AddIcon sx={{ color: "#4f46e5" }} />
                  </IconButton>
                </Box>
              </Stack>

              <Stack
                flexDirection={"row"}
                sx={{ justifyContent: "space-between", alignItems: "center" }}
              >
                <Stack
                  flexDirection={"row"}
                  sx={{ gap: 1.5, alignItems: "center" }}
                >
                  <KingBedIcon sx={{ fontSize: 50, color: "#A2A2A2" }} />
                  <Stack>
                    <Typography className="bold-text-medium">
                      Large bed (King size)
                    </Typography>
                    <Typography className="small-text">
                      151 - 180 cm wide
                    </Typography>
                  </Stack>
                </Stack>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  border="1px solid #ccc"
                  borderRadius="8px"
                  width={150}
                  padding="4px 2px"
                >
                  <IconButton onClick={() => setValue(value - 1)}>
                    <RemoveIcon sx={{ color: "#4f46e5" }} />
                  </IconButton>

                  <Typography fontSize={20} fontWeight={500}>
                    2
                  </Typography>

                  <IconButton onClick={() => setValue(value + 1)}>
                    <AddIcon sx={{ color: "#4f46e5" }} />
                  </IconButton>
                </Box>
              </Stack>

              <Stack
                flexDirection={"row"}
                sx={{ justifyContent: "space-between", alignItems: "center" }}
              >
                <Stack
                  flexDirection={"row"}
                  sx={{ gap: 1.5, alignItems: "center" }}
                >
                  <KingBedIcon sx={{ fontSize: 50, color: "#A2A2A2" }} />
                  <Stack>
                    <Typography className="bold-text-medium">
                      Extra-large double bed (Super-king size)
                    </Typography>
                    <Typography className="small-text">
                      181 - 210 cm wide
                    </Typography>
                  </Stack>
                </Stack>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  border="1px solid #ccc"
                  borderRadius="8px"
                  width={150}
                  padding="4px 2px"
                >
                  <IconButton onClick={() => setValue(value - 1)}>
                    <RemoveIcon sx={{ color: "#4f46e5" }} />
                  </IconButton>

                  <Typography fontSize={20} fontWeight={500}>
                    2
                  </Typography>

                  <IconButton onClick={() => setValue(value + 1)}>
                    <AddIcon sx={{ color: "#4f46e5" }} />
                  </IconButton>
                </Box>
              </Stack>
            </Stack>

            <Stack gap={2}>
              <Stack
                width={500}
                height={"auto"}
                border={"1px solid black"}
                sx={{ backgroundColor: "white" }}
                p={2}
                gap={2.5}
                borderRadius={2}
                borderColor={"#E7E7E7"}
              >
                <Typography className="bold-text-medium">
                  How many guests can stay in this room?
                </Typography>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  border="1px solid #ccc"
                  borderRadius="8px"
                  width={150}
                  padding="4px 2px"
                >
                  <IconButton onClick={() => setValue(value - 1)}>
                    <RemoveIcon sx={{ color: "#4f46e5" }} />
                  </IconButton>

                  <Typography fontSize={20} fontWeight={500}>
                    2
                  </Typography>

                  <IconButton onClick={() => setValue(value + 1)}>
                    <AddIcon sx={{ color: "#4f46e5" }} />
                  </IconButton>
                </Box>
              </Stack>
              <Stack
                width={500}
                height={"auto"}
                border={"1px solid black"}
                sx={{ backgroundColor: "white" }}
                p={2}
                gap={2.5}
                borderRadius={2}
                borderColor={"#E7E7E7"}
              >
                <Typography className="bold-text-medium">
                  Is smoking allowed in this room?
                </Typography>
                <FormControl>
                  <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={isSmokingAllowed}
                    onChange={handleIsSmokingAllowedChange}
                  >
                    <FormControlLabel
                      value={true}
                      control={<Radio />}
                      label="Yes"
                    />
                    <FormControlLabel
                      value={false}
                      control={<Radio />}
                      label="No"
                    />
                  </RadioGroup>
                </FormControl>
              </Stack>
            </Stack>
            <Stack
              sx={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: 500,
              }}
            >
              <Button
                variant="outlined"
                sx={{
                  height: 40,
                  fontWeight: "bold",
                  width: "30%",
                }}
                onClick={() =>
                  router.push(
                    "/register-property/add-new-property/property-details-complete"
                  )
                }
              >
                <KeyboardArrowLeftIcon />
              </Button>
              <Button
                variant="contained"
                sx={{
                  height: 40,
                  color: "white",
                  fontWeight: "bold",
                  width: "68%",
                }}
                onClick={() =>
                  router.push(
                    "/register-property/add-new-property/add-property-rooms/bathroom-details"
                  )
                }
              >
                Continue
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </LayoutCreateAccountMain>
  );
};

export default RoomDetails;
