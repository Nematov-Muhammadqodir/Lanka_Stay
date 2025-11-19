import React from "react";
import {
  Button,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import LayoutCreateAccountMain from "@/src/libs/components/layout/registerProperty/create-account/CreateAccountMainLayout";
import { useDispatch, useSelector } from "react-redux";
import {
  partnerPropertyInputValue,
  setBreakfastIncluded,
  setParkingIncluded,
} from "@/src/slices/createPartnerPropertySlice";

const DefineHotelServices = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const partnerPropertyInput = useSelector(partnerPropertyInputValue);
  console.log("partnerPropertyInput", partnerPropertyInput);

  return (
    <LayoutCreateAccountMain>
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
            {/* Breakfast Section */}
            <Stack sx={{ backgroundColor: "white", p: 3, gap: 4 }}>
              <Typography
                sx={{ pb: 3, borderBottom: "1px solid gray", fontWeight: 700 }}
              >
                Breakfast
              </Typography>
              <FormControl>
                <Typography sx={{ fontWeight: 500 }}>
                  Do you serve guests breakfast?
                </Typography>
                <RadioGroup
                  aria-label="breakfast"
                  name="breakfast"
                  value={partnerPropertyInput.breakfastIncluded ? "yes" : "no"}
                  onChange={(e) =>
                    dispatch(setBreakfastIncluded(e.target.value === "yes"))
                  }
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

            {/* Parking Section */}
            <Stack sx={{ backgroundColor: "white", p: 3, gap: 4 }}>
              <Typography
                sx={{ pb: 3, borderBottom: "1px solid gray", fontWeight: 700 }}
              >
                Parking
              </Typography>
              <FormControl>
                <Typography sx={{ fontWeight: 500 }}>
                  Is parking available to guests?
                </Typography>
                <RadioGroup
                  aria-label="parking"
                  name="parking"
                  value={partnerPropertyInput.parkingIncluded ? "yes" : "no"}
                  onChange={(e) =>
                    dispatch(setParkingIncluded(e.target.value === "yes"))
                  }
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

          <Stack sx={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Button
              variant="outlined"
              sx={{ height: 40, fontWeight: "bold", width: "30%" }}
              onClick={() =>
                router.push(
                  "/register-property/add-new-property/hotelFacilities"
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
                  "/register-property/add-new-property/staffLanguages"
                )
              }
            >
              Continue
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </LayoutCreateAccountMain>
  );
};

export default DefineHotelServices;
