import {
  Box,
  Button,
  Chip,
  Dialog,
  IconButton,
  Stack,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  TextField,
  Typography,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { useReactiveVar, useMutation, useQuery } from "@apollo/client";
import { partnerVar } from "@/apollo/store";
import { useRouter } from "next/router";
import {
  GET_PARTNER_PROPERTY_BY_HOTEL_OWNER,
  GET_OWNER_RESERVATIONS,
  GET_ATTRACTIONS_BY_OWNER,
  GET_OWNER_ATTRACTION_RESERVATIONS,
} from "@/apollo/user/query";
import {
  UPDATE_PARTNER_PROPERTY_ROOM,
  DELETE_PARTNER_PROPERTY_ROOM,
  DELETE_ATTRACTION,
} from "@/apollo/user/mutation";
import { sweetConfirmAlert, sweetTopSuccessAlert, sweetErrorAlert } from "@/src/libs/sweetAlert";
import { formatShortDate } from "@/src/libs/utils";
import { formatKoreanWon } from "@/src/libs/handlers/priceHandler";
import LayoutCreateAccountMain from "@/src/libs/components/layout/registerProperty/create-account/CreateAccountMainLayout";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import HotelIcon from "@mui/icons-material/Hotel";
import PeopleIcon from "@mui/icons-material/People";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import AttractionIcon from "@mui/icons-material/Attractions";

const Dashboard = () => {
  const partner = useReactiveVar(partnerVar);
  const router = useRouter();
  const [tab, setTab] = useState(0);
  const [editRoom, setEditRoom] = useState<any>(null);
  const [editValues, setEditValues] = useState<any>({});

  const isAttractionOwner = partner?.partnerType === "ATTRACTION_OWNER" || partner?.userRole === "ATTRACTION_OWNER";

  useEffect(() => {
    if (!partner?._id) {
      router.push("/register-property/create-account");
    }
  }, [partner]);

  const isHotelOwner = !isAttractionOwner;

  // Queries - only fetch what's relevant to the partner type
  const {
    data: propertyData,
    loading: propertyLoading,
    refetch: refetchProperty,
  } = useQuery(GET_PARTNER_PROPERTY_BY_HOTEL_OWNER, {
    variables: { input: partner?._id },
    skip: !partner?._id || isAttractionOwner,
  });

  const {
    data: reservationsData,
    loading: reservationsLoading,
  } = useQuery(GET_OWNER_RESERVATIONS, {
    variables: { input: { page: 1, limit: 100 } },
    skip: !partner?._id || isAttractionOwner,
  });

  // Attractions query
  const {
    data: attractionsData,
    loading: attractionsLoading,
    refetch: refetchAttractions,
  } = useQuery(GET_ATTRACTIONS_BY_OWNER, {
    variables: { input: partner?._id },
    skip: !partner?._id || isHotelOwner,
  });

  const attractions = attractionsData?.getAttractionsByOwner ?? [];

  // Attraction owner reservations
  const {
    data: ownerAttrReservationsData,
  } = useQuery(GET_OWNER_ATTRACTION_RESERVATIONS, {
    skip: !partner?._id || isHotelOwner,
  });
  const ownerAttrReservations =
    ownerAttrReservationsData?.getOwnerAttractionReservations ?? [];

  // Mutations
  const [updateRoom] = useMutation(UPDATE_PARTNER_PROPERTY_ROOM);
  const [deleteRoom] = useMutation(DELETE_PARTNER_PROPERTY_ROOM);
  const [deleteAttractionMutation] = useMutation(DELETE_ATTRACTION);

  const property = propertyData?.getPartnerPropertyByHotelOwner;
  const rooms = property?.propertyRooms ?? [];
  const reservations = reservationsData?.getOwnerReservations?.list ?? [];
  const totalReservations =
    reservationsData?.getOwnerReservations?.metaCounter?.[0]?.total ?? 0;
  const totalEarnings = useMemo(
    () => reservations.reduce((sum: number, r: any) => sum + (r.paymentAmount ?? 0), 0),
    [reservations]
  );

  // Room edit handlers
  const handleEditOpen = (room: any) => {
    setEditRoom(room);
    setEditValues({
      roomType: room.roomType,
      roomName: room.roomName,
      roomPricePerNight: room.roomPricePerNight,
      numberOfGuestsCanStay: room.numberOfGuestsCanStay,
      isSmokingAllowed: room.isSmokingAllowed,
      isBathroomPrivate: room.isBathroomPrivate,
    });
  };

  const handleEditSave = async () => {
    try {
      await updateRoom({
        variables: {
          input: {
            _id: editRoom.roomId,
            roomPricePerNight: editValues.roomPricePerNight,
            numberOfGuestsCanStay: Number(editValues.numberOfGuestsCanStay),
            isSmokingAllowed: editValues.isSmokingAllowed,
            isBathroomPrivate: editValues.isBathroomPrivate,
          },
        },
      });
      await sweetTopSuccessAlert("Room updated!", 1500);
      setEditRoom(null);
      refetchProperty();
    } catch (err: any) {
      sweetErrorAlert(err.message || "Update failed", 2500);
    }
  };

  const handleDelete = async (roomId: string) => {
    const confirmed = await sweetConfirmAlert("Delete this room?");
    if (!confirmed) return;
    try {
      await deleteRoom({ variables: { roomId } });
      await sweetTopSuccessAlert("Room deleted!", 1500);
      refetchProperty();
    } catch (err: any) {
      sweetErrorAlert(err.message || "Delete failed", 2500);
    }
  };

  const handleDeleteAttraction = async (attractionId: string) => {
    const confirmed = await sweetConfirmAlert("Delete this attraction?");
    if (!confirmed) return;
    try {
      await deleteAttractionMutation({ variables: { attractionId } });
      await sweetTopSuccessAlert("Attraction deleted!", 1500);
      refetchAttractions();
    } catch (err: any) {
      sweetErrorAlert(err.message || "Delete failed", 2500);
    }
  };

  if (!partner?._id) return null;

  return (
    <LayoutCreateAccountMain>
    <Stack
      sx={{
        backgroundColor: "background.default",
        minHeight: "100vh",
        alignItems: "center",
        pb: 6,
      }}
    >
      <Stack width={1100} mt={4} gap={3}>
        {/* Header */}
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Stack>
            <Typography fontWeight={700} fontSize={26}>
              {isAttractionOwner ? "Attractions Dashboard" : "Property Dashboard"}
            </Typography>
            <Typography color="text.secondary" fontSize={14}>
              {isAttractionOwner
                ? `${attractions.length} attraction${attractions.length !== 1 ? "s" : ""} listed`
                : property?.propertyName ?? "No property yet"}
            </Typography>
          </Stack>
        </Stack>

        {/* Tabs */}
        <Tabs
          value={tab}
          onChange={(_, v) => setTab(v)}
          sx={{
            borderBottom: "1px solid",
            borderColor: "divider",
          }}
        >
          <Tab label="Overview" />
          {isHotelOwner && <Tab label="Rooms" />}
          {isHotelOwner && <Tab label="Reservations" />}
          {isAttractionOwner && <Tab label="Attractions" />}
          {isAttractionOwner && <Tab label="Reservations" />}
        </Tabs>

        {/* Overview Tab */}
        {tab === 0 && (
          <Stack gap={3}>
            <Stack direction="row" gap={2} flexWrap="wrap">
              {isHotelOwner
                ? [
                    {
                      icon: <MeetingRoomIcon />,
                      label: "Total Rooms",
                      value: rooms.length,
                    },
                    {
                      icon: <CalendarMonthIcon />,
                      label: "Total Reservations",
                      value: totalReservations,
                    },
                    {
                      icon: <AttachMoneyIcon />,
                      label: "Total Earnings",
                      value: formatKoreanWon(String(totalEarnings)),
                    },
                    {
                      icon: <PeopleIcon />,
                      label: "Property Views",
                      value: property?.propertyViews ?? 0,
                    },
                  ].map((card) => (
                    <Stack
                      key={card.label}
                      sx={{
                        flex: "1 1 230px",
                        p: 3,
                        borderRadius: 2,
                        border: "1px solid",
                        borderColor: "divider",
                        backgroundColor: "background.paper",
                      }}
                      gap={1}
                    >
                      <Stack direction="row" alignItems="center" gap={1}>
                        <Box sx={{ color: "primary.main" }}>{card.icon}</Box>
                        <Typography fontSize={13} color="text.secondary">
                          {card.label}
                        </Typography>
                      </Stack>
                      <Typography fontWeight={700} fontSize={24}>
                        {card.value}
                      </Typography>
                    </Stack>
                  ))
                : [
                    {
                      icon: <AttractionIcon />,
                      label: "Total Attractions",
                      value: attractions.length,
                    },
                    {
                      icon: <PeopleIcon />,
                      label: "Total Views",
                      value: attractions.reduce(
                        (sum: number, a: any) => sum + (a.attractionViews ?? 0),
                        0
                      ),
                    },
                    {
                      icon: <CalendarMonthIcon />,
                      label: "Total Reservations",
                      value: ownerAttrReservations.length,
                    },
                    {
                      icon: <AttachMoneyIcon />,
                      label: "Total Earnings",
                      value: formatKoreanWon(
                        String(
                          ownerAttrReservations.reduce(
                            (sum: number, r: any) =>
                              sum + (r.paymentAmount ?? 0),
                            0
                          )
                        )
                      ),
                    },
                  ].map((card) => (
                    <Stack
                      key={card.label}
                      sx={{
                        flex: "1 1 230px",
                        p: 3,
                        borderRadius: 2,
                        border: "1px solid",
                        borderColor: "divider",
                        backgroundColor: "background.paper",
                      }}
                      gap={1}
                    >
                      <Stack direction="row" alignItems="center" gap={1}>
                        <Box sx={{ color: "primary.main" }}>{card.icon}</Box>
                        <Typography fontSize={13} color="text.secondary">
                          {card.label}
                        </Typography>
                      </Stack>
                      <Typography fontWeight={700} fontSize={24}>
                        {card.value}
                      </Typography>
                    </Stack>
                  ))}
            </Stack>

            {/* Property / Attraction Info */}
            {isHotelOwner ? (
              <Stack
                sx={{
                  p: 3,
                  borderRadius: 2,
                  border: "1px solid",
                  borderColor: "divider",
                  backgroundColor: "background.paper",
                }}
                gap={2}
              >
                <Typography fontWeight={700} fontSize={18}>
                  Property Info
                </Typography>
                <Stack direction="row" gap={4} flexWrap="wrap">
                  <Typography fontSize={14}>
                    <b>Type:</b> {property?.propertyType}
                  </Typography>
                  <Typography fontSize={14}>
                    <b>Stars:</b> {property?.propertyStars}
                  </Typography>
                  <Typography fontSize={14}>
                    <b>Location:</b> {property?.propertyCity},{" "}
                    {property?.propertyRegion}, {property?.propertyCountry}
                  </Typography>
                  <Typography fontSize={14}>
                    <b>Status:</b>{" "}
                    <Chip
                      label={property?.propertyStatus}
                      size="small"
                      color={
                        property?.propertyStatus === "ACTIVE"
                          ? "success"
                          : "default"
                      }
                    />
                  </Typography>
                </Stack>
              </Stack>
            ) : (
              <Stack
                sx={{
                  p: 3,
                  borderRadius: 2,
                  border: "1px solid",
                  borderColor: "divider",
                  backgroundColor: "background.paper",
                }}
                gap={2}
              >
                <Typography fontWeight={700} fontSize={18}>
                  Partner Info
                </Typography>
                <Stack direction="row" gap={4} flexWrap="wrap">
                  <Typography fontSize={14}>
                    <b>Name:</b> {partner?.partnerFirstName}{" "}
                    {partner?.partnerLastName}
                  </Typography>
                  <Typography fontSize={14}>
                    <b>Email:</b> {partner?.partnerEmail}
                  </Typography>
                  <Typography fontSize={14}>
                    <b>Type:</b> Attraction Owner
                  </Typography>
                </Stack>
              </Stack>
            )}
          </Stack>
        )}

        {/* Rooms Tab - Hotel Owner only */}
        {isHotelOwner && tab === 1 && (
          <Stack gap={2}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography fontWeight={700} fontSize={18}>
                All Rooms ({rooms.length})
              </Typography>
              <Button
                variant="contained"
                size="small"
                onClick={() =>
                  router.push(
                    "/register-property/add-new-property/add-property-rooms/room-details"
                  )
                }
                sx={{ textTransform: "none" }}
              >
                + Add Room
              </Button>
            </Stack>

            <TableContainer
              component={Paper}
              sx={{ boxShadow: "none", border: "1px solid", borderColor: "divider" }}
            >
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 700 }}>Room Name</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Type</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Price/Night</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Guests</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Smoking</TableCell>
                    <TableCell sx={{ fontWeight: 700 }} align="right">
                      Actions
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rooms.map((room: any) => (
                    <TableRow key={room.roomId} hover>
                      <TableCell>{room.roomName}</TableCell>
                      <TableCell>{room.roomType}</TableCell>
                      <TableCell>
                        {formatKoreanWon(room.roomPricePerNight)}
                      </TableCell>
                      <TableCell>{room.numberOfGuestsCanStay}</TableCell>
                      <TableCell>
                        {room.isSmokingAllowed ? "Yes" : "No"}
                      </TableCell>
                      <TableCell align="right">
                        <IconButton
                          size="small"
                          onClick={() => handleEditOpen(room)}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => handleDelete(room.roomId)}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                  {rooms.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={6} align="center">
                        <Typography color="text.secondary" py={4}>
                          No rooms added yet
                        </Typography>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Stack>
        )}

        {/* Reservations Tab - Hotel Owner only */}
        {isHotelOwner && tab === 2 && (
          <Stack gap={2}>
            <Typography fontWeight={700} fontSize={18}>
              Guest Reservations ({totalReservations})
            </Typography>

            <TableContainer
              component={Paper}
              sx={{ boxShadow: "none", border: "1px solid", borderColor: "divider" }}
            >
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 700 }}>Guest</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Room</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Check-in</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Check-out</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Nights</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Amount</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {reservations.map((r: any) => {
                    const start = r.startDate ? new Date(r.startDate) : null;
                    const end = r.endDate ? new Date(r.endDate) : null;
                    const nights =
                      start && end && !isNaN(start.getTime()) && !isNaN(end.getTime())
                        ? Math.ceil(
                            (end.getTime() - start.getTime()) /
                              (1000 * 60 * 60 * 24)
                          )
                        : "-";

                    return (
                      <TableRow key={r._id} hover>
                        <TableCell>
                          <Typography fontSize={14} fontWeight={600}>
                            {r.guestName} {r.guestLastName ?? ""}
                          </Typography>
                          <Typography fontSize={12} color="text.secondary">
                            {r.guestEmail}
                          </Typography>
                        </TableCell>
                        <TableCell>{r.roomType ?? r.roomName ?? "-"}</TableCell>
                        <TableCell>
                          {r.startDate ? formatShortDate(r.startDate) : "-"}
                        </TableCell>
                        <TableCell>
                          {r.endDate ? formatShortDate(r.endDate) : "-"}
                        </TableCell>
                        <TableCell>{nights}</TableCell>
                        <TableCell>
                          {r.paymentAmount
                            ? formatKoreanWon(String(r.paymentAmount))
                            : "-"}
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={
                              r.paymentStatus === "succeeded" ? "Paid" : r.paymentStatus ?? "N/A"
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
                    );
                  })}
                  {reservations.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={7} align="center">
                        <Typography color="text.secondary" py={4}>
                          No reservations yet
                        </Typography>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Stack>
        )}

        {/* Attractions Tab - Attraction Owner only */}
        {isAttractionOwner && tab === 1 && (
          <Stack gap={2}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography fontWeight={700} fontSize={18}>
                All Attractions ({attractions.length})
              </Typography>
              <Button
                variant="contained"
                size="small"
                onClick={() =>
                  router.push("/register-property/attractions/create")
                }
                sx={{ textTransform: "none" }}
              >
                + Add Attraction
              </Button>
            </Stack>

            <TableContainer
              component={Paper}
              sx={{ boxShadow: "none", border: "1px solid", borderColor: "divider" }}
            >
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 700 }}>Name</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Type</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>City</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Adult Price</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Views</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
                    <TableCell sx={{ fontWeight: 700 }} align="right">
                      Actions
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {attractions.map((attraction: any) => (
                    <TableRow key={attraction._id} hover>
                      <TableCell>{attraction.attractionName}</TableCell>
                      <TableCell>{attraction.attractionType}</TableCell>
                      <TableCell>{attraction.attractionCity}</TableCell>
                      <TableCell>
                        {formatKoreanWon(String(attraction.attractionAdultPrice ?? 0))}
                      </TableCell>
                      <TableCell>{attraction.attractionViews ?? 0}</TableCell>
                      <TableCell>
                        <Chip
                          label={attraction.attractionStatus ?? "ACTIVE"}
                          size="small"
                          color={
                            attraction.attractionStatus === "ACTIVE"
                              ? "success"
                              : "default"
                          }
                        />
                      </TableCell>
                      <TableCell align="right">
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => handleDeleteAttraction(attraction._id)}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                  {attractions.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={7} align="center">
                        <Typography color="text.secondary" py={4}>
                          No attractions added yet
                        </Typography>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Stack>
        )}

        {/* Attraction Reservations Tab - Attraction Owner only */}
        {isAttractionOwner && tab === 2 && (
          <Stack gap={2}>
            <Typography fontWeight={700} fontSize={18}>
              Guest Reservations ({ownerAttrReservations.length})
            </Typography>

            <TableContainer
              component={Paper}
              sx={{ boxShadow: "none", border: "1px solid", borderColor: "divider" }}
            >
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 700 }}>Guest</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Attraction</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Date</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Time</TableCell>
                    <TableCell sx={{ fontWeight: 700 }} align="center">Tickets</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Amount</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {ownerAttrReservations.map((r: any) => (
                    <TableRow key={r._id} hover>
                      <TableCell>
                        <Typography fontSize={14} fontWeight={600}>
                          {r.guestName} {r.guestLastName ?? ""}
                        </Typography>
                        <Typography fontSize={12} color="text.secondary">
                          {r.guestEmail}
                        </Typography>
                        {r.guestPhoneNumber && (
                          <Typography fontSize={11} color="text.secondary">
                            {r.guestPhoneNumber}
                          </Typography>
                        )}
                      </TableCell>
                      <TableCell>
                        <Typography fontSize={14}>
                          {r.attractionData?.attractionName ?? "-"}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        {r.selectedDate
                          ? new Date(r.selectedDate).toLocaleDateString("en-GB", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })
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
                            r.paymentStatus === "succeeded" ? "Paid" : r.paymentStatus ?? "N/A"
                          }
                          size="small"
                          color={
                            r.paymentStatus === "succeeded" ? "success" : "default"
                          }
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                  {ownerAttrReservations.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={7} align="center">
                        <Typography color="text.secondary" py={4}>
                          No reservations yet
                        </Typography>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Stack>
        )}

        {/* Room Edit Dialog */}
        <Dialog
          open={!!editRoom}
          onClose={() => setEditRoom(null)}
          maxWidth="sm"
          fullWidth
          PaperProps={{ sx: { borderRadius: 3, p: 0 } }}
        >
          {editRoom && (
            <Stack>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                px={3}
                py={2}
                borderBottom="1px solid"
                borderColor="divider"
              >
                <Stack direction="row" alignItems="center" gap={1}>
                  <HotelIcon sx={{ color: "primary.main" }} />
                  <Typography fontWeight={700} fontSize={18}>
                    Edit Room
                  </Typography>
                </Stack>
                <IconButton onClick={() => setEditRoom(null)} size="small">
                  <CloseIcon />
                </IconButton>
              </Stack>

              <Stack px={3} py={2.5} gap={2.5}>
                <TextField
                  label="Price Per Night"
                  value={editValues.roomPricePerNight}
                  onChange={(e) =>
                    setEditValues({
                      ...editValues,
                      roomPricePerNight: e.target.value,
                    })
                  }
                  fullWidth
                />
                <TextField
                  label="Max Guests"
                  type="number"
                  value={editValues.numberOfGuestsCanStay}
                  onChange={(e) =>
                    setEditValues({
                      ...editValues,
                      numberOfGuestsCanStay: e.target.value,
                    })
                  }
                  fullWidth
                />
                <FormControl fullWidth>
                  <InputLabel>Smoking Allowed</InputLabel>
                  <Select
                    value={editValues.isSmokingAllowed ? "yes" : "no"}
                    label="Smoking Allowed"
                    onChange={(e) =>
                      setEditValues({
                        ...editValues,
                        isSmokingAllowed: e.target.value === "yes",
                      })
                    }
                  >
                    <MenuItem value="yes">Yes</MenuItem>
                    <MenuItem value="no">No</MenuItem>
                  </Select>
                </FormControl>
                <FormControl fullWidth>
                  <InputLabel>Private Bathroom</InputLabel>
                  <Select
                    value={editValues.isBathroomPrivate ? "yes" : "no"}
                    label="Private Bathroom"
                    onChange={(e) =>
                      setEditValues({
                        ...editValues,
                        isBathroomPrivate: e.target.value === "yes",
                      })
                    }
                  >
                    <MenuItem value="yes">Yes</MenuItem>
                    <MenuItem value="no">No</MenuItem>
                  </Select>
                </FormControl>
              </Stack>

              <Stack direction="row" justifyContent="flex-end" px={3} pb={2.5} gap={1}>
                <Button
                  onClick={() => setEditRoom(null)}
                  sx={{ textTransform: "none" }}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  onClick={handleEditSave}
                  sx={{ textTransform: "none", fontWeight: 600 }}
                >
                  Save Changes
                </Button>
              </Stack>
            </Stack>
          )}
        </Dialog>
      </Stack>
    </Stack>
    </LayoutCreateAccountMain>
  );
};

export default Dashboard;
