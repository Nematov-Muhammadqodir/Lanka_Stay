import React, { useState } from "react";
import { Button, Stack, TextField, Typography } from "@mui/material";
import Image from "next/image";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import { useRouter } from "next/router";
import LayoutCreateAccountMain from "@/src/libs/components/layout/registerProperty/create-account/CreateAccountMainLayout";
import { useDispatch, useSelector } from "react-redux";
import {
  partnerPropertyInputValue,
  setPropertyCity,
  setPropertyCountry,
  setPropertyPostCode,
  setPropertyRegion,
} from "@/src/slices/createPartnerPropertySlice";
import { sweetErrorAlert } from "@/src/libs/sweetAlert";

const DefineAddress = () => {
  const router = useRouter();

  const dispatch = useDispatch();
  const partnerPropertyInput = useSelector(partnerPropertyInputValue);

  const onChangeCountry = (val: any) => {
    dispatch(setPropertyCountry(val));
    if (!partnerPropertyInput.propertyCountry) {
      dispatch(setPropertyRegion(""));
    }
  };
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
            zIndex: 1000,
            position: "absolute",
            left: "10%",
            top: "10%",
            gap: 2,
          }}
        >
          <Typography sx={{ fontSize: 40, fontWeight: 700 }}>
            Where is your property?
          </Typography>
          <Stack sx={{ backgroundColor: "white", p: 5, gap: 4 }}>
            <Stack gap={1}>
              <Stack gap={1}>
                <Typography sx={{ fontWeight: 500 }}>Country</Typography>
                <CountryDropdown
                  value={partnerPropertyInput.propertyCountry}
                  onChange={onChangeCountry}
                  style={{
                    padding: 10,
                    fontSize: 20,
                    borderRadius: 10,
                    borderColor: "#D2D2D2",
                  }}
                />
              </Stack>
              <Stack gap={1}>
                <Typography sx={{ fontWeight: 500 }}>Region</Typography>
                <RegionDropdown
                  country={partnerPropertyInput.propertyCountry}
                  value={partnerPropertyInput.propertyRegion}
                  onChange={(val) => dispatch(setPropertyRegion(val))}
                  style={{
                    padding: 10,
                    fontSize: 20,
                    borderRadius: 10,
                    borderColor: "#D2D2D2",
                  }}
                />
              </Stack>
              <Stack
                sx={{
                  flexDirection: "row",
                  width: "100%",
                  justifyContent: "space-between",
                }}
              >
                <Stack>
                  <Typography>City</Typography>
                  <TextField
                    placeholder="Enter the city or district"
                    type="string"
                    onChange={(val) =>
                      dispatch(setPropertyCity(val.target.value))
                    }
                  />
                </Stack>
                <Stack>
                  <Typography>Post code / Zip code</Typography>
                  <TextField
                    placeholder="Post code / Zip code"
                    onChange={(val) =>
                      dispatch(setPropertyPostCode(val.target.value))
                    }
                  />
                </Stack>
              </Stack>
            </Stack>
            <Button
              variant="contained"
              sx={{ height: 40, color: "white", fontWeight: "bold" }}
              onClick={() => {
                if (
                  partnerPropertyInput.propertyCountry !== "" &&
                  partnerPropertyInput.propertyCity !== "" &&
                  partnerPropertyInput.propertyCity &&
                  partnerPropertyInput.propertyPostCode !== ""
                ) {
                  router.push(
                    "/register-property/add-new-property/hotelNameAndRating"
                  );
                } else {
                  sweetErrorAlert("Please fill all required fields!");
                  router.push("/register-property/add-new-property/address");
                }
              }}
            >
              Continue
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </LayoutCreateAccountMain>
  );
};
export default DefineAddress;
