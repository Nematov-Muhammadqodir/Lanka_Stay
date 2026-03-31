import {
  Box,
  Button,
  Dialog,
  IconButton,
  Menu,
  MenuItem,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import CloseIcon from "@mui/icons-material/Close";
import WePriceMatchDialog from "./WePriceMatchDialog";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import TelegramIcon from "@mui/icons-material/Telegram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import { PartnerProperty } from "../../types/partnerInput/partnerProperty";
import { getCoordinates } from "../../handlers/common";
import CustomMap from "./CustomMap";

export interface PropertyOverviewProps {
  partnerProperty?: PartnerProperty | null;
  loading?: boolean;
}

const PropertyOverview = (props: PropertyOverviewProps) => {
  const { partnerProperty, loading } = props;
  if (!partnerProperty) return null;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleShare = async () => {
    const url = window.location.href; // current page URL

    try {
      await navigator.clipboard.writeText(url);
      alert("✅ Link copied to clipboard!");
      setAnchorShareEl(null);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };
  const isBeachFront = true;
  const like = true;

  const [mapOpen, setMapOpen] = useState(false);
  const [mapCoords, setMapCoords] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  useEffect(() => {
    if (!mapOpen || mapCoords || !partnerProperty) return;
    getCoordinates(
      partnerProperty.propertyCountry,
      partnerProperty.propertyRegion,
      partnerProperty.propertyCity,
      partnerProperty.propertyPostCode
    ).then(setMapCoords);
  }, [mapOpen, partnerProperty]);

  const [anchorShareEl, setAnchorShareEl] = useState<null | HTMLElement>(null);
  const shareOpen = Boolean(anchorShareEl);
  const url = typeof window !== "undefined" ? window.location.href : "";

  const handleShareClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorShareEl(event.currentTarget);
  };
  const handleShareClose = () => setAnchorShareEl(null);

  const shareLinks = {
    telegram: `https://t.me/share/url?url=${encodeURIComponent(url)}`,
    whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(url)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      url
    )}`,
  };

  if (loading || !partnerProperty) {
    return (
      <Stack
        className="container"
        flexDirection="row"
        justifyContent="space-between"
        marginTop={"40px !important"}
      >
        <Stack>
          <Stack flexDirection="row" gap={1}>
            <Skeleton variant="circular" width={24} height={24} />
            <Skeleton variant="text" width={100} height={24} />
          </Stack>
          <Skeleton variant="text" width={300} height={40} sx={{ mt: 2 }} />
          <Stack flexDirection="row" alignItems="center" gap={1} mt={1}>
            <Skeleton variant="circular" width={20} height={20} />
            <Skeleton variant="text" width={200} height={20} />
          </Stack>
        </Stack>
        <Stack>
          <Skeleton variant="rectangular" width={150} height={40} />
          <Skeleton
            variant="rectangular"
            width={150}
            height={40}
            sx={{ mt: 1 }}
          />
        </Stack>
      </Stack>
    );
  }
  return (
    <Stack
      className="container"
      flexDirection={"row"}
      justifyContent={"space-between"}
      marginTop={"40px !important"}
    >
      <Stack>
        <Stack flexDirection={"row"}>
          <BeachAccessIcon />
          {isBeachFront ? <Typography>Beachfront</Typography> : ""}
        </Stack>
        <Typography fontSize={30} fontWeight={700}>
          {partnerProperty.propertyName}
        </Typography>
        <Stack flexDirection={"row"} alignItems={"center"}>
          <FmdGoodIcon color="primary" />
          <Typography>
            {partnerProperty.propertyCity}, {partnerProperty.propertyRegion},{" "}
            {partnerProperty.propertyCountry}
          </Typography>
          <Button onClick={() => setMapOpen(true)}>
            <Typography
              color="primary"
              fontWeight={700}
              textTransform={"lowercase"}
              borderBottom={"1px solid"}
            >
              Show map
            </Typography>
          </Button>
        </Stack>
      </Stack>
      <Stack justifyContent={"space-around"}>
        <Stack flexDirection={"row"} gap={3} alignItems={"center"}>
          {like ? (
            <FavoriteIcon sx={{ color: "red", fontSize: 29 }} />
          ) : (
            <FavoriteBorderIcon sx={{ color: "red", fontSize: 29 }} />
          )}
          <Button onClick={handleShareClick}>
            <ShareIcon />
          </Button>
          <Menu
            anchorEl={anchorShareEl}
            open={shareOpen}
            onClose={handleShareClose}
            slotProps={{
              paper: {
                sx: {
                  backgroundColor: "background.paper",
                  border: "1px solid",
                  borderColor: "divider",
                  boxShadow: "0 12px 32px rgba(0, 0, 0, 0.12)",
                  borderRadius: 3,
                  mt: 1.5,
                  p: 0.5,
                  minWidth: 220,
                },
              },
            }}
          >
            <Typography
              fontSize={12}
              fontWeight={600}
              color="text.secondary"
              px={2}
              pt={1}
              pb={0.5}
              textTransform="uppercase"
              letterSpacing={0.5}
            >
              Share this property
            </Typography>
            <MenuItem
              onClick={handleShare}
              sx={{ borderRadius: 1.5, mx: 0.5, py: 1.2 }}
            >
              <Stack
                flexDirection="row"
                gap={1.5}
                alignItems="center"
                width="100%"
              >
                <ContentCopyIcon sx={{ fontSize: 18, color: "text.secondary" }} />
                <Typography fontSize={14} fontWeight={600}>
                  Copy Link
                </Typography>
              </Stack>
            </MenuItem>
            {[
              { href: shareLinks.telegram, icon: <TelegramIcon sx={{ fontSize: 18, color: "#229ED9" }} />, label: "Telegram" },
              { href: shareLinks.whatsapp, icon: <WhatsAppIcon sx={{ fontSize: 18, color: "#25D366" }} />, label: "WhatsApp" },
              { href: shareLinks.twitter, icon: <TwitterIcon sx={{ fontSize: 18, color: "text.primary" }} />, label: "Twitter" },
              { href: shareLinks.facebook, icon: <FacebookIcon sx={{ fontSize: 18, color: "#1877F2" }} />, label: "Facebook" },
            ].map((item) => (
              <MenuItem
                key={item.label}
                onClick={handleShareClose}
                sx={{ borderRadius: 1.5, mx: 0.5, py: 1.2 }}
              >
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: "none", width: "100%" }}
                >
                  <Stack
                    flexDirection="row"
                    gap={1.5}
                    alignItems="center"
                  >
                    {item.icon}
                    <Typography fontSize={14} fontWeight={600} color="text.primary">
                      {item.label}
                    </Typography>
                  </Stack>
                </a>
              </MenuItem>
            ))}
          </Menu>
        </Stack>
        <Stack flexDirection={"row"}>
          <Button onClick={handleClick}>
            <LocalOfferIcon color="primary" />
            <Typography color={"primary"} textTransform={"capitalize"}>
              We Price Match
            </Typography>
          </Button>
          <WePriceMatchDialog open={open} handleClose={handleClose} />
        </Stack>
      </Stack>
      {/* Map Dialog */}
      <Dialog
        open={mapOpen}
        onClose={() => setMapOpen(false)}
        maxWidth={false}
        PaperProps={{
          sx: {
            width: 750,
            height: 550,
            borderRadius: 3,
            overflow: "hidden",
            p: 0,
          },
        }}
      >
        <Stack height="100%">
          {/* Header */}
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            px={2.5}
            py={1.5}
            borderBottom="1px solid"
            borderColor="divider"
          >
            <Stack>
              <Typography fontWeight={700} fontSize={18}>
                {partnerProperty.propertyName}
              </Typography>
              <Stack direction="row" alignItems="center" gap={0.5}>
                <FmdGoodIcon
                  sx={{ fontSize: 16, color: "primary.main" }}
                />
                <Typography fontSize={13} color="text.secondary">
                  {partnerProperty.propertyCity},{" "}
                  {partnerProperty.propertyRegion},{" "}
                  {partnerProperty.propertyCountry}
                </Typography>
              </Stack>
            </Stack>
            <IconButton onClick={() => setMapOpen(false)} size="small">
              <CloseIcon />
            </IconButton>
          </Stack>

          {/* Map */}
          <Box flex={1} sx={{ "& .leaflet-container": { height: "100%", width: "100%" } }}>
            {mapCoords ? (
              <CustomMap
                country={partnerProperty.propertyCountry}
                city={partnerProperty.propertyCity}
                propertyName={partnerProperty.propertyName}
                lat={mapCoords.lat}
                lng={mapCoords.lng}
              />
            ) : (
              <Stack
                height="100%"
                alignItems="center"
                justifyContent="center"
              >
                <Typography color="text.secondary">
                  Loading map...
                </Typography>
              </Stack>
            )}
          </Box>
        </Stack>
      </Dialog>
    </Stack>
  );
};

export default PropertyOverview;
