import { Box, Stack, Typography } from "@mui/material";
import AllAvailableRoomsBody from "./AllAvailableRoomsBody";
import { PropertyOverviewProps } from "./PropertyOverview";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useMemo } from "react";
import { useTranslation } from "next-i18next";

const isRoomAvailable = (
  reservedDates: { from: string; until: string }[] | undefined,
  startDate: string | undefined,
  endDate: string | undefined
) => {
  if (!startDate || !endDate || !reservedDates?.length) return true;
  const start = new Date(startDate).getTime();
  const end = new Date(endDate).getTime();
  if (isNaN(start) || isNaN(end)) return true;

  return !reservedDates.some((rd) => {
    const from = new Date(rd.from).getTime();
    const until = new Date(rd.until).getTime();
    return start < until && end > from;
  });
};

const AllAvailableRooms = ({
  partnerProperty,
  loading,
}: PropertyOverviewProps) => {
  const { t } = useTranslation("common");
  const filters = useSelector((state: RootState) => state.filters);

  const availableRooms = useMemo(() => {
    if (!partnerProperty?.propertyRooms) return [];
    return partnerProperty.propertyRooms.filter((room) =>
      isRoomAvailable(room.reservedDates, filters.startDate, filters.endDate)
    );
  }, [partnerProperty?.propertyRooms, filters.startDate, filters.endDate]);
  return (
    <Stack className="container" mt={"50px !important"}>
      <Stack mb={1}>
        <Typography className="bold-text">{t("hotel.availableRooms")}</Typography>
      </Stack>
      <Stack width={"100%"} height={"auto"}>
        <Stack
          className="available-rooms-header"
          flexDirection={"row"}
          justifyContent={"space-between"}
          height={50}
          alignItems={"center"}
          padding={1}
          bgcolor={"primary.main"}
          color={"secondary.contrastText"}
          sx={{ display: { xs: "none", md: "flex" } }}
        >
          <Stack width={220} alignItems={"center"}>
            <Typography className="available-rooms-header-text">
              {t("hotel.roomType")}
            </Typography>
          </Stack>
          <Box height={"100%"} borderRight={"1px solid black"}></Box>
          <Stack width={140} alignItems={"center"}>
            <Typography className="available-rooms-header-text">
              {t("hotel.numberOfGuests")}
            </Typography>
          </Stack>
          <Box height={"100%"} borderRight={"1px solid black"}></Box>
          <Stack width={175} alignItems={"center"}>
            <Typography className="available-rooms-header-text">
              {t("hotel.todaysPrice")}
            </Typography>
          </Stack>
          <Box height={"100%"} borderRight={"1px solid black"}></Box>
          <Stack width={260} alignItems={"center"}>
            <Typography className="available-rooms-header-text">
              {t("hotel.yourChoices")}
            </Typography>
          </Stack>
          <Box height={"100%"} borderRight={"1px solid black"}></Box>
          <Stack width={65} alignItems={"center"}>
            <Typography className="available-rooms-header-text">
              {t("hotel.selectRooms")}
            </Typography>
          </Stack>
          <Box height={"100%"} borderRight={"1px solid black"}></Box>
          <Stack width={255} alignItems={"center"}>
            <Typography className="available-rooms-header-text">
              {t("hotel.payment")}
            </Typography>
          </Stack>
        </Stack>
        <Stack>
          {availableRooms.length > 0 ? (
            availableRooms.map((room) => (
              <AllAvailableRoomsBody
                key={room.roomId}
                partnerProperty={partnerProperty}
                propertyRoom={room}
              />
            ))
          ) : (
            <Stack
              alignItems="center"
              justifyContent="center"
              py={5}
              border="1px solid"
              borderColor="text.disabled"
            >
              <Typography color="text.secondary" fontSize={15}>
                {t("hotel.noRoomsAvailable")}
              </Typography>
            </Stack>
          )}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default AllAvailableRooms;
