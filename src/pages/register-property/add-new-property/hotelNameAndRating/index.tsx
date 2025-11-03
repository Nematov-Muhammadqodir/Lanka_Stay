import React, { useState } from "react";
import withLayoutCreateAccountMain from "@/src/libs/components/layout/registerProperty/create-account/CreateAccountMainLayout";
import {
  Button,
  Checkbox,
  Rating,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";

const DefineHotelNameRating = () => {
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
          Tell us about your hotel
        </Typography>
        <Stack sx={{ backgroundColor: "white", p: 5, gap: 4 }}>
          <Stack gap={1}>
            <Typography className="bold-text-medium">
              What's the name of your hotel?
            </Typography>
            <Stack sx={{ borderBottom: "1px solid grey", pb: 3 }}>
              <Typography className="small-bold-text">Property name</Typography>
              <TextField placeholder="Enter your property name" />
              <Typography className="small-text" sx={{ mt: 1 }}>
                This name will be seen by guests when they search for a place to
                stay.
              </Typography>
            </Stack>

            <Stack sx={{ mt: 2 }}>
              <Typography className="bold-text-medium">
                What is the star rating of your hotel?
              </Typography>
              <Stack sx={{ flexDirection: "row", alignItems: "center" }}>
                <Checkbox
                  checked={checked}
                  onChange={handleChange}
                  inputProps={{ "aria-label": "controlled" }}
                />
                <Rating name="read-only" value={1} readOnly />
              </Stack>
              <Stack sx={{ flexDirection: "row", alignItems: "center" }}>
                <Checkbox
                  checked={checked}
                  onChange={handleChange}
                  inputProps={{ "aria-label": "controlled" }}
                />
                <Rating name="read-only" value={2} readOnly />
              </Stack>

              <Stack sx={{ flexDirection: "row", alignItems: "center" }}>
                <Checkbox
                  checked={checked}
                  onChange={handleChange}
                  inputProps={{ "aria-label": "controlled" }}
                />
                <Rating name="read-only" value={3} readOnly />
              </Stack>

              <Stack sx={{ flexDirection: "row", alignItems: "center" }}>
                <Checkbox
                  checked={checked}
                  onChange={handleChange}
                  inputProps={{ "aria-label": "controlled" }}
                />
                <Rating name="read-only" value={4} readOnly />
              </Stack>

              <Stack sx={{ flexDirection: "row", alignItems: "center" }}>
                <Checkbox
                  checked={checked}
                  onChange={handleChange}
                  inputProps={{ "aria-label": "controlled" }}
                />
                <Rating name="read-only" value={5} readOnly />
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
                router.push("/register-property/add-new-property/address")
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
                  "/register-property/add-new-property/hotelFacilities"
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

export default withLayoutCreateAccountMain(DefineHotelNameRating);
