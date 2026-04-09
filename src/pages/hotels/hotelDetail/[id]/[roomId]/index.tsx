import withLayoutAttractionsReserve from "@/src/libs/components/layout/attractions/AttractionReserveLayout";
import { Button, Rating, Stack, TextField, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Image from "next/image";
import RoomReservationRight from "@/src/libs/components/HotelDetail/HotelRoom/RoomReservationRight";
import { useEffect, useState } from "react";
import RoomPaymentRIght from "@/src/libs/components/HotelDetail/HotelRoom/RoomPaymentRIght";
import { useRouter } from "next/router";
import { GET_PARTNER_PROPERTY_ROOM } from "@/apollo/user/query";
import { useQuery, useReactiveVar } from "@apollo/client";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { formatKoreanWon } from "@/src/libs/handlers/priceHandler";
import { userVar } from "@/apollo/store";

import { sweetErrorAlert } from "@/src/libs/sweetAlert";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { resolveImageUrl } from "@/src/libs/handlers/imageHandler";

export interface InitialValueInput {
  guestId: string;
  guestName: string;
  guestLastName: string;
  guestEmail: string;
  guestPhoneNumber: string;
  travelForWork: boolean;
  ageConfirmation: boolean;
  roomId: string;
  propertyId: string;
  startDate: string;
  endDate: string;
}

const RoomReservation = () => {
  const user = useReactiveVar(userVar);
  const date = new Date("2025-11-06"); // Thu Nov 06 2025
  date.setDate(date.getDate() - 5);

  const formatted = date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "2-digit",
    year: "numeric",
  });

  const filteringData = useSelector((state: RootState) => state.filters);

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  const steps = ["Your selection", "Your details", "Finish booking"];
  const [pay, setPay] = useState("reserve");
  const router = useRouter();
  const { roomId } = router.query;

  const partnerProperty = useSelector(
    (state: RootState) => state.partnerProperty.data
  );

  /** APOLLO REQUESTS **/
  const {
    loading: getPartnerPropertyRoomLoading,
    data: getPartnerPropertyRoomData,
    error: getPartnerPropertyRoomError,
    refetch: getPartnerPropertyRoomRefetch,
  } = useQuery(GET_PARTNER_PROPERTY_ROOM, {
    fetchPolicy: "network-only",
    variables: { input: roomId },
    skip: !roomId,
    notifyOnNetworkStatusChange: true,
  });

  const roomData = getPartnerPropertyRoomData?.getPartnerPropertyRoom;

  const start = filteringData.startDate
    ? new Date(filteringData.startDate)
    : null;
  const end = filteringData.endDate ? new Date(filteringData.endDate) : null;
  const bookedDays =
    start && end
      ? Math.max(
          1,
          Math.round(
            (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
          )
        )
      : 1;

  const options = {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  } as const;

  const startDate = start ? start.toLocaleDateString("en-US", options) : "";
  const endDate = end ? end.toLocaleDateString("en-US", options) : "";

  const nightlyPrice = roomData?.roomPricePerNight ?? 0;
  const doscountedPrice = Number(nightlyPrice) - 23000;
  const totalPrice = doscountedPrice * bookedDays;
  const totalPriceWithoutDiscount = Number(nightlyPrice) * bookedDays;

  const [initalValue, setInitalValue] = useState<InitialValueInput>({
    guestId: user._id,
    guestName: user.guestName ? user.guestName : "",
    guestLastName: "",
    guestEmail: user.guestEmail ? user.guestEmail : "",
    guestPhoneNumber: user.guestPhone ? user.guestPhone : "",
    travelForWork: false,
    ageConfirmation: false,
    roomId: Array.isArray(roomId) ? roomId[0] : roomId || "",
    propertyId: partnerProperty?._id || "",
    startDate: String(filteringData.startDate),
    endDate: String(filteringData.endDate),
  });
  console.log("initalValue", initalValue);
  const handlePaymentPage = () => {
    const missing: string[] = [];
    if (!initalValue.guestName?.trim()) missing.push("First name");
    if (!initalValue.guestEmail?.trim()) missing.push("Email address");
    if (
      !initalValue.guestPhoneNumber?.trim() ||
      initalValue.guestPhoneNumber.replace(/\D/g, "").length < 5
    )
      missing.push("Phone number");

    if (missing.length > 0) {
      setPay("reserve");
      sweetErrorAlert(
        `Please fill in: ${missing.join(", ")}`,
        2500
      );
      setActiveStep(1);
    } else {
      setPay("pay");
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      setActiveStep(2);
    }
  };
  const handleEditUserInfo = (key: string, value: any) => {
    setInitalValue((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const [activeStep, setActiveStep] = useState<number>(1);
  if (!isMounted) return null;
  return (
    <Stack className="container" mt={"20px !important"}>
      <Box sx={{ width: "100%", overflowX: "auto" }}>
        <Stepper
          activeStep={activeStep}
          alternativeLabel
          sx={{
            "& .MuiStepLabel-label": {
              fontSize: { xs: "12px", md: "0.875rem" },
            },
          }}
        >
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>

      <Stack
        sx={{
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          mt: 2,
          gap: { xs: 2, md: 0 },
        }}
      >
        <Stack sx={{ width: { xs: "100%", md: "30%" }, gap: 2 }}>
          <Stack
            width={"100%"}
            sx={{ height: { xs: "auto", md: "340px" } }}
            border={"1px solid"}
            borderRadius={3}
            borderColor={"text.disabled"}
          >
            <Image
              src={
                partnerProperty?.propertyImages?.length
                  ? resolveImageUrl(partnerProperty?.propertyImages[0])
                  : "/img/hotel.jpg"
              }
              alt="left-image"
              width={388}
              height={155}
              style={{
                objectFit: "cover",
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
              }}
            />
            <Stack padding={2}>
              <Rating
                name="read-only"
                value={partnerProperty?.propertyStars}
                readOnly
              />
              <Stack maxWidth={"350px"} overflow={"hidden"}>
                <Typography className="bold-text-medium" width={"100px"}>
                  {roomData?.roomName}
                </Typography>
              </Stack>
              <Typography className="small-text">
                {partnerProperty?.propertyCity},{" "}
                {partnerProperty?.propertyPostCode}{" "}
                {partnerProperty?.propertyRegion}{" "}
                {partnerProperty?.propertyCountry}
              </Typography>
              {partnerProperty?.locationRating ? (
                <Typography className="small-text" color={"#018233"}>
                  Excellent location —{" "}
                  {partnerProperty.locationRating.toFixed(1)}
                </Typography>
              ) : null}
              <Stack flexDirection={"row"} alignItems={"center"} gap={1} mt={1}>
                <Box
                  border={"1px solid"}
                  sx={{
                    width: 30,
                    height: 30,
                    textAlign: "center",
                    pt: "3px",
                    backgroundColor: "primary.main",
                    color: "primary.contrastText",
                    borderRadius: 13,
                    borderBottomLeftRadius: 0,
                  }}
                >
                  <Typography className="small-bold-text">
                    {(() => {
                      const ratings: number[] = [
                        partnerProperty?.staffRating,
                        partnerProperty?.facilitiesRating,
                        partnerProperty?.cleanlessRating,
                        partnerProperty?.comfortRating,
                        partnerProperty?.valueOfMoneyRating,
                        partnerProperty?.locationRating,
                        partnerProperty?.freeWiFiRating,
                      ].filter((r): r is number => r != null);
                      if (ratings.length === 0) return "0";
                      return (
                        ratings.reduce((sum, val) => sum + val, 0) /
                        ratings.length
                      ).toFixed(1);
                    })()}
                  </Typography>
                </Box>
                <Typography className="small-bold-text">
                  Fabulous · {partnerProperty?.totalReviews ?? 0} reviews
                </Typography>
              </Stack>
            </Stack>
          </Stack>

          <Stack
            width={"100%"}
            height={"auto"}
            border={"1px solid"}
            borderRadius={3}
            borderColor={"text.disabled"}
            p={2}
          >
            <Typography className="bold-text-medium">
              Your booking details
            </Typography>
            <Stack
              flexDirection={"row"}
              justifyContent={"space-between"}
              mt={2}
              borderBottom={"1px solid"}
              pb={2}
              borderColor={"text.disabled"}
              mb={2}
            >
              <Stack pr={4} borderColor={"text.disabled"}>
                <Typography>Check-in</Typography>
                <Typography className="bold-text-medium">
                  {startDate}
                </Typography>
                <Typography>
                  From {partnerProperty?.checkInTimeFrom || "14:00"}
                </Typography>
              </Stack>
              <Stack pr={4} sx={{ alignItems: "flex-end" }}>
                <Typography>Check-out</Typography>
                <Typography className="bold-text-medium">{endDate}</Typography>
                <Typography>
                  Until {partnerProperty?.checkOutTimeUntill || "12:00"}
                </Typography>
              </Stack>
            </Stack>

            <Stack gap={1}>
              <Typography>You selected</Typography>
              <Typography className="bold-text-medium">
                {bookedDays} nights, 1 room for{" "}
                {roomData?.numberOfGuestsCanStay
                  ? roomData?.numberOfGuestsCanStay
                  : 1}{" "}
                adults
              </Typography>
              <Typography className="small-text">
                1 x Standard Double Room - 11th - 16th Floor with Bath - Parking
                included
              </Typography>
            </Stack>
          </Stack>

          <Stack
            width={"100%"}
            height={"auto"}
            border={"1px solid"}
            borderRadius={3}
            borderColor={"text.disabled"}
            p={2}
          >
            <Typography className="bold-text-medium">
              Your price summary
            </Typography>
            <Stack
              flexDirection={"row"}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <Typography>Original price</Typography>
              <Typography className="bold-text-medium">
                {formatKoreanWon(String(doscountedPrice))}
              </Typography>
            </Stack>
            <Stack
              flexDirection={"row"}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <Typography>Late Escape Deal</Typography>
              <Typography
                className="bold-text-medium"
                color={"red"}
                sx={{ textDecoration: "line-through" }}
              >
                {formatKoreanWon(roomData?.roomPricePerNight)}
              </Typography>
            </Stack>

            <Stack
              flexDirection={"row"}
              alignItems={"center"}
              justifyContent={"space-between"}
              mt={2}
              sx={{ backgroundColor: "secondary.main" }}
              padding={2}
              borderRadius={3}
            >
              <Typography className="bold-text">Total</Typography>
              <Stack>
                <Typography
                  className="bold-text-medium"
                  color={"red"}
                  sx={{ textDecoration: "line-through" }}
                >
                  {formatKoreanWon(String(totalPriceWithoutDiscount))}
                </Typography>
                <Typography className="bold-text" color={"primary.main"}>
                  {formatKoreanWon(String(totalPrice))}
                </Typography>
                <Typography className="small-text">
                  Includes taxes and charges
                </Typography>
              </Stack>
            </Stack>
          </Stack>

          <Stack
            width={"100%"}
            height={"auto"}
            border={"1px solid"}
            borderRadius={3}
            borderColor={"text.disabled"}
            p={2}
          >
            <Typography className="bold-text-medium">
              How much will it cost to cancel?
            </Typography>
            <Typography className="small-text" color={"#018233"}>
              Free cancellation before {formatted} Dec
            </Typography>

            <Stack
              flexDirection={"row"}
              alignItems={"center"}
              mt={2}
              justifyContent={"space-between"}
            >
              <Typography>From 00:00 on {formatted}</Typography>
              <Typography> {formatKoreanWon(String(totalPrice))}</Typography>
            </Stack>
          </Stack>
        </Stack>

        {pay === "pay" ? (
          <RoomPaymentRIght
            handleEditUserInfo={handleEditUserInfo}
            initalValue={initalValue}
            totalPrice={totalPrice}
          />
        ) : (
          <Stack sx={{ width: { xs: "100%", md: "67%" } }}>
            <RoomReservationRight
              handlePaymentPage={handlePaymentPage}
              formatted={formatted}
              handleEditUserInfo={handleEditUserInfo}
              initalValue={initalValue}
              setActiveStep={setActiveStep}
            />
          </Stack>
        )}
      </Stack>
    </Stack>
  );
};

export const getServerSideProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "ko", ["common"])),
  },
});
export default withLayoutAttractionsReserve(RoomReservation);
