import React from "react";
import {
  Dialog,
  IconButton,
  Typography,
  Button,
  Stack,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import BusinessIcon from "@mui/icons-material/Business";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import VerifiedIcon from "@mui/icons-material/Verified";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { PartnerProperty } from "@/src/libs/types/partnerInput/partnerProperty";

interface BusinessDetailsMenuProps {
  open: boolean;
  handleClose: () => void;
  partnerProperty?: PartnerProperty | null;
}

const BusinessDetailsMenu: React.FC<BusinessDetailsMenuProps> = ({
  open,
  handleClose,
  partnerProperty,
}) => {
  const owner = partnerProperty?.memberData;
  const ownerName = owner
    ? `${owner.partnerFirstName ?? ""} ${owner.partnerLastName ?? ""}`.trim()
    : "Property Manager";
  const initial = ownerName.charAt(0).toUpperCase();

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: { borderRadius: 3, overflow: "hidden", p: 0 },
      }}
    >
      {/* Header */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{
          px: 3,
          py: 2,
          background: (theme) =>
            theme.palette.mode === "light"
              ? "linear-gradient(135deg, #f8fafc 0%, #e8f0fe 100%)"
              : "linear-gradient(135deg, #1A2235 0%, #131825 100%)",
        }}
      >
        <Stack direction="row" alignItems="center" gap={1.5}>
          <BusinessIcon sx={{ color: "primary.main", fontSize: 26 }} />
          <Typography fontWeight={700} fontSize={19}>
            Business Details
          </Typography>
        </Stack>
        <IconButton onClick={handleClose} size="small">
          <CloseIcon />
        </IconButton>
      </Stack>

      {/* Info Banner */}
      <Stack
        direction="row"
        gap={1.5}
        sx={{
          mx: 3,
          mt: 2.5,
          p: 2,
          borderRadius: 2,
          backgroundColor: "secondary.main",
          border: "1px solid",
          borderColor: "divider",
        }}
      >
        <InfoOutlinedIcon
          sx={{
            color: "primary.main",
            fontSize: 20,
            mt: "2px",
            flexShrink: 0,
          }}
        />
        <Typography fontSize={13} lineHeight={1.7} color="text.secondary">
          This property is managed by a licensed business. The accommodation
          itself is responsible for your stay. Please check your booking
          confirmation for the property&apos;s specific details.
        </Typography>
      </Stack>

      {/* Business Card */}
      <Stack px={3} py={2.5} gap={2}>
        <Stack
          sx={{
            p: 2.5,
            borderRadius: 2,
            border: "1px solid",
            borderColor: "divider",
          }}
          gap={2}
        >
          <Stack direction="row" alignItems="center" gap={1.5}>
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: 2,
                backgroundColor: "primary.main",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography color="white" fontWeight={700} fontSize={16}>
                {initial}
              </Typography>
            </Box>
            <Stack>
              <Typography fontWeight={700} fontSize={16}>
                {ownerName}
              </Typography>
              <Typography fontSize={12} color="text.secondary">
                Licensed Property Manager
              </Typography>
            </Stack>
          </Stack>

          <Stack gap={1.5}>
            <Stack direction="row" alignItems="flex-start" gap={1.5}>
              <LocationOnIcon
                sx={{ fontSize: 18, color: "text.secondary", mt: "2px" }}
              />
              <Typography fontSize={14} lineHeight={1.5}>
                {[
                  partnerProperty?.propertyCity,
                  partnerProperty?.propertyRegion,
                  partnerProperty?.propertyCountry,
                ]
                  .filter(Boolean)
                  .join(", ") || "Location not provided"}
              </Typography>
            </Stack>
            {owner?.partnerEmail && (
              <Stack direction="row" alignItems="center" gap={1.5}>
                <EmailIcon sx={{ fontSize: 18, color: "text.secondary" }} />
                <Typography fontSize={14}>{owner.partnerEmail}</Typography>
              </Stack>
            )}
            {owner?.partnerPhoneNumber && (
              <Stack direction="row" alignItems="center" gap={1.5}>
                <PhoneIcon sx={{ fontSize: 18, color: "text.secondary" }} />
                <Typography fontSize={14}>
                  {owner.partnerPhoneNumber}
                </Typography>
              </Stack>
            )}
          </Stack>
        </Stack>

        {/* Property Info */}
        {partnerProperty?.propertyName && (
          <Stack
            sx={{
              p: 2,
              borderRadius: 2,
              border: "1px solid",
              borderColor: "divider",
            }}
            gap={1}
          >
            <Typography fontWeight={600} fontSize={14}>
              Property
            </Typography>
            <Typography fontSize={14} color="text.secondary">
              {partnerProperty.propertyName}
              {partnerProperty.propertyType
                ? ` (${partnerProperty.propertyType})`
                : ""}
            </Typography>
          </Stack>
        )}

        {/* Compliance */}
        <Stack direction="row" alignItems="center" gap={1} px={1}>
          <VerifiedIcon sx={{ fontSize: 18, color: "success.main" }} />
          <Typography fontSize={13} color="text.secondary">
            This business certifies compliance with applicable regulations.
          </Typography>
        </Stack>
      </Stack>

      {/* Footer */}
      <Stack direction="row" justifyContent="flex-end" px={3} pb={2.5}>
        <Button
          variant="contained"
          onClick={handleClose}
          sx={{
            textTransform: "none",
            borderRadius: 2,
            px: 3,
            py: 1,
            fontWeight: 600,
          }}
        >
          Got it
        </Button>
      </Stack>
    </Dialog>
  );
};

export default BusinessDetailsMenu;
