import React, { useState } from "react";
import { Button, Checkbox, FormGroup, Stack, Typography } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import { SelectChangeEvent } from "@mui/material/Select";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { useRouter } from "next/router";
import LayoutCreateAccountMain from "@/src/libs/components/layout/registerProperty/create-account/CreateAccountMainLayout";

const BathRoomDetails = () => {
  const [isSmokingAllowed, setIsSmokingAllowed] = useState<boolean>(true);
  const router = useRouter();

  const handleIsSmokingAllowedChange = (event: SelectChangeEvent) => {
    setIsSmokingAllowed(event.target.value === "true");
  };
  return (
    <LayoutCreateAccountMain>
      <Stack sx={{ backgroundColor: "#FAF8FA", height: "auto", pb: 20 }}>
        <Stack className="container">
          <Stack sx={{ mt: 10, gap: 2 }}>
            <Typography sx={{ fontSize: 40, fontWeight: 700 }}>
              Bathroom details
            </Typography>
            <Stack
              width={500}
              height={"auto"}
              border={"1px solid black"}
              sx={{
                backgroundColor: "white",
              }}
              p={2}
              gap={1.5}
              borderRadius={2}
              borderColor={"#E7E7E7"}
              justifyContent={"space-between"}
            >
              <Stack
                sx={{
                  borderBottom: "1px solid",
                  pb: 4,
                  borderColor: "#E7E7E7",
                }}
              >
                <Typography className="bold-text-medium">
                  Is the bathroom private?
                </Typography>
                <FormControl>
                  <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={isSmokingAllowed}
                    onChange={handleIsSmokingAllowedChange}
                  >
                    <FormControlLabel
                      value={true}
                      control={<Radio />}
                      label="Yes"
                    />
                    <FormControlLabel
                      value={false}
                      control={<Radio />}
                      label="No, it's shared"
                    />
                  </RadioGroup>
                </FormControl>
              </Stack>

              <Stack mt={2}>
                <Typography className="bold-text-medium">
                  Which bathroom items are available in this room?
                </Typography>
                <Stack>
                  <FormGroup>
                    <FormControlLabel
                      control={<Checkbox />}
                      label="Toilet paper"
                    />
                    <FormControlLabel control={<Checkbox />} label="Shower" />
                    <FormControlLabel control={<Checkbox />} label="Toilet" />
                    <FormControlLabel
                      control={<Checkbox />}
                      label="Hairdryer"
                    />
                    <FormControlLabel control={<Checkbox />} label="Bath" />
                    <FormControlLabel
                      control={<Checkbox />}
                      label="Free toiletries"
                    />
                    <FormControlLabel control={<Checkbox />} label="Bidet" />
                    <FormControlLabel control={<Checkbox />} label="Slippers" />
                    <FormControlLabel control={<Checkbox />} label="Bathrobe" />
                    <FormControlLabel control={<Checkbox />} label="Spa bath" />
                  </FormGroup>
                </Stack>
              </Stack>
            </Stack>

            <Stack
              sx={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: 500,
              }}
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
                    "/register-property/add-new-property/add-property-rooms/room-details"
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
                    "/register-property/add-new-property/add-property-rooms/room-facilities"
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
