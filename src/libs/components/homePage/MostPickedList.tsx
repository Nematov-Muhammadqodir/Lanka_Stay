import * as React from "react";
import { CircularProgress, Stack, Typography } from "@mui/material";
import MostPickedCard from "./MostPickedCard";
import { useQuery } from "@apollo/client";
import { GET_MOST_PICKED } from "@/apollo/user/query";
import { useTranslation } from "next-i18next";

export default function MostPickedList() {
  const { t } = useTranslation("common");
  const { data, loading } = useQuery(GET_MOST_PICKED);
  const items = data?.getMostPicked ?? [];

  return (
    <Stack
      className="container"
      sx={{ mt: "50px !important", mb: "50px !important" }}
    >
      <Stack>
        <Typography sx={{ fontSize: 24, fontWeight: 500 }}>
          {t("home.mostPicked")}
        </Typography>
        <Typography fontSize={14} color="text.secondary" mt={0.5}>
          {t("home.mostPickedDesc")}
        </Typography>
      </Stack>

      {loading ? (
        <Stack alignItems="center" py={4}>
          <CircularProgress size={30} />
        </Stack>
      ) : items.length === 0 ? (
        <Stack alignItems="center" py={4}>
          <Typography color="text.secondary">
            No recommendations yet
          </Typography>
        </Stack>
      ) : (
        <Stack
          sx={{
            flexDirection: "row",
            flexWrap: { xs: "nowrap", md: "wrap" },
            gap: 2,
            mt: 2,
            justifyContent: "start",
            overflowX: { xs: "auto", md: "visible" },
            scrollSnapType: { xs: "x mandatory", md: "none" },
            pb: { xs: 1, md: 0 },
            "&::-webkit-scrollbar": { display: { xs: "none", md: "auto" } },
          }}
        >
          {items.map((item: any) => (
            <Stack
              key={item._id}
              sx={{
                flexShrink: 0,
                scrollSnapAlign: { xs: "start", md: "none" },
                width: { xs: 280, md: "auto" },
              }}
            >
              <MostPickedCard item={item} />
            </Stack>
          ))}
        </Stack>
      )}
    </Stack>
  );
}
