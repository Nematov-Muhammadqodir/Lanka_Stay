import { Stack, Typography } from "@mui/material";
import React from "react";
import { useTranslation } from "next-i18next";

interface HouseRulesHeaderProps {
  propertyName?: string;
}

const HouseRulesHeader = ({ propertyName }: HouseRulesHeaderProps) => {
  const { t } = useTranslation("common");
  return (
    <Stack>
      <Typography className="bold-text">{t("hotel.houseRules")}</Typography>
      <Typography>
        {propertyName ?? ""} {t("hotel.specialRequests")}
      </Typography>
    </Stack>
  );
};

export default HouseRulesHeader;
