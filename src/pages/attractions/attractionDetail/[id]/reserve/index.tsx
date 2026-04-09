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
import { useRouter } from "next/router";
import { useQuery, useReactiveVar } from "@apollo/client";
import { GET_ATTRACTION } from "@/apollo/user/query";
import { userVar } from "@/apollo/store";
import { formatKoreanWon } from "@/src/libs/handlers/priceHandler";
import { sweetErrorAlert } from "@/src/libs/sweetAlert";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { resolveImageUrl } from "@/src/libs/handlers/imageHandler";

const TicketReserve = () => {
  const router = useRouter();
  const { id, tickets, date, time, total } = router.query;
  const user = useReactiveVar(userVar);

  const { data } = useQuery(GET_ATTRACTION, {
    variables: { input: id as string },
    skip: !id,
  });
  const attraction = data?.getAttraction ?? null;

  const [guestName, setGuestName] = useState(user?.guestName ?? "");
  const [guestLastName, setGuestLastName] = useState("");
  const [guestEmail, setGuestEmail] = useState(user?.guestEmail ?? "");
  const [phone, setPhone] = useState(user?.guestPhone ?? "");
  const [agreed, setAgreed] = useState(false);

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

  const handleNext = async () => {
    if (!guestName.trim()) {
      await sweetErrorAlert("Please enter your first name");
      return;
    }
    if (!guestEmail.trim()) {
      await sweetErrorAlert("Please enter your email");
      return;
    }
    if (!agreed) {
      await sweetErrorAlert("Please agree to the terms");
      return;
    }

    const query = new URLSearchParams({
      tickets: String(ticketCount),
      date: date as string,
      time: time as string,
      total: String(totalPrice),
      guestName,
      guestLastName,
      guestEmail,
      guestPhone: phone,
    }).toString();

    router.push(`/attractions/attractionDetail/${id}/pay?${query}`);
  };

  return (
    <Stack
      className="container"
      mt={"20px !important"}
      gap={2}
      mb={"40px !important"}
    >
      <Stack flexDirection={"row"} justifyContent={"space-between"}>
        <Stack width={"67%"} className="reserve-left">
          <Stack borderBottom={1} borderColor={"grey.300"} pb={5}>
            <Stack gap={1} mb={2}>
              <Typography className="small-text">Step 1 of 2</Typography>
              <Stack>
                <Typography className="bold-text">
                  {attraction?.attractionName ?? "Loading..."}
                </Typography>
                <Typography>This experience is hosted by a business</Typography>
              </Stack>
            </Stack>
            <Stack gap={1}>
              <Typography className="bold-text">Your details</Typography>
              <Stack flexDirection={"row"} gap={5}>
                <Stack gap={0.5}>
                  <Typography className="small-bold-text">
                    First name
                  </Typography>
                  <TextField
                    placeholder="First Name"
                    sx={{ width: 216 }}
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                  />
                </Stack>
                <Stack gap={0.5}>
                  <Typography className="small-bold-text">Last name</Typography>
                  <TextField
                    placeholder="Last Name"
                    sx={{ width: 216 }}
                    value={guestLastName}
                    onChange={(e) => setGuestLastName(e.target.value)}
                  />
                </Stack>
              </Stack>
              <Stack>
                <Stack gap={0.5}>
                  <Typography className="small-bold-text">
                    Email address
                  </Typography>
                  <TextField
                    placeholder="Your email"
                    sx={{ width: 470 }}
                    value={guestEmail}
                    onChange={(e) => setGuestEmail(e.target.value)}
                  />
                  <Typography className="small-text">
                    We'll send your confirmation details to {guestEmail}
                  </Typography>
                </Stack>
              </Stack>
              <Stack gap={1}>
                <Typography className="small-bold-text">Phone No</Typography>
                <Box
                  sx={{
                    width: 470,
                    "--react-international-phone-border-radius": "3px",
                    "--react-international-phone-height": "52px",
                    "--react-international-phone-background-color": "white",
                    "--react-international-phone-border-color": "#E0E0E0",
                    "--react-international-phone-font-size": "16px",
                    "--react-international-phone-text-color": "#000",
                    "& .react-international-phone-input": { width: "100%" },
                    "& .react-international-phone-country-selector-button": {
                      borderTopLeftRadius: "3px",
                      borderBottomLeftRadius: "3px",
                    },
                  }}
                >
                  <PhoneInput
                    defaultCountry="kr"
                    value={phone}
                    onChange={(p) => setPhone(p)}
                  />
                </Box>
              </Stack>
            </Stack>
          </Stack>

          <Stack gap={1} mt={2}>
            <Typography className="bold-text-medium">
              Please agree to the following:*
            </Typography>
            <Stack flexDirection={"row"} alignItems="flex-start">
              <Checkbox
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
              />
              <Typography className="small-text" pt={1}>
                I confirm that I am over the age of 14 and I consent to the
                mandatory collection and use of my personal information as
                described in the LankaStay.com Privacy Statement.
              </Typography>
            </Stack>
          </Stack>

          <Button variant="contained" sx={{ mt: 4 }} onClick={handleNext}>
            <Stack flexDirection={"row"}>
              <Typography
                color={"secondary.contrastText"}
                className="bold-text-medium"
                textTransform={"capitalize"}
              >
                Payment details
              </Typography>
              <ChevronRightIcon sx={{ color: "secondary.contrastText" }} />
            </Stack>
          </Button>
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
        </Stack>
      </Stack>
    </Stack>
  );
};

export const getServerSideProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "ko", ["common"])),
  },
});
export default withLayoutAttractionsReserve(TicketReserve);
