import { Stack, Typography } from "@mui/material";
import React from "react";
import AttractionTypesCard from "./AttractionTypesCard";
import { useTranslation } from "next-i18next";

interface AttractionTypesProps {
  selectedType: string | null;
  onSelectType: (type: string | null) => void;
}

const ATTRACTION_TYPE_OPTIONS = [
  { value: "TOUR", label: "Tours", icon: "/img/attractions/tour-guide.png" },
  { value: "MUSEUM", label: "Museum", icon: "/img/attractions/museum.png" },
  { value: "SHOW", label: "Shows", icon: "/img/attractions/cinema.png" },
  { value: "ACTIVITY", label: "Activity", icon: "/img/attractions/dancer.png" },
  { value: "THEME_PARK", label: "Theme Parks", icon: "/img/attractions/fireworks.png" },
  { value: "LANDMARK", label: "Landmarks", icon: "/img/attractions/stage.png" },
  { value: "WATER_PARK", label: "Water Parks", icon: "/img/attractions/fireworks.png" },
  { value: "ZOO", label: "Zoos", icon: "/img/attractions/tour-guide.png" },
];

const AttractionTypes = ({ selectedType, onSelectType }: AttractionTypesProps) => {
  const { t } = useTranslation("common");
  return (
    <Stack className="container" gap={1}>
      <Stack sx={{ mt: { xs: 3, md: 5 } }}>
        <Typography
          className="xxlText"
          sx={{ fontSize: { xs: 22, md: 30 } }}
        >
          {t("attraction.exploreAttractions")}
        </Typography>
      </Stack>
      <Stack
        sx={{
          flexDirection: "row",
          gap: { xs: 1.5, md: 2 },
          flexWrap: { xs: "nowrap", md: "wrap" },
          overflowX: { xs: "auto", md: "visible" },
          pb: { xs: 1, md: 0 },
          scrollSnapType: { xs: "x mandatory", md: "none" },
          "&::-webkit-scrollbar": { display: { xs: "none", md: "auto" } },
        }}
      >
        {ATTRACTION_TYPE_OPTIONS.map((item) => (
          <Stack
            key={item.value}
            sx={{
              flexShrink: 0,
              scrollSnapAlign: { xs: "start", md: "none" },
            }}
          >
            <AttractionTypesCard
              icon={item.icon}
              attractionType={item.label}
              isSelected={selectedType === item.value}
              onClick={() =>
                onSelectType(selectedType === item.value ? null : item.value)
              }
            />
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
};

export default AttractionTypes;
