import withLayoutAttractionsReserve from "@/src/libs/components/layout/attractions/AttractionReserveLayout";
import {
  Box,
  Button,
  Checkbox,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Image from "next/image";
import LockIcon from "@mui/icons-material/Lock";
import CheckIcon from "@mui/icons-material/Check";
import GeniusLoyalty from "@/src/libs/components/attractions/AttractionDetail/Ticket/GeniusLoyalty";

const TickerPay = () => {
  const [phone, setPhone] = useState("");
  return (
    <Stack
      className="container"
      mt={"20px !important"}
      gap={2}
      mb={"40px !important"}
    >
      <Stack flexDirection={"row"} justifyContent={"space-between"}>
        <Stack width={"67%"} className="reserve-left" pb={5}>
          <Stack>
            <Stack gap={1} mb={2}>
              <Typography className="small-text">Step 2 of 2</Typography>
              <Stack>
                <Typography className="bold-text">Check and pay</Typography>
              </Stack>
            </Stack>
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
                />
              </Stack>
              <Stack gap={0.5}>
                <Typography className="small-bold-text">
                  Card Number*
                </Typography>
                <TextField placeholder="Card Number" sx={{ width: 350 }} />
              </Stack>
              <Stack flexDirection={"row"} gap={4}>
                <Stack gap={0.5}>
                  <Typography className="small-bold-text">
                    Expiry Date*
                  </Typography>
                  <TextField placeholder="MM / YY" sx={{ width: 160 }} />
                </Stack>
                <Stack gap={0.5}>
                  <Typography className="small-bold-text">CVC*</Typography>
                  <TextField placeholder="CVC" sx={{ width: 160 }} />
                </Stack>
              </Stack>
            </Stack>
          </Stack>

          <Button variant="contained" sx={{ mt: 6, width: "100%" }}>
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

          <Typography className="small-text" mt={2}>
            Keep in mind that your card issuer may charge you a foreign
            transaction fee.
          </Typography>
        </Stack>

        <Stack width={"30%"} className="reserve-right" pt={8}>
          <Stack
            flexDirection={"row"}
            gap={1}
            borderBottom={"1px solid"}
            pb={2}
            borderColor={"text.disabled"}
          >
            <Image
              src={"/img/hotel.jpg"}
              alt="left-image"
              width={100}
              height={100}
              style={{ objectFit: "cover", borderRadius: 10 }}
            />
            <Stack>
              <Typography className="bold-text">Yacht Tour</Typography>
              <Typography>Thu, 30 Oct 11:00</Typography>
            </Stack>
          </Stack>
          <Stack
            mt={2}
            borderBottom={"1px solid"}
            pb={2}
            borderColor={"text.disabled"}
          >
            <Typography className="bold-text">
              1 × Busan Yacht Experience (Yacht G)
            </Typography>
            <Stack
              mt={2}
              flexDirection={"row"}
              justifyContent={"space-between"}
            >
              <Stack>
                <Typography className="bold-text-medium">
                  Total price
                </Typography>
                <Typography>Includes taxes and charges</Typography>
              </Stack>
              <Typography className="bold-text">KRW 29,811</Typography>
            </Stack>
          </Stack>
          <Stack mt={2}>
            <Typography className="bold-text-medium">
              Cancellation policy
            </Typography>
            <Typography>
              It's not possible to cancel or make changes after you book
            </Typography>
          </Stack>
          <Stack>
            <GeniusLoyalty />
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default withLayoutAttractionsReserve(TickerPay);
