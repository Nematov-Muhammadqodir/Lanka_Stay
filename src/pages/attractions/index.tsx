import AttractionsContainer from "@/src/libs/components/attractions/AttractionsContainer";
import AttractionTypes from "@/src/libs/components/attractions/AttractionTypes";
import withLayoutAttractions from "@/src/libs/components/layout/attractions/AttractionsLayout";
import { Stack } from "@mui/material";
import React, { useState } from "react";

const Attractions = () => {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [sort, setSort] = useState<string | null>(null);

  return (
    <Stack className="container">
      <Stack>
        <AttractionTypes
          selectedType={selectedType}
          onSelectType={setSelectedType}
        />
      </Stack>
      <Stack>
        <AttractionsContainer
          selectedType={selectedType}
          sort={sort}
          onSortChange={setSort}
        />
      </Stack>
    </Stack>
  );
};

export default withLayoutAttractions(Attractions);
