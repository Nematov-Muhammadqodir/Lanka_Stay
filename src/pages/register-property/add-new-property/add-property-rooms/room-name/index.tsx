import React, { useState } from "react";
import withLayoutCreateAccountMain from "@/src/libs/components/layout/registerProperty/create-account/CreateAccountMainLayout";
import { Button, Stack, Typography } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import { useRouter } from "next/router";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import LightbulbIcon from "@mui/icons-material/Lightbulb";

const RoomName = () => {
  const router = useRouter();
  const [bedType, setBedType] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setBedType(event.target.value as string);
  };

  return (
    <Stack sx={{ backgroundColor: "#FAF8FA", height: "87vh", pb: 20 }}>
      <Stack className="container">
        <Stack sx={{ mt: 10, gap: 2 }}>
          <Typography sx={{ fontSize: 40, fontWeight: 700 }}>
            What’s the name of this room?
          </Typography>
          <Stack sx={{ flexDirection: "row", gap: 3 }}>
            <Stack
              width={500}
              height={"auto"}
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
                <Typography className="bold-text-medium">Room name</Typography>
              </Stack>
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <InputLabel id="room-name-select-label">Room name</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    value={bedType}
                    label="Room Type"
                    onChange={handleChange}
                  >
                    <MenuItem value={10}>Budget Double Room</MenuItem>
                    <MenuItem value={20}>
                      Business Double Room with Gym Access
                    </MenuItem>
                    <MenuItem value={30}>Delux Double Room</MenuItem>
                    <MenuItem value={30}>
                      Delux Double Room with Balcony
                    </MenuItem>
                    <MenuItem value={30}>Delux King Room</MenuItem>
                    <MenuItem value={30}>Delux Queen Room</MenuItem>
                    <MenuItem value={30}>Delux Room</MenuItem>
                    <MenuItem value={30}>Standard Single Room</MenuItem>
                    <MenuItem value={30}>Standard Double Room</MenuItem>
                    <MenuItem value={30}>Standard Queen Room</MenuItem>
                    <MenuItem value={30}>Standard King Room</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Stack>

            <Stack
              width={400}
              height={"auto"}
              border={"1px solid black"}
              sx={{ backgroundColor: "white" }}
              p={2}
              gap={1.5}
              borderRadius={2}
              borderColor={"#E7E7E7"}
              justifyContent={"space-between"}
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
                  They're consistent across the site, allowing guests to quickly
                  find and compare rooms
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
              sx={{
                height: 40,
                fontWeight: "bold",
                width: "30%",
              }}
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
  );
};

export default withLayoutCreateAccountMain(RoomName);
