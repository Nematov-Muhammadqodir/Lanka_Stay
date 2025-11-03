import React, { useState } from "react";
import withLayoutCreateAccountMain from "@/src/libs/components/layout/registerProperty/create-account/CreateAccountMainLayout";
import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Rating,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";

const DefineHotelFacilities = () => {
  const router = useRouter();
  const [checked, setChecked] = React.useState(true);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };
  return (
    <Stack sx={{ height: "100vh", position: "fixed" }}>
      <Image
        src={"/img/world-map2.jpg"}
        alt="big-map-image"
        width={1500}
        height={135}
        style={{
          objectFit: "cover",
          width: "100vw",
          height: "100vh",
        }}
      />

      <Stack
        sx={{
          position: "absolute",
          left: "10%",
          top: "5%",
          gap: 2,
        }}
      >
        <Typography sx={{ fontSize: 40, fontWeight: 700 }}>
          What can guests use at your hotel?
        </Typography>
        <Stack sx={{ backgroundColor: "white", p: 5, gap: 4 }}>
          <Stack>
            <FormGroup sx={{ maxHeight: 300, overflowY: "auto" }}>
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="Restaurant"
              />
              <FormControlLabel
                control={<Checkbox />}
                label="Room service

"
              />
              <FormControlLabel control={<Checkbox />} label="Bar" />
              <FormControlLabel
                control={<Checkbox />}
                label="24-hour front desk"
              />
              <FormControlLabel control={<Checkbox />} label="Sauna" />
              <FormControlLabel control={<Checkbox />} label="Fitness centre" />
              <FormControlLabel control={<Checkbox />} label="Garden" />
              <FormControlLabel control={<Checkbox />} label="Terrace" />
              <FormControlLabel
                control={<Checkbox />}
                label="Non-smoking rooms"
              />
              <FormControlLabel
                control={<Checkbox />}
                label="Airport shuttle"
              />
              <FormControlLabel control={<Checkbox />} label="Family rooms" />
              <FormControlLabel
                control={<Checkbox />}
                label="Spa and wellness centre"
              />
              <FormControlLabel
                control={<Checkbox />}
                label="Hot tub/Jacuzzi"
              />
              <FormControlLabel control={<Checkbox />} label="Free WiFi" />
              <FormControlLabel
                control={<Checkbox />}
                label="Air conditioning"
              />
              <FormControlLabel control={<Checkbox />} label="Water park" />
              <FormControlLabel
                control={<Checkbox />}
                label="Electric vehicle charging station"
              />
              <FormControlLabel control={<Checkbox />} label="Swimming pool" />
              <FormControlLabel control={<Checkbox />} label="Beach" />
            </FormGroup>
          </Stack>
          <Stack sx={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Button
              variant="outlined"
              sx={{
                height: 40,
                fontWeight: "bold",
                width: "30%",
              }}
              onClick={() =>
                router.push(
                  "/register-property/add-new-property/hotelNameAndRating"
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
                router.push("/register-property/add-new-property/hotelServices")
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

export default withLayoutCreateAccountMain(DefineHotelFacilities);
