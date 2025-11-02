import { Stack } from "@mui/material";
import Head from "next/head";
import React from "react";
import CreateAccountTop from "./CreateAccountTop";

const withLayoutCreateAccountMain = (Component: any) => {
  return (props: any) => {
    return (
      <>
        <Head>
          <title>Lanka-Stay</title>
        </Head>
        <Stack id="pc-wrap">
          <Stack sx={{ backgroundColor: "#053A95" }}>
            <Stack borderBottom={1} borderColor={"grey.300"}>
              <CreateAccountTop />
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
