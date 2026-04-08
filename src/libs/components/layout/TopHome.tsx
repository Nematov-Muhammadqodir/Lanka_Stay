import { Box, Button, Stack, Typography } from "@mui/material";
import LuggageIcon from "@mui/icons-material/Luggage";
import CameraIcon from "@mui/icons-material/Camera";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import Image from "next/image";
import { useQuery } from "@apollo/client";
import { GET_PLATFORM_STATS } from "@/apollo/user/query";
import { useTranslation } from "next-i18next";

const TopHome = () => {
  const { t } = useTranslation("common");
  const { data } = useQuery(GET_PLATFORM_STATS);
  const stats = data?.getPlatformStats;
  return (
    <Stack
      className="container"
      sx={{
        borderRadius: 3,
        marginTop: "50px !important",
        flexDirection: { xs: "column", md: "row" },
        justifyContent: "space-between",
        alignItems: { xs: "center", md: "flex-start" },
        gap: { xs: 4, md: 0 },
      }}
    >
      <Stack className="left-side" sx={{ textAlign: { xs: "center", md: "left" }, alignItems: { xs: "center", md: "flex-start" } }}>
        <Typography sx={{ fontSize: { xs: "28px", sm: "34px", md: "42px" }, fontWeight: 700, lineHeight: 1.2 }} whiteSpace="pre-line">
          {t("home.heroTitle")}
        </Typography>
        <Typography
          sx={{
            mt: 3,
            fontSize: "16px",
            color: "text.disabled",
            lineHeight: 1.5,
          }}
          whiteSpace="pre-line"
        >
          {t("home.heroSubtitle")}
        </Typography>
        <Button
          variant="contained"
          sx={{
            width: "167px",
            height: "41px",
            color: "text.disabled",
            mt: 7,
            borderRadius: "7px",
          }}
        >
          {t("home.showMore")}
        </Button>
        <Stack sx={{ mt: 10 }} direction={"row"} spacing={5}>
          <Stack>
            <LuggageIcon />
            <Stack color={"text.disabled"} flexDirection={"row"} gap={"3px"}>
              <Typography
                sx={{
                  fontWeight: "bold",
                  color: "text.primary",
                  flexDirection: "row",
                }}
              >
                {stats?.totalUsers ?? 0}
              </Typography>
              {t("home.users")}
            </Stack>
          </Stack>
          <Stack>
            <CameraIcon />

            <Stack color={"text.disabled"} flexDirection={"row"} gap={"3px"}>
              <Typography
                sx={{
                  fontWeight: "bold",
                  color: "text.primary",
                  flexDirection: "row",
                }}
              >
                {stats?.totalListings ?? 0}
              </Typography>
              {t("home.listings")}
            </Stack>
          </Stack>
          <Stack>
            <TravelExploreIcon />
            <Stack color={"text.disabled"} flexDirection={"row"} gap={"3px"}>
              <Typography
                sx={{
                  fontWeight: "bold",
                  color: "text.primary",
                  flexDirection: "row",
                }}
              >
                {stats?.totalCities ?? 0}
              </Typography>
              {t("home.cities")}
            </Stack>
          </Stack>
        </Stack>
      </Stack>
      <Stack
        className="right-side"
        sx={{
          width: { xs: "100%", sm: "80%", md: "520px" },
          height: { xs: "250px", sm: "320px", md: "410px" },
          borderRadius: { xs: "15px", md: "100px 15px 15px 15px" },
          overflow: "hidden",
          position: "relative",
        }}
      >
        <Image
          src="/img/lanka-stay.jpg"
          alt="user-image"
          width={520}
          height={510}
          style={{ objectFit: "cover", width: "100%", height: "100%" }}
        />
      </Stack>
      <Box
        sx={{
          border: `1px solid`,
          borderColor: "text.disabled",
          position: "absolute",
          width: "520px",
          height: "410px",
          top: 50,
          right: 140,
          zIndex: -1,
          borderRadius: "15px",
          display: { xs: "none", md: "block" },
        }}
      ></Box>
      <Stack className="right-side"></Stack>
    </Stack>
  );
};

export default TopHome;
