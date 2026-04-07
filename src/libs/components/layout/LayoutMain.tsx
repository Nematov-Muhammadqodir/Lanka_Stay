import { Stack } from "@mui/material";
import Head from "next/head";
import React, { ComponentType, useEffect, useState } from "react";
import TopMain from "./TopMain";
import TopHome from "./TopHome";
import Filtering from "./Filtering";
import Footer from "./Footer";
import { useReactiveVar } from "@apollo/client";
import { partnerVar, userVar } from "@/apollo/store";
import { UserRole } from "../../enums/user.enum";
import { useRouter } from "next/router";
import { getJwtToken, updateUserInfo } from "../../auth";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import AIChatWidget from "../chat/AIChatWidget";

const withLayoutMain = (Component: ComponentType) => {
  return (props: object) => {
    const router = useRouter();
    const user = useReactiveVar(userVar);
    const partner = useReactiveVar(partnerVar);
    console.log("partner", partner);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      if (!loading && user.userRole !== UserRole.ADMIN) {
        router.push("/").then();
      }
    }, [loading, user, router]);
    const dispatch = useDispatch();
    const filters = useSelector((state: RootState) => state.filters);

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
              <TopHome />
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

export default withLayoutMain;
