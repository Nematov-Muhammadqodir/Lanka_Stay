import { Stack } from "@mui/material";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import TopMain from "./TopMain";
import Filtering from "./Filtering";
import Footer from "./Footer";
import DetailLayoutBanner from "../HotelDetail/DetailLayoutBanner";
import { useReactiveVar } from "@apollo/client";
import { userVar } from "@/apollo/store";
import { UserRole } from "../../enums/user.enum";
import { useRouter } from "next/router";
import { getJwtToken, updateUserInfo } from "../../auth";

const withLayoutSecondary = (Component: any) => {
  return (props: any) => {
    const router = useRouter();
    const user = useReactiveVar(userVar);
    console.log("User in LayoutSecondary:", user);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      if (!loading && user.userRole !== UserRole.ADMIN) {
        router.push("/").then();
      }
    }, [loading, user, router]);

    useEffect(() => {
      const jwt = getJwtToken();
      if (jwt) updateUserInfo(jwt);
    }, []);
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
