import { Stack, Typography } from "@mui/material";
import React from "react";
import AttractionTypesCard from "./AttractionTypesCard";

const AttractionTypes = () => {
  const attractions = [
    {
      icon: "/img/attractions/tour-guide.png",
      attractionType: "Tours",
      numberOfThingsToDo: 178,
    },
    {
      icon: "/img/attractions/cinema.png",
      attractionType: "Cinema",
      numberOfThingsToDo: 28,
    },
    {
      icon: "/img/attractions/dancer.png",
      attractionType: "Disco",
      numberOfThingsToDo: 62,
    },
    {
      icon: "/img/attractions/fireworks.png",
      attractionType: "Fireworks",
      numberOfThingsToDo: 53,
    },
    {
      icon: "/img/attractions/museum.png",
      attractionType: "Museum",
      numberOfThingsToDo: 16,
    },
    {
      icon: "/img/attractions/stage.png",
      attractionType: "Karaoke",
      numberOfThingsToDo: 16,
    },
  ];
  return (
    <Stack className="container" gap={1}>
      <Stack mt={20}>
        <Typography className="xxlText">Seoul attractions</Typography>
      </Stack>
      <Stack flexDirection={"row"} gap={5} justifyContent={"space-between"}>
        {attractions.map((item, index) => {
          return (
            <AttractionTypesCard
              icon={item.icon}
              attractionType={item.attractionType}
              numberOfThingsToDo={item.numberOfThingsToDo}
            />
          );
        })}
      </Stack>
    </Stack>
  );
};

export default AttractionTypes;
