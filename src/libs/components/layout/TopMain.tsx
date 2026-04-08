import {
  alpha,
  Avatar,
  Badge,
  Box,
  Button,
  Chip,
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
import MenuIcon from "@mui/icons-material/Menu";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { useRouter } from "next/router";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import _Flag from "react-world-flags";
import { CustomJwtPayload } from "../../types/customJwtPayload";
import { logOut } from "../../auth";
import { REACT_APP_API_URL } from "../../config";
import { partnerVar } from "@/apollo/store";
import { useMutation, useQuery, useReactiveVar } from "@apollo/client";
import {
  GET_MY_NOTIFICATIONS,
  GET_UNREAD_NOTIFICATION_COUNT,
} from "@/apollo/user/query";
import {
  MARK_NOTIFICATION_AS_READ,
  MARK_ALL_NOTIFICATIONS_AS_READ,
} from "@/apollo/user/mutation";
import { useTranslation } from "next-i18next";

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
  const { t, i18n } = useTranslation("common");
  const [lang, setLang] = useState("KR");
  const [anchorLangEl, setAnchorLangEl] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const openLang = Boolean(anchorLangEl);

  useEffect(() => {
    const savedLang = localStorage.getItem("lang");
    if (savedLang) {
      setLang(savedLang);
    } else {
      // Default to Korean
      localStorage.setItem("lang", "KR");
    }
  }, []);

  // Notification state
  const [notifAnchor, setNotifAnchor] = useState<null | HTMLElement>(null);
  const notifOpen = Boolean(notifAnchor);

  const partner = useReactiveVar(partnerVar);
  const isLoggedIn = user?.user?._id && user.user._id !== "";
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isPartner = partner?._id && partner._id !== "";

  const { data: notifData, refetch: refetchNotifs } = useQuery(
    GET_MY_NOTIFICATIONS,
    { skip: !isLoggedIn, pollInterval: 5000 }
  );
  const { data: unreadData, refetch: refetchUnread } = useQuery(
    GET_UNREAD_NOTIFICATION_COUNT,
    { skip: !isLoggedIn, pollInterval: 5000 }
  );

  const notifications = notifData?.getMyNotifications ?? [];
  const unreadCount = unreadData?.getUnreadNotificationCount ?? 0;

  const [markAsRead] = useMutation(MARK_NOTIFICATION_AS_READ);
  const [markAllAsRead] = useMutation(MARK_ALL_NOTIFICATIONS_AS_READ);

  const handleNotifClick = (event: React.MouseEvent<HTMLElement>) => {
    setNotifAnchor(event.currentTarget);
  };
  const handleNotifClose = () => setNotifAnchor(null);

  const handleMarkAllRead = async () => {
    await markAllAsRead({
      refetchQueries: ["GetMyNotifications", "GetUnreadNotificationCount"],
    });
  };

  const handleMarkRead = async (id: string) => {
    await markAsRead({
      variables: { notificationId: id },
      refetchQueries: ["GetMyNotifications", "GetUnreadNotificationCount"],
    });
  };

  const getNotifIcon = (type: string) => {
    switch (type) {
      case "RESERVATION_CONFIRMED":
        return <CheckCircleIcon sx={{ color: "success.main", fontSize: 20 }} />;
      case "RESERVATION_CANCELLED":
        return <CancelIcon sx={{ color: "warning.main", fontSize: 20 }} />;
      case "RESERVATION_REFUNDED":
        return (
          <CurrencyExchangeIcon sx={{ color: "error.main", fontSize: 20 }} />
        );
      default:
        return <InfoIcon sx={{ color: "primary.main", fontSize: 20 }} />;
    }
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleLanguageClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorLangEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLangClose = (e: any, langCode: string) => {
    setLang(langCode);
    localStorage.setItem("lang", langCode);
    setAnchorLangEl(null);
    // Map flag code to i18n locale
    const localeMap: Record<string, string> = { KR: "ko", GB: "en", UZB: "uz" };
    const newLocale = localeMap[langCode] || "ko";
    router.push(router.pathname, router.asPath, { locale: newLocale });
  };
  const router = useRouter();
  return (
    <Stack
      className="container"
      sx={{
        paddingY: { xs: 1, md: 2 },
        height: { xs: 70, md: 100 },
      }}
      justifyContent={"center"}
    >
      <Stack
        className="navigation-container"
        direction={"row"}
        justifyContent={"space-between"}
        alignItems="center"
        sx={{ width: "100%", gap: { xs: 0.5, md: 0 } }}
      >
        {/* Mobile hamburger */}
        <IconButton
          onClick={() => setMobileMenuOpen(true)}
          sx={{ display: { xs: "flex", md: "none" }, color: "text.primary" }}
        >
          <MenuIcon />
        </IconButton>
        <SwipeableDrawer
          anchor="left"
          open={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
          onOpen={() => setMobileMenuOpen(true)}
          PaperProps={{ sx: { width: 280, pt: 3 } }}
        >
          <Stack gap={1} px={2}>
            <Link href="/" onClick={() => setMobileMenuOpen(false)}>
              <Typography fontWeight={600} py={1.5} borderBottom="1px solid" borderColor="divider">
                {t("nav.home")}
              </Typography>
            </Link>
            <Link href="/hotels" onClick={() => setMobileMenuOpen(false)}>
              <Typography fontWeight={600} py={1.5} borderBottom="1px solid" borderColor="divider">
                {t("nav.hotels")}
              </Typography>
            </Link>
            <Link href="/attractions" onClick={() => setMobileMenuOpen(false)}>
              <Typography fontWeight={600} py={1.5} borderBottom="1px solid" borderColor="divider">
                {t("nav.attractions")}
              </Typography>
            </Link>
            <Link href={`/myPage/${user?.user?._id}/reservations`} onClick={() => setMobileMenuOpen(false)}>
              <Typography fontWeight={600} py={1.5} borderBottom="1px solid" borderColor="divider">
                {t("nav.myDashboard")}
              </Typography>
            </Link>
            {isLoggedIn && (
              <Link href="/register-property" onClick={() => setMobileMenuOpen(false)}>
                <Typography fontWeight={600} py={1.5} borderBottom="1px solid" borderColor="divider">
                  {t("nav.listProperty")}
                </Typography>
              </Link>
            )}
            {!isLoggedIn && (
              <>
                <Button variant="contained" sx={{ mt: 2, color: "white" }} onClick={() => { router.push("/join/register"); setMobileMenuOpen(false); }}>
                  {t("nav.signUp")}
                </Button>
                <Button variant="outlined" sx={{ mt: 1 }} onClick={() => { router.push("/join/login"); setMobileMenuOpen(false); }}>
                  {t("nav.login")}
                </Button>
              </>
            )}
          </Stack>
        </SwipeableDrawer>

        <Stack className="logo-container" flexDirection={"row"} alignItems="center" sx={{ gap: { xs: 1.5, md: 2 } }}>
          <Button
            id="demo-customized-button"
            aria-controls={openLang ? "demo-customized-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={openLang ? "true" : undefined}
            variant="contained"
            disableElevation
            onClick={handleLanguageClick}
            endIcon={<KeyboardArrowDownIcon />}
            sx={{
              backgroundColor: "transparent",
              boxShadow: "none",
              minWidth: { xs: 36, md: "auto" },
              px: { xs: 0.3, md: 2 },
            }}
          >
            {lang === "GB" ? (
              <Flag code="GB" />
            ) : lang === "KR" ? (
              <Flag code="KR" />
            ) : (
              <Flag code="UZB" />
            )}
          </Button>
          <Image src="/file.svg" alt="Logo" width={150} height={30} style={{ width: "auto", height: "auto", maxWidth: 150 }} />

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
          sx={{ width: { xs: "auto", md: 800 }, display: { xs: "none", md: "flex" } }}
        >
          <Stack
            className="menu-container"
            sx={{ gap: { xs: 1, md: 3 } }}
            direction="row"
            alignItems={"center"}
            flexWrap="wrap"
          >
            <Link href="/" className="links">
              {t("nav.home")}
            </Link>
            <Link href="/hotels" className="links">
              {t("nav.hotels")}
            </Link>
            <Link href="/attractions" className="links">
              {t("nav.attractions")}
            </Link>

            <Link
              href={`/myPage/${user?.user?._id}/reservations`}
              className="links"
            >
              {t("nav.myDashboard")}
            </Link>
            {user.user._id !== "" && (
              <Link href="/register-property" className="links">
                <Typography sx={{ fontWeight: 700 }}>
                  {t("nav.listProperty")}
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

          {/* Notification bell - visible on both mobile and desktop */}
          {isLoggedIn && (
            <IconButton onClick={handleNotifClick} sx={{ ml: { xs: 0, md: 0.5 } }}>
              <Badge badgeContent={unreadCount} color="error" max={99}>
                <NotificationsIcon sx={{ color: "text.primary", fontSize: { xs: 22, md: 24 } }} />
              </Badge>
            </IconButton>
          )}
          {user.user._id === "" ? (
            <Stack
              justifyContent={"space-between"}
              direction="row"
              sx={{ gap: 2, display: { xs: "none", md: "flex" } }}
            >
              <Button
                variant="contained"
                sx={{ color: "white" }}
                onClick={() => router.push("/join/register")}
              >
                {t("nav.signUp")}
              </Button>
              <Button
                variant="contained"
                sx={{ color: "white" }}
                onClick={() => router.push("/join/login")}
              >
                {t("nav.login")}
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
                    style={{ borderRadius: "50%", width: 38, height: 38, objectFit: "cover" }}
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
              <Avatar /> {t("nav.myAccount")}
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <Settings fontSize="small" />
              </ListItemIcon>
              {t("nav.settings")}
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
              {t("nav.logout")}
            </MenuItem>
          </Menu>

          {/* Notification Popover */}
          <Popover
            open={notifOpen}
            anchorEl={notifAnchor}
            onClose={handleNotifClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            slotProps={{
              paper: {
                sx: {
                  width: 380,
                  maxHeight: 480,
                  borderRadius: 3,
                  boxShadow: "0 12px 40px rgba(0,0,0,0.15)",
                  overflow: "hidden",
                },
              },
            }}
          >
            <Stack>
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
                <Typography fontWeight={700} fontSize={16}>
                  {t("notification.notifications")}
                </Typography>
                {unreadCount > 0 && (
                  <Button
                    size="small"
                    startIcon={<DoneAllIcon sx={{ fontSize: 16 }} />}
                    onClick={handleMarkAllRead}
                    sx={{ textTransform: "none", fontSize: 12 }}
                  >
                    {t("notification.markAllRead")}
                  </Button>
                )}
              </Stack>

              {/* List */}
              <Stack sx={{ maxHeight: 400, overflow: "auto" }}>
                {notifications.length === 0 ? (
                  <Stack alignItems="center" py={5}>
                    <NotificationsIcon
                      sx={{ fontSize: 40, color: "text.disabled", mb: 1 }}
                    />
                    <Typography color="text.secondary" fontSize={14}>
                      {t("notification.noNotifications")}
                    </Typography>
                  </Stack>
                ) : (
                  notifications.map((n: any) => (
                    <Stack
                      key={n._id}
                      direction="row"
                      gap={1.5}
                      px={2.5}
                      py={1.5}
                      onClick={() => {
                        if (!n.isRead) handleMarkRead(n._id);
                        handleNotifClose();
                        // Navigate based on notification type
                        if (
                          n.notificationType === "GENERAL" &&
                          n.notificationRefId
                        ) {
                          // Message notification
                          if (isPartner) {
                            router.push(
                              "/register-property/dashboard?tab=messages"
                            );
                          } else {
                            router.push(
                              `/myPage/${user.user._id}/reservations`
                            );
                          }
                        } else if (
                          n.notificationType === "RESERVATION_CONFIRMED" ||
                          n.notificationType === "RESERVATION_CANCELLED" ||
                          n.notificationType === "RESERVATION_REFUNDED"
                        ) {
                          router.push(`/myPage/${user.user._id}/reservations`);
                        }
                      }}
                      sx={{
                        cursor: "pointer",
                        backgroundColor: n.isRead
                          ? "transparent"
                          : "action.hover",
                        borderBottom: "1px solid",
                        borderColor: "divider",
                        transition: "background-color 0.2s",
                        "&:hover": {
                          backgroundColor: "action.selected",
                        },
                      }}
                    >
                      <Box mt={0.3}>{getNotifIcon(n.notificationType)}</Box>
                      <Stack flex={1} gap={0.3}>
                        <Stack
                          direction="row"
                          justifyContent="space-between"
                          alignItems="center"
                        >
                          <Typography
                            fontSize={13}
                            fontWeight={n.isRead ? 400 : 700}
                          >
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
                        <Typography
                          fontSize={12}
                          color="text.secondary"
                          lineHeight={1.4}
                        >
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
      </Stack>
    </Stack>
  );
}
