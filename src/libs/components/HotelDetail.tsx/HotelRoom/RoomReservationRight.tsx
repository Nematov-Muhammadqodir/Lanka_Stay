import React from "react";
import { Stack } from "@mui/material";
import UserInfo from "./UserInfo";

export interface RoomReservationRight {
  handlePaymentPage: () => void;
}

const RoomReservationRight = ({ handlePaymentPage }: RoomReservationRight) => {
  return (
    <Stack>
      <UserInfo handlePaymentPage={handlePaymentPage} />
    </Stack>
  );
};

export default RoomReservationRight;
