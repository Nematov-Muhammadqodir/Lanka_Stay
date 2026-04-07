import * as React from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useTranslation } from "next-i18next";

interface AttractionSortingProps {
  sort: string | null;
  onSortChange: (sort: string | null) => void;
}

export default function AttractionSorting({
  sort,
  onSortChange,
}: AttractionSortingProps) {
  const { t } = useTranslation("common");

  const SORT_OPTIONS = [
    { label: t("attraction.ourTopPicks"), value: null },
    { label: t("attraction.lowestPrice"), value: "PRICE_LOW" },
    { label: t("attraction.highestPrice"), value: "PRICE_HIGH" },
    { label: t("attraction.newestListings"), value: "NEWEST" },
  ];

  const currentIndex = SORT_OPTIONS.findIndex((o) => o.value === sort);
  const value = currentIndex === -1 ? 0 : currentIndex;

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    onSortChange(SORT_OPTIONS[newValue].value);
  };

  return (
    <Box
      sx={{
        width: "100%",
        bgcolor: "background.paper",
        border: "1px solid",
        mt: 2,
        borderRadius: 6,
        borderColor: "text.disabled",
      }}
    >
      <Tabs value={value} onChange={handleChange} centered>
        {SORT_OPTIONS.map((option) => (
          <Tab key={option.label} label={option.label} />
        ))}
      </Tabs>
    </Box>
  );
}
