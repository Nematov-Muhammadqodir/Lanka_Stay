import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Stack,
  Typography,
} from "@mui/material";
import Slider from "@mui/material/Slider";
import React, { useState } from "react";
import { AttractionFilters } from "@/src/pages/attractions";
import { useTranslation } from "next-i18next";

const MAX = 500000;
const MIN = 0;

interface AttractionsFilterProps {
  filters: AttractionFilters;
  updateFilter: (key: keyof AttractionFilters, value: any) => void;
}

const AttractionsFilter = ({ filters, updateFilter }: AttractionsFilterProps) => {
  const { t } = useTranslation("common");
  const [priceRange, setPriceRange] = useState<number[]>([MIN, MAX]);

  const handlePriceChange = (_: Event, newValue: number | number[]) => {
    const val = newValue as number[];
    setPriceRange(val);
    updateFilter("priceMin", val[0] > MIN ? val[0] : null);
    updateFilter("priceMax", val[1] < MAX ? val[1] : null);
  };

  return (
    <Stack width={"100%"}>
      <Stack
        border={"1px solid"}
        borderColor={"text.disabled"}
        borderRadius={2}
        alignItems={"center"}
        gap={1}
      >
        <Box pt={1} pl={1} alignSelf={"start"} justifyContent={"center"}>
          <Typography className="bold-text-medium" alignSelf={"start"}>
            {t("attraction.filterBy")}
          </Typography>
        </Box>
        <Box
          border={"1px solid"}
          width={"100%"}
          borderColor={"text.disabled"}
        />

        {/* Price Range */}
        <Stack gap={1} py={1} px={2} sx={{ width: "100%" }}>
          <Typography className="small-bold-text">
            {t("attraction.priceRange")}
          </Typography>
          <Stack flexDirection={"row"} justifyContent={"space-around"}>
            <Typography fontSize={13}>
              ₩{priceRange[0].toLocaleString()}
            </Typography>
            <Typography fontSize={13}>-</Typography>
            <Typography fontSize={13}>
              ₩{priceRange[1].toLocaleString()}
              {priceRange[1] >= MAX ? "+" : ""}
            </Typography>
          </Stack>
          <Box sx={{ width: "90%", alignSelf: "center" }}>
            <Slider
              value={priceRange}
              onChange={handlePriceChange}
              valueLabelDisplay="auto"
              min={MIN}
              max={MAX}
              step={10000}
            />
          </Box>
        </Stack>

        <Box border={"1px solid"} width={"100%"} borderColor={"secondary.main"} />

        {/* Free Cancellation */}
        <Stack gap={1} py={1} px={2} sx={{ width: "100%" }}>
          <Typography className="small-bold-text">{t("attraction.cancellationPolicy")}</Typography>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={filters.freeCancellation === true}
                  onChange={(e) =>
                    updateFilter(
                      "freeCancellation",
                      e.target.checked ? true : null
                    )
                  }
                />
              }
              label={t("attraction.freeCancellationShort")}
            />
          </FormGroup>
        </Stack>

        <Box border={"1px solid"} width={"100%"} borderColor={"secondary.main"} />

        {/* Country */}
        <Stack gap={1} py={1} px={2} sx={{ width: "100%" }}>
          <Typography className="small-bold-text">{t("attraction.country")}</Typography>
          <FormGroup>
            {["Korea, Republic of", "Sri Lanka", "Japan", "United States"].map(
              (country) => (
                <FormControlLabel
                  key={country}
                  control={
                    <Checkbox
                      checked={filters.attractionCountry === country}
                      onChange={(e) =>
                        updateFilter(
                          "attractionCountry",
                          e.target.checked ? country : null
                        )
                      }
                    />
                  }
                  label={country}
                />
              )
            )}
          </FormGroup>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default AttractionsFilter;
