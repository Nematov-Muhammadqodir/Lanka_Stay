import {
  alpha,
  Avatar,
  Button,
  Divider,
  IconButton,
  Link,
  ListItemIcon,
  Menu,
  MenuItem,
  MenuProps,
  Stack,
  styled,
  Tooltip,
  Typography,
} from "@mui/material";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import HelpIcon from "@mui/icons-material/Help";
import { useRouter } from "next/router";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import _Flag from "react-world-flags";
import { CustomJwtPayload } from "../../types/customJwtPayload";
import { logOut } from "../../auth";
import { REACT_APP_API_URL } from "../../config";

const Flag = _Flag as unknown as React.FC<{
  code: string;
  height?: string | number;
  width?: string | number;
}>;

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color: "rgb(55, 65, 81)",
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
        ...theme.applyStyles("dark", {
          color: "inherit",
        }),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
    ...theme.applyStyles("dark", {
      color: theme.palette.grey[300],
    }),
  },
}));

export default function TopMain(user: any) {
  console.log("user in top main hompage:", user);
  const [lang, setLang] = useState("GB");
  const [anchorLangEl, setAnchorLangEl] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const openLang = Boolean(anchorLangEl);

  useEffect(() => {
    const savedLang = localStorage.getItem("lang");
    if (savedLang) setLang(savedLang);
  }, []);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleLanguageClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorLangEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLangClose = (e: any, lang: string) => {
    setLang(lang);
    localStorage.setItem("lang", lang);
    setAnchorLangEl(null);
  };
  const router = useRouter();
  return (
    <Stack
      className="container"
      sx={{ paddingY: 2 }}
      height={100}
      justifyContent={"center"}
    >
      <Stack
        className="navigation-container"
        direction={"row"}
        justifyContent={"space-between"}
        alignItems="center"
        sx={{ widows: "100%" }}
      >
        <Stack className="logo-container" flexDirection={"row"} sx={{ gap: 2 }}>
          <Button
            id="demo-customized-button"
            aria-controls={openLang ? "demo-customized-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={openLang ? "true" : undefined}
            variant="contained"
            disableElevation
            onClick={handleLanguageClick}
            endIcon={<KeyboardArrowDownIcon />}
            sx={{ backgroundColor: "transparent", boxShadow: "none" }}
          >
            {lang === "GB" ? (
              <Flag code="GB" />
            ) : lang === "KR" ? (
              <Flag code="KR" />
            ) : (
              <Flag code="UZB" />
            )}
          </Button>
          <Image src="/file.svg" alt="Logo" width={150} height={30} />

          <StyledMenu
            id="demo-customized-menu"
            slotProps={{}}
            anchorEl={anchorLangEl}
            open={openLang}
            onClose={handleLangClose}
          >
            <MenuItem
              onClick={(e: any) => handleLangClose(e, "KR")}
              disableRipple
              sx={{ gap: 1 }}
            >
              <Flag code="KR" width={24} height="16" />
              한국어
            </MenuItem>
            <MenuItem
              onClick={(e: any) => handleLangClose(e, "GB")}
              disableRipple
              sx={{ gap: 1 }}
            >
              <Flag code="GB" height="16" />
              English
            </MenuItem>

            <MenuItem
              onClick={(e: any) => handleLangClose(e, "UZB")}
              disableRipple
              sx={{ gap: 1 }}
            >
              <Flag code="UZB" height="16" />
              O'zbekcha
            </MenuItem>
          </StyledMenu>
        </Stack>

        <Stack
          direction="row"
          justifyContent={"space-around"}
          sx={{ width: 800 }}
        >
          <Stack
            className="menu-container"
            sx={{ gap: 3 }}
            direction="row"
            alignItems={"center"}
          >
            <Link href="/" className="links">
              Home
            </Link>
            <Link href="/hotels" className="links">
              Hotels
            </Link>
            <Link href="/attractions" className="links">
              Attractions
            </Link>
            <Link href="#" className="links">
              About
            </Link>
            <Link href="/myOrders" className="links">
              Reservations
            </Link>
            {user.user._id !== "" && (
              <Link href="/register-property" className="links">
                <Typography sx={{ fontWeight: 700 }}>
                  List your property
                </Typography>
              </Link>
            )}
            <Link
              href="#"
              className="links"
              sx={{
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
              }}
            >
              <HelpIcon />
            </Link>
          </Stack>
          {user.user._id === "" ? (
            <Stack
              justifyContent={"space-between"}
              direction="row"
              sx={{ gap: 2 }}
            >
              <Button
                variant="contained"
                sx={{ color: "white" }}
                onClick={() => router.push("/join/register")}
              >
                SignUp
              </Button>
              <Button
                variant="contained"
                sx={{ color: "white" }}
                onClick={() => router.push("/join/login")}
              >
                Login
              </Button>
            </Stack>
          ) : (
            <Stack>
              <Tooltip title="Account settings">
                <IconButton
                  onClick={handleClick}
                  size="small"
                  sx={{ ml: 2 }}
                  aria-controls={open ? "account-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                >
                  <Image
                    src={
                      user?.user?.guestImage
                        ? `${REACT_APP_API_URL}/${user?.user?.guestImage}`
                        : "/img/logo/uniface.jpg"
                    }
                    alt="user-image"
                    width={50}
                    height={50}
                    style={{ borderRadius: "50%" }}
                  />
                </IconButton>
              </Tooltip>
            </Stack>
          )}
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            slotProps={{
              paper: {
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&::before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem
              onClick={() => {
                handleClose();
                router.push(`/myAccount?id=${user.user._id}`);
              }}
            >
              <Avatar /> My account
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <Settings fontSize="small" />
              </ListItemIcon>
              Settings
            </MenuItem>
            <MenuItem
              onClick={async () => {
                handleClose();
                await logOut();
                router.push("/");
              }}
            >
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </Stack>
      </Stack>
    </Stack>
  );
}
