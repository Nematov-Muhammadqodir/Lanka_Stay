import { Stack, Typography } from "@mui/material";
import React from "react";
import FAQList from "../../../HotelDetail/FAQ/FAQList";
import AttractionsFAQList from "./AttractionsFAQList";
import { useTranslation } from "next-i18next";

interface AttractionsFAQProps {
  attraction?: any;
}

const AttractionsFAQ = ({ attraction }: AttractionsFAQProps) => {
  const { t } = useTranslation("common");
  return (
    <Stack
      className="container"
      sx={{ mt: "50px !important", gap: 2, mb: "70px !important" }}
    >
      <Typography className="bold-text">{t("attraction.faq")}</Typography>
      <AttractionsFAQList />
    </Stack>
  );
};

export default AttractionsFAQ;
