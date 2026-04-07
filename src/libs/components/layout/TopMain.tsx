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

  // Notification state
  const [notifAnchor, setNotifAnchor] = useState<null | HTMLElement>(null);
  const notifOpen = Boolean(notifAnchor);

  const partner = useReactiveVar(partnerVar);
  const isLoggedIn = user?.user?._id && user.user._id !== "";
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

            <Link
              href={`/myPage/${user?.user?._id}/reservations`}
              className="links"
            >
              My Dashboard
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
            {isLoggedIn && (
              <IconButton onClick={handleNotifClick} sx={{ ml: 0.5 }}>
                <Badge badgeContent={unreadCount} color="error" max={99}>
                  <NotificationsIcon sx={{ color: "text.primary" }} />
                </Badge>
              </IconButton>
            )}
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
                  Notifications
                </Typography>
                {unreadCount > 0 && (
                  <Button
                    size="small"
                    startIcon={<DoneAllIcon sx={{ fontSize: 16 }} />}
                    onClick={handleMarkAllRead}
                    sx={{ textTransform: "none", fontSize: 12 }}
                  >
                    Mark all read
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
                      No notifications yet
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
