import { Button, Menu, Stack, Typography } from "@mui/material";
import { useState } from "react";
import BusinessDetailsMenu from "./BusinessDetails";

const LegalInformation = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Stack className="container" sx={{ mt: "50px !important", gap: 1 }}>
      <Typography className="bold-text-medium">Legal information</Typography>
      <Stack
        padding={2}
        sx={{ backgroundColor: "secondary.main", borderRadius: 3 }}
        flexDirection={"row"}
      >
        <Typography>
          This property is managed, licensed or represented by a business. This
          label has no relevance in terms of tax, including VAT and other
          'indirect taxes', but is required under EU consumer law. You can find
          more information about the business here:
          <Button
            id="demo-positioned-button"
            aria-controls={open ? "demo-positioned-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <Typography
              textTransform={"capitalize"}
              color={"primary"}
              sx={{ textDecoration: "underline" }}
            >
              See business details
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
              <BusinessDetailsMenu open={open} handleClose={handleClose} />
            </Stack>
          </Menu>
        </Typography>
      </Stack>
    </Stack>
  );
};

export default LegalInformation;
