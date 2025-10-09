import { Stack, Typography } from "@mui/material";
import Head from "next/head";
import React from "react";
import TopMain from "./TopMain";

const withLayoutMain = (Component: any) => {
  return (props: any) => {
    return (
      <>
        <Head>
          <title>Lanka-Stay</title>
        </Head>
        <Stack id="pc-wrap">
          <Stack borderBottom={1} borderColor={"grey.300"}>
            <TopMain />
          </Stack>

          <Stack>
            <Component {...props} />
          </Stack>

          <Typography>FOOTER</Typography>
        </Stack>
      </>
    );
  };
};

export default withLayoutMain;
