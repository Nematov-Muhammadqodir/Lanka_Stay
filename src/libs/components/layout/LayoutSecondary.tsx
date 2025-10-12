import { Stack, Typography } from "@mui/material";
import Head from "next/head";
import React from "react";
import TopMain from "./TopMain";
import TopHome from "./TopHome";
import Filtering from "./Filtering";
import Footer from "./Footer";
import DetailLayoutBanner from "../HotelDetail.tsx/DetailLayoutBanner";

const withLayoutSecondary = (Component: any) => {
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
            <Stack>
              <DetailLayoutBanner />
            </Stack>
            <Stack mt={-5}>
              <Filtering />
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

export default withLayoutSecondary;
