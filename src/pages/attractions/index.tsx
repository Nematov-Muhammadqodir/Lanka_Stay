import AttractionsContainer from "@/src/libs/components/attractions/AttractionsContainer";
import AttractionTypes from "@/src/libs/components/attractions/AttractionTypes";
import withLayoutAttractions from "@/src/libs/components/layout/attractions/AttractionsLayout";
import { Stack } from "@mui/material";
import React from "react";

const Attractions = () => {
  return (
    <Stack className="container">
      <Stack>
        <AttractionTypes />
      </Stack>
      <Stack>
        <AttractionsContainer />
      </Stack>
    </Stack>
  );
};

export default withLayoutAttractions(Attractions);
