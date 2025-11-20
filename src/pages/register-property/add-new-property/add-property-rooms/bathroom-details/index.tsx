import React from "react";
import { Button, Checkbox, FormGroup, Stack, Typography } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { useRouter } from "next/router";
import LayoutCreateAccountMain from "@/src/libs/components/layout/registerProperty/create-account/CreateAccountMainLayout";
import { BathroomFacilities } from "@/src/libs/enums/propertyRoom.enum";

import { useSelector, useDispatch } from "react-redux";
import {
  partnerPropertyRoomInputValue,
  setIsBathroomPrivate,
  addBathroomFacility,
  removeBathroomFacility,
} from "@/src/slices/partnerPropertyRoomSlice";
import { sweetBasicAlert } from "@/src/libs/sweetAlert";

const BathRoomDetails = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const roomInput = useSelector(partnerPropertyRoomInputValue);
  console.log("partnerPropertyRoomInput", roomInput);

  const bathroomFacilities = Object.values(BathroomFacilities);

  const handleIsBathroomPrivateChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value === "true";
    dispatch(setIsBathroomPrivate(value));
  };

  const handleBathroomFacilityToggle = (facility: BathroomFacilities) => {
    if (roomInput.availableBathroomFacilities.includes(facility)) {
      dispatch(removeBathroomFacility(facility));
    } else {
      dispatch(addBathroomFacility(facility));
    }
  };

  return (
    <LayoutCreateAccountMain>
      <Stack sx={{ backgroundColor: "#FAF8FA", height: "auto", pb: 20 }}>
        <Stack className="container">
          <Stack sx={{ mt: 10, gap: 2 }}>
            <Typography sx={{ fontSize: 40, fontWeight: 700 }}>
              Bathroom details
            </Typography>

            {/* MAIN BOX */}
            <Stack
              width={500}
              border={"1px solid black"}
              sx={{ backgroundColor: "white" }}
              p={2}
              gap={1.5}
              borderRadius={2}
              borderColor={"#E7E7E7"}
            >
              {/* IS BATHROOM PRIVATE? */}
              <Stack
                sx={{
                  borderBottom: "1px solid",
                  pb: 4,
                  borderColor: "#E7E7E7",
                }}
              >
                <Typography className="bold-text-medium">
                  Is the bathroom private?
                </Typography>

                <FormControl>
                  <RadioGroup
                    value={roomInput.isBathroomPrivate}
                    onChange={handleIsBathroomPrivateChange}
                  >
                    <FormControlLabel
                      value={true}
                      control={<Radio />}
                      label="Yes"
                    />
                    <FormControlLabel
                      value={false}
                      control={<Radio />}
                      label="No, it's shared"
                    />
                  </RadioGroup>
                </FormControl>
              </Stack>

              {/* BATHROOM FACILITIES CHECKBOXES */}
              <Stack mt={2}>
                <Typography className="bold-text-medium">
                  Which bathroom items are available in this room?
                </Typography>

                <FormGroup>
                  {bathroomFacilities.map((facility) => (
                    <FormControlLabel
                      key={facility}
                      control={
                        <Checkbox
                          checked={roomInput.availableBathroomFacilities.includes(
                            facility
                          )}
                          onChange={() =>
                            handleBathroomFacilityToggle(facility)
                          }
                        />
                      }
                      label={facility}
                    />
                  ))}
                </FormGroup>
              </Stack>
            </Stack>

            {/* BUTTONS */}
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
                    "/register-property/add-new-property/add-property-rooms/room-details"
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
                  if (roomInput.availableBathroomFacilities.length === 0) {
                    sweetBasicAlert(
                      "Please select the available bathroom items!"
                    );
                    router.push(
                      "/register-property/add-new-property/add-property-rooms/bathroom-details"
                    );
                  } else {
                    router.push(
                      "/register-property/add-new-property/add-property-rooms/room-facilities"
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

export default BathRoomDetails;
