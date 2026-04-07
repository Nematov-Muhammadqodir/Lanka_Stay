import React, { useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import {
  partnerPropertyRoomInputValue,
  setAvailableBedDouble,
  setAvailableBedKing,
  setAvailableBedSingle,
  setAvailableBedSuperKing,
  setCurrentRoomTypeAmount,
  setRoomType,
  setIsSmokingAllowed,
  setNumberOfGuestsCanStay,
} from "@/src/slices/partnerPropertyRoomSlice";
import { RoomTypes } from "@/src/libs/enums/propertyRoom.enum";
import { sweetBasicAlert } from "@/src/libs/sweetAlert";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const RoomDetails = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const partnerPropertyRoomInput = useSelector(partnerPropertyRoomInputValue);
  console.log("partnerPropertyRoomInput", partnerPropertyRoomInput);
  const [bedType, setBedType] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setBedType(event.target.value as string);
    dispatch(setRoomType(event.target.value));
  };

  const handleSingleBedChange = (amount: number) => {
    if (amount >= 0) dispatch(setAvailableBedSingle(amount));
  };

  const handleDoubleBedChange = (amount: number) => {
    if (amount >= 0) dispatch(setAvailableBedDouble(amount));
  };

  const handleKingBedChange = (amount: number) => {
    if (amount >= 0) dispatch(setAvailableBedKing(amount));
  };

  const handleSuperKingBedChange = (amount: number) => {
    if (amount >= 0) dispatch(setAvailableBedSuperKing(amount));
  };

  const handleGuestsChange = (amount: number) => {
    if (amount < 0) return;
    dispatch(setNumberOfGuestsCanStay(amount));
  };

  const handleIsSmokingAllowedChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch(setIsSmokingAllowed(event.target.value === "true"));
  };

  const roomTypesArray = Object.values(RoomTypes);
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
                    {roomTypesArray.map((roomType, index) => {
                      return <MenuItem value={roomType}>{roomType}</MenuItem>;
                    })}
                  </Select>
                </FormControl>
              </Box>
              <Typography className="bold-text-medium">
                How many rooms of this type do you have?
              </Typography>
              <Box sx={{ maxWidth: 120 }}>
                <FormControl fullWidth>
                  <TextField
                    type="number"
                    onChange={(e) => {
                      dispatch(
                        setCurrentRoomTypeAmount(Number(e.target.value))
                      );
                    }}
                  />
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
                  <IconButton
                    onClick={() =>
                      handleSingleBedChange(
                        partnerPropertyRoomInput.availableBeds.single - 1
                      )
                    }
                  >
                    <RemoveIcon sx={{ color: "#4f46e5" }} />
                  </IconButton>

                  <Typography fontSize={20} fontWeight={500}>
                    {partnerPropertyRoomInput.availableBeds.single}
                  </Typography>

                  <IconButton
                    onClick={() =>
                      handleSingleBedChange(
                        partnerPropertyRoomInput.availableBeds.single + 1
                      )
                    }
                  >
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
                  <IconButton
                    onClick={() =>
                      handleDoubleBedChange(
                        partnerPropertyRoomInput.availableBeds.double - 1
                      )
                    }
                  >
                    <RemoveIcon sx={{ color: "#4f46e5" }} />
                  </IconButton>

                  <Typography fontSize={20} fontWeight={500}>
                    {partnerPropertyRoomInput.availableBeds.double}
                  </Typography>

                  <IconButton
                    onClick={() =>
                      handleDoubleBedChange(
                        partnerPropertyRoomInput.availableBeds.double + 1
                      )
                    }
                  >
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
                      King size
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
                  <IconButton
                    onClick={() =>
                      handleKingBedChange(
                        partnerPropertyRoomInput.availableBeds.king - 1
                      )
                    }
                  >
                    <RemoveIcon sx={{ color: "#4f46e5" }} />
                  </IconButton>

                  <Typography fontSize={20} fontWeight={500}>
                    {partnerPropertyRoomInput.availableBeds.king}
                  </Typography>

                  <IconButton
                    onClick={() =>
                      handleKingBedChange(
                        partnerPropertyRoomInput.availableBeds.king + 1
                      )
                    }
                  >
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
                      Super-king size
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
                  <IconButton
                    onClick={() =>
                      handleSuperKingBedChange(
                        partnerPropertyRoomInput.availableBeds.superKing - 1
                      )
                    }
                  >
                    <RemoveIcon sx={{ color: "#4f46e5" }} />
                  </IconButton>

                  <Typography fontSize={20} fontWeight={500}>
                    {partnerPropertyRoomInput.availableBeds.superKing}
                  </Typography>

                  <IconButton
                    onClick={() =>
                      handleSuperKingBedChange(
                        partnerPropertyRoomInput.availableBeds.superKing + 1
                      )
                    }
                  >
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
                  <IconButton
                    onClick={() =>
                      handleGuestsChange(
                        partnerPropertyRoomInput.numberOfGuestsCanStay - 1
                      )
                    }
                  >
                    <RemoveIcon sx={{ color: "#4f46e5" }} />
                  </IconButton>

                  <Typography fontSize={20} fontWeight={500}>
                    {partnerPropertyRoomInput.numberOfGuestsCanStay}
                  </Typography>

                  <IconButton
                    onClick={() =>
                      handleGuestsChange(
                        partnerPropertyRoomInput.numberOfGuestsCanStay + 1
                      )
                    }
                  >
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
                    name="is-smoking"
                    value={partnerPropertyRoomInput.isSmokingAllowed}
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
                onClick={() => {
                  if (
                    partnerPropertyRoomInput.availableBeds.double === 0 &&
                    partnerPropertyRoomInput.availableBeds.king === 0 &&
                    partnerPropertyRoomInput.availableBeds.single === 0 &&
                    partnerPropertyRoomInput.availableBeds.superKing === 0
                  ) {
                    sweetBasicAlert("Please set at least one amount of bed!");
                    router.push(
                      "/register-property/add-new-property/add-property-rooms/room-details"
                    );
                  } else if (
                    partnerPropertyRoomInput.currentRoomTypeAmount === 0
                  ) {
                    sweetBasicAlert(
                      "Please set the amount of the rooms at this type!"
                    );
                    router.push(
                      "/register-property/add-new-property/add-property-rooms/room-details"
                    );
                  } else {
                    router.push(
                      "/register-property/add-new-property/add-property-rooms/bathroom-details"
                    );
                  }
                }}
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

export const getServerSideProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "ko", ["common"])),
  },
});
export default RoomDetails;
