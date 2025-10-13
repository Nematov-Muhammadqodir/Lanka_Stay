import { Box, Stack, Typography } from "@mui/material";

const AllAvailableRooms = () => {
  return (
    <Stack className="container" mt={"50px !important"}>
      <Stack mb={1}>
        <Typography className="bold-text">All available rooms</Typography>
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
        >
          <Stack width={220} alignItems={"center"}>
            <Typography className="available-rooms-header-text">
              Room Type
            </Typography>
          </Stack>
          <Box height={"100%"} borderRight={"1px solid black"}></Box>
          <Stack width={140} alignItems={"center"}>
            <Typography className="available-rooms-header-text">
              Number of guests
            </Typography>
          </Stack>
          <Box height={"100%"} borderRight={"1px solid black"}></Box>
          <Stack width={175} alignItems={"center"}>
            <Typography className="available-rooms-header-text">
              Today's price
            </Typography>
          </Stack>
          <Box height={"100%"} borderRight={"1px solid black"}></Box>
          <Stack width={260} alignItems={"center"}>
            <Typography className="available-rooms-header-text">
              Your choices
            </Typography>
          </Stack>
          <Box height={"100%"} borderRight={"1px solid black"}></Box>
          <Stack width={65} alignItems={"center"}>
            <Typography className="available-rooms-header-text">
              Select rooms
            </Typography>
          </Stack>
          <Box height={"100%"} borderRight={"1px solid black"}></Box>
          <Stack width={255} alignItems={"center"}>
            <Typography className="available-rooms-header-text">
              Payment
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default AllAvailableRooms;
