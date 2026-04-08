import { CircularProgress, Stack, Typography } from "@mui/material";
import React from "react";
import ExploreCard from "./ExploreCard";
import { useQuery } from "@apollo/client";
import { GET_EXPLORE_REGIONS } from "@/apollo/user/query";
import { useTranslation } from "next-i18next";

const ExploreList = () => {
  const { t } = useTranslation("common");
  const { data, loading } = useQuery(GET_EXPLORE_REGIONS);
  const regions = data?.getExploreRegions ?? [];

  // Group by country
  const countriesMap = new Map<string, any[]>();
  for (const r of regions) {
    const list = countriesMap.get(r.country) ?? [];
    list.push(r);
    countriesMap.set(r.country, list);
  }

  return (
    <Stack
      className="container"
      sx={{ mt: "50px !important", mb: "50px !important" }}
      gap={4}
    >
      {loading ? (
        <Stack alignItems="center" py={4}>
          <CircularProgress size={30} />
        </Stack>
      ) : regions.length === 0 ? (
        <Stack alignItems="center" py={4}>
          <Typography color="text.secondary">
            No destinations available yet
          </Typography>
        </Stack>
      ) : (
        Array.from(countriesMap.entries()).map(([country, regionList]) => (
          <Stack key={country} gap={2}>
            <Stack>
              <Typography sx={{ fontSize: 24, fontWeight: 700 }}>
                {t("Explore {{country}}", { country })}
              </Typography>
              <Typography fontSize={14} color="text.secondary">
                {t("home.exploreDesc")}
              </Typography>
            </Stack>
            <Stack
              sx={{
                flexDirection: "row",
                flexWrap: { xs: "nowrap", md: "wrap" },
                gap: 2,
                justifyContent: "start",
                overflowX: { xs: "auto", md: "visible" },
                scrollSnapType: { xs: "x mandatory", md: "none" },
                pb: { xs: 1, md: 0 },
                "&::-webkit-scrollbar": { display: { xs: "none", md: "auto" } },
              }}
            >
              {regionList.map((region: any) => (
                <Stack
                  key={region.region}
                  sx={{
                    flexShrink: 0,
                    scrollSnapAlign: { xs: "start", md: "none" },
                  }}
                >
                  <ExploreCard region={region} />
                </Stack>
              ))}
            </Stack>
          </Stack>
        ))
      )}
    </Stack>
  );
};

export default ExploreList;
