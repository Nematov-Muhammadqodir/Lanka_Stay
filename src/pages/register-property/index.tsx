import withLayoutRegisterMain from "@/src/libs/components/layout/registerProperty/LayoutRegisterMain";
import BigMap from "@/src/libs/components/register-property/BigMap";
import HostWorryFree from "@/src/libs/components/register-property/HostWorryFree";
import { Stack } from "@mui/material";
import React from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const RegisterProperty = () => {
  return (
    <Stack>
      <BigMap />
      <HostWorryFree />
    </Stack>
  );
};

export const getServerSideProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "ko", ["common"])),
  },
});
export default withLayoutRegisterMain(RegisterProperty);
