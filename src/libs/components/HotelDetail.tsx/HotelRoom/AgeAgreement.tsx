import { Checkbox, Stack, Typography } from "@mui/material";
import React from "react";

const AgeAgreement = () => {
  return (
    <Stack
      border={"1px solid"}
      p={2}
      borderRadius={3}
      borderColor={"text.disabled"}
      mt={2}
    >
      <Typography className="bold-text">
        Required to complete your booking
      </Typography>
      <Typography className="small-text">
        Please agree to the following:*
      </Typography>
      <Stack gap={2} mt={2}>
        <Stack flexDirection={"row"}>
          <Checkbox />
          <Typography>
            I confirm that I am over the age of 14 and I consent to the
            mandatory collection and use of my personal information as well as
            my dependent child(ren)’s personal information (where applicable) as
            described in the Booking.com Privacy Statement. *
          </Typography>
        </Stack>
        <Stack flexDirection={"row"}>
          <Checkbox />
          <Typography>
            I confirm that I am over the age of 14 and I consent to the
            mandatory collection and use of my personal information as well as
            my dependent child(ren)’s personal information (where applicable) as
            described in the Booking.com Privacy Statement. *
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default AgeAgreement;
