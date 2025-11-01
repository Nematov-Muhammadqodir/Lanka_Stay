import React from "react";
import { Button, Stack, Typography } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

const RegisterForFreeCard = () => {
  return (
    <Stack
      className="register-bottom-main-right"
      sx={{
        width: 415,
        height: 335,
        border: "5px solid #FFB700",
        borderRadius: 2,
        backgroundColor: "white",
        p: 3,
        gap: 2,
      }}
    >
      <Typography variant="h5" fontWeight={700}>
        Register for free
      </Typography>

      <Stack gap={2}>
        <Stack flexDirection={"row"} alignItems={"center"} gap={2}>
          <CheckIcon />
          <Typography>
            45% of hosts get their first booking within a week
          </Typography>
        </Stack>
        <Stack flexDirection={"row"} alignItems={"center"} gap={2}>
          <CheckIcon />
          <Typography>Choose instant bookings or Request to Book</Typography>
        </Stack>
        <Stack flexDirection={"row"} alignItems={"center"} gap={2}>
          <CheckIcon />
          <Typography>We'll facilitate payments for you</Typography>
        </Stack>
      </Stack>

      <Button
        variant="contained"
        sx={{
          color: "white",
          textTransform: "capitalize",
          py: 1.5,
          mt: 2,
        }}
      >
        <Stack flexDirection={"row"} gap={1}>
          <Typography sx={{ fontWeight: 700 }}>Get started now</Typography>
          <ArrowRightAltIcon />
        </Stack>
      </Button>
    </Stack>
  );
};

export default RegisterForFreeCard;
