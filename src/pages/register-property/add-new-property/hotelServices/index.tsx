import React, { useState } from "react";
import withLayoutCreateAccountMain from "@/src/libs/components/layout/registerProperty/create-account/CreateAccountMainLayout";
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Radio,
  RadioGroup,
  Rating,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";

const DefineHotelServices = () => {
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
          Services at your property
        </Typography>
        <Stack sx={{ flexDirection: "row", gap: 5 }}>
          <Stack sx={{ backgroundColor: "white", p: 3, gap: 4 }}>
            <Typography
              className="bold-text"
              sx={{ pb: 3, borderBottom: "1px solid gray" }}
            >
              Breakfast
            </Typography>
            <Stack>
              <FormControl>
                <Typography className="bold-text-medium">
                  Do you serve guests breakfast?
                </Typography>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="no"
                  name="radio-buttons-group"
                >
                  <FormControlLabel
                    value="yes"
                    control={<Radio />}
                    label="Yes"
                  />
                  <FormControlLabel value="no" control={<Radio />} label="No" />
                </RadioGroup>
              </FormControl>
            </Stack>
          </Stack>

          <Stack sx={{ backgroundColor: "white", p: 3, gap: 4 }}>
            <Typography
              className="bold-text"
              sx={{ pb: 3, borderBottom: "1px solid gray" }}
            >
              Parking
            </Typography>
            <Stack>
              <FormControl>
                <Typography className="bold-text-medium">
                  Is parking available to guests?
                </Typography>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="no"
                  name="radio-buttons-group"
                >
                  <FormControlLabel
                    value="yesFree"
                    control={<Radio />}
                    label="Yes, free"
                  />
                  <FormControlLabel
                    value="yesPaid"
                    control={<Radio />}
                    label="Yes, paid"
                  />
                  <FormControlLabel value="no" control={<Radio />} label="No" />
                </RadioGroup>
              </FormControl>
            </Stack>
          </Stack>
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
              router.push("/register-property/add-new-property/hotelFacilities")
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
              router.push("/register-property/add-new-property/staffLanguages")
            }
          >
            Continue
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default withLayoutCreateAccountMain(DefineHotelServices);
