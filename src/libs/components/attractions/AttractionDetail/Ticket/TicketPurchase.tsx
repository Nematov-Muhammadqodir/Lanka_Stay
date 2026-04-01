import React from "react";
import { Button, Stack, Typography } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useRouter } from "next/router";
import { formatKoreanWon } from "@/src/libs/handlers/priceHandler";
import { sweetErrorAlert } from "@/src/libs/sweetAlert";

interface TicketPurchaseProps {
  attraction?: any;
  ticketCount: number;
  setTicketCount: (count: number) => void;
  selectedDate?: Date;
  selectedTime: string;
}

const TicketPurchase = ({
  attraction,
  ticketCount,
  setTicketCount,
  selectedDate,
  selectedTime,
}: TicketPurchaseProps) => {
  const router = useRouter();
  const adultPrice = attraction?.attractionAdultPrice ?? 0;
  const totalPrice = adultPrice * ticketCount;

  const handleNext = async () => {
    if (!selectedDate) {
      await sweetErrorAlert("Please select a date");
      return;
    }

    const dateStr = selectedDate.toISOString().split("T")[0];
    const query = new URLSearchParams({
      tickets: String(ticketCount),
      date: dateStr,
      time: selectedTime,
      total: String(totalPrice),
    }).toString();

    router.push(
      `/attractions/attractionDetail/${attraction?._id}/reserve?${query}`
    );
  };

  return (
    <Stack
      sx={{
        border: "3px solid",
        padding: 2,
        borderRadius: 2,
        borderColor: "primary.main",
        gap: 2,
      }}
    >
      <Typography className="bold-text-medium">
        {attraction?.attractionName ?? "Loading..."}
      </Typography>
      <Stack flexDirection={"row"} alignItems={"center"} gap={1}>
        <InfoIcon />
        <Stack>
          <Typography>
            {attraction?.freeCancellation
              ? "Free cancellation"
              : "Non-refundable"}
          </Typography>
          <Typography className="small-text">
            {attraction?.freeCancellation
              ? "Cancel up to 24 hours before start time"
              : "Your current selection is non-refundable"}
          </Typography>
        </Stack>
      </Stack>
      <Typography className="small-bold-text">How many tickets?</Typography>
      <Stack
        flexDirection={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Stack>
          <Typography>Adult</Typography>
          <Typography className="small-bold-text">
            {formatKoreanWon(String(adultPrice))}
          </Typography>
        </Stack>
        <Stack flexDirection={"row"} alignItems={"center"} gap={1}>
          <Button
            variant="outlined"
            size="small"
            onClick={() => setTicketCount(Math.max(1, ticketCount - 1))}
            sx={{ minWidth: 36 }}
          >
            <RemoveIcon />
          </Button>
          <Typography fontWeight={700} fontSize={18} width={30} textAlign="center">
            {ticketCount}
          </Typography>
          <Button
            variant="outlined"
            size="small"
            onClick={() =>
              setTicketCount(
                Math.min(attraction?.maxParticipants ?? 50, ticketCount + 1)
              )
            }
            sx={{ minWidth: 36 }}
          >
            <AddIcon />
          </Button>
        </Stack>
      </Stack>
      <Stack>
        <Stack flexDirection={"row"} alignItems={"center"} gap={1}>
          <Typography className="small-bold-text">Total:</Typography>
          <Typography className="bold-text-medium">
            {formatKoreanWon(String(totalPrice))}
          </Typography>
        </Stack>
        <Typography className="small-text">
          Includes taxes and charges
        </Typography>
      </Stack>
      <Button
        variant="contained"
        sx={{ alignSelf: "flex-end", width: 90 }}
        onClick={handleNext}
      >
        <Typography
          color={"secondary.contrastText"}
          sx={{ textTransform: "capitalize" }}
        >
          Next
        </Typography>
      </Button>
    </Stack>
  );
};

export default TicketPurchase;
