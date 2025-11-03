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

const DefineHotelStaffLanguages = () => {
  const router = useRouter();

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
          What languages do <br /> you or your staff speak?
        </Typography>
        <Stack sx={{ backgroundColor: "white", p: 5, gap: 4 }}>
          <Stack>
            <FormGroup sx={{ maxHeight: 300, overflowY: "auto" }}>
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="English"
              />
              <FormControlLabel control={<Checkbox />} label="French" />
              <FormControlLabel control={<Checkbox />} label="Italian" />
              <FormControlLabel control={<Checkbox />} label="Russian" />
              <FormControlLabel control={<Checkbox />} label="Spanish" />
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
                router.push("/register-property/add-new-property/hotelServices")
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
                router.push("/register-property/add-new-property/houseRules")
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

export default withLayoutCreateAccountMain(DefineHotelStaffLanguages);
