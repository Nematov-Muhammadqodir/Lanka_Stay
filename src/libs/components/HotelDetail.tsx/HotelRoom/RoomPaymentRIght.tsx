import { Button, Stack, TextField, Typography } from "@mui/material";
import Image from "next/image";
import LockIcon from "@mui/icons-material/Lock";
import AgeAgreement from "./AgeAgreement";
import { InitialValueInput } from "@/src/pages/hotels/hotelDetail/[id]/[roomId]";
import { ADD_RESERVATION_INFO } from "@/apollo/user/mutation";
import { useMutation } from "@apollo/client";

export interface RoomPaymentRIghtProps {
  initalValue: InitialValueInput;
  handleEditUserInfo: (key: string, value: any) => void;
}

const RoomPaymentRIght = ({
  initalValue,
  handleEditUserInfo,
}: RoomPaymentRIghtProps) => {
  const [addReservation] = useMutation(ADD_RESERVATION_INFO);

  const handleAddReservation = async () => {
    await addReservation({
      variables: {
        input: initalValue,
      },
    });
  };

  return (
    <Stack width={"67%"} className="reserve-left" pb={5}>
      <Stack mb={1}>
        <Typography className="bold-text">Check and pay</Typography>
      </Stack>
      <Stack
        border={"1px solid"}
        p={2}
        borderRadius={3}
        borderColor={"text.disabled"}
      >
        <Stack gap={1} mb={2}></Stack>
        <Stack gap={1}>
          <Typography className="bold-text-medium">New card</Typography>
          <Stack>
            <Stack
              width={"75%"}
              flexDirection={"row"}
              gap={2}
              alignItems={"center"}
            >
              <Image
                src={"/img/payments/Mastercard.svg"}
                alt="user-image"
                width={30}
                height={30}
                style={{ objectFit: "contain" }}
              />
              <Image
                src={"/img/payments/ApplePay.svg"}
                alt="user-image"
                width={30}
                height={30}
                style={{ objectFit: "contain" }}
              />
              <Image
                src={"/img/payments/Bitcoin.svg"}
                alt="user-image"
                width={30}
                height={30}
                style={{ objectFit: "contain" }}
              />
              <Image
                src={"/img/payments/GooglePay.svg"}
                alt="user-image"
                width={30}
                height={30}
                style={{ objectFit: "contain" }}
              />
              <Image
                src={"/img/payments/PayPal.svg"}
                alt="user-image"
                width={30}
                height={30}
                style={{ objectFit: "contain" }}
              />
              <Image
                src={"/img/payments/Visa.svg"}
                alt="user-image"
                width={30}
                height={30}
                style={{ objectFit: "contain" }}
              />
            </Stack>
          </Stack>
        </Stack>

        <Stack mt={2} gap={2}>
          <Stack gap={0.5}>
            <Typography className="small-bold-text">
              Cardholder's Name*
            </Typography>
            <TextField
              placeholder=" Cardholder's Name"
              sx={{ width: 350 }}
              value={initalValue.cardholderName}
              onChange={(e: any) => {
                handleEditUserInfo("cardholderName", e.target.value);
              }}
            />
          </Stack>
          <Stack gap={0.5}>
            <Typography className="small-bold-text">Card Number*</Typography>
            <TextField
              placeholder="Card Number"
              sx={{ width: 350 }}
              value={initalValue.cardNumber}
              onChange={(e: any) => {
                handleEditUserInfo("cardNumber", e.target.value);
              }}
            />
          </Stack>
          <Stack flexDirection={"row"} gap={4}>
            <Stack gap={0.5}>
              <Typography className="small-bold-text">Expiry Date*</Typography>
              <TextField
                placeholder="MM / YY"
                sx={{ width: 160 }}
                value={initalValue.expiryDate}
                onChange={(e: any) => {
                  handleEditUserInfo("expiryDate", e.target.value);
                }}
              />
            </Stack>
            <Stack gap={0.5}>
              <Typography className="small-bold-text">CVC*</Typography>
              <TextField
                placeholder="CVC"
                sx={{ width: 160 }}
                value={initalValue.cvs}
                onChange={(e: any) => {
                  handleEditUserInfo("cvs", e.target.value);
                }}
              />
            </Stack>
          </Stack>
        </Stack>
      </Stack>

      <Stack>
        <AgeAgreement
          handleEditUserInfo={handleEditUserInfo}
          initalValue={initalValue}
        />
      </Stack>

      <Button
        variant="contained"
        sx={{ mt: 6, width: "100%" }}
        onClick={() => {
          handleAddReservation();
        }}
      >
        <Stack flexDirection={"row"} gap={1}>
          <LockIcon sx={{ color: "secondary.contrastText" }} />
          <Typography
            color={"secondary.contrastText"}
            className="bold-text-medium"
            textTransform={"capitalize"}
          >
            Complete Booking
          </Typography>
        </Stack>
      </Button>

      <Typography className="small-text" mt={1}>
        Keep in mind that your card issuer may charge you a foreign transaction
        fee.
      </Typography>
    </Stack>
  );
};

export default RoomPaymentRIght;
