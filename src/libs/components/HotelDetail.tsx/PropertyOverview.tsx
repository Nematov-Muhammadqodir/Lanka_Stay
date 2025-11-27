import {
  Button,
  Menu,
  MenuItem,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import WePriceMatchDialog from "./WePriceMatchDialog";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import TelegramIcon from "@mui/icons-material/Telegram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import { PartnerProperty } from "../../types/partnerInput/partnerProperty";

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
          <Button>
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
                  border: "1px solid #ccc",
                  boxShadow: "0 8px 20px rgba(0, 0, 0, 0.15)",
                  borderRadius: 2,
                  mt: 1,
                  p: 1,
                },
              },
            }}
          >
            <MenuItem
              onClick={handleShare}
              sx={{ borderBottom: "1px solid", borderColor: "primary" }}
            >
              <Stack flexDirection={"row"} gap={1} alignItems={"center"}>
                <Typography fontWeight={800}>Copy Link</Typography>{" "}
                <ContentCopyIcon sx={{ fontSize: "15px" }} />
              </Stack>
            </MenuItem>
            <MenuItem onClick={handleShareClose}>
              <a
                href={shareLinks.telegram}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Stack
                  flexDirection={"row"}
                  gap={1}
                  alignItems={"center"}
                  justifyContent={"space-between"}
                >
                  <Typography fontWeight={800} color={"primary"}>
                    {" "}
                    Telegram
                  </Typography>{" "}
                  <TelegramIcon sx={{ fontSize: "19px" }} />
                </Stack>
              </a>
            </MenuItem>
            <MenuItem onClick={handleShareClose}>
              <a
                href={shareLinks.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Stack
                  flexDirection={"row"}
                  gap={1}
                  alignItems={"center"}
                  justifyContent={"space-between"}
                >
                  <Typography fontWeight={800} color={"primary"}>
                    {" "}
                    WhatsApp
                  </Typography>{" "}
                  <WhatsAppIcon sx={{ fontSize: "19px" }} />
                </Stack>
              </a>
            </MenuItem>
            <MenuItem onClick={handleShareClose}>
              <a
                href={shareLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Stack
                  flexDirection={"row"}
                  gap={1}
                  alignItems={"center"}
                  justifyContent={"space-between"}
                >
                  <Typography fontWeight={800} color={"primary"}>
                    Twitter
                  </Typography>{" "}
                  <TwitterIcon sx={{ fontSize: "19px" }} />
                </Stack>
              </a>
            </MenuItem>
            <MenuItem onClick={handleShareClose}>
              <a
                href={shareLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Stack
                  flexDirection={"row"}
                  gap={1}
                  alignItems={"center"}
                  justifyContent={"space-between"}
                >
                  <Typography fontWeight={800} color={"primary"}>
                    {" "}
                    Facebook
                  </Typography>{" "}
                  <FacebookIcon sx={{ fontSize: "19px" }} />
                </Stack>
              </a>
            </MenuItem>
          </Menu>
        </Stack>
        <Stack flexDirection={"row"}>
          <Button
            id="demo-positioned-button"
            aria-controls={open ? "demo-positioned-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <LocalOfferIcon color="primary" />
            <Typography color={"primary"} textTransform={"capitalize"}>
              We Price Match
            </Typography>
          </Button>
          <Menu
            anchorReference="none"
            id="demo-positioned-menu"
            aria-labelledby="demo-positioned-button"
            open={open}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            sx={{
              width: 800,
              height: 720,
              justifySelf: "center",
              alignSelf: "center",
              borderRadius: 4,
            }}
          >
            <Stack>
              <WePriceMatchDialog open={open} handleClose={handleClose} />
            </Stack>
          </Menu>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default PropertyOverview;
