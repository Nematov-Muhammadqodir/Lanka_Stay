import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  Stack,
  Divider,
} from "@mui/material";

interface BusinessDetailsMenuProps {
  open: boolean;
  handleClose: () => void;
}

const BusinessDetailsMenu: React.FC<BusinessDetailsMenuProps> = ({
  open,
  handleClose,
}) => {
  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: { borderRadius: 3, p: 1 },
        }}
      >
        <DialogTitle
          sx={{
            fontWeight: 700,
            fontSize: 20,
            pb: 1,
          }}
        >
          This property is managed, licensed or represented by a business
        </DialogTitle>

        <DialogContent dividers sx={{ maxHeight: 500 }}>
          <Typography variant="body2" sx={{ mb: 2, lineHeight: 1.6 }}>
            A ‘business’ is typically either a party that makes their
            accommodation(s) bookable on our platform as their primary trade or
            as a significant secondary source of income, or a party that has
            contracted with Booking.com for the benefit of a group of
            accommodations that are owned or operated by independent third
            parties (such as a hotel chain or a property manager managing a
            large portfolio of vacation rentals). This accommodation operates
            under a brand owned, licensed or represented by the business
            mentioned below. Please note that the accommodation itself that you
            may book is responsible for your stay.
          </Typography>

          <Typography variant="body2" sx={{ mb: 2, lineHeight: 1.6 }}>
            Therefore, please check your booking confirmation for the
            accommodation’s specific details, including its address. This
            business and/or its affiliates certify or have obtained
            certification that the accommodation is committing to only offer
            products or services that comply with applicable EU law.
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Typography variant="h6" sx={{ mb: 1 }}>
            Business details 👁
          </Typography>

          <Stack spacing={0.5}>
            <Typography fontWeight={600}>sumorum</Typography>
            <Typography variant="body2">
              제주특별자치도 서귀포시 막속포로 114(법환동), 63573 제주도, South
              Korea
            </Typography>
            <Typography variant="body2">jeju</Typography>
            <Typography variant="body2">
              Trade register number: 6168531362
            </Typography>
          </Stack>
        </DialogContent>

        <DialogActions sx={{ pr: 2.5, pb: 2 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleClose}
            sx={{
              textTransform: "none",
              borderRadius: 2,
              px: 3,
              color: "secondary.main",
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default BusinessDetailsMenu;
