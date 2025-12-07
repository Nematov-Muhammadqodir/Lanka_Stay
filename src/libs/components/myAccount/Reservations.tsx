import {
  Drawer,
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
  cardNumber: string;
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
    const start = new Date(item.reservationData.startDate);
    const end = new Date(item.reservationData.endDate);

    const nights = Math.ceil(
      (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
    );

    return {
      id: index,
      propertyName: item.propertyName,
      roomType: item.roomData?.roomType ?? "-",
      nights: nights,
      roomPricePerNight: item.roomData?.roomPricePerNight ?? "-",
      hotelOwnerPhoneNumber: item.memberData.partnerPhoneNumber,

      propertyImages: item.propertyImages ?? [],
      propertyRegion: item.propertyRegion ?? "-",
      propertyCountry: item.propertyCountry ?? "-",
      cardNumber: item.reservationData?.cardNumber ?? "-",
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
              "&:hover": { backgroundColor: "#f2f2f2" },
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
            width: 480, // ← FIXED WIDTH (change as you want)
            maxWidth: "100%",
          },
        }}
      >
        <Stack width={"100%"} p={3} gap={2}>
          <Typography variant="h5" fontWeight={700}>
            Reservation Details
          </Typography>

          {selectedReservation && (
            <Stack gap={5} width={"100%"} justifyContent={"space-between"}>
              <Stack>
                <Typography>
                  <b>Hotel:</b> {selectedReservation.propertyName}
                </Typography>
                <Typography>
                  <b>Room:</b> {selectedReservation.roomType}
                </Typography>
                <Typography>
                  <b>Nights:</b> {selectedReservation.nights}
                </Typography>
                <Typography>
                  <b>Price/night:</b> {selectedReservation.roomPricePerNight}
                </Typography>
                <Typography>
                  <b>Guest:</b> {selectedReservation.guestName}
                </Typography>
                <Typography>
                  <b>Card Number:</b> {selectedReservation.cardNumber}
                </Typography>
                <Typography>
                  <b>Start:</b> {formatShortDate(selectedReservation.startDate)}
                </Typography>
                <Typography>
                  <b>End:</b> {formatShortDate(selectedReservation.endDate)}
                </Typography>
                <Typography>
                  <b>Region:</b> {selectedReservation.propertyRegion}
                </Typography>
                <Typography>
                  <b>Country:</b> {selectedReservation.propertyCountry}
                </Typography>
                <Typography>
                  <b>Contact:</b> {selectedReservation.hotelOwnerPhoneNumber}
                </Typography>
              </Stack>

              {/* Images with zoom */}
              <Stack>
                <Typography variant="h4" sx={{ textTransform: "capitalize" }}>
                  Hotel Images
                </Typography>
                <Stack
                  direction="column"
                  gap={1}
                  flexWrap="wrap"
                  mt={1}
                  width="50%"
                  height="350px"
                >
                  {selectedReservation.propertyImages.map((img, i) => (
                    <img
                      key={i}
                      onClick={() =>
                        setZoomImage(
                          `${process.env.NEXT_PUBLIC_API_URL}/${img}`
                        )
                      }
                      src={`${process.env.NEXT_PUBLIC_API_URL}/${img}`}
                      style={{
                        width: 100,
                        height: 100,
                        borderRadius: 6,
                        objectFit: "cover",
                        border: "1px solid #ddd",
                        cursor: "pointer",
                      }}
                    />
                  ))}
                </Stack>
              </Stack>
            </Stack>
          )}
        </Stack>
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
