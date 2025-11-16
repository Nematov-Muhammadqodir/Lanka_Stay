import { Stack } from "@mui/material";
import Head from "next/head";
import React from "react";
import TopMain from "../TopMain";
import Filtering from "../Filtering";
import Footer from "../Footer";
import AttractionsLayoutBanner from "../../attractions/AttractionsBanner";
import { useReactiveVar } from "@apollo/client";
import { userVar } from "@/apollo/store";

const withLayoutAttractions = (Component: any) => {
  return (props: any) => {
    const user = useReactiveVar(userVar);
    console.log("User in LayoutSecondary:", user);
    return (
      <>
        <Head>
          <title>Lanka-Stay</title>
        </Head>
        <Stack id="pc-wrap">
          <Stack>
            <Stack borderBottom={1} borderColor={"grey.300"}>
              <TopMain user={user} />
            </Stack>
            <Stack>
              <AttractionsLayoutBanner />
            </Stack>
            <Stack>
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

export default withLayoutAttractions;
