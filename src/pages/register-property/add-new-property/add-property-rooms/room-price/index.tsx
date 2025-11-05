import React, { useState } from "react";
import withLayoutCreateAccountMain from "@/src/libs/components/layout/registerProperty/create-account/CreateAccountMainLayout";
import {
  Button,
  InputAdornment,
  OutlinedInput,
  Stack,
  Typography,
} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import { useRouter } from "next/router";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import CheckIcon from "@mui/icons-material/Check";

const RoomPrice = () => {
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
            Set the price per night for this room
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
              <Typography className="bold-text-medium">
                How much do you want to charge per night?
              </Typography>

              <Box sx={{ minWidth: 120 }}>
                <FormControl sx={{ m: 1, width: "90%" }}>
                  <InputLabel htmlFor="outlined-adornment-amount">
                    Price
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-amount"
                    startAdornment={
                      <InputAdornment position="start">KRW</InputAdornment>
                    }
                    label="Amount"
                  />
                  <Typography className="small-text">
                    Including taxes, commission and charges
                  </Typography>
                </FormControl>
              </Box>

              <Stack>
                <Typography className="bold-text-medium" color={"primary.main"}>
                  15.00% LankaStay.com commission
                </Typography>
                <Stack my={1} ml={4} gap={1}>
                  <Stack sx={{ flexDirection: "row", gap: 1 }}>
                    <CheckIcon />
                    <Typography>24/7 help in your language</Typography>
                  </Stack>
                  <Stack sx={{ flexDirection: "row", gap: 1 }}>
                    <CheckIcon />
                    <Typography>
                      Save time with automatically confirmed bookings
                    </Typography>
                  </Stack>
                  <Stack sx={{ flexDirection: "row", gap: 1 }}>
                    <CheckIcon />
                    <Typography>We promote your place on Google</Typography>
                  </Stack>
                </Stack>
              </Stack>
            </Stack>

            <Stack
              width={400}
              height={"150px"}
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
                  What if I'm not sure about my price?
                </Typography>
              </Stack>

              <Typography>
                Don't worry, you can always change it later. You can even set
                weekend, midweek and seasonal prices, giving you more control
                over what you earn.
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
                  "/register-property/add-new-property/add-property-rooms/room-name"
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
                  "/register-property/add-new-property/property-details-complete"
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

export default withLayoutCreateAccountMain(RoomPrice);
