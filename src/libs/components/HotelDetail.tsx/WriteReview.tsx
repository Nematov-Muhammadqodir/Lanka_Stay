import {
  Box,
  Button,
  Stack,
  Typography,
  TextField,
  colors,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import InfoIcon from "@mui/icons-material/Info";
import GuestReviewsForMenu from "./GuestReviewsForMenu";
import GuestReviewListForMenu from "./GuestReviewListForMenu";
import React from "react";
import { HotelReviewsProps } from "@/src/pages/hotels/hotelDetail/[id]";

export const WriteReviewMenu = ({
  open,
  onClose,
  onSubmit,
}: {
  open: boolean;
  onClose: () => void;
  onSubmit: (value: string) => void;
}) => {
  const [text, setText] = React.useState("");

  if (!open) return null;

  return (
    <Stack
      position="fixed"
      right={0}
      top={0}
      height="100vh"
      width={500}
      p={3}
      bgcolor="white"
      boxShadow={4}
      zIndex={2000}
      spacing={3}
    >
      <Stack direction="row" justifyContent="space-between">
        <Typography sx={{ fontSize: 20, fontWeight: 700 }}>
          Write a Review
        </Typography>
        <Button onClick={onClose}>
          <CloseIcon />
        </Button>
      </Stack>

      <TextField
        label="Your Review"
        multiline
        rows={2}
        fullWidth
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <Button
        variant="contained"
        fullWidth
        sx={{ fontWeight: 700, color: colors.common.white }}
        onClick={() => {
          onSubmit(text);
          setText("");
        }}
        disabled={!text.trim()}
      >
        Submit Review
      </Button>
    </Stack>
  );
};
