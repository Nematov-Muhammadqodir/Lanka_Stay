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
import HoursDropdown from "@/src/libs/components/common/HoursDropdown";

const DefineHouseRules = () => {
  const router = useRouter();

  const [valueChildren, setValueChildren] = useState("yes");
  const [valuePets, setValuePets] = useState("yes");

  const handleChildrenChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValueChildren((event.target as HTMLInputElement).value);
  };

  const handlePetsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValuePets((event.target as HTMLInputElement).value);
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
                    <HoursDropdown />
                  </Stack>
                  <Stack gap={0.5}>
                    <Typography>Until</Typography>
                    <HoursDropdown />
                  </Stack>
                </Stack>
              </Stack>
              <Stack>
                <Typography className="bold-text-medium">Check out</Typography>
                <Stack
                  sx={{ flexDirection: "row", width: "100%", gap: "24px" }}
                >
                  <Stack gap={0.5}>
                    <Typography>From</Typography>
                    <HoursDropdown />
                  </Stack>
                  <Stack gap={0.5}>
                    <Typography>Until</Typography>
                    <HoursDropdown />
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
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  value={valueChildren}
                  onChange={handleChildrenChange}
                >
                  <FormControlLabel
                    value="yes"
                    control={<Radio />}
                    label="Yes"
                  />
                  <FormControlLabel value="no" control={<Radio />} label="No" />
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
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  value={valuePets}
                  onChange={handlePetsChange}
                >
                  <FormControlLabel
                    value="yes"
                    control={<Radio />}
                    label="Yes"
                  />
                  <FormControlLabel
                    value="upon request"
                    control={<Radio />}
                    label="Upon request"
                  />
                  <FormControlLabel value="no" control={<Radio />} label="No" />
                </RadioGroup>
              </FormControl>
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
              onClick={() =>
                router.push(
                  "/register-property/add-new-property/property-details-complete"
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

export default withLayoutCreateAccountMain(DefineHouseRules);
