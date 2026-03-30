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
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import HotelIcon from "@mui/icons-material/Hotel";
import NightsStayIcon from "@mui/icons-material/NightsStay";
import PaymentIcon from "@mui/icons-material/Payment";
import PersonIcon from "@mui/icons-material/Person";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import React, { useState } from "react";
import { TableVirtuoso, TableComponents } from "react-virtuoso";
import { GET_RESERVED_ROOMS } from "@/apollo/user/query";
import { useQuery } from "@apollo/client";
import { formatShortDate } from "../../utils";

interface Data {
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

interface ColumnData {
  dataKey: keyof Data;
  label: string;
  numeric?: boolean;
  width?: number;
}

const Reservations = () => {
  const [selectedReservation, setSelectedReservation] = useState<Data | null>(
    null
  );
  const [detailOpen, setDetailOpen] = useState(false);

  // NEW: State for clicked big image
  const [zoomImage, setZoomImage] = useState<string | null>(null);

  const handleRowClick = (reservation: any) => {
    setSelectedReservation(reservation);
    setDetailOpen(true);
  };

  const {
    data: reservedRoomsData,
    loading: reservedRoomsLoading,
    refetch: reservedRoomsRefetch,
  } = useQuery(GET_RESERVED_ROOMS, {
    variables: { input: { page: 1, limit: 50 } },
  });

  const reservationsList = reservedRoomsData?.getReservedRooms.list || [];

  const columns: ColumnData[] = [
    { width: 120, label: "Hotel", dataKey: "propertyName" },
    { width: 100, label: "Room", dataKey: "roomType" },
    { width: 50, label: "Nights", dataKey: "nights", numeric: true },
    { width: 80, label: "Price", dataKey: "roomPricePerNight" },
    { width: 150, label: "Contact", dataKey: "hotelOwnerPhoneNumber" },
  ];

  const rows: Data[] = reservationsList.map((item: any, index: number) => {
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
      nights: nights,
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
  });

  const VirtuosoTableComponents: TableComponents<Data> = {
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
        {columns.map((column) => (
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

  function rowContent(_index: number, row: Data) {
    return (
      <>
        {columns.map((column) => (
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
        My Reservations
      </Typography>

      {/* Drawer */}
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
            {/* Header image */}
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
                  src={`${process.env.NEXT_PUBLIC_API_URL}/${selectedReservation.propertyImages[0]}`}
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

            {/* Content */}
            <Stack p={2.5} gap={2.5}>
              {/* Stay dates */}
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
                    Stay Dates
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

              {/* Room & Price */}
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
                      Room Type
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
                      Price / night
                    </Typography>
                  </Stack>
                  <Typography fontWeight={600}>
                    {selectedReservation.roomPricePerNight}
                  </Typography>
                </Stack>
              </Stack>

              {/* Guest & Payment */}
              <Stack gap={1.5}>
                <Typography fontWeight={700} fontSize={16}>
                  Guest & Payment
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

              {/* Location & Contact */}
              <Stack gap={1.5}>
                <Typography fontWeight={700} fontSize={16}>
                  Location & Contact
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

              {/* Gallery */}
              {selectedReservation.propertyImages.length > 1 && (
                <Stack gap={1.5}>
                  <Typography fontWeight={700} fontSize={16}>
                    Photos
                  </Typography>
                  <Stack direction="row" gap={1} flexWrap="wrap">
                    {selectedReservation.propertyImages.map((img, i) => (
                      <Box
                        key={i}
                        onClick={() =>
                          setZoomImage(
                            `${process.env.NEXT_PUBLIC_API_URL}/${img}`
                          )
                        }
                        sx={{
                          width: 110,
                          height: 80,
                          borderRadius: 1.5,
                          overflow: "hidden",
                          cursor: "pointer",
                          border: "1px solid",
                          borderColor: "divider",
                          transition: "transform 0.2s, box-shadow 0.2s",
                          "&:hover": {
                            transform: "scale(1.05)",
                            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                          },
                        }}
                      >
                        <img
                          src={`${process.env.NEXT_PUBLIC_API_URL}/${img}`}
                          alt={`photo-${i}`}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                      </Box>
                    ))}
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

      {/* Main table */}
      <Paper
        style={{
          height: "530px",
          width: "100%",
          border: "none",
          boxShadow: "none",
        }}
      >
        <TableVirtuoso
          data={rows}
          components={VirtuosoTableComponents}
          fixedHeaderContent={fixedHeaderContent}
          itemContent={rowContent}
        />
      </Paper>
    </Stack>
  );
};

export default Reservations;
