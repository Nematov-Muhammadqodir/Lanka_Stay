import {
  Box,
  Button,
  Chip,
  Drawer,
  IconButton,
  Stack,
  Typography,
  Dialog,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Tab,
  Tabs,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import HotelIcon from "@mui/icons-material/Hotel";
import NightsStayIcon from "@mui/icons-material/NightsStay";
import PaymentIcon from "@mui/icons-material/Payment";
import PersonIcon from "@mui/icons-material/Person";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AttractionsIcon from "@mui/icons-material/Attractions";
import React, { useState } from "react";
import { useTranslation } from "next-i18next";
import { TableVirtuoso, TableComponents } from "react-virtuoso";
import {
  GET_RESERVED_ROOMS,
  GET_ATTRACTION_RESERVATIONS,
} from "@/apollo/user/query";
import { useQuery } from "@apollo/client";
import { formatShortDate } from "../../utils";
import { formatKoreanWon } from "../../handlers/priceHandler";
import { resolveImageUrl } from "@/src/libs/handlers/imageHandler";

interface HotelData {
  id: number;
  propertyName: string;
  roomType: string;
  nights: number;
  roomPricePerNight: string;
  hotelOwnerPhoneNumber: string;
  propertyImages: string[];
  propertyRegion: string;
  propertyCountry: string;
  paymentStatus: string;
  guestName: string;
  startDate: string;
  endDate: string;
}

interface HotelColumnData {
  dataKey: keyof HotelData;
  label: string;
  numeric?: boolean;
  width?: number;
}

const Reservations = () => {
  const { t } = useTranslation("common");
  const [tab, setTab] = useState(0);
  const [selectedReservation, setSelectedReservation] =
    useState<HotelData | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [zoomImage, setZoomImage] = useState<string | null>(null);
  const [selectedAttraction, setSelectedAttraction] = useState<any>(null);
  const [attractionDetailOpen, setAttractionDetailOpen] = useState(false);

  const handleRowClick = (reservation: any) => {
    setSelectedReservation(reservation);
    setDetailOpen(true);
  };

  // Hotel reservations
  const { data: reservedRoomsData } = useQuery(GET_RESERVED_ROOMS, {
    variables: { input: { page: 1, limit: 50 } },
  });
  const reservationsList = reservedRoomsData?.getReservedRooms.list || [];

  // Attraction reservations
  const { data: attractionResData } = useQuery(GET_ATTRACTION_RESERVATIONS);
  const attractionReservations =
    attractionResData?.getAttractionReservations || [];

  const hotelColumns: HotelColumnData[] = [
    { width: 120, label: t("booking.hotel"), dataKey: "propertyName" },
    { width: 100, label: t("booking.room"), dataKey: "roomType" },
    { width: 50, label: t("booking.nights"), dataKey: "nights", numeric: true },
    { width: 80, label: t("booking.price"), dataKey: "roomPricePerNight" },
    { width: 150, label: t("booking.contact"), dataKey: "hotelOwnerPhoneNumber" },
  ];

  const hotelRows: HotelData[] = reservationsList.map(
    (item: any, index: number) => {
      const startRaw = item.reservationData?.startDate;
      const endRaw = item.reservationData?.endDate;
      const start = startRaw ? new Date(startRaw) : null;
      const end = endRaw ? new Date(endRaw) : null;
      const nights =
        start && end && !isNaN(start.getTime()) && !isNaN(end.getTime())
          ? Math.ceil(
              (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
            )
          : 0;

      return {
        id: index,
        propertyName: item.propertyName,
        roomType: item.roomData?.roomType ?? "-",
        nights,
        roomPricePerNight: item.roomData?.roomPricePerNight ?? "-",
        hotelOwnerPhoneNumber: item.memberData?.partnerPhoneNumber ?? "-",
        propertyImages: item.propertyImages ?? [],
        propertyRegion: item.propertyRegion ?? "-",
        propertyCountry: item.propertyCountry ?? "-",
        paymentStatus: item.reservationData?.paymentStatus ?? "succeeded",
        guestName: item.reservationData?.guestName ?? "-",
        startDate: item.reservationData?.startDate ?? "-",
        endDate: item.reservationData?.endDate ?? "-",
      };
    }
  );

  const VirtuosoTableComponents: TableComponents<HotelData> = {
    Scroller: React.forwardRef<HTMLDivElement>((props, ref) => (
      <TableContainer component={Paper} {...props} ref={ref} />
    )),
    Table: (props) => (
      <Table
        {...props}
        sx={{ borderCollapse: "separate", tableLayout: "fixed" }}
      />
    ),
    TableHead: React.forwardRef<HTMLTableSectionElement>((props, ref) => (
      <TableHead {...props} ref={ref} />
    )),
    TableRow,
    TableBody: React.forwardRef<HTMLTableSectionElement>((props, ref) => (
      <TableBody {...props} ref={ref} />
    )),
  };

  function fixedHeaderContent() {
    return (
      <TableRow>
        {hotelColumns.map((column) => (
          <TableCell
            key={column.dataKey}
            variant="head"
            align={column.numeric ? "right" : "left"}
            style={{ width: column.width, fontWeight: "bold" }}
          >
            {column.label}
          </TableCell>
        ))}
      </TableRow>
    );
  }

  function rowContent(_index: number, row: HotelData) {
    return (
      <>
        {hotelColumns.map((column) => (
          <TableCell
            key={column.dataKey}
            align={column.numeric ? "right" : "left"}
            onClick={() => handleRowClick(row)}
            sx={{
              cursor: "pointer",
              "&:hover": { backgroundColor: "action.hover" },
            }}
          >
            {row[column.dataKey]}
          </TableCell>
        ))}
      </>
    );
  }

  return (
    <Stack width={"100%"} mb={10} gap={2}>
      <Typography variant="h4" fontWeight={700}>
        {t("myPage.myReservations")}
      </Typography>

      {/* Tabs */}
      <Tabs
        value={tab}
        onChange={(_, v) => setTab(v)}
        sx={{ borderBottom: "1px solid", borderColor: "divider" }}
      >
        <Tab
          icon={<HotelIcon />}
          iconPosition="start"
          label={t("myPage.hotelReservations")}
          sx={{ textTransform: "none", fontWeight: 600 }}
        />
        <Tab
          icon={<AttractionsIcon />}
          iconPosition="start"
          label={t("myPage.attractionReservations")}
          sx={{ textTransform: "none", fontWeight: 600 }}
        />
      </Tabs>

      {/* Hotel Reservations Tab */}
      {tab === 0 && (
        <>
          {hotelRows.length === 0 ? (
            <Stack alignItems="center" py={6}>
              <Typography color="text.secondary">
                {t("myPage.noHotelReservations")}
              </Typography>
            </Stack>
          ) : (
            <Paper
              style={{
                height: "530px",
                width: "100%",
                border: "none",
                boxShadow: "none",
              }}
            >
              <TableVirtuoso
                data={hotelRows}
                components={VirtuosoTableComponents}
                fixedHeaderContent={fixedHeaderContent}
                itemContent={rowContent}
              />
            </Paper>
          )}
        </>
      )}

      {/* Attraction Reservations Tab */}
      {tab === 1 && (
        <>
          {attractionReservations.length === 0 ? (
            <Stack alignItems="center" py={6}>
              <Typography color="text.secondary">
                {t("myPage.noAttractionReservations")}
              </Typography>
            </Stack>
          ) : (
            <TableContainer
              component={Paper}
              sx={{
                boxShadow: "none",
                border: "1px solid",
                borderColor: "divider",
              }}
            >
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 700 }}>{t("booking.attraction")}</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>{t("booking.date")}</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>{t("booking.time")}</TableCell>
                    <TableCell sx={{ fontWeight: 700 }} align="center">
                      {t("booking.tickets")}
                    </TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>{t("booking.amount")}</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>{t("booking.status")}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {attractionReservations.map((r: any) => (
                    <TableRow
                      key={r._id}
                      hover
                      sx={{ cursor: "pointer" }}
                      onClick={() => {
                        setSelectedAttraction(r);
                        setAttractionDetailOpen(true);
                      }}
                    >
                      <TableCell>
                        <Typography fontSize={14} fontWeight={600}>
                          {r.attractionData?.attractionName ?? "Unknown"}
                        </Typography>
                        <Typography fontSize={12} color="text.secondary">
                          {r.attractionData?.attractionCity ?? ""}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        {r.selectedDate
                          ? new Date(r.selectedDate).toLocaleDateString(
                              "en-GB",
                              {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              }
                            )
                          : "-"}
                      </TableCell>
                      <TableCell>{r.selectedTime}</TableCell>
                      <TableCell align="center">{r.ticketCount}</TableCell>
                      <TableCell>
                        {formatKoreanWon(String(r.paymentAmount ?? 0))}
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={
                            r.paymentStatus === "succeeded"
                              ? "Paid"
                              : r.paymentStatus ?? "N/A"
                          }
                          size="small"
                          color={
                            r.paymentStatus === "succeeded"
                              ? "success"
                              : "default"
                          }
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </>
      )}

      {/* Hotel Reservation Detail Drawer */}
      <Drawer
        anchor="right"
        open={detailOpen}
        onClose={() => setDetailOpen(false)}
        PaperProps={{
          sx: {
            width: 520,
            maxWidth: "100%",
            backgroundColor: "background.paper",
          },
        }}
      >
        {selectedReservation && (
          <Stack height="100%" overflow="auto">
            {selectedReservation.propertyImages.length > 0 ? (
              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  height: 220,
                  flexShrink: 0,
                }}
              >
                <img
                  src={resolveImageUrl(selectedReservation.propertyImages[0])}
                  alt={selectedReservation.propertyName}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%)",
                  }}
                />
                <Typography
                  sx={{
                    position: "absolute",
                    bottom: 16,
                    left: 20,
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: 22,
                    textShadow: "0 1px 4px rgba(0,0,0,0.4)",
                  }}
                >
                  {selectedReservation.propertyName}
                </Typography>
                <IconButton
                  onClick={() => setDetailOpen(false)}
                  sx={{
                    position: "absolute",
                    top: 10,
                    right: 10,
                    backgroundColor: "rgba(0,0,0,0.4)",
                    color: "#fff",
                    "&:hover": { backgroundColor: "rgba(0,0,0,0.6)" },
                  }}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              </Box>
            ) : (
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                p={2.5}
                pb={1}
              >
                <Typography fontWeight={700} fontSize={22}>
                  {selectedReservation.propertyName}
                </Typography>
                <IconButton onClick={() => setDetailOpen(false)}>
                  <CloseIcon />
                </IconButton>
              </Stack>
            )}

            <Stack p={2.5} gap={2.5}>
              <Stack
                direction="row"
                gap={1.5}
                sx={{
                  backgroundColor: "secondary.main",
                  borderRadius: 2,
                  p: 2,
                }}
              >
                <CalendarMonthIcon
                  sx={{ color: "primary.main", mt: "2px" }}
                  fontSize="small"
                />
                <Stack flex={1}>
                  <Typography fontWeight={600} fontSize={14}>
                    {t("booking.stayDates")}
                  </Typography>
                  <Stack direction="row" alignItems="center" gap={1} mt={0.5}>
                    <Chip
                      label={formatShortDate(selectedReservation.startDate)}
                      size="small"
                      sx={{ fontWeight: 600 }}
                    />
                    <Typography color="text.secondary" fontSize={13}>
                      to
                    </Typography>
                    <Chip
                      label={formatShortDate(selectedReservation.endDate)}
                      size="small"
                      sx={{ fontWeight: 600 }}
                    />
                    <Typography
                      color="text.secondary"
                      fontSize={13}
                      ml="auto"
                    >
                      {selectedReservation.nights}{" "}
                      {selectedReservation.nights === 1 ? "night" : "nights"}
                    </Typography>
                  </Stack>
                </Stack>
              </Stack>

              <Stack
                direction="row"
                gap={2}
                sx={{
                  border: "1px solid",
                  borderColor: "divider",
                  borderRadius: 2,
                  p: 2,
                }}
              >
                <Stack flex={1} gap={1}>
                  <Stack direction="row" alignItems="center" gap={1}>
                    <HotelIcon
                      fontSize="small"
                      sx={{ color: "primary.main" }}
                    />
                    <Typography fontSize={13} color="text.secondary">
                      {t("booking.roomType")}
                    </Typography>
                  </Stack>
                  <Typography fontWeight={600}>
                    {selectedReservation.roomType}
                  </Typography>
                </Stack>
                <Stack
                  flex={1}
                  gap={1}
                  sx={{
                    borderLeft: "1px solid",
                    borderColor: "divider",
                    pl: 2,
                  }}
                >
                  <Stack direction="row" alignItems="center" gap={1}>
                    <NightsStayIcon
                      fontSize="small"
                      sx={{ color: "primary.main" }}
                    />
                    <Typography fontSize={13} color="text.secondary">
                      {t("booking.pricePerNight")}
                    </Typography>
                  </Stack>
                  <Typography fontWeight={600}>
                    {selectedReservation.roomPricePerNight}
                  </Typography>
                </Stack>
              </Stack>

              <Stack gap={1.5}>
                <Typography fontWeight={700} fontSize={16}>
                  {t("booking.guestAndPayment")}
                </Typography>
                <Stack
                  gap={1.5}
                  sx={{
                    border: "1px solid",
                    borderColor: "divider",
                    borderRadius: 2,
                    p: 2,
                  }}
                >
                  <Stack direction="row" alignItems="center" gap={1.5}>
                    <PersonIcon
                      fontSize="small"
                      sx={{ color: "text.secondary" }}
                    />
                    <Typography fontSize={14}>
                      {selectedReservation.guestName}
                    </Typography>
                  </Stack>
                  <Stack direction="row" alignItems="center" gap={1.5}>
                    <PaymentIcon
                      fontSize="small"
                      sx={{ color: "text.secondary" }}
                    />
                    <Typography fontSize={14}>
                      Payment:{" "}
                      <Typography
                        component="span"
                        fontSize={14}
                        fontWeight={600}
                        color={
                          selectedReservation.paymentStatus === "succeeded"
                            ? "success.main"
                            : "warning.main"
                        }
                      >
                        {selectedReservation.paymentStatus === "succeeded"
                          ? "Paid"
                          : selectedReservation.paymentStatus}
                      </Typography>
                    </Typography>
                  </Stack>
                </Stack>
              </Stack>

              <Stack gap={1.5}>
                <Typography fontWeight={700} fontSize={16}>
                  {t("booking.locationAndContact")}
                </Typography>
                <Stack
                  gap={1.5}
                  sx={{
                    border: "1px solid",
                    borderColor: "divider",
                    borderRadius: 2,
                    p: 2,
                  }}
                >
                  <Stack direction="row" alignItems="center" gap={1.5}>
                    <LocationOnIcon
                      fontSize="small"
                      sx={{ color: "text.secondary" }}
                    />
                    <Typography fontSize={14}>
                      {selectedReservation.propertyRegion},{" "}
                      {selectedReservation.propertyCountry}
                    </Typography>
                  </Stack>
                  <Stack direction="row" alignItems="center" gap={1.5}>
                    <PhoneIcon
                      fontSize="small"
                      sx={{ color: "text.secondary" }}
                    />
                    <Typography fontSize={14}>
                      {selectedReservation.hotelOwnerPhoneNumber}
                    </Typography>
                  </Stack>
                </Stack>
              </Stack>

              {selectedReservation.propertyImages.length > 1 && (
                <Stack gap={1.5}>
                  <Typography fontWeight={700} fontSize={16}>
                    {t("booking.photos")}
                  </Typography>
                  <Stack direction="row" gap={1} flexWrap="wrap">
                    {selectedReservation.propertyImages.map(
                      (img: string, i: number) => (
                        <Box
                          key={i}
                          onClick={() =>
                            setZoomImage(resolveImageUrl(img))
                          }
                          sx={{
                            width: 110,
                            height: 80,
                            borderRadius: 1.5,
                            overflow: "hidden",
                            cursor: "pointer",
                            border: "1px solid",
                            borderColor: "divider",
                            transition: "transform 0.2s",
                            "&:hover": { transform: "scale(1.05)" },
                          }}
                        >
                          <img
                            src={resolveImageUrl(img)}
                            alt={`photo-${i}`}
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                          />
                        </Box>
                      )
                    )}
                  </Stack>
                </Stack>
              )}
            </Stack>
          </Stack>
        )}
      </Drawer>

      {/* Attraction Reservation Detail Drawer */}
      <Drawer
        anchor="right"
        open={attractionDetailOpen}
        onClose={() => setAttractionDetailOpen(false)}
        PaperProps={{
          sx: {
            width: 520,
            maxWidth: "100%",
            backgroundColor: "background.paper",
          },
        }}
      >
        {selectedAttraction && (
          <Stack height="100%" overflow="auto">
            {/* Header Image */}
            {selectedAttraction.attractionData?.attractionImages?.length >
            0 ? (
              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  height: 220,
                  flexShrink: 0,
                }}
              >
                <img
                  src={resolveImageUrl(
                    selectedAttraction.attractionData.attractionImages[0]
                  )}
                  alt={
                    selectedAttraction.attractionData?.attractionName ??
                    "Attraction"
                  }
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%)",
                  }}
                />
                <Stack
                  sx={{
                    position: "absolute",
                    bottom: 16,
                    left: 20,
                  }}
                >
                  <Typography
                    sx={{
                      color: "#fff",
                      fontWeight: 700,
                      fontSize: 22,
                      textShadow: "0 1px 4px rgba(0,0,0,0.4)",
                    }}
                  >
                    {selectedAttraction.attractionData?.attractionName}
                  </Typography>
                  <Typography
                    sx={{
                      color: "rgba(255,255,255,0.85)",
                      fontSize: 13,
                      textShadow: "0 1px 4px rgba(0,0,0,0.4)",
                    }}
                  >
                    {selectedAttraction.attractionData?.attractionCity},{" "}
                    {selectedAttraction.attractionData?.attractionCountry}
                  </Typography>
                </Stack>
                <IconButton
                  onClick={() => setAttractionDetailOpen(false)}
                  sx={{
                    position: "absolute",
                    top: 10,
                    right: 10,
                    backgroundColor: "rgba(0,0,0,0.4)",
                    color: "#fff",
                    "&:hover": { backgroundColor: "rgba(0,0,0,0.6)" },
                  }}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              </Box>
            ) : (
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                p={2.5}
                pb={1}
              >
                <Typography fontWeight={700} fontSize={22}>
                  {selectedAttraction.attractionData?.attractionName ??
                    "Booking Details"}
                </Typography>
                <IconButton
                  onClick={() => setAttractionDetailOpen(false)}
                >
                  <CloseIcon />
                </IconButton>
              </Stack>
            )}

            <Stack p={2.5} gap={2.5}>
              {/* Date & Time */}
              <Stack
                direction="row"
                gap={1.5}
                sx={{
                  backgroundColor: "secondary.main",
                  borderRadius: 2,
                  p: 2,
                }}
              >
                <CalendarMonthIcon
                  sx={{ color: "primary.main", mt: "2px" }}
                  fontSize="small"
                />
                <Stack flex={1}>
                  <Typography fontWeight={600} fontSize={14}>
                    {t("booking.dateAndTime")}
                  </Typography>
                  <Stack direction="row" alignItems="center" gap={1} mt={0.5}>
                    <Chip
                      label={
                        selectedAttraction.selectedDate
                          ? new Date(
                              selectedAttraction.selectedDate
                            ).toLocaleDateString("en-GB", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })
                          : "-"
                      }
                      size="small"
                      sx={{ fontWeight: 600 }}
                    />
                    <Chip
                      icon={<AccessTimeIcon sx={{ fontSize: 14 }} />}
                      label={selectedAttraction.selectedTime}
                      size="small"
                      sx={{ fontWeight: 600 }}
                    />
                  </Stack>
                </Stack>
              </Stack>

              {/* Tickets & Amount */}
              <Stack
                direction="row"
                gap={2}
                sx={{
                  border: "1px solid",
                  borderColor: "divider",
                  borderRadius: 2,
                  p: 2,
                }}
              >
                <Stack flex={1} gap={1}>
                  <Stack direction="row" alignItems="center" gap={1}>
                    <ConfirmationNumberIcon
                      fontSize="small"
                      sx={{ color: "primary.main" }}
                    />
                    <Typography fontSize={13} color="text.secondary">
                      {t("booking.tickets")}
                    </Typography>
                  </Stack>
                  <Typography fontWeight={600}>
                    {selectedAttraction.ticketCount}{" "}
                    {selectedAttraction.ticketCount === 1
                      ? "ticket"
                      : "tickets"}
                  </Typography>
                </Stack>
                <Stack
                  flex={1}
                  gap={1}
                  sx={{
                    borderLeft: "1px solid",
                    borderColor: "divider",
                    pl: 2,
                  }}
                >
                  <Stack direction="row" alignItems="center" gap={1}>
                    <PaymentIcon
                      fontSize="small"
                      sx={{ color: "primary.main" }}
                    />
                    <Typography fontSize={13} color="text.secondary">
                      {t("booking.amountPaid")}
                    </Typography>
                  </Stack>
                  <Typography fontWeight={600}>
                    {formatKoreanWon(
                      String(selectedAttraction.paymentAmount ?? 0)
                    )}
                  </Typography>
                </Stack>
              </Stack>

              {/* Attraction Info */}
              {selectedAttraction.attractionData && (
                <Stack gap={1.5}>
                  <Typography fontWeight={700} fontSize={16}>
                    {t("booking.attractionInfo")}
                  </Typography>
                  <Stack
                    gap={1.5}
                    sx={{
                      border: "1px solid",
                      borderColor: "divider",
                      borderRadius: 2,
                      p: 2,
                    }}
                  >
                    <Stack direction="row" alignItems="center" gap={1.5}>
                      <AttractionsIcon
                        fontSize="small"
                        sx={{ color: "text.secondary" }}
                      />
                      <Typography fontSize={14}>
                        {selectedAttraction.attractionData.attractionType}
                      </Typography>
                    </Stack>
                    <Stack direction="row" alignItems="center" gap={1.5}>
                      <LocationOnIcon
                        fontSize="small"
                        sx={{ color: "text.secondary" }}
                      />
                      <Typography fontSize={14}>
                        {selectedAttraction.attractionData.attractionCity},{" "}
                        {selectedAttraction.attractionData.attractionCountry}
                      </Typography>
                    </Stack>
                  </Stack>
                </Stack>
              )}

              {/* Guest Info */}
              <Stack gap={1.5}>
                <Typography fontWeight={700} fontSize={16}>
                  {t("booking.guestDetails")}
                </Typography>
                <Stack
                  gap={1.5}
                  sx={{
                    border: "1px solid",
                    borderColor: "divider",
                    borderRadius: 2,
                    p: 2,
                  }}
                >
                  <Stack direction="row" alignItems="center" gap={1.5}>
                    <PersonIcon
                      fontSize="small"
                      sx={{ color: "text.secondary" }}
                    />
                    <Typography fontSize={14}>
                      {selectedAttraction.guestName}{" "}
                      {selectedAttraction.guestLastName ?? ""}
                    </Typography>
                  </Stack>
                  <Stack direction="row" alignItems="center" gap={1.5}>
                    <Typography fontSize={14} color="text.secondary" pl={4.5}>
                      {selectedAttraction.guestEmail}
                    </Typography>
                  </Stack>
                  {selectedAttraction.guestPhoneNumber && (
                    <Stack direction="row" alignItems="center" gap={1.5}>
                      <PhoneIcon
                        fontSize="small"
                        sx={{ color: "text.secondary" }}
                      />
                      <Typography fontSize={14}>
                        {selectedAttraction.guestPhoneNumber}
                      </Typography>
                    </Stack>
                  )}
                </Stack>
              </Stack>

              {/* Payment Status */}
              <Stack gap={1.5}>
                <Typography fontWeight={700} fontSize={16}>
                  {t("booking.payment")}
                </Typography>
                <Stack
                  sx={{
                    border: "1px solid",
                    borderColor: "divider",
                    borderRadius: 2,
                    p: 2,
                  }}
                >
                  <Stack direction="row" alignItems="center" gap={1.5}>
                    <PaymentIcon
                      fontSize="small"
                      sx={{ color: "text.secondary" }}
                    />
                    <Typography fontSize={14}>
                      Status:{" "}
                      <Typography
                        component="span"
                        fontSize={14}
                        fontWeight={600}
                        color={
                          selectedAttraction.paymentStatus === "succeeded"
                            ? "success.main"
                            : "warning.main"
                        }
                      >
                        {selectedAttraction.paymentStatus === "succeeded"
                          ? "Paid"
                          : selectedAttraction.paymentStatus}
                      </Typography>
                    </Typography>
                  </Stack>
                </Stack>
              </Stack>

              {/* Photos */}
              {selectedAttraction.attractionData?.attractionImages?.length >
                1 && (
                <Stack gap={1.5}>
                  <Typography fontWeight={700} fontSize={16}>
                    {t("booking.photos")}
                  </Typography>
                  <Stack direction="row" gap={1} flexWrap="wrap">
                    {selectedAttraction.attractionData.attractionImages.map(
                      (img: string, i: number) => (
                        <Box
                          key={i}
                          onClick={() =>
                            setZoomImage(resolveImageUrl(img))
                          }
                          sx={{
                            width: 110,
                            height: 80,
                            borderRadius: 1.5,
                            overflow: "hidden",
                            cursor: "pointer",
                            border: "1px solid",
                            borderColor: "divider",
                            transition: "transform 0.2s",
                            "&:hover": { transform: "scale(1.05)" },
                          }}
                        >
                          <img
                            src={resolveImageUrl(img)}
                            alt={`photo-${i}`}
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                          />
                        </Box>
                      )
                    )}
                  </Stack>
                </Stack>
              )}
            </Stack>
          </Stack>
        )}
      </Drawer>

      {/* Image Zoom Modal */}
      <Dialog open={Boolean(zoomImage)} onClose={() => setZoomImage(null)}>
        <img
          src={zoomImage || ""}
          style={{
            maxWidth: "90vw",
            maxHeight: "90vh",
            objectFit: "contain",
          }}
        />
      </Dialog>
    </Stack>
  );
};

export default Reservations;
