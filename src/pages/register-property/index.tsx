import withLayoutRegisterMain from "@/src/libs/components/layout/registerProperty/LayoutRegisterMain";
import BigMap from "@/src/libs/components/register-property/BigMap";
import HostWorryFree from "@/src/libs/components/register-property/HostWorryFree";
import { Stack } from "@mui/material";
import React from "react";

const RegisterProperty = () => {
  return (
    <Stack>
      <BigMap />
      <HostWorryFree />
    </Stack>
  );
};

export default withLayoutRegisterMain(RegisterProperty);
