import React from "react";
import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
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
  setPropertyFacilities,
} from "@/src/slices/createPartnerPropertySlice";
import { PropertyFacilities } from "@/src/libs/enums/property.enum";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const DefineHotelFacilities = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const partnerPropertyInput = useSelector(partnerPropertyInputValue);
  console.log("partnerPropertyInput", partnerPropertyInput);

  // Array of all facilities
  const allFacilities = [
    PropertyFacilities.RESTAURANT,
    PropertyFacilities.ROOM_SERVICE,
    PropertyFacilities.BAR,
    PropertyFacilities.FRONT_DESK,
    PropertyFacilities.SAUNA,
    PropertyFacilities.FITNESS_CENTER,
    PropertyFacilities.GARDEN,
    PropertyFacilities.TERRACE,
    PropertyFacilities.NON_SMOKING_ROOMS,
    PropertyFacilities.AIRPORT_SHUTTLE,
    PropertyFacilities.FAMILY_ROOMS,
    PropertyFacilities.SPA_AND_WELLNESS_CENTER,
    PropertyFacilities.HOT_TUB_JAZZ,
    PropertyFacilities.FREE_WI_FI,
    PropertyFacilities.AIR_CONDITIONING,
    PropertyFacilities.WATER_PARK,
    PropertyFacilities.ELECTRIC_VEHICLE_CHARGING_STATION,
    PropertyFacilities.SWIMMING_POOL,
    PropertyFacilities.BEACHFRONT,
  ];

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
            What can guests use at your hotel?
          </Typography>
          <Stack sx={{ backgroundColor: "white", p: 5, gap: 4 }}>
            <FormGroup sx={{ maxHeight: 300, overflowY: "auto" }}>
              {allFacilities.map((facility) => (
                <FormControlLabel
                  key={facility}
                  control={
                    <Checkbox
                      value={facility}
                      checked={partnerPropertyInput.propertyFacilities.includes(
                        facility
                      )}
                      onChange={() => dispatch(setPropertyFacilities(facility))}
                    />
                  }
                  label={facility}
                />
              ))}
            </FormGroup>

            <Stack
              sx={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Button
                variant="outlined"
                sx={{ height: 40, fontWeight: "bold", width: "30%" }}
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
                  router.push(
                    "/register-property/add-new-property/hotelServices"
                  )
                }
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
export default DefineHotelFacilities;
