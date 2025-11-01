import { Stack } from "@mui/material";
import Head from "next/head";
import React from "react";
import Footer from "../Footer";
import RegisterTopMain from "./RegisterTopMain";
import RegisterBottomMain from "./RegisterBottomMain";
import RegisterPropertyFooter from "./RegosterPropertyFooter";

const withLayoutRegisterMain = (Component: any) => {
  return (props: any) => {
    return (
      <>
        <Head>
          <title>Lanka-Stay</title>
        </Head>
        <Stack id="pc-wrap">
          <Stack sx={{ backgroundColor: "#053A95" }}>
            <Stack borderBottom={1} borderColor={"grey.300"}>
              <RegisterTopMain />
              <RegisterBottomMain />
            </Stack>
          </Stack>
          <Stack>
            <Component {...props} />
          </Stack>

          <Stack sx={{ backgroundColor: "#053A95" }}>
            <RegisterPropertyFooter />
          </Stack>
        </Stack>
      </>
    );
  };
};

export default withLayoutRegisterMain;
