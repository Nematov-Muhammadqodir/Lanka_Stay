import { Stack } from "@mui/material";
import Head from "next/head";
import React from "react";
import TopMain from "../TopMain";
import Footer from "../Footer";

const withLayoutAttractionsReserve = (Component: any) => {
  return (props: any) => {
    return (
      <>
        <Head>
          <title>Lanka-Stay</title>
        </Head>
        <Stack id="pc-wrap">
          <Stack>
            <Stack borderBottom={1} borderColor={"grey.300"}>
              <TopMain />
            </Stack>
          </Stack>

          <Stack>
            <Component {...props} />
          </Stack>

          <Stack>
            <Footer />
          </Stack>
        </Stack>
      </>
    );
  };
};

export default withLayoutAttractionsReserve;
