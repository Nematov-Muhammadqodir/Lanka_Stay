import React, { useState } from "react";
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import HoursDropdown from "@/src/libs/components/common/HoursDropdown";
import LayoutCreateAccountMain from "@/src/libs/components/layout/registerProperty/create-account/CreateAccountMainLayout";
import {
  partnerPropertyInputValue,
  setAllowChildren,
  setAllowPets,
  setCheckInTimeFrom,
  setCheckInTimeUntill,
  setCheckOutTimeFrom,
  setCheckOutTimeUntill,
} from "@/src/slices/createPartnerPropertySlice";
import { useDispatch, useSelector } from "react-redux";
import { useMutation, useReactiveVar } from "@apollo/client";
import { partnerVar, userVar } from "@/apollo/store";
import { CREATE_PARTNER_PROPERTY } from "@/apollo/user/mutation";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const DefineHouseRules = () => {
  const partner = useReactiveVar(partnerVar);

  const router = useRouter();
  const dispatch = useDispatch();
  const partnerPropertyInput = useSelector(partnerPropertyInputValue);
  console.log("partnerPropertyInput", partnerPropertyInput);

  const handleCheckInFromChange = (time: string) =>
    dispatch(setCheckInTimeFrom(time));
  const handleCheckInUntilChange = (time: string) =>
    dispatch(setCheckInTimeUntill(time));
  const handleCheckOutFromChange = (time: string) =>
    dispatch(setCheckOutTimeFrom(time));
  const handleCheckOutUntilChange = (time: string) =>
    dispatch(setCheckOutTimeUntill(time));

  // Redux handlers
  const handleChildrenChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setAllowChildren(event.target.value === "yes")); // boolean
  };

  const handlePetsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value === "yes") dispatch(setAllowPets(true));
    else if (value === "no") dispatch(setAllowPets(false));
  };

  ///REQUEST
  /** APOLLO REQUESTS **/
  const [createPartnerProperty] = useMutation(CREATE_PARTNER_PROPERTY);

  const handleCreatePartnerProperty = async () => {
    console.log("partnerPropertyInput", partnerPropertyInput);
    await createPartnerProperty({
      variables: {
        input: {
          propertyType: partnerPropertyInput.propertyType,
          propertyCountry: partnerPropertyInput.propertyCountry,
          propertyRegion: partnerPropertyInput.propertyRegion,
          propertyCity: partnerPropertyInput.propertyCity,
          propertyPostCode: partnerPropertyInput.propertyPostCode,
          propertyName: partnerPropertyInput.propertyName,
          propertyStars: partnerPropertyInput.propertyStars,
          propertyFacilities: partnerPropertyInput.propertyFacilities,
          breakfastIncluded: partnerPropertyInput.breakfastIncluded,
          parkingIncluded: partnerPropertyInput.parkingIncluded,
          hotelStaffLanguages: partnerPropertyInput.hotelStaffLanguages,
          checkInTimeFrom: partnerPropertyInput.checkInTimeFrom,
          checkInTimeUntill: partnerPropertyInput.checkInTimeUntill,
          checkOutTimeFrom: partnerPropertyInput.checkOutTimeFrom,
          checkOutTimeUntill: partnerPropertyInput.checkOutTimeUntill,
          allowChildren: partnerPropertyInput.allowChildren,
          allowPets: partnerPropertyInput.allowPets,
        },
      },
    });
    router.push(
      "/register-property/add-new-property/property-details-complete"
    );
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
            House rules
          </Typography>
          <Stack gap={4}>
            <Stack
              sx={{
                backgroundColor: "white",
                p: 5,
                gap: 4,
                overflowY: "auto",
                height: "60vh",
              }}
            >
              <Typography className="bold-text">
                What are your check-in and check-out times?
              </Typography>

              <Stack
                sx={{
                  gap: 4,
                  borderBottom: "1px solid",
                  pb: 4,
                  borderColor: "grey.300",
                }}
              >
                <Stack>
                  <Typography className="bold-text-medium">Check in</Typography>
                  <Stack
                    sx={{ flexDirection: "row", width: "100%", gap: "24px" }}
                  >
                    <Stack gap={0.5}>
                      <Typography>From</Typography>
                      <HoursDropdown
                        value={partnerPropertyInput.checkInTimeFrom}
                        onChange={handleCheckInFromChange}
                      />
                    </Stack>
                    <Stack gap={0.5}>
                      <Typography>Until</Typography>
                      <HoursDropdown
                        value={partnerPropertyInput.checkInTimeUntill}
                        onChange={handleCheckInUntilChange}
                      />
                    </Stack>
                  </Stack>
                </Stack>
                <Stack>
                  <Typography className="bold-text-medium">
                    Check out
                  </Typography>
                  <Stack
                    sx={{ flexDirection: "row", width: "100%", gap: "24px" }}
                  >
                    <Stack gap={0.5}>
                      <Typography>From</Typography>
                      <HoursDropdown
                        value={partnerPropertyInput.checkOutTimeFrom}
                        onChange={handleCheckOutFromChange}
                      />
                    </Stack>
                    <Stack gap={0.5}>
                      <Typography>Until</Typography>
                      <HoursDropdown
                        value={partnerPropertyInput.checkOutTimeUntill}
                        onChange={handleCheckOutUntilChange}
                      />
                    </Stack>
                  </Stack>
                </Stack>
              </Stack>

              <Stack gap={4}>
                <FormControl>
                  <FormLabel
                    id="demo-controlled-radio-buttons-group"
                    className="bold-text-medium"
                  >
                    Do you allow children?
                  </FormLabel>
                  <RadioGroup
                    value={partnerPropertyInput.allowChildren ? "yes" : "no"}
                    onChange={handleChildrenChange}
                  >
                    <FormControlLabel
                      value="yes"
                      control={<Radio />}
                      label="Yes"
                    />
                    <FormControlLabel
                      value="no"
                      control={<Radio />}
                      label="No"
                    />
                  </RadioGroup>
                </FormControl>
                <FormControl>
                  <FormLabel
                    id="demo-controlled-radio-buttons-group"
                    className="bold-text-medium"
                  >
                    Do you allow pets?
                  </FormLabel>
                  <RadioGroup
                    value={
                      partnerPropertyInput.allowPets === true
                        ? "yes"
                        : partnerPropertyInput.allowPets === false
                        ? "no"
                        : "upon request"
                    }
                    onChange={handlePetsChange}
                  >
                    <FormControlLabel
                      value="yes"
                      control={<Radio />}
                      label="Yes"
                    />
                    <FormControlLabel
                      value="no"
                      control={<Radio />}
                      label="No"
                    />
                  </RadioGroup>
                </FormControl>
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
                  router.push(
                    "/register-property/add-new-property/staffLanguages"
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
                onClick={() => {
                  handleCreatePartnerProperty();
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
export default DefineHouseRules;
