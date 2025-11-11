import { Stack } from "@mui/material";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import TopMain from "../TopMain";
import Footer from "../Footer";
import { useRouter } from "next/router";
import { useReactiveVar } from "@apollo/client";
import { userVar } from "@/apollo/store";
import { UserRole } from "@/src/libs/enums/user.enum";
import { getJwtToken, updateUserInfo } from "@/src/libs/auth";

const withLayoutAttractionsReserve = (Component: any) => {
  return (props: any) => {
    const router = useRouter();
    const user = useReactiveVar(userVar);
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
