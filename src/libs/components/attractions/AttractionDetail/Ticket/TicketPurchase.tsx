import React from "react";
import { Button, Stack, Typography } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useRouter } from "next/router";

const TicketPurchase = () => {
  const router = useRouter();
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
        Busan Yacht Experience (Yacht G)
      </Typography>
      <Stack flexDirection={"row"} alignItems={"center"} gap={1}>
        <InfoIcon />
        <Stack>
          <Typography>Non-refundable</Typography>
          <Typography className="small-text">
            Your current selection is within 7 days of the start time
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
          <Typography>Regular</Typography>
          <Typography className="small-bold-text">KRW 29,745</Typography>
        </Stack>
        <Stack flexDirection={"row"} alignItems={"center"} gap={1}>
          <Button variant="outlined">
            <AddIcon />
          </Button>
          <Typography>0</Typography>
          <Button variant="outlined">
            <RemoveIcon />
          </Button>
        </Stack>
      </Stack>
      <Stack>
        <Stack flexDirection={"row"} alignItems={"center"} gap={1}>
          <Typography className="small-bold-text">Total:</Typography>
          <Typography className="bold-text-medium">KRW 0</Typography>
        </Stack>
        <Typography className="small-text">
          Includes taxes and charges
        </Typography>
      </Stack>
      <Button
        variant="contained"
        sx={{ alignSelf: "flex-end", width: 90 }}
        onClick={() =>
          router.push("/attractions/attractionDetail/id=2/reserve")
        }
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
