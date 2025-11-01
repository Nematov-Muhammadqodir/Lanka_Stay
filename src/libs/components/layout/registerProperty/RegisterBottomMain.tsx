import React from "react";
import { Stack, Typography } from "@mui/material";
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
          <Stack>
            <Typography sx={{ fontWeight: 700, color: "white" }} variant="h2">
              List your <br />
            </Typography>
            <Typography sx={{ fontWeight: 700, color: "#0095FF" }} variant="h2">
              property on <br />
            </Typography>
            <Typography sx={{ fontWeight: 700, color: "white" }} variant="h2">
              LankaStay.com
            </Typography>
          </Stack>

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
