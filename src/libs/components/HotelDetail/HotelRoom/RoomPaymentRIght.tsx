import { Button, Stack, TextField, Typography } from "@mui/material";
import Image from "next/image";
import LockIcon from "@mui/icons-material/Lock";
import AgeAgreement from "./AgeAgreement";
import { InitialValueInput } from "@/src/pages/hotels/hotelDetail/[id]/[roomId]";
import { ADD_RESERVATION_INFO } from "@/apollo/user/mutation";
import { useMutation, useReactiveVar } from "@apollo/client";
import { sweetBasicAlert, sweetTopSuccessAlert } from "@/src/libs/sweetAlert";
import { useRouter } from "next/router";
import { userVar } from "@/apollo/store";

export interface RoomPaymentRIghtProps {
  initalValue: InitialValueInput;
  handleEditUserInfo: (key: string, value: any) => void;
}

const RoomPaymentRIght = ({
  initalValue,
  handleEditUserInfo,
}: RoomPaymentRIghtProps) => {
  const router = useRouter();
  const [addReservation] = useMutation(ADD_RESERVATION_INFO);
  const user = useReactiveVar(userVar);
  console.log("user._id:", user._id);

  const handleAddReservation = async () => {
    try {
      if (
        initalValue.cardholderName === "" ||
        initalValue.cardNumber === "" ||
        initalValue.expiryDate === "" ||
        initalValue.cvs === ""
      ) {
        sweetTopSuccessAlert("Please fill in all the required payment fields!");
      }
      const { data } = await addReservation({
        variables: {
          input: initalValue,
        },
      });

      console.log("Reservation success:", data);
      if (data) {
        sweetTopSuccessAlert("Reservation completed successfully!");
        router.push(`/myPage/${user._id}/reservations`);
      }
    } catch (error: any) {
      console.error("Reservation error:", error);

      // If GraphQL validation error:
      if (error.graphQLErrors?.length) {
        sweetBasicAlert(error.graphQLErrors[0].message);
      }
      // If network/server error:
      else if (error.networkError) {
        alert("Server error — please try again.");
      } else {
        alert("Something went wrong.");
      }
    }
  };

  return (
    <Stack width={"67%"} className="reserve-left" pb={60}>
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
                inputProps={{ maxLength: 7 }}
                value={initalValue.expiryDate}
                onChange={(e: any) => {
                  let val = e.target.value.replace(/[^\d]/g, "");
                  if (val.length > 4) val = val.slice(0, 4);
                  if (val.length >= 2) {
                    const month = val.slice(0, 2);
                    const clamped =
                      parseInt(month, 10) > 12
                        ? "12"
                        : parseInt(month, 10) < 1 && month.length === 2
                        ? "01"
                        : month;
                    val = clamped + " / " + val.slice(2);
                  }
                  handleEditUserInfo("expiryDate", val);
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
