import AttractionsContainer from "@/src/libs/components/attractions/AttractionsContainer";
import AttractionTypes from "@/src/libs/components/attractions/AttractionTypes";
import withLayoutAttractions from "@/src/libs/components/layout/attractions/AttractionsLayout";
import { Stack } from "@mui/material";
import React, { useState } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export interface AttractionFilters {
  selectedType: string | null;
  sort: string | null;
  freeCancellation: boolean | null;
  priceMin: number | null;
  priceMax: number | null;
  attractionCountry: string | null;
}

const Attractions = () => {
  const [filters, setFilters] = useState<AttractionFilters>({
    selectedType: null,
    sort: null,
    freeCancellation: null,
    priceMin: null,
    priceMax: null,
    attractionCountry: null,
  });

  const updateFilter = (key: keyof AttractionFilters, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <Stack className="container">
      <Stack>
        <AttractionTypes
          selectedType={filters.selectedType}
          onSelectType={(type) => updateFilter("selectedType", type)}
        />
      </Stack>
      <Stack>
        <AttractionsContainer
          filters={filters}
          updateFilter={updateFilter}
        />
      </Stack>
    </Stack>
  );
};

export const getServerSideProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "ko", ["common"])),
  },
});

export default withLayoutAttractions(Attractions);
