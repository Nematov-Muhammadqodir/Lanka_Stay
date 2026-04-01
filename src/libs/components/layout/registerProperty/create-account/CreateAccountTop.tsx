import {
  alpha,
  Avatar,
  Badge,
  Box,
  Button,
  Divider,
  IconButton,
  Link,
  ListItemIcon,
  Menu,
  MenuItem,
  MenuProps,
  Popover,
  Stack,
  styled,
  Tooltip,
  Typography,
} from "@mui/material";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import HelpIcon from "@mui/icons-material/Help";
import NotificationsIcon from "@mui/icons-material/Notifications";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import InfoIcon from "@mui/icons-material/Info";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import { useRouter } from "next/router";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import AddHomeWorkIcon from "@mui/icons-material/AddHomeWork";

import _Flag from "react-world-flags";
import { logOutPartner } from "@/src/libs/auth";
import { useMutation, useQuery } from "@apollo/client";
import {
  GET_MY_NOTIFICATIONS,
  GET_UNREAD_NOTIFICATION_COUNT,
} from "@/apollo/user/query";
import {
  MARK_NOTIFICATION_AS_READ,
  MARK_ALL_NOTIFICATIONS_AS_READ,
} from "@/apollo/user/mutation";

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

export default function CreateAccountTop(partner: any) {
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
  const handleSignOut = () => {
    logOutPartner();
    router.push("/register-property");
  };

  // Notifications
  const [notifAnchor, setNotifAnchor] = useState<null | HTMLElement>(null);
  const notifOpen = Boolean(notifAnchor);
  const isPartnerLoggedIn = partner?.partner?._id && partner.partner._id !== "";

  const { data: notifData } = useQuery(GET_MY_NOTIFICATIONS, {
    skip: !isPartnerLoggedIn,
    pollInterval: 5000,
  });
  const { data: unreadData } = useQuery(GET_UNREAD_NOTIFICATION_COUNT, {
    skip: !isPartnerLoggedIn,
    pollInterval: 5000,
  });
  const notifications = notifData?.getMyNotifications ?? [];
  const unreadCount = unreadData?.getUnreadNotificationCount ?? 0;
  const [markAsRead] = useMutation(MARK_NOTIFICATION_AS_READ);
  const [markAllAsRead] = useMutation(MARK_ALL_NOTIFICATIONS_AS_READ);

  const getNotifIcon = (type: string) => {
    switch (type) {
      case "RESERVATION_CONFIRMED": return <CheckCircleIcon sx={{ color: "success.main", fontSize: 18 }} />;
      case "RESERVATION_CANCELLED": return <CancelIcon sx={{ color: "warning.main", fontSize: 18 }} />;
      case "RESERVATION_REFUNDED": return <CurrencyExchangeIcon sx={{ color: "error.main", fontSize: 18 }} />;
      default: return <InfoIcon sx={{ color: "primary.main", fontSize: 18 }} />;
    }
  };

  const handleLangClose = (e: any, lang: string) => {
    setLang(lang);
    localStorage.setItem("lang", lang);
    setAnchorLangEl(null);
  };
  const router = useRouter();
  const authenticated = true;
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
          <Link href="/register-property">
            <Image src="/file.svg" alt="Logo" width={150} height={30} />
          </Link>
        </Stack>

        <Stack direction="row" justifyContent={"flex-end"} sx={{ width: 800 }}>
          <Stack direction="row" sx={{ gap: 2, alignItems: "center" }}>
            <Button
              id="demo-customized-button"
              aria-controls={openLang ? "demo-customized-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={openLang ? "true" : undefined}
              variant="contained"
              disableElevation
              onClick={handleLanguageClick}
              endIcon={<KeyboardArrowDownIcon sx={{ color: "white" }} />}
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

            {/* Notification Bell */}
            {isPartnerLoggedIn && (
              <IconButton onClick={(e) => setNotifAnchor(e.currentTarget)}>
                <Badge badgeContent={unreadCount} color="error" max={99}>
                  <NotificationsIcon sx={{ color: "white" }} />
                </Badge>
              </IconButton>
            )}

            {authenticated ? (
              <Stack flexDirection={"row"} alignItems={"center"}>
                <Typography className="bold-text" sx={{ color: "white" }}>
                  {partner?.partner?.partnerFirstName}
                </Typography>
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
                      src="/img/logo/uniface.jpg"
                      alt="user-image"
                      width={50}
                      height={50}
                      style={{ borderRadius: "50%" }}
                    />
                  </IconButton>
                </Tooltip>
              </Stack>
            ) : (
              <Stack>
                <Button
                  sx={{ color: "white" }}
                  onClick={() =>
                    router.push("/register-property/create-account")
                  }
                >
                  Login
                </Button>
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
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <AddHomeWorkIcon fontSize="small" />
                </ListItemIcon>
                Add property room
              </MenuItem>
              <MenuItem onClick={handleSignOut}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Sign out
              </MenuItem>
            </Menu>
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
        </Stack>
      </Stack>

      {/* Notification Popover */}
      <Popover
        open={notifOpen}
        anchorEl={notifAnchor}
        onClose={() => setNotifAnchor(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        slotProps={{
          paper: {
            sx: {
              width: 370,
              maxHeight: 450,
              borderRadius: 3,
              boxShadow: "0 12px 40px rgba(0,0,0,0.15)",
              overflow: "hidden",
            },
          },
        }}
      >
        <Stack>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            px={2}
            py={1.5}
            borderBottom="1px solid"
            borderColor="divider"
          >
            <Typography fontWeight={700} fontSize={15}>
              Notifications
            </Typography>
            {unreadCount > 0 && (
              <Button
                size="small"
                startIcon={<DoneAllIcon sx={{ fontSize: 14 }} />}
                onClick={() =>
                  markAllAsRead({
                    refetchQueries: [
                      "GetMyNotifications",
                      "GetUnreadNotificationCount",
                    ],
                  })
                }
                sx={{ textTransform: "none", fontSize: 12 }}
              >
                Mark all read
              </Button>
            )}
          </Stack>
          <Stack sx={{ maxHeight: 380, overflow: "auto" }}>
            {notifications.length === 0 ? (
              <Stack alignItems="center" py={4}>
                <Typography color="text.secondary" fontSize={13}>
                  No notifications yet
                </Typography>
              </Stack>
            ) : (
              notifications.map((n: any) => (
                <Stack
                  key={n._id}
                  direction="row"
                  gap={1.5}
                  px={2}
                  py={1.5}
                  onClick={() => {
                    if (!n.isRead)
                      markAsRead({
                        variables: { notificationId: n._id },
                        refetchQueries: [
                          "GetMyNotifications",
                          "GetUnreadNotificationCount",
                        ],
                      });
                    setNotifAnchor(null);
                    if (n.notificationType === "GENERAL") {
                      router.push("/register-property/dashboard?tab=messages");
                    }
                  }}
                  sx={{
                    cursor: "pointer",
                    backgroundColor: n.isRead ? "transparent" : "action.hover",
                    borderBottom: "1px solid",
                    borderColor: "divider",
                    "&:hover": { backgroundColor: "action.selected" },
                  }}
                >
                  <Box mt={0.3}>{getNotifIcon(n.notificationType)}</Box>
                  <Stack flex={1} gap={0.2}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Typography fontSize={13} fontWeight={n.isRead ? 400 : 700}>
                        {n.notificationTitle}
                      </Typography>
                      {!n.isRead && (
                        <Box
                          sx={{
                            width: 8,
                            height: 8,
                            borderRadius: "50%",
                            backgroundColor: "primary.main",
                            flexShrink: 0,
                          }}
                        />
                      )}
                    </Stack>
                    <Typography fontSize={12} color="text.secondary" lineHeight={1.3}>
                      {n.notificationMessage}
                    </Typography>
                    <Typography fontSize={11} color="text.disabled">
                      {new Date(n.createdAt).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </Typography>
                  </Stack>
                </Stack>
              ))
            )}
          </Stack>
        </Stack>
      </Popover>
    </Stack>
  );
}
