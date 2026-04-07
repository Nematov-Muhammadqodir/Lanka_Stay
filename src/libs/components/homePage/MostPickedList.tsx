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
            flexWrap: "wrap",
            gap: 2,
            mt: 2,
            justifyContent: "start",
          }}
        >
          {items.map((item: any) => (
            <MostPickedCard key={item._id} item={item} />
          ))}
        </Stack>
      )}
    </Stack>
  );
}
