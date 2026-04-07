import React from "react";
import {
  Button,
  Checkbox,
  FormGroup,
  Stack,
  Typography,
  FormControlLabel,
} from "@mui/material";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { useRouter } from "next/router";
import LayoutCreateAccountMain from "@/src/libs/components/layout/registerProperty/create-account/CreateAccountMainLayout";

import { useSelector, useDispatch } from "react-redux";
import {
  partnerPropertyRoomInputValue,
  addRoomFacility,
  removeRoomFacility,
} from "@/src/slices/partnerPropertyRoomSlice";

import { RoomFacilities as RoomFacilitiesEnum } from "@/src/libs/enums/propertyRoom.enum";
import { sweetBasicAlert } from "@/src/libs/sweetAlert";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const RoomFacilities = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const roomInput = useSelector(partnerPropertyRoomInputValue);
  console.log("partnerPropertyRoomInput", roomInput);

  const roomFacilities = Object.values(RoomFacilitiesEnum);

  const handleFacilityToggle = (facility: RoomFacilitiesEnum) => {
    if (roomInput.roomFacilities.includes(facility)) {
      dispatch(removeRoomFacility(facility));
    } else {
      dispatch(addRoomFacility(facility));
    }
  };

  return (
    <LayoutCreateAccountMain>
      <Stack sx={{ backgroundColor: "#FAF8FA", height: "auto", pb: 20 }}>
        <Stack className="container">
          <Stack sx={{ mt: 10, gap: 2 }}>
            <Typography sx={{ fontSize: 40, fontWeight: 700 }}>
              What can guests use in <br /> this room?
            </Typography>

            <Stack
              width={500}
              border={"1px solid black"}
              sx={{ backgroundColor: "white" }}
              p={2}
              gap={1.5}
              borderRadius={2}
              borderColor={"#E7E7E7"}
            >
              {/** Grouping the facilities by category */}
              <Stack
                sx={{
                  borderBottom: "1px solid",
                  pb: 4,
                  borderColor: "#E7E7E7",
                }}
              >
                <Typography className="bold-text-medium">
                  General amenities
                </Typography>
                <FormGroup>
                  {roomFacilities
                    .filter((f) =>
                      [
                        RoomFacilitiesEnum.CLOTHES_RACK,
                        RoomFacilitiesEnum.FLAT_SCREEN_TV,
                        RoomFacilitiesEnum.AIR_CONDITIONING,
                        RoomFacilitiesEnum.LINEN,
                        RoomFacilitiesEnum.DESK,
                        RoomFacilitiesEnum.WAKE_UP_SERVICE,
                        RoomFacilitiesEnum.TOWELS,
                        RoomFacilitiesEnum.WARDROBE_OR_CLOSET,
                        RoomFacilitiesEnum.HEATING,
                        RoomFacilitiesEnum.FAN,
                        RoomFacilitiesEnum.SAFETY_DEPOSIT_BOX,
                        RoomFacilitiesEnum.TOWELS_SHEETS,
                        RoomFacilitiesEnum.ENTIRE_UNIT_ON_GROUND_FLOOR,
                      ].includes(f)
                    )
                    .map((facility) => (
                      <FormControlLabel
                        key={facility}
                        control={
                          <Checkbox
                            checked={roomInput.roomFacilities.includes(
                              facility
                            )}
                            onChange={() => handleFacilityToggle(facility)}
                          />
                        }
                        label={
                          facility
                            .replace(/_/g, " ")
                            .toLowerCase()[0]
                            .toUpperCase() +
                          facility.replace(/_/g, " ").toLowerCase().slice(1)
                        }
                      />
                    ))}
                </FormGroup>
              </Stack>

              <Stack
                sx={{
                  borderBottom: "1px solid",
                  pb: 4,
                  borderColor: "#E7E7E7",
                  mt: 2,
                }}
              >
                <Typography className="bold-text-medium">
                  Outdoors and views
                </Typography>
                <FormGroup>
                  {roomFacilities
                    .filter((f) =>
                      [
                        RoomFacilitiesEnum.BALCONY,
                        RoomFacilitiesEnum.TERRACE,
                        RoomFacilitiesEnum.VIEW,
                      ].includes(f)
                    )
                    .map((facility) => (
                      <FormControlLabel
                        key={facility}
                        control={
                          <Checkbox
                            checked={roomInput.roomFacilities.includes(
                              facility
                            )}
                            onChange={() => handleFacilityToggle(facility)}
                          />
                        }
                        label={
                          facility
                            .replace(/_/g, " ")
                            .toLowerCase()[0]
                            .toUpperCase() +
                          facility.replace(/_/g, " ").toLowerCase().slice(1)
                        }
                      />
                    ))}
                </FormGroup>
              </Stack>

              <Stack sx={{ mt: 2 }}>
                <Typography className="bold-text-medium">
                  Food and drink
                </Typography>
                <FormGroup>
                  {roomFacilities
                    .filter((f) =>
                      [
                        RoomFacilitiesEnum.ELECTRIC_KETTLE,
                        RoomFacilitiesEnum.TEA_COFFEE_MAKER,
                        RoomFacilitiesEnum.DINING_AREA,
                        RoomFacilitiesEnum.DINING_TABLE,
                        RoomFacilitiesEnum.MICROWAVE,
                      ].includes(f)
                    )
                    .map((facility) => (
                      <FormControlLabel
                        key={facility}
                        control={
                          <Checkbox
                            checked={roomInput.roomFacilities.includes(
                              facility
                            )}
                            onChange={() => handleFacilityToggle(facility)}
                          />
                        }
                        label={
                          facility
                            .replace(/_/g, " ")
                            .toLowerCase()[0]
                            .toUpperCase() +
                          facility.replace(/_/g, " ").toLowerCase().slice(1)
                        }
                      />
                    ))}
                </FormGroup>
              </Stack>
            </Stack>

            {/** Navigation buttons */}
            <Stack
              sx={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: 500,
              }}
            >
              <Button
                variant="outlined"
                sx={{ height: 40, fontWeight: "bold", width: "30%" }}
                onClick={() =>
                  router.push(
                    "/register-property/add-new-property/add-property-rooms/bathroom-details"
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
                  if (roomInput.roomFacilities.length === 0) {
                    sweetBasicAlert(
                      "Please select the available room facilities from the list!"
                    );
                    router.push(
                      "/register-property/add-new-property/add-property-rooms/room-facilities"
                    );
                  } else {
                    router.push(
                      "/register-property/add-new-property/add-property-rooms/room-name"
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
export default RoomFacilities;
