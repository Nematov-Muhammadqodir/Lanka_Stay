import { Button, Menu, MenuItem, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import WePriceMatchDialog from "./WePriceMatchDialog";

const PropertyOverview = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const isBeachFront = true;
  const like = true;
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
          The Grand Sumorum
        </Typography>
        <Stack flexDirection={"row"} alignItems={"center"}>
          <FmdGoodIcon color="primary" />
          <Typography>
            118, Maksukpo-ro, Seogwipo City, 63573 Seogwipo, South Korea
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
        <Stack flexDirection={"row"} gap={3}>
          {like ? (
            <FavoriteIcon sx={{ color: "red", fontSize: 29 }} />
          ) : (
            <FavoriteBorderIcon sx={{ color: "red", fontSize: 29 }} />
          )}
          <ShareIcon />
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
