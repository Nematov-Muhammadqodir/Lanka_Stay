import { CircularProgress, Stack, Typography } from "@mui/material";
import PopularAttractionCard from "./PopularAttractionCard";
import { useQuery } from "@apollo/client";
import { GET_POPULAR_ATTRACTIONS } from "@/apollo/user/query";
import { useTranslation } from "next-i18next";

const PopularAttractions = () => {
  const { t } = useTranslation("common");
  const { data, loading } = useQuery(GET_POPULAR_ATTRACTIONS);
  const attractions = data?.getPopularAttractions ?? [];

  // Group by country
  const countriesMap = new Map<string, any[]>();
  for (const a of attractions) {
    const country = a.attractionCountry || "Other";
    const list = countriesMap.get(country) ?? [];
    list.push(a);
    countriesMap.set(country, list);
  }

  return (
    <Stack
      className="container"
      sx={{ mt: "50px !important", mb: "50px !important", overflow: "hidden" }}
      gap={4}
    >
      {loading ? (
        <Stack alignItems="center" py={4}>
          <CircularProgress size={30} />
        </Stack>
      ) : attractions.length === 0 ? (
        <Stack alignItems="center" py={4}>
          <Typography color="text.secondary">
            No attractions available yet
          </Typography>
        </Stack>
      ) : (
        Array.from(countriesMap.entries()).map(([country, list]) => (
          <Stack key={country} gap={2}>
            <Stack>
              <Typography sx={{ fontSize: 24, fontWeight: 700 }}>
                {t("home.popularAttractions")} {country}
              </Typography>
              <Typography fontSize={14} color="text.secondary">
                {t("home.popularAttractionsDesc")}
              </Typography>
            </Stack>
            <Stack
              sx={{
                flexDirection: "row",
                gap: 2,
                justifyContent: "start",
                overflowX: "auto",
                pb: 1,
              }}
            >
              {list.map((attraction: any) => (
                <PopularAttractionCard
                  key={attraction._id}
                  attraction={attraction}
                />
              ))}
            </Stack>
          </Stack>
        ))
      )}
    </Stack>
  );
};

export default PopularAttractions;
