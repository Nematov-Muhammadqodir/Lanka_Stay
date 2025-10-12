import {
  Box,
  Button,
  Dialog,
  DialogContent,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import React from "react";

interface WePriceMatchDialogProps {
  open: boolean;
  handleClose: () => void;
}

const WePriceMatchDialog: React.FC<WePriceMatchDialogProps> = ({
  open,
  handleClose,
}) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: { borderRadius: 4, p: 3 },
      }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography fontWeight={700} fontSize={24}>
          We Price Match
        </Typography>
        <IconButton onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </Stack>

      <DialogContent>
        <Typography fontWeight={500} mb={2}>
          You can claim a refund for the difference if you happen to find your
          reservation cheaper on another website.
        </Typography>
        <Typography mb={4} color="text.secondary">
          Just remember to contact us after booking with us and at least 24
          hours before your check-in date. You'll need to provide us with the
          link to the other offer and it must be online and available when we
          check.
        </Typography>

        <Stack direction="row" spacing={4} mb={4}>
          {/* ✅ Left side */}
          <Box flex={1}>
            <Typography fontWeight={700} mb={2}>
              We Price Match checklist
            </Typography>
            <Stack spacing={1.5}>
              <Stack direction="row" alignItems="center" spacing={1}>
                <CheckCircleIcon color="success" fontSize="small" />
                <Typography>
                  The other offer must be for the same property and
                  accommodation type.
                </Typography>
              </Stack>
              <Stack direction="row" alignItems="center" spacing={1}>
                <CheckCircleIcon color="success" fontSize="small" />
                <Typography>
                  The other offer must be for the same check in and check out
                  dates.
                </Typography>
              </Stack>
              <Stack direction="row" alignItems="center" spacing={1}>
                <CheckCircleIcon color="success" fontSize="small" />
                <Typography>
                  The other offer must have the same cancellation policy and
                  conditions.
                </Typography>
              </Stack>
            </Stack>
          </Box>

          {/* ❌ Right side */}
          <Box flex={1}>
            <Typography fontWeight={700} mb={2}>
              When can't you make a claim?
            </Typography>
            <Stack spacing={1.5}>
              <Stack direction="row" alignItems="flex-start" spacing={1}>
                <CancelIcon color="error" fontSize="small" />
                <Typography>
                  If the other offer is on a website that doesn’t reveal the
                  property or accommodation type you’ll be staying in until
                  after booking.
                </Typography>
              </Stack>
              <Stack direction="row" alignItems="flex-start" spacing={1}>
                <CancelIcon color="error" fontSize="small" />
                <Typography>
                  If the other offer is part of a loyalty or rewards programme,
                  coupon code, referral, or any similar situation where the
                  shown price changes.
                </Typography>
              </Stack>
              <Stack direction="row" alignItems="flex-start" spacing={1}>
                <CancelIcon color="error" fontSize="small" />
                <Typography>
                  If your current Booking.com booking is a Partner offer or
                  comparing with one of these offers.
                </Typography>
              </Stack>
            </Stack>
          </Box>
        </Stack>

        {/* 🔹 Bottom gray box */}
        <Box
          sx={{
            borderRadius: 2,
            p: 2,
            mb: 3,
          }}
        >
          <Typography fontWeight={700} mb={1}>
            Found your booking cheaper elsewhere?
          </Typography>
          <Box
            sx={{
              borderRadius: 2,
              p: 2,
              mb: 3,
            }}
          >
            <Typography fontWeight={700} mb={1}>
              Found your booking cheaper elsewhere?
            </Typography>

            <List sx={{ paddingLeft: 2 }}>
              <ListItem
                sx={{
                  display: "list-item",
                  padding: 0,
                  mb: 0.5,
                }}
              >
                <ListItemText
                  primary={
                    <>
                      Look for{" "}
                      <Typography>
                        Found this room cheaper elsewhere?
                      </Typography>{" "}
                      on your confirmation page or in{" "}
                      <Typography>View all bookings.</Typography>
                    </>
                  }
                />
              </ListItem>
              <ListItem
                sx={{
                  display: "list-item",
                  padding: 0,
                  mb: 0.5,
                }}
              >
                <ListItemText primary="No account? Log in with your booking number and pin." />
              </ListItem>
              <ListItem
                sx={{
                  display: "list-item",
                  padding: 0,
                }}
              >
                <ListItemText
                  primary={
                    <>
                      You can also contact our{" "}
                      <Typography>Customer Care</Typography> team.
                    </>
                  }
                />
              </ListItem>
            </List>
          </Box>
        </Box>

        <Stack alignItems="flex-end">
          <Button
            onClick={handleClose}
            variant="contained"
            sx={{
              borderRadius: 1,
              px: 4,
              textTransform: "none",
              color: "secondary.main",
            }}
          >
            Close
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default WePriceMatchDialog;
