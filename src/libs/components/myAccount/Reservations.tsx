import { Drawer, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TableVirtuoso, TableComponents } from "react-virtuoso";
import Chance from "chance";
import { GET_RESERVED_ROOMS } from "@/apollo/user/query";
import { useQuery } from "@apollo/client";

interface Data {
  id: number;
  propertyName: string;
  roomType: string;
  nights: number;
  roomPricePerNight: string;
  hotelOwnerPhoneNumber: string;
}

interface ColumnData {
  dataKey: keyof Data;
  label: string;
  numeric?: boolean;
  width?: number;
}

const Reservations = () => {
  const [selectedReservation, setSelectedReservation] = useState<any>(null);
  const [detailOpen, setDetailOpen] = useState(false);

  const handleRowClick = (reservation: any) => {
    console.log("RESERVATION ITEM", reservation);
    setSelectedReservation(reservation);
    setDetailOpen(true);
  };

  const {
    data: reservedRoomsData,
    loading: reservedRoomsLoading,
    refetch: reservedRoomsRefetch,
  } = useQuery(GET_RESERVED_ROOMS, {
    variables: {
      input: {
        page: 1,
        limit: 50,
      },
    },
  });

  const reservationsList = reservedRoomsData?.getReservedRooms.list || [];
  console.log("reservationsList", reservationsList);

  const columns: ColumnData[] = [
    {
      width: 100,
      label: "Hotel Name",
      dataKey: "propertyName",
    },
    {
      width: 100,
      label: "Room Type",
      dataKey: "roomType",
    },
    {
      width: 50,
      label: "Nights",
      dataKey: "nights",
      numeric: true,
    },
    {
      width: 110,
      label: "Price",
      dataKey: "roomPricePerNight",
    },
    {
      width: 130,
      label: "Hotel Contact Info",
      dataKey: "hotelOwnerPhoneNumber",
    },
  ];

  const rows: Data[] = reservationsList.map((item: any, index: number) => {
    const start = new Date(item.reservationData.startDate);
    const end = new Date(item.reservationData.endDate);

    // Calculate nights (difference in days)
    const nights = Math.ceil(
      (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
    );

    return {
      id: index,
      propertyName: item.propertyName,
      roomType: item.roomData?.roomType ?? "-",
      nights: nights, // ← Nights
      roomPricePerNight: item.roomData?.roomPricePerNight ?? "-",
      hotelOwnerPhoneNumber: item.memberData.partnerPhoneNumber,
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
            align={column.numeric || false ? "right" : "left"}
            style={{ width: column.width, fontWeight: "bold" }}
            sx={{ backgroundColor: "background.paper" }}
          >
            {column.label}
          </TableCell>
        ))}
      </TableRow>
    );
  }

  function rowContent(_index: number, row: Data) {
    return (
      <React.Fragment>
        {columns.map((column) => (
          <TableCell
            key={column.dataKey}
            align={column.numeric ? "right" : "left"}
            onClick={() => handleRowClick(row)}
            sx={{
              cursor: "pointer",
              "&:hover": { backgroundColor: "#f5f5f5" },
            }}
          >
            {row[column.dataKey]}
          </TableCell>
        ))}
      </React.Fragment>
    );
  }

  return (
    <Stack width={"100%"} mb={10} gap={2}>
      <Stack
        flexDirection={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Stack>
          <Typography variant="h4" fontWeight={699}>
            My reservations
          </Typography>
        </Stack>
      </Stack>
      <Drawer
        anchor="top"
        open={detailOpen}
        onClose={() => setDetailOpen(false)}
      >
        <Stack width={350} p={3} gap={2}>
          <Typography variant="h5" fontWeight={700}>
            Reservation Details
          </Typography>

          {selectedReservation && (
            <Stack gap={1}>
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
                <b>Price per night:</b> {selectedReservation.roomPricePerNight}
              </Typography>
              <Typography>
                <b>Contact:</b> {selectedReservation.hotelOwnerPhoneNumber}
              </Typography>
            </Stack>
          )}
        </Stack>
      </Drawer>
      <Stack>
        <Paper
          style={{
            height: "530px",
            maxHeight: "530px",
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
    </Stack>
  );
};

export default Reservations;
