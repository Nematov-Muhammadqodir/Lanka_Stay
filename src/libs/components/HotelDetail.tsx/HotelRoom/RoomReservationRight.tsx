import React from "react";
import { Stack } from "@mui/material";
import UserInfo from "./UserInfo";
import { InitialValueInput } from "@/src/pages/hotels/hotelDetail/[id]/[roomId]";

export interface RoomReservationRight {
  handlePaymentPage: () => void;
  formatted: string;
  handleEditUserInfo: (key: string, value: any) => void;
  initalValue: InitialValueInput;
}

const RoomReservationRight = ({
  handlePaymentPage,
  formatted,
  handleEditUserInfo,
  initalValue,
}: RoomReservationRight) => {
  return (
    <Stack>
      <UserInfo
        handlePaymentPage={handlePaymentPage}
        formatted={formatted}
        handleEditUserInfo={handleEditUserInfo}
        initalValue={initalValue}
      />
    </Stack>
  );
};

export default RoomReservationRight;
