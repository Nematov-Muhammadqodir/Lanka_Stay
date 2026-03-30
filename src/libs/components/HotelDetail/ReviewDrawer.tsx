import React, { useState } from "react";
import { Drawer, Box, Typography, Stack, Button, Divider } from "@mui/material";
import Rating from "@mui/material/Rating";
import { useMutation } from "@apollo/client";
import { SUBMIT_REVIEW } from "@/apollo/user/mutation";
import { sweetBasicAlert, sweetTopSuccessAlert } from "../../sweetAlert";

// types/review.ts
export interface ReviewInput {
  reviewRefId: string;

  staffRating: number;
  facilitiesRating: number;
  cleanlessRating: number;
  comfortRating: number;
  valueOfMoneyRating: number;
  locationRating: number;
  freeWiFiRating: number;
}

interface ReviewDrawerProps {
  open: boolean;
  onClose: () => void;
  reviewRefId: string;
}

const ReviewDrawer: React.FC<ReviewDrawerProps> = ({
  open,
  onClose,
  reviewRefId,
}) => {
  const [userReviews, setUserReviews] = useState<ReviewInput>({
    reviewRefId: reviewRefId,
    staffRating: 0,
    facilitiesRating: 0,
    cleanlessRating: 0,
    comfortRating: 0,
    valueOfMoneyRating: 0,
    locationRating: 0,
    freeWiFiRating: 0,
  });

  const handleRatingChange = (
    field: keyof ReviewInput,
    value: number | null
  ) => {
    setUserReviews((prev: any) => ({
      ...prev,
      [field]: value ?? 0,
    }));
  };

  const [submitReview] = useMutation(SUBMIT_REVIEW);

  const handleSubmit = async () => {
    console.log("USER REVIEWS:", userReviews);

    try {
      const { data } = await submitReview({
        variables: {
          input: userReviews,
        },
      });

      console.log("Leaving reviews success:", data);
      if (data) {
        sweetTopSuccessAlert("Commenting completed successfully!");
        // router.push(`/myPage/${user._id}/reservations`);
      }
    } catch (error: any) {
      console.error("Leaving reviews error:", error);

      // If GraphQL validation error:
      if (error.graphQLErrors?.length) {
        sweetBasicAlert(error.graphQLErrors[0].message);
      }
      // If network/server error:
      else if (error.networkError) {
        alert("Server error — please try again.");
      } else {
        alert("Something went wrong.");
      }
    }
    // 🔥 send userReviews to GraphQL mutation here
  };

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ width: 380, p: 3 }}>
        <Typography variant="h6" fontWeight={600} mb={2}>
          Leave a Review
        </Typography>

        <Divider sx={{ mb: 2 }} />

        <Stack spacing={2}>
          <ReviewItem
            label="Staff"
            value={userReviews.staffRating}
            onChange={(v) => handleRatingChange("staffRating", v)}
          />

          <ReviewItem
            label="Facilities"
            value={userReviews.facilitiesRating}
            onChange={(v) => handleRatingChange("facilitiesRating", v)}
          />

          <ReviewItem
            label="Cleanliness"
            value={userReviews.cleanlessRating}
            onChange={(v) => handleRatingChange("cleanlessRating", v)}
          />

          <ReviewItem
            label="Comfort"
            value={userReviews.comfortRating}
            onChange={(v) => handleRatingChange("comfortRating", v)}
          />

          <ReviewItem
            label="Value for money"
            value={userReviews.valueOfMoneyRating}
            onChange={(v) => handleRatingChange("valueOfMoneyRating", v)}
          />

          <ReviewItem
            label="Location"
            value={userReviews.locationRating}
            onChange={(v) => handleRatingChange("locationRating", v)}
          />

          <ReviewItem
            label="Free WiFi"
            value={userReviews.freeWiFiRating}
            onChange={(v) => handleRatingChange("freeWiFiRating", v)}
          />
        </Stack>

        <Button
          fullWidth
          variant="contained"
          sx={{
            borderColor: "primary",
            color: "secondary.contrastText",
            fontWeight: "bold",
          }}
          onClick={handleSubmit}
        >
          Submit Review
        </Button>
      </Box>
    </Drawer>
  );
};

export default ReviewDrawer;

interface ReviewItemProps {
  label: string;
  value: number;
  onChange: (value: number | null) => void;
}

const ReviewItem: React.FC<ReviewItemProps> = ({ label, value, onChange }) => {
  return (
    <Box>
      <Typography fontSize={14} fontWeight={500} mb={0.5}>
        {label}
      </Typography>
      <Rating
        name={label}
        value={value}
        max={10}
        onChange={(_, newValue) => onChange(newValue)}
      />
    </Box>
  );
};
