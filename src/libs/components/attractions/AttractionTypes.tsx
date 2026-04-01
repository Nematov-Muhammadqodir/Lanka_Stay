import { Stack, Typography } from "@mui/material";
import React from "react";
import AttractionTypesCard from "./AttractionTypesCard";

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
  return (
    <Stack className="container" gap={1}>
      <Stack mt={5}>
        <Typography className="xxlText">Explore attractions</Typography>
      </Stack>
      <Stack flexDirection={"row"} gap={2} flexWrap="wrap">
        {ATTRACTION_TYPE_OPTIONS.map((item) => (
          <AttractionTypesCard
            key={item.value}
            icon={item.icon}
            attractionType={item.label}
            isSelected={selectedType === item.value}
            onClick={() =>
              onSelectType(selectedType === item.value ? null : item.value)
            }
          />
        ))}
      </Stack>
    </Stack>
  );
};

export default AttractionTypes;
