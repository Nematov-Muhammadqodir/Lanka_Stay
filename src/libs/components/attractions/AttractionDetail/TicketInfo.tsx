import React, { useState } from "react";
import { Button, Stack, Typography } from "@mui/material";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import TicketPurchase from "./Ticket/TicketPurchase";

interface TicketInfoProps {
  attraction?: any;
}

const TicketInfo = ({ attraction }: TicketInfoProps) => {
  const [selected, setSelected] = useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = useState("11:00");
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
      <Typography className="bold-text">Tickets and prices</Typography>
      <Typography className="bold-text-medium" sx={{ mt: 2 }}>
        Search ticket availability by date
      </Typography>
      <Stack sx={{ mt: 2 }}>
        <DayPicker mode="single" selected={selected} onSelect={setSelected} />
      </Stack>
      <Stack spacing={2} mt={2}>
        <Typography className="bold-text">Select time</Typography>
        <Stack direction="row" flexWrap="wrap" gap={1}>
          {times.map((time) => (
            <Button
              key={time}
              variant={selectedTime === time ? "outlined" : "outlined"}
              color={selectedTime === time ? "primary" : "inherit"}
              onClick={() => setSelectedTime(time)}
              sx={{
                borderRadius: "20px",
                minWidth: 70,
              }}
            >
              {time}
            </Button>
          ))}
        </Stack>
      </Stack>
      <Stack mt={2}>
        <TicketPurchase />
      </Stack>
    </Stack>
  );
};

export default TicketInfo;
