import React from "react";
import {
  Button,
  Stack,
  Typography,
  FormControl,
  Select,
  MenuItem,
  Box,
  InputLabel,
} from "@mui/material";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import { useRouter } from "next/router";
import LayoutCreateAccountMain from "@/src/libs/components/layout/registerProperty/create-account/CreateAccountMainLayout";

import { useSelector, useDispatch } from "react-redux";
import {
  partnerPropertyRoomInputValue,
  setRoomName,
} from "@/src/slices/partnerPropertyRoomSlice";
import { RoomNames } from "@/src/libs/enums/propertyRoom.enum";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const RoomName = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const roomInput = useSelector(partnerPropertyRoomInputValue);
  console.log("partnerPropertyRoomInput", roomInput);
  const handleChange = (event: any) => {
    dispatch(setRoomName(event.target.value));
  };

  return (
    <LayoutCreateAccountMain>
      <Stack sx={{ backgroundColor: "#FAF8FA", height: "87vh", pb: 20 }}>
        <Stack className="container">
          <Stack sx={{ mt: 10, gap: 2 }}>
            <Typography sx={{ fontSize: 40, fontWeight: 700 }}>
              What’s the name of this room?
            </Typography>
            <Stack sx={{ flexDirection: "row", gap: 3 }}>
              <Stack
                width={500}
                border={"1px solid black"}
                sx={{ backgroundColor: "white" }}
                p={2}
                gap={1.5}
                borderRadius={2}
                borderColor={"#E7E7E7"}
              >
                <Stack gap={3}>
                  <Typography>
                    This is the name that guests will see on your property page.
                    Choose a name that most accurately describes this room.
                  </Typography>
                  <Typography className="bold-text-medium">
                    Room name
                  </Typography>
                </Stack>

                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth>
                    <InputLabel id="room-name-select-label">
                      Room name
                    </InputLabel>
                    <Select
                      labelId="room-name-select-label"
                      value={roomInput.roomName}
                      onChange={handleChange}
                    >
                      {Object.entries(RoomNames).map(([key, value]) => (
                        <MenuItem key={key} value={value}>
                          {value.replace(/_/g, " ")}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              </Stack>

              <Stack
                width={400}
                border={"1px solid black"}
                sx={{ backgroundColor: "white" }}
                p={2}
                gap={1.5}
                borderRadius={2}
                borderColor={"#E7E7E7"}
              >
                <Stack gap={1} sx={{ flexDirection: "row" }}>
                  <LightbulbIcon />
                  <Typography className="bold-text-medium">
                    Why can't I use a custom room name?
                  </Typography>
                </Stack>

                <Typography>
                  Standardised room names have a lot of benefits over custom
                  names:
                </Typography>
                <ul style={{ listStyleType: "disc", paddingLeft: "20px" }}>
                  <li>They’re more descriptive</li>
                  <li>
                    They're consistent across the site, allowing guests to
                    quickly find and compare rooms
                  </li>
                  <li>
                    They’re understood by guests from all backgrounds and
                    nationalities
                  </li>
                  <li>They’re translated into 43 languages</li>
                </ul>
                <Typography>
                  After registration, you’ll have the option to add custom room
                  names. Guests won’t see these, but they can be used for your
                  internal reference.
                </Typography>
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
                sx={{ height: 40, fontWeight: "bold", width: "30%" }}
                onClick={() =>
                  router.push(
                    "/register-property/add-new-property/add-property-rooms/room-facilities"
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
                    "/register-property/add-new-property/add-property-rooms/room-price"
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

export const getServerSideProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "ko", ["common"])),
  },
});
export default RoomName;
