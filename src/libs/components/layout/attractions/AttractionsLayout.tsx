import { Stack } from "@mui/material";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import TopMain from "../TopMain";
import Filtering from "../Filtering";
import Footer from "../Footer";
import AttractionsLayoutBanner from "../../attractions/AttractionsBanner";
import { useReactiveVar } from "@apollo/client";
import { userVar } from "@/apollo/store";
import { useRouter } from "next/router";
import { UserRole } from "@/src/libs/enums/user.enum";
import { getJwtToken, updateUserInfo } from "@/src/libs/auth";
import AIChatWidget from "../../chat/AIChatWidget";

const withLayoutAttractions = (Component: any) => {
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
          <AIChatWidget />
        </Stack>
      </>
    );
  };
};

export default withLayoutAttractions;
