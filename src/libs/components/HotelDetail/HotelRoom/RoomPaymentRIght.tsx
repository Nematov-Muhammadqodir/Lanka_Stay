import { Button, Stack, Typography, CircularProgress } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import AgeAgreement from "./AgeAgreement";
import { InitialValueInput } from "@/src/pages/hotels/hotelDetail/[id]/[roomId]";
import {
  ADD_RESERVATION_INFO,
  CREATE_PAYMENT_INTENT,
} from "@/apollo/user/mutation";
import { useMutation, useReactiveVar } from "@apollo/client";
import {
  sweetBasicAlert,
  sweetErrorAlert,
  sweetTopSuccessAlert,
} from "@/src/libs/sweetAlert";
import { useRouter } from "next/router";
import { userVar } from "@/apollo/store";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useState } from "react";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

export interface RoomPaymentRIghtProps {
  initalValue: InitialValueInput;
  handleEditUserInfo: (key: string, value: any) => void;
  totalPrice: number;
}

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      fontSize: "16px",
      color: "#212121",
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      "::placeholder": {
        color: "#B0B0B0",
      },
    },
    invalid: {
      color: "#f44336",
      iconColor: "#f44336",
    },
  },
};

const CheckoutForm = ({
  initalValue,
  handleEditUserInfo,
  totalPrice,
}: RoomPaymentRIghtProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const user = useReactiveVar(userVar);
  const [loading, setLoading] = useState(false);

  const [createPaymentIntent] = useMutation(CREATE_PAYMENT_INTENT);
  const [addReservation] = useMutation(ADD_RESERVATION_INFO);

  const handleSubmit = async () => {
    if (!stripe || !elements) return;

    if (!initalValue.ageConfirmation) {
      sweetErrorAlert("Please confirm you are 18 or older", 2500);
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) return;

    setLoading(true);

    try {
      // 1. Create payment intent on the backend
      console.log("totalPrice", totalPrice);
      console.log("initalValue.roomId", initalValue.roomId);
      console.log("initalValue.propertyId", initalValue.propertyId);
      const { data: piData } = await createPaymentIntent({
        variables: {
          input: {
            amount: Math.round(totalPrice),
            roomId: initalValue.roomId,
            propertyId: initalValue.propertyId,
          },
        },
      });

      const clientSecret = piData.createPaymentIntent;

      // 2. Confirm payment with Stripe
      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: cardElement,
            billing_details: {
              name: `${initalValue.guestName} ${initalValue.guestLastName}`.trim(),
              email: initalValue.guestEmail,
              phone: initalValue.guestPhoneNumber,
            },
          },
        }
      );
      console.log("paymentIntent", paymentIntent);
      console.log("error", error);

      if (error) {
        sweetErrorAlert(error.message || "Payment failed", 3000);
        setLoading(false);
        return;
      }

      if (paymentIntent?.status === "succeeded") {
        console.log("initalValue", initalValue);
        // 3. Save reservation to database
        const { data } = await addReservation({
          variables: {
            input: {
              guestId: initalValue.guestId,
              guestName: initalValue.guestName,
              guestLastName: initalValue.guestLastName || undefined,
              guestEmail: initalValue.guestEmail,
              guestPhoneNumber: initalValue.guestPhoneNumber,
              travelForWork: initalValue.travelForWork,
              stripePaymentIntentId: paymentIntent.id,
              paymentAmount: Math.round(totalPrice),
              roomId: initalValue.roomId,
              propertyId: initalValue.propertyId,
              startDate: initalValue.startDate,
              endDate: initalValue.endDate,
              ageConfirmation: initalValue.ageConfirmation,
            },
          },
        });

        if (data) {
          await sweetTopSuccessAlert(
            "Reservation completed successfully!",
            2000
          );
          router.push(`/myPage/${user._id}/reservations`);
        }
      }
    } catch (error: any) {
      console.error("Payment error:", error);
      if (error.graphQLErrors?.length) {
        sweetBasicAlert(error.graphQLErrors[0].message);
      } else if (error.networkError) {
        sweetErrorAlert("Server error — please try again.", 2500);
      } else {
        sweetErrorAlert("Something went wrong. Please try again.", 2500);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Stack width="67%" pb={10}>
      <Stack mb={1}>
        <Typography className="bold-text">Check and pay</Typography>
      </Stack>

      <Stack
        border="1px solid"
        p={3}
        borderRadius={3}
        borderColor="text.disabled"
        gap={3}
      >
        <Typography className="bold-text-medium">Payment details</Typography>
        <Typography fontSize={14} color="text.secondary">
          Your card details are securely handled by Stripe. We never see or
          store your card information.
        </Typography>

        {/* Stripe Card Element */}
        <Stack
          sx={{
            border: "1px solid",
            borderColor: "text.disabled",
            borderRadius: 1,
            p: 2,
            backgroundColor: "background.paper",
            "&:focus-within": {
              borderColor: "primary.main",
              boxShadow: "0 0 0 2px rgba(47, 82, 223, 0.15)",
            },
          }}
        >
          <CardElement options={CARD_ELEMENT_OPTIONS} />
        </Stack>

        <Stack direction="row" alignItems="center" gap={1}>
          <LockIcon sx={{ fontSize: 16, color: "text.secondary" }} />
          <Typography fontSize={12} color="text.secondary">
            Secured by Stripe. 256-bit SSL encryption.
          </Typography>
        </Stack>
      </Stack>

      <AgeAgreement
        handleEditUserInfo={handleEditUserInfo}
        initalValue={initalValue}
      />

      <Button
        variant="contained"
        sx={{ mt: 4, width: "100%", py: 1.5 }}
        onClick={handleSubmit}
        disabled={!stripe || loading}
      >
        <Stack flexDirection="row" gap={1} alignItems="center">
          {loading ? (
            <CircularProgress size={20} sx={{ color: "white" }} />
          ) : (
            <LockIcon sx={{ color: "white" }} />
          )}
          <Typography
            color="white"
            className="bold-text-medium"
            textTransform="capitalize"
          >
            {loading ? "Processing..." : "Complete Booking"}
          </Typography>
        </Stack>
      </Button>

      <Typography className="small-text" mt={1} color="text.secondary">
        Your payment is processed securely by Stripe. Your card issuer may
        charge a foreign transaction fee.
      </Typography>
    </Stack>
  );
};

const RoomPaymentRIght = (props: RoomPaymentRIghtProps) => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm {...props} />
    </Elements>
  );
};

export default RoomPaymentRIght;
