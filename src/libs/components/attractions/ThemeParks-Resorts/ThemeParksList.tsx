import { CircularProgress, Stack, Typography } from "@mui/material";
import React from "react";
import ThemeParksCard from "./ThemeParksCard";
import AttractionsIcon from "@mui/icons-material/Attractions";
import { useQuery } from "@apollo/client";
import { GET_THEME_PARKS_AND_RESORTS } from "@/apollo/user/query";
import { useTranslation } from "next-i18next";

const ThemeParksList = () => {
  const { t } = useTranslation("common");
  const { data, loading } = useQuery(GET_THEME_PARKS_AND_RESORTS);
  const items = data?.getThemeParksAndResorts ?? [];

  if (loading) {
    return (
      <Stack alignItems="center" py={4}>
        <CircularProgress size={24} />
      </Stack>
    );
  }

  if (items.length === 0) return null;

  return (
    <Stack alignItems={"center"} mt={5} gap={2}>
      <Stack
        alignSelf={"flex-start"}
        flexDirection={"row"}
        alignItems={"center"}
        pl={3}
        gap={1}
      >
        <AttractionsIcon sx={{ fontSize: 30 }} />
        <Typography className="xxlText">{t("attraction.themeParksAndResorts")}</Typography>
      </Stack>
      <Stack
        flexDirection={"row"}
        gap={2}
        width={"100%"}
        px={3}
        sx={{ overflowX: "auto", pb: 1 }}
      >
        {items.map((item: any) => (
          <ThemeParksCard key={item._id} item={item} />
        ))}
      </Stack>
    </Stack>
  );
};

export default ThemeParksList;
