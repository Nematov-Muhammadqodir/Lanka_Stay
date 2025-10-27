import withLayoutAttractionsReserve from "@/src/libs/components/layout/attractions/AttractionReserveLayout";
import { Rating, Stack, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Image from "next/image";

const RoomReservation = () => {
  const steps = ["Your selection", "Your details", "Finish booking"];
  return (
    <Stack className="container" mt={"20px !important"}>
      <Box sx={{ width: "100%" }}>
        <Stepper activeStep={1} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>

      <Stack flexDirection={"row"} justifyContent={"space-between"} mt={2}>
        <Stack width={"30%"} gap={2}>
          <Stack
            width={"100%"}
            height={"340px"}
            border={"1px solid"}
            borderRadius={3}
            borderColor={"text.disabled"}
          >
            <Image
              src={"/img/hotel.jpg"}
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
              <Rating name="read-only" value={5} readOnly />
              <Typography className="bold-text-medium">
                Hotel Gracery Seoul
              </Typography>
              <Typography className="small-text">
                12, Sejong-daero 12-gil, Jung-Gu, 04526 Seoul, South Korea
              </Typography>
              <Typography className="small-text" color={"#018233"}>
                Excellent location — 9.2
              </Typography>
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
                  <Typography className="small-bold-text">8.2</Typography>
                </Box>
                <Typography className="small-bold-text">
                  Fabulous · 4,488 reviews
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
              <Stack
                borderRight={"1px solid"}
                pr={4}
                borderColor={"text.disabled"}
              >
                <Typography>Check-in</Typography>
                <Typography className="bold-text-medium">
                  Sun 7 Dec 2025
                </Typography>
                <Typography>15:00 – 00:00</Typography>
              </Stack>
              <Stack pr={4}>
                <Typography>Check-out</Typography>
                <Typography className="bold-text-medium">
                  Wed 10 Dec 2025
                </Typography>
                <Typography>Until 12:00</Typography>
              </Stack>
            </Stack>

            <Stack gap={1}>
              <Typography>You selected</Typography>
              <Typography className="bold-text-medium">
                3 nights, 1 room for 2 adults
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
              <Typography className="bold-text-medium">KRW 838,200</Typography>
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
                - KRW 251,460
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
                  KRW 838,200
                </Typography>
                <Typography className="bold-text" color={"primary.main"}>
                  KRW 838,200
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
              Free cancellation before 5 Dec
            </Typography>

            <Stack
              flexDirection={"row"}
              alignItems={"center"}
              mt={2}
              justifyContent={"space-between"}
            >
              <Typography>From 00:00 on 5 Dec</Typography>
              <Typography>KRW 586,740</Typography>
            </Stack>
          </Stack>
        </Stack>

        <Stack width={"67%"} border={"1px solid"}>
          right
        </Stack>
      </Stack>
    </Stack>
  );
};

export default withLayoutAttractionsReserve(RoomReservation);
