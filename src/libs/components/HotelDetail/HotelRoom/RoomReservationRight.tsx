import React from "react";
import { Stack } from "@mui/material";
import UserInfo from "./UserInfo";
import { InitialValueInput } from "@/src/pages/hotels/hotelDetail/[id]/[roomId]";

export interface RoomReservationRight {
  handlePaymentPage: () => void;
  formatted: string;
  handleEditUserInfo: (key: string, value: any) => void;
  initalValue: InitialValueInput;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
}

const RoomReservationRight = ({
  handlePaymentPage,
  formatted,
  handleEditUserInfo,
  initalValue,
  setActiveStep,
}: RoomReservationRight) => {
  return (
    <Stack>
      <UserInfo
        handlePaymentPage={handlePaymentPage}
        formatted={formatted}
        handleEditUserInfo={handleEditUserInfo}
        initalValue={initalValue}
        setActiveStep={setActiveStep}
      />
    </Stack>
  );
};

export default RoomReservationRight;
