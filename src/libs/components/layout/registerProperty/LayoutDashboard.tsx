import { Button, Stack, Typography } from "@mui/material";
import Head from "next/head";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useReactiveVar } from "@apollo/client";
import { partnerVar } from "@/apollo/store";
import { logOutPartner } from "@/src/libs/auth";
import LogoutIcon from "@mui/icons-material/Logout";
import DashboardIcon from "@mui/icons-material/Dashboard";

const withLayoutDashboard = (Component: any) => {
  return (props: any) => {
    const partner = useReactiveVar(partnerVar);
    const router = useRouter();

    const handleLogout = () => {
      logOutPartner();
      router.push("/register-property/create-account");
    };

    return (
      <>
        <Head>
          <title>Dashboard - Lanka-Stay</title>
        </Head>
        <Stack id="pc-wrap">
          {/* Top Bar */}
          <Stack
            sx={{
              backgroundColor: "primary.main",
              borderBottom: "1px solid",
              borderColor: "divider",
            }}
          >
            <Stack
              className="container"
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              py={1.5}
            >
              <Stack direction="row" alignItems="center" gap={2}>
                <Link href="/">
                  <Image src="/file.svg" alt="Logo" width={130} height={28} />
                </Link>
                <Stack
                  direction="row"
                  alignItems="center"
                  gap={0.5}
                  sx={{
                    backgroundColor: "rgba(255,255,255,0.15)",
                    px: 1.5,
                    py: 0.5,
                    borderRadius: 1,
                  }}
                >
                  <DashboardIcon sx={{ color: "white", fontSize: 18 }} />
                  <Typography
                    fontSize={13}
                    fontWeight={600}
                    color="white"
                  >
                    Partner Dashboard
                  </Typography>
                </Stack>
              </Stack>

              <Stack direction="row" alignItems="center" gap={2}>
                <Typography fontSize={14} color="white">
                  {partner?.partnerFirstName} {partner?.partnerLastName}
                </Typography>
                <Button
                  onClick={handleLogout}
                  startIcon={<LogoutIcon sx={{ color: "white" }} />}
                  sx={{
                    color: "white",
                    textTransform: "none",
                    fontSize: 13,
                    fontWeight: 600,
                    border: "1px solid rgba(255,255,255,0.3)",
                    borderRadius: 1.5,
                    px: 2,
                    "&:hover": {
                      backgroundColor: "rgba(255,255,255,0.1)",
                    },
                  }}
                >
                  Logout
                </Button>
              </Stack>
            </Stack>
          </Stack>

          {/* Content */}
          <Stack>
            <Component {...props} />
          </Stack>

          {/* Footer */}
          <Stack
            sx={{
              backgroundColor: "background.paper",
              borderTop: "1px solid",
              borderColor: "divider",
              py: 2,
            }}
          >
            <Stack className="container">
              <Typography fontSize={12} color="text.secondary" textAlign="center">
                LankaStay.com - Partner Dashboard
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </>
    );
  };
};

export default withLayoutDashboard;
