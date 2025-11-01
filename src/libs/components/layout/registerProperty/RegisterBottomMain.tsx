import React from "react";
import { Button, Stack, Typography } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import RegisterForFreeCard from "./RegisterForFreeCard";

const RegisterBottomMain = () => {
  return (
    <Stack className="container">
      <Stack
        flexDirection={"row"}
        justifyContent={"space-between"}
        width={"100%"}
        mt={10}
        mb={10}
        className="register-bottom-main"
      >
        <Stack gap={3} className="register-bottom-main-left">
          <Typography sx={{ fontWeight: 700, color: "white" }} variant="h2">
            List your <br />
            <Typography color={"#0095FF"} sx={{ fontWeight: 700 }} variant="h2">
              property on <br />
            </Typography>
            LankaStay.com
          </Typography>
          <Typography
            variant="h5"
            sx={{ color: "white", fontWeight: 500, letterSpacing: 1 }}
          >
            List on one of the world’s most downloaded travel apps to earn
            <br /> more, faster and expand into new markets.
          </Typography>
        </Stack>
        <RegisterForFreeCard />
      </Stack>
    </Stack>
  );
};

export default RegisterBottomMain;
