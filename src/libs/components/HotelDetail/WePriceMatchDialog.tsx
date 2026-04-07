import { Box, Button, Dialog, IconButton, Stack, Typography } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import CloseIcon from "@mui/icons-material/Close";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import VerifiedIcon from "@mui/icons-material/Verified";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import React from "react";
import { useTranslation } from "next-i18next";

interface WePriceMatchDialogProps {
  open: boolean;
  handleClose: () => void;
}

const WePriceMatchDialog: React.FC<WePriceMatchDialogProps> = ({
  open,
  handleClose,
}) => {
  const { t } = useTranslation("common");

  const checklistItems = [
    t("priceMatch.checkSameProperty"),
    t("priceMatch.checkSameDates"),
    t("priceMatch.checkSamePolicy"),
  ];

  const cantClaimItems = [
    t("priceMatch.cantHiddenProperty"),
    t("priceMatch.cantLoyalty"),
    t("priceMatch.cantPartnerOffer"),
  ];

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          overflow: "hidden",
          p: 0,
        },
      }}
    >
      {/* Header */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{
          px: 3,
          py: 2.5,
          background: (theme) =>
            theme.palette.mode === "light"
              ? "linear-gradient(135deg, #2f52df 0%, #1a3abf 100%)"
              : "linear-gradient(135deg, #5B7BF8 0%, #3A56C7 100%)",
        }}
      >
        <Stack direction="row" alignItems="center" gap={1.5}>
          <LocalOfferIcon sx={{ color: "#fff", fontSize: 28 }} />
          <Stack>
            <Typography fontWeight={700} fontSize={22} color="#fff">
              {t("hotel.wePriceMatch")}
            </Typography>
            <Typography fontSize={13} color="rgba(255,255,255,0.8)">
              {t("priceMatch.guarantee")}
            </Typography>
          </Stack>
        </Stack>
        <IconButton
          onClick={handleClose}
          sx={{ color: "rgba(255,255,255,0.8)", "&:hover": { color: "#fff" } }}
        >
          <CloseIcon />
        </IconButton>
      </Stack>

      {/* Body */}
      <Stack px={3} py={3} gap={3}>
        <Typography fontSize={15} lineHeight={1.6} color="text.secondary">
          {t("priceMatch.description")}
        </Typography>

        <Stack direction="row" gap={3}>
          {/* Checklist */}
          <Stack
            flex={1}
            gap={2}
            sx={{
              p: 2.5,
              borderRadius: 2,
              border: "1px solid",
              borderColor: "success.main",
              backgroundColor: "rgba(52, 211, 153, 0.05)",
            }}
          >
            <Stack direction="row" alignItems="center" gap={1}>
              <VerifiedIcon sx={{ color: "success.main", fontSize: 20 }} />
              <Typography fontWeight={700} fontSize={15}>
                {t("priceMatch.checklist")}
              </Typography>
            </Stack>
            {checklistItems.map((item, i) => (
              <Stack key={i} direction="row" alignItems="flex-start" gap={1.5}>
                <CheckCircleOutlineIcon
                  sx={{ color: "success.main", fontSize: 20, mt: "2px", flexShrink: 0 }}
                />
                <Typography fontSize={14} lineHeight={1.5} color="text.secondary">
                  {item}
                </Typography>
              </Stack>
            ))}
          </Stack>

          {/* Can't claim */}
          <Stack
            flex={1}
            gap={2}
            sx={{
              p: 2.5,
              borderRadius: 2,
              border: "1px solid",
              borderColor: "error.main",
              backgroundColor: "rgba(248, 113, 113, 0.05)",
            }}
          >
            <Stack direction="row" alignItems="center" gap={1}>
              <HighlightOffIcon sx={{ color: "error.main", fontSize: 20 }} />
              <Typography fontWeight={700} fontSize={15}>
                {t("priceMatch.cantClaim")}
              </Typography>
            </Stack>
            {cantClaimItems.map((item, i) => (
              <Stack key={i} direction="row" alignItems="flex-start" gap={1.5}>
                <HighlightOffIcon
                  sx={{ color: "error.main", fontSize: 20, mt: "2px", flexShrink: 0 }}
                />
                <Typography fontSize={14} lineHeight={1.5} color="text.secondary">
                  {item}
                </Typography>
              </Stack>
            ))}
          </Stack>
        </Stack>

        {/* Bottom CTA */}
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{
            p: 2.5,
            borderRadius: 2,
            backgroundColor: "secondary.main",
          }}
        >
          <Stack direction="row" alignItems="center" gap={1.5}>
            <SupportAgentIcon sx={{ color: "primary.main", fontSize: 28 }} />
            <Stack>
              <Typography fontWeight={600} fontSize={15}>
                {t("priceMatch.foundCheaper")}
              </Typography>
              <Typography fontSize={13} color="text.secondary">
                {t("priceMatch.contactSupport")}
              </Typography>
            </Stack>
          </Stack>
          <Button
            onClick={handleClose}
            variant="contained"
            sx={{
              borderRadius: 2,
              px: 3,
              py: 1,
              textTransform: "none",
              fontWeight: 600,
              fontSize: 14,
            }}
          >
            {t("priceMatch.gotIt")}
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default WePriceMatchDialog;
