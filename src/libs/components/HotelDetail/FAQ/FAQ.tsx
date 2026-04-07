import { Stack, Typography } from "@mui/material";
import React from "react";
import { useTranslation } from "next-i18next";
import FAQList from "./FAQList";
import { PartnerProperty } from "../../../types/partnerInput/partnerProperty";

interface FAQProps {
  partnerProperty?: PartnerProperty | null;
}

const FAQ = ({ partnerProperty }: FAQProps) => {
  const { t } = useTranslation("common");
  return (
    <Stack
      className="container"
      sx={{ mt: "50px !important", gap: 2, mb: "70px !important" }}
    >
      <Typography className="bold-text">
        {t("hotel.faq")}
      </Typography>
      <FAQList partnerProperty={partnerProperty} />
    </Stack>
  );
};

export default FAQ;
