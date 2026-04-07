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
import LayoutCreateAccountMain from "@/src/libs/components/layout/registerProperty/create-account/CreateAccountMainLayout";
import { useDispatch, useSelector } from "react-redux";
import {
  partnerPropertyInputValue,
  setPropertyName,
  setPropertyStars,
} from "@/src/slices/createPartnerPropertySlice";
import { sweetBasicAlert } from "@/src/libs/sweetAlert";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const DefineHotelNameRating = () => {
  const rating = [1, 2, 3, 4, 5];
  const router = useRouter();
  const dispatch = useDispatch();
  const partnerPropertyInput = useSelector(partnerPropertyInputValue);

  const handleChange = (event: any) => {
    console.log("event.target.value", event.target.value);
    dispatch(setPropertyStars(Number(event.target.value)));
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
                <Typography className="small-bold-text">
                  Property name
                </Typography>
                <TextField
                  placeholder="Enter your property name"
                  onChange={(e) => {
                    dispatch(setPropertyName(e.target.value));
                  }}
                />
                <Typography className="small-text" sx={{ mt: 1 }}>
                  This name will be seen by guests when they search for a place
                  to stay.
                </Typography>
              </Stack>

              <Stack sx={{ mt: 2 }}>
                <Typography className="bold-text-medium">
                  What is the star rating of your hotel?
                </Typography>
                {rating.map((item, index) => {
                  return (
                    <Stack sx={{ flexDirection: "row", alignItems: "center" }}>
                      <Checkbox
                        checked={partnerPropertyInput.propertyStars === item}
                        onChange={handleChange}
                        value={item}
                        inputProps={{ "aria-label": "controlled" }}
                      />
                      <Rating name="read-only" value={item} readOnly />
                    </Stack>
                  );
                })}
              </Stack>
            </Stack>
            <Stack
              sx={{ flexDirection: "row", justifyContent: "space-between" }}
            >
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
                onClick={() => {
                  if (
                    partnerPropertyInput.propertyStars === 0 ||
                    partnerPropertyInput.propertyStars > 5
                  ) {
                    sweetBasicAlert("Please rate your hotel rating!");
                    router.push(
                      "/register-property/add-new-property/hotelNameAndRating"
                    );
                  } else {
                    router.push(
                      "/register-property/add-new-property/hotelFacilities"
                    );
                  }
                }}
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
export default DefineHotelNameRating;
