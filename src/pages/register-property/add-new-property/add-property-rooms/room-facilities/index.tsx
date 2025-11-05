import React, { useState } from "react";
import withLayoutCreateAccountMain from "@/src/libs/components/layout/registerProperty/create-account/CreateAccountMainLayout";
import { Button, Checkbox, FormGroup, Stack, Typography } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import { SelectChangeEvent } from "@mui/material/Select";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { useRouter } from "next/router";

const RoomFacilities = () => {
  const [isSmokingAllowed, setIsSmokingAllowed] = useState<boolean>(true);
  const router = useRouter();

  const handleIsSmokingAllowedChange = (event: SelectChangeEvent) => {
    setIsSmokingAllowed(event.target.value === "true");
  };
  return (
    <Stack sx={{ backgroundColor: "#FAF8FA", height: "auto", pb: 20 }}>
      <Stack className="container">
        <Stack sx={{ mt: 10, gap: 2 }}>
          <Typography sx={{ fontSize: 40, fontWeight: 700 }}>
            What can guests use in <br /> this room?
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
              mt={2}
              sx={{
                borderBottom: "1px solid",
                pb: 4,
                borderColor: "#E7E7E7",
                mt: 2,
              }}
            >
              <Typography className="bold-text-medium">
                General amenities
              </Typography>
              <Stack>
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Clothes rack"
                  />
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Flat-screen TV"
                  />
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Air conditioning"
                  />
                  <FormControlLabel control={<Checkbox />} label="Linen" />
                  <FormControlLabel control={<Checkbox />} label="Desk" />
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Wake-up service"
                  />
                  <FormControlLabel control={<Checkbox />} label="Towels" />
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Wardrobe or closet"
                  />
                  <FormControlLabel control={<Checkbox />} label="Heating" />
                  <FormControlLabel control={<Checkbox />} label="Fan" />
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Safety deposit box"
                  />
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Towels/sheets (extra fee)"
                  />
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Entire unit located on ground floor"
                  />
                </FormGroup>
              </Stack>
            </Stack>

            <Stack
              mt={2}
              sx={{
                borderBottom: "1px solid",
                pb: 4,
                borderColor: "#E7E7E7",
                mt: 2,
              }}
            >
              <Typography className="bold-text-medium">
                Outdoors and views
              </Typography>
              <Stack>
                <FormGroup>
                  <FormControlLabel control={<Checkbox />} label="Balcony" />
                  <FormControlLabel control={<Checkbox />} label="Terrace" />
                  <FormControlLabel control={<Checkbox />} label="View" />
                </FormGroup>
              </Stack>
            </Stack>

            <Stack
              sx={{
                mt: 2,
              }}
            >
              <Typography className="bold-text-medium">
                Food and drink
              </Typography>
              <Stack>
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Electric kettle"
                  />
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Tea/Coffee maker"
                  />
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Dining area"
                  />
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Dining table"
                  />
                  <FormControlLabel control={<Checkbox />} label="Microwave" />
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
                  "/register-property/add-new-property/add-property-rooms/bathroom-details"
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
                  "/register-property/add-new-property/add-property-rooms/room-name"
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

export default withLayoutCreateAccountMain(RoomFacilities);
