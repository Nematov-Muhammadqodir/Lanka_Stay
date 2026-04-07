import { Button, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "next-i18next";
import BusinessDetailsMenu from "./BusinessDetails";
import { PartnerProperty } from "@/src/libs/types/partnerInput/partnerProperty";

interface LegalInformationProps {
  partnerProperty?: PartnerProperty | null;
}

const LegalInformation = ({ partnerProperty }: LegalInformationProps) => {
  const { t } = useTranslation("common");
  const [open, setOpen] = useState(false);

  return (
    <Stack className="container" sx={{ mt: "50px !important", gap: 1 }}>
      <Typography className="bold-text-medium">{t("hotel.legalInfo")}</Typography>
      <Stack
        padding={2}
        sx={{ backgroundColor: "secondary.main", borderRadius: 3 }}
        flexDirection="row"
        alignItems="center"
        flexWrap="wrap"
      >
        <Typography>
          This property is managed, licensed or represented by a business. This
          label has no relevance in terms of tax, including VAT and other
          &apos;indirect taxes&apos;, but is required under EU consumer law. You
          can find more information about the business here:
        </Typography>
        <Button onClick={() => setOpen(true)}>
          <Typography
            textTransform="capitalize"
            color="primary"
            sx={{ textDecoration: "underline" }}
          >
            {t("hotel.businessDetails")}
          </Typography>
        </Button>
      </Stack>

      <BusinessDetailsMenu
        open={open}
        handleClose={() => setOpen(false)}
        partnerProperty={partnerProperty}
      />
    </Stack>
  );
};

export default LegalInformation;
