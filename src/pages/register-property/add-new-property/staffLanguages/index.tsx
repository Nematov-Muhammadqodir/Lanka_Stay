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
  setHotelStaffLanguages,
} from "@/src/slices/createPartnerPropertySlice";
import { HotelStaffLanguages } from "@/src/libs/enums/property.enum";
import { sweetBasicAlert } from "@/src/libs/sweetAlert";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const DefineHotelStaffLanguages = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const partnerPropertyInput = useSelector(partnerPropertyInputValue);
  console.log("partnerPropertyInput", partnerPropertyInput);

  const handleLanguageChange = (language: HotelStaffLanguages) => {
    const current = partnerPropertyInput.hotelStaffLanguages;
    if (current.includes(language)) {
      // remove
      dispatch(setHotelStaffLanguages(current.filter((l) => l !== language)));
    } else {
      // add
      dispatch(setHotelStaffLanguages([...current, language]));
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
            <FormGroup sx={{ maxHeight: 300, overflowY: "auto" }}>
              {Object.values(HotelStaffLanguages).map((lang) => (
                <FormControlLabel
                  key={lang}
                  control={
                    <Checkbox
                      checked={partnerPropertyInput.hotelStaffLanguages.includes(
                        lang
                      )}
                      onChange={() => handleLanguageChange(lang)}
                    />
                  }
                  label={lang}
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
                    "/register-property/add-new-property/hotelServices"
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
                  if (partnerPropertyInput.hotelStaffLanguages.length === 0) {
                    sweetBasicAlert("Please select at least one language!");
                    router.push(
                      "/register-property/add-new-property/staffLanguages"
                    );
                  } else {
                    router.push(
                      "/register-property/add-new-property/houseRules"
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
export default DefineHotelStaffLanguages;
