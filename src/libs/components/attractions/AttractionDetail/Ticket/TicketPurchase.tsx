import React from "react";
import { Button, Stack, Typography } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useRouter } from "next/router";
import { formatKoreanWon } from "@/src/libs/handlers/priceHandler";
import { sweetErrorAlert, sweetMixinErrorAlert } from "@/src/libs/sweetAlert";
import { useTranslation } from "next-i18next";
import { useReactiveVar } from "@apollo/client";
import { userVar } from "@/apollo/store";

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
  const { t } = useTranslation("common");
  const user = useReactiveVar(userVar);
  const adultPrice = attraction?.attractionAdultPrice ?? 0;
  const totalPrice = adultPrice * ticketCount;

  const handleNext = async () => {
    if (!user?._id) {
      await sweetMixinErrorAlert("Please log in to book this attraction");
      router.push("/join/login");
      return;
    }
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
        {attraction?.attractionName ?? t("common.loading")}
      </Typography>
      <Stack flexDirection={"row"} alignItems={"center"} gap={1}>
        <InfoIcon />
        <Stack>
          <Typography>
            {attraction?.freeCancellation
              ? t("attraction.freeCancellationShort")
              : t("attraction.nonRefundable")}
          </Typography>
          <Typography className="small-text">
            {attraction?.freeCancellation
              ? t("attraction.cancelBefore")
              : t("attraction.nonRefundableDesc")}
          </Typography>
        </Stack>
      </Stack>
      <Typography className="small-bold-text">{t("attraction.howManyTickets")}</Typography>
      <Stack
        flexDirection={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Stack>
          <Typography>{t("attraction.adult")}</Typography>
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
          <Typography className="small-bold-text">{t("attraction.total")}:</Typography>
          <Typography className="bold-text-medium">
            {formatKoreanWon(String(totalPrice))}
          </Typography>
        </Stack>
        <Typography className="small-text">
          {t("attraction.includesTaxes")}
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
          {t("common.next")}
        </Typography>
      </Button>
    </Stack>
  );
};

export default TicketPurchase;
