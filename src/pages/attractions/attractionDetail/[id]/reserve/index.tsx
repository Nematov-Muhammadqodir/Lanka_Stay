import withLayoutAttractionsReserve from "@/src/libs/components/layout/attractions/AttractionReserveLayout";
import {
  Box,
  Button,
  Checkbox,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const TickerReserve = () => {
  const [phone, setPhone] = useState("");
  return (
    <Stack
      className="container"
      mt={"20px !important"}
      gap={2}
      mb={"40px !important"}
    >
      <Stack flexDirection={"row"}>
        <Stack width={"67%"} className="reserve-left">
          <Stack borderBottom={1} borderColor={"grey.300"} pb={5}>
            <Stack gap={1} mb={2}>
              <Typography className="small-text">Step 1 of 2</Typography>
              <Stack>
                <Typography className="bold-text">Yacht Tour</Typography>
                <Typography>This experience is hosted by a business</Typography>
              </Stack>
            </Stack>
            <Stack gap={1}>
              <Typography className="bold-text">Your details</Typography>
              <Stack flexDirection={"row"} gap={5}>
                <Stack gap={0.5}>
                  <Typography className="small-bold-text">
                    First name
                  </Typography>
                  <TextField placeholder="First Name" sx={{ width: 216 }} />
                </Stack>
                <Stack gap={0.5}>
                  <Typography className="small-bold-text">Last name</Typography>
                  <TextField placeholder="Last Name" sx={{ width: 216 }} />
                </Stack>
              </Stack>
              <Stack>
                <Stack gap={0.5}>
                  <Typography className="small-bold-text">
                    Email address
                  </Typography>
                  <TextField placeholder="Your email" sx={{ width: 470 }} />
                  <Typography className="small-text">
                    We'll send your confirmation details to
                    nematovmuhammadqodir68@gmail.com
                  </Typography>
                </Stack>
              </Stack>
              <Stack gap={1}>
                <Typography className="small-bold-text">Phone No</Typography>

                <Box
                  sx={{
                    width: 470, // match other inputs
                    "--react-international-phone-border-radius": "3px",
                    "--react-international-phone-height": "52px",
                    "--react-international-phone-background-color": "white",
                    "--react-international-phone-border-color": "#E0E0E0",
                    "--react-international-phone-font-size": "16px",
                    "--react-international-phone-text-color": "#000",
                    "& .react-international-phone-input": {
                      width: "100%",
                    },
                    "& .react-international-phone-country-selector-button": {
                      borderTopLeftRadius: "3px",
                      borderBottomLeftRadius: "3px",
                    },
                  }}
                >
                  <PhoneInput
                    defaultCountry="ua"
                    value={phone}
                    onChange={(phone) => setPhone(phone)}
                  />
                </Box>
              </Stack>
            </Stack>
          </Stack>

          <Stack gap={1}>
            <Typography className="bold-text-medium">
              Please agree to the following:*
            </Typography>
            <Stack flexDirection={"row"}>
              <Checkbox />
              <Typography className="small-text">
                I confirm that I am over the age of 14 and I consent to the
                mandatory collection and use of my personal information as well
                as my dependent child(ren)’s personal information (where
                applicable) as described in the Booking.com
              </Typography>
            </Stack>
            <Stack flexDirection={"row"}>
              <Checkbox />
              <Typography className="small-text">
                I consent to the mandatory provision and/or transfer of my
                personal information as well as my dependent child(ren)’s
                personal information (where applicable) to third parties both
                inside and outside South Korea, as described in the Booking.com
                Privacy Statement. In particular, as is necessary to complete my
                booking, I consent for my personal information to be shared with
                Klook and used in accordance with its privacy statement
              </Typography>
            </Stack>
            <Typography className="small-text">
              By clicking 'Payment details' and completing your booking, you
              agree to the terms and conditions of both Booking.com and of
              Klook.
            </Typography>
          </Stack>

          <Button variant="contained" sx={{ mt: 4 }}>
            <Stack flexDirection={"row"}>
              <Typography
                color={"secondary.contrastText"}
                className="bold-text-medium"
                textTransform={"capitalize"}
              >
                Payment details
              </Typography>
              <ChevronRightIcon sx={{ color: "secondary.contrastText" }} />
            </Stack>
          </Button>
        </Stack>
        <Stack width={"30%"} className="reserve-right">
          right
        </Stack>
      </Stack>
    </Stack>
  );
};

export default withLayoutAttractionsReserve(TickerReserve);
