import * as React from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

const SORT_OPTIONS = [
  { label: "Our top picks", value: null },
  { label: "Lowest price", value: "PRICE_LOW" },
  { label: "Highest price", value: "PRICE_HIGH" },
  { label: "Newest listings", value: "NEWEST" },
];

interface AttractionSortingProps {
  sort: string | null;
  onSortChange: (sort: string | null) => void;
}

export default function AttractionSorting({
  sort,
  onSortChange,
}: AttractionSortingProps) {
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
