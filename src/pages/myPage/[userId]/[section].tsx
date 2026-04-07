import withLayoutAttractionsReserve from "@/src/libs/components/layout/attractions/AttractionReserveLayout";
import MyPage from "@/src/libs/components/myAccount/MyPage";
import Reservations from "@/src/libs/components/myAccount/Reservations";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";
import StarsIcon from "@mui/icons-material/Stars";
import SettingsIcon from "@mui/icons-material/Settings";
import { useReactiveVar } from "@apollo/client";
import { userVar } from "@/apollo/store";
import withLayoutMyPage from "@/src/libs/components/layout/myPage/MyPageLayout";
import Image from "next/image";
import MyFavorites from "@/src/libs/components/myAccount/MyFavorites";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import AddReactionIcon from "@mui/icons-material/AddReaction";
import Activities from "@/src/libs/components/myAccount/Activities";
import Settings from "@/src/libs/components/myAccount/Settings";

const MyAccount = () => {
  const user = useReactiveVar(userVar);
  const router = useRouter();
  console.log("router", router.query);
  const { userId, section } = router.query;
  return (
    <Stack
      sx={{
        backgroundColor: "background.default",
        alignItems: "center",
        pb: 4,
        width: "100%",
        height: "100vh",
      }}
    >
      <Stack className="container" alignItems={"center"}>
        <Stack
          sx={{
            flexDirection: "row",
            mt: 4,
            mb: 4,
            justifyContent: "space-between",
            width: "80%",
          }}
        >
          <Stack
            width={"270px"}
            height={"602px"}
            gap={1}
            sx={{
              p: 2,
              backgroundColor: "background.paper",
              borderRadius: 2,
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
            }}
          >
            <Box sx={{ mb: 2, mt: 1, alignSelf: "center" }}>
              <Image src="/file.svg" alt="Logo" width={150} height={30} />
            </Box>
            <Stack>
              <Button
                variant={section === "reservations" ? "contained" : "text"}
                onClick={() => router.push(`/myPage/${user._id}/reservations`)}
                sx={{
                  justifyContent: "flex-start", // ← left align
                  textAlign: "left",
                }}
              >
                <Stack
                  sx={{
                    flexDirection: "row",
                    gap: 1,
                    alignItems: "center",
                  }}
                >
                  <BorderColorIcon
                    sx={{
                      color: section === "reservations" ? "primary.contrastText" : "text.primary",
                    }}
                  />
                  <Typography
                    color={section === "reservations" ? "primary.contrastText" : "text.primary"}
                    sx={{ textTransform: "capitalize", fontSize: 15 }}
                  >
                    My Reservations
                  </Typography>
                </Stack>
              </Button>
              <Button
                variant={section === "myPage" ? "contained" : "text"}
                onClick={() => router.push(`/myPage/${user._id}/myPage`)}
                sx={{
                  justifyContent: "flex-start", // ← left align
                  textAlign: "left",
                }}
              >
                <Stack
                  sx={{
                    flexDirection: "row",
                    gap: 1,
                    alignItems: "center",
                  }}
                >
                  <PermContactCalendarIcon
                    sx={{
                      color: section === "myPage" ? "primary.contrastText" : "text.primary",
                    }}
                  />
                  <Typography
                    color={section === "myPage" ? "primary.contrastText" : "text.primary"}
                    sx={{ textTransform: "capitalize", fontSize: 15 }}
                  >
                    My Page
                  </Typography>
                </Stack>
              </Button>
              <Button
                variant={section === "myFavorites" ? "contained" : "text"}
                onClick={() => router.push(`/myPage/${userId}/myFavorites`)}
                sx={{
                  justifyContent: "flex-start", // ← left align
                  textAlign: "left",
                }}
              >
                <Stack
                  sx={{
                    flexDirection: "row",
                    gap: 1,
                    alignItems: "center",
                  }}
                >
                  <StarsIcon
                    sx={{
                      color: section === "myFavorites" ? "primary.contrastText" : "text.primary",
                    }}
                  />
                  <Typography
                    color={section === "myFavorites" ? "primary.contrastText" : "text.primary"}
                    sx={{ textTransform: "capitalize", fontSize: 15 }}
                  >
                    My favorites
                  </Typography>
                </Stack>
              </Button>
              <Button
                variant={section === "activities" ? "contained" : "text"}
                onClick={() => router.push(`/myPage/${userId}/activities`)}
                sx={{
                  justifyContent: "flex-start", // ← left align
                  textAlign: "left",
                }}
              >
                <Stack
                  sx={{
                    flexDirection: "row",
                    gap: 1,
                    alignItems: "center",
                  }}
                >
                  <AddReactionIcon
                    sx={{
                      color: section === "activities" ? "primary.contrastText" : "text.primary",
                    }}
                  />
                  <Typography
                    color={section === "activities" ? "primary.contrastText" : "text.primary"}
                    sx={{ textTransform: "capitalize", fontSize: 15 }}
                  >
                    Activites
                  </Typography>
                </Stack>
              </Button>
              <Button
                variant={section === "settings" ? "contained" : "text"}
                onClick={() => router.push(`/myPage/${userId}/settings`)}
                sx={{
                  justifyContent: "flex-start", // ← left align
                  textAlign: "left",
                }}
              >
                <Stack
                  sx={{
                    flexDirection: "row",
                    gap: 1,
                    alignItems: "center",
                  }}
                >
                  <SettingsIcon
                    sx={{
                      color: section === "settings" ? "primary.contrastText" : "text.primary",
                    }}
                  />
                  <Typography
                    color={section === "settings" ? "primary.contrastText" : "text.primary"}
                    sx={{ textTransform: "capitalize", fontSize: 15 }}
                  >
                    Settings
                  </Typography>
                </Stack>
              </Button>
            </Stack>
          </Stack>
          <Stack width={"69%"}>
            {section === "reservations" && <Reservations />}
            {section === "myPage" && <MyPage />}
            {section === "myFavorites" && <MyFavorites />}
            {section === "activities" && <Activities />}
            {section === "settings" && <Settings />}
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export const getServerSideProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "ko", ["common"])),
  },
});

export default withLayoutMyPage(MyAccount);
