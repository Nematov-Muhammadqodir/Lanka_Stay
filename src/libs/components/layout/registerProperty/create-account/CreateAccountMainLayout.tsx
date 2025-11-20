import { Stack } from "@mui/material";
import Head from "next/head";
import React, { ReactNode, useEffect } from "react";
import CreateAccountTop from "./CreateAccountTop";
import { useReactiveVar } from "@apollo/client";
import { partnerVar } from "@/apollo/store";
import { getPartnerJwtToken, updatePartnerInfo } from "@/src/libs/auth";
import { useRouter } from "next/router";

interface LayoutCreateAccountMainProps {
  children: ReactNode;
}

const LayoutCreateAccountMain = ({
  children,
}: LayoutCreateAccountMainProps) => {
  const partner = useReactiveVar(partnerVar);
  console.log("Partner", partner);

  useEffect(() => {
    const jwt = getPartnerJwtToken();
    if (jwt) updatePartnerInfo(jwt);
  }, []);

  return (
    <>
      <Head>
        <title>Lanka-Stay</title>
      </Head>
      <Stack id="pc-wrap">
        <Stack sx={{ backgroundColor: "#053A95" }}>
          <Stack borderBottom={1} borderColor={"grey.300"}>
            <CreateAccountTop partner={partner} />
          </Stack>
        </Stack>
        <Stack>{children}</Stack>
      </Stack>
    </>
  );
};

export default LayoutCreateAccountMain;
