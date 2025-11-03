import React, { useState } from "react";
import withLayoutCreateAccountMain from "@/src/libs/components/layout/registerProperty/create-account/CreateAccountMainLayout";
import { Button, Stack, TextField, Typography } from "@mui/material";
import Image from "next/image";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import countries from "world-countries";
import { useRouter } from "next/router";

const DefineAddress = () => {
  const router = useRouter();
  const [country, setCountry] = useState("");
  const [region, setRegion] = useState("");

  const onChangeCountry = (val: any) => {
    console.log("val", val);
    setCountry(val);
    if (!val) {
      setRegion("");
    }
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
                value={country}
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
                country={country}
                value={region}
                onChange={(val) => setRegion(val)}
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
                />
              </Stack>
              <Stack>
                <Typography>Post code / Zip code</Typography>
                <TextField placeholder="Post code / Zip code" />
              </Stack>
            </Stack>
          </Stack>
          <Button
            variant="contained"
            sx={{ height: 40, color: "white", fontWeight: "bold" }}
            onClick={() =>
              router.push(
                "/register-property/add-new-property/hotelNameAndRating"
              )
            }
          >
            Continue
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default withLayoutCreateAccountMain(DefineAddress);
