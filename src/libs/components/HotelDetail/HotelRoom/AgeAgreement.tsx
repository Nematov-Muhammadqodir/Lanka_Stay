import {
  Checkbox,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { InitialValueInput } from "@/src/pages/hotels/hotelDetail/[id]/[roomId]";

interface AgeAgreementProps {
  initalValue: InitialValueInput;
  handleEditUserInfo: (key: string, value: any) => void;
}

const AgeAgreement = ({
  initalValue,
  handleEditUserInfo,
}: AgeAgreementProps) => {
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
        <RadioGroup
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={initalValue.ageConfirmation}
          onChange={(e: any) => {
            const val = e.target.value === "true";
            handleEditUserInfo("ageConfirmation", val);
          }}
        >
          <FormControlLabel
            value={true}
            control={<Radio />}
            label=" I confirm that I am over the age of 14 and I consent to the
            mandatory collection and use of my personal information as well as
            my dependent child(ren)’s personal information (where applicable) as
            described in the Booking.com Privacy Statement. *"
          />
        </RadioGroup>
      </Stack>
    </Stack>
  );
};

export default AgeAgreement;
