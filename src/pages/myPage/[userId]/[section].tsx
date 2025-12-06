import withLayoutAttractionsReserve from "@/src/libs/components/layout/attractions/AttractionReserveLayout";
import MyPage from "@/src/libs/components/myAccount/MyPage";
import Reservations from "@/src/libs/components/myAccount/Reservations";
import { Button, Stack, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";
import StarsIcon from "@mui/icons-material/Stars";
import SettingsIcon from "@mui/icons-material/Settings";
import { useReactiveVar } from "@apollo/client";
import { userVar } from "@/apollo/store";
import withLayoutMyPage from "@/src/libs/components/layout/myPage/MyPageLayout";

const MyAccount = () => {
  const user = useReactiveVar(userVar);
  const router = useRouter();
  console.log("router", router.query);
  const { userId, section } = router.query;
  return (
    <Stack
      sx={{
        backgroundColor: "#F5F9FF",
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
              backgroundColor: "white",
              borderRadius: 2,
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
            }}
          >
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
                    color: section === "reservations" ? "white" : "black",
                  }}
                />
                <Typography
                  color={section === "reservations" ? "white" : "black"}
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
                    color: section === "myPage" ? "white" : "black",
                  }}
                />
                <Typography
                  color={section === "myPage" ? "white" : "black"}
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
                    color: section === "myFavorites" ? "white" : "black",
                  }}
                />
                <Typography
                  color={section === "myFavorites" ? "white" : "black"}
                  sx={{ textTransform: "capitalize", fontSize: 15 }}
                >
                  My favorites
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
                    color: section === "settings" ? "white" : "black",
                  }}
                />
                <Typography
                  color={section === "settings" ? "white" : "black"}
                  sx={{ textTransform: "capitalize", fontSize: 15 }}
                >
                  Settings
                </Typography>
              </Stack>
            </Button>
          </Stack>
          <Stack width={"69%"}>
            {section === "reservations" && <Reservations />}
            {section === "myPage" && <MyPage />}
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default withLayoutMyPage(MyAccount);
