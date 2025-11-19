import { Stack } from "@mui/material";
import Head from "next/head";
import React, { useEffect } from "react";
import CreateAccountTop from "./CreateAccountTop";
import { useReactiveVar } from "@apollo/client";
import { partnerVar } from "@/apollo/store";
import { getPartnerJwtToken, updatePartnerInfo } from "@/src/libs/auth";

const withLayoutCreateAccountMain = (Component: any) => {
  return (props: any) => {
    const partner = useReactiveVar(partnerVar);
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
          <Stack>
            <Component {...props} />
          </Stack>
        </Stack>
      </>
    );
  };
};

export default withLayoutCreateAccountMain;
