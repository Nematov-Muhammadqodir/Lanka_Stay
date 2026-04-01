import { Button, Menu, MenuItem, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import TelegramIcon from "@mui/icons-material/Telegram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";

interface AttractionOverViewProps {
  attraction?: any;
}

const AttractionOverView = ({ attraction }: AttractionOverViewProps) => {
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
  return (
    <Stack
      className="container"
      flexDirection={"row"}
      justifyContent={"space-between"}
      marginTop={"40px !important"}
      marginBottom={"20px !important"}
    >
      <Stack>
        <Typography fontSize={30} fontWeight={700}>
          {attraction?.attractionName ?? "Loading..."}
        </Typography>
        <Stack flexDirection={"row"} alignItems={"center"}>
          <Typography>
            {attraction?.attractionDescription
              ? attraction.attractionDescription.length > 100
                ? attraction.attractionDescription.slice(0, 100) + "..."
                : attraction.attractionDescription
              : ""}
          </Typography>
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
                    Facebook
                  </Typography>{" "}
                  <FacebookIcon sx={{ fontSize: "19px" }} />
                </Stack>
              </a>
            </MenuItem>
          </Menu>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default AttractionOverView;
