import React, { useState } from "react";
import { Button, Stack, Typography } from "@mui/material";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import TicketPurchase from "./Ticket/TicketPurchase";
import { useTranslation } from "next-i18next";

interface TicketInfoProps {
  attraction?: any;
}

const TicketInfo = ({ attraction }: TicketInfoProps) => {
  const { t } = useTranslation("common");
  const [selected, setSelected] = useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = useState("11:00");
  const [ticketCount, setTicketCount] = useState(1);
  const times = [
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
  ];

  return (
    <Stack>
      <Typography className="bold-text">{t("attraction.ticketsAndPrices")}</Typography>
      <Typography className="bold-text-medium" sx={{ mt: 2 }}>
        {t("attraction.searchByDate")}
      </Typography>
      <Stack sx={{ mt: 2 }}>
        <DayPicker
          mode="single"
          selected={selected}
          onSelect={setSelected}
          disabled={{ before: new Date() }}
        />
      </Stack>
      <Stack spacing={2} mt={2}>
        <Typography className="bold-text">{t("attraction.selectTime")}</Typography>
        <Stack direction="row" flexWrap="wrap" gap={1}>
          {times.map((time) => (
            <Button
              key={time}
              variant="outlined"
              color={selectedTime === time ? "primary" : "inherit"}
              onClick={() => setSelectedTime(time)}
              sx={{
                borderRadius: "20px",
                minWidth: 70,
                fontWeight: selectedTime === time ? 700 : 400,
                borderWidth: selectedTime === time ? 2 : 1,
              }}
            >
              {time}
            </Button>
          ))}
        </Stack>
      </Stack>
      <Stack mt={2}>
        <TicketPurchase
          attraction={attraction}
          ticketCount={ticketCount}
          setTicketCount={setTicketCount}
          selectedDate={selected}
          selectedTime={selectedTime}
        />
      </Stack>
    </Stack>
  );
};

export default TicketInfo;
