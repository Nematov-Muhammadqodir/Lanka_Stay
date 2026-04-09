import withLayoutAttractionsReserve from "@/src/libs/components/layout/attractions/AttractionReserveLayout";
import { Button, Stack, Typography, CircularProgress } from "@mui/material";
import React, { useState } from "react";
import Image from "next/image";
import LockIcon from "@mui/icons-material/Lock";
import { useRouter } from "next/router";
import { useQuery, useMutation, useReactiveVar } from "@apollo/client";
import { GET_ATTRACTION } from "@/apollo/user/query";
import {
  CREATE_ATTRACTION_PAYMENT_INTENT,
  ADD_ATTRACTION_RESERVATION,
} from "@/apollo/user/mutation";
import { userVar } from "@/apollo/store";
import { formatKoreanWon } from "@/src/libs/handlers/priceHandler";
import {
  sweetBasicAlert,
  sweetErrorAlert,
  sweetTopSuccessAlert,
} from "@/src/libs/sweetAlert";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { resolveImageUrl } from "@/src/libs/handlers/imageHandler";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      fontSize: "16px",
      color: "#212121",
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      "::placeholder": { color: "#B0B0B0" },
    },
    invalid: { color: "#f44336", iconColor: "#f44336" },
  },
};

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const user = useReactiveVar(userVar);
  const {
    id,
    tickets,
    date,
    time,
    total,
    guestName,
    guestLastName,
    guestEmail,
    guestPhone,
  } = router.query;
  const [loading, setLoading] = useState(false);

  const { data } = useQuery(GET_ATTRACTION, {
    variables: { input: id as string },
    skip: !id,
  });
  const attraction = data?.getAttraction ?? null;

  const [createPaymentIntent] = useMutation(CREATE_ATTRACTION_PAYMENT_INTENT);
  const [addReservation] = useMutation(ADD_ATTRACTION_RESERVATION);

  const ticketCount = Number(tickets) || 1;
  const totalPrice = Number(total) || 0;
  const imageUrl =
    attraction?.attractionImages?.[0]
      ? resolveImageUrl(attraction.attractionImages[0])
      : "/img/hotel.jpg";

  const formattedDate = date
    ? new Date(date as string).toLocaleDateString("en-GB", {
        weekday: "short",
        day: "numeric",
        month: "short",
      })
    : "";

  const handleSubmit = async () => {
    if (!stripe || !elements) return;
    const cardElement = elements.getElement(CardElement);
    if (!cardElement) return;

    setLoading(true);

    try {
      const { data: piData } = await createPaymentIntent({
        variables: {
          input: {
            amount: Math.round(totalPrice),
            attractionId: id as string,
          },
        },
      });

      const clientSecret = piData.createAttractionPaymentIntent;

      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: cardElement,
            billing_details: {
              name: `${guestName ?? ""} ${guestLastName ?? ""}`.trim(),
              email: guestEmail as string,
              phone: guestPhone as string,
            },
          },
        }
      );

      if (error) {
        sweetErrorAlert(error.message || "Payment failed", 3000);
        setLoading(false);
        return;
      }

      if (paymentIntent?.status === "succeeded") {
        await addReservation({
          variables: {
            input: {
              guestId: user._id,
              attractionId: id as string,
              guestName: guestName as string,
              guestLastName: (guestLastName as string) || undefined,
              guestEmail: guestEmail as string,
              guestPhoneNumber: (guestPhone as string) || undefined,
              ticketCount,
              selectedDate: date as string,
              selectedTime: time as string,
              stripePaymentIntentId: paymentIntent.id,
              paymentStatus: "succeeded",
              paymentAmount: Math.round(totalPrice),
            },
          },
        });

        await sweetTopSuccessAlert("Booking completed successfully!", 2000);
        router.push(`/myPage/${user._id}/reservations`);
      }
    } catch (error: any) {
      console.error("Payment error:", error);
      if (error.graphQLErrors?.length) {
        sweetBasicAlert(error.graphQLErrors[0].message);
      } else {
        sweetErrorAlert("Something went wrong. Please try again.", 2500);
      }
    } finally {
      setLoading(false);
    }
  };

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
              <Typography className="bold-text">Check and pay</Typography>
            </Stack>

            <Stack gap={1}>
              <Typography className="bold-text-medium">
                Payment details
              </Typography>
              <Stack
                width={"75%"}
                flexDirection={"row"}
                gap={2}
                alignItems={"center"}
                mb={1}
              >
                <Image
                  src={"/img/payments/Mastercard.svg"}
                  alt="mastercard"
                  width={30}
                  height={30}
                  style={{ objectFit: "contain" }}
                />
                <Image
                  src={"/img/payments/Visa.svg"}
                  alt="visa"
                  width={30}
                  height={30}
                  style={{ objectFit: "contain" }}
                />
                <Image
                  src={"/img/payments/ApplePay.svg"}
                  alt="applepay"
                  width={30}
                  height={30}
                  style={{ objectFit: "contain" }}
                />
                <Image
                  src={"/img/payments/GooglePay.svg"}
                  alt="googlepay"
                  width={30}
                  height={30}
                  style={{ objectFit: "contain" }}
                />
              </Stack>
            </Stack>

            <Stack
              mt={2}
              sx={{
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 2,
                p: 2.5,
              }}
            >
              <CardElement options={CARD_ELEMENT_OPTIONS} />
            </Stack>
          </Stack>

          <Button
            variant="contained"
            sx={{ mt: 4, width: "100%", height: 50 }}
            onClick={handleSubmit}
            disabled={loading || !stripe}
          >
            {loading ? (
              <CircularProgress size={24} sx={{ color: "white" }} />
            ) : (
              <Stack flexDirection={"row"} gap={1}>
                <LockIcon sx={{ color: "secondary.contrastText" }} />
                <Typography
                  color={"secondary.contrastText"}
                  className="bold-text-medium"
                  textTransform={"capitalize"}
                >
                  Complete Booking — {formatKoreanWon(String(totalPrice))}
                </Typography>
              </Stack>
            )}
          </Button>

          <Typography className="small-text" mt={2}>
            Keep in mind that your card issuer may charge you a foreign
            transaction fee.
          </Typography>
        </Stack>

        {/* Right sidebar */}
        <Stack width={"30%"} className="reserve-right" pt={8}>
          <Stack
            flexDirection={"row"}
            gap={1}
            borderBottom={"1px solid"}
            pb={2}
            borderColor={"text.disabled"}
          >
            <Image
              src={imageUrl}
              alt="attraction-image"
              width={100}
              height={100}
              style={{ objectFit: "cover", borderRadius: 10 }}
            />
            <Stack>
              <Typography className="bold-text">
                {attraction?.attractionName ?? "Loading..."}
              </Typography>
              <Typography>
                {formattedDate} {time}
              </Typography>
            </Stack>
          </Stack>
          <Stack
            mt={2}
            borderBottom={"1px solid"}
            pb={2}
            borderColor={"text.disabled"}
          >
            <Typography className="bold-text">
              {ticketCount} x {attraction?.attractionName ?? "Ticket"}
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
              <Typography className="bold-text">
                {formatKoreanWon(String(totalPrice))}
              </Typography>
            </Stack>
          </Stack>
          <Stack mt={2}>
            <Typography className="bold-text-medium">
              Cancellation policy
            </Typography>
            <Typography>
              {attraction?.freeCancellation
                ? "Free cancellation up to 24 hours before start time"
                : "It's not possible to cancel or make changes after you book"}
            </Typography>
          </Stack>

          {/* Booking summary */}
          <Stack
            mt={2}
            p={2}
            border="1px solid"
            borderColor="divider"
            borderRadius={2}
            gap={1}
          >
            <Typography className="bold-text-medium">Your details</Typography>
            <Typography fontSize={14}>
              {guestName} {guestLastName}
            </Typography>
            <Typography fontSize={14} color="text.secondary">
              {guestEmail}
            </Typography>
            {guestPhone && (
              <Typography fontSize={14} color="text.secondary">
                {guestPhone}
              </Typography>
            )}
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

const TicketPay = () => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
};

export const getServerSideProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "ko", ["common"])),
  },
});
export default withLayoutAttractionsReserve(TicketPay);
