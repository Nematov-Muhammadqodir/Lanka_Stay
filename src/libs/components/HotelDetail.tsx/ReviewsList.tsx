import {
  Button,
  Drawer,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import ReviewCard from "./ReviewCard";
import GuestReviewMenu from "./GuestReviewMenu";
import { HotelReviewsProps } from "@/src/pages/hotels/hotelDetail/[id]";

const ReviewsList = ({
  hotelReviewInput,
}: {
  hotelReviewInput: HotelReviewsProps;
}) => {
  const reviews = [
    {
      name: "Hannah",
      src: "/img/Villa.jpg",
      review:
        "“Nice facilities, great size family rooms. Delicious breakfast! Good location on the sea front in walking distance to some super restaurants and cafes.”",
      id: "1234",
      country: "United Kingdom",
    },
    {
      name: "Kenji",
      src: "/img/dragon.jpg",
      review:
        "“The room was clean and cozy. Staff were friendly and always smiling. Loved the ocean view from our balcony!”",
      id: "1235",
      country: "Japan",
    },
    {
      name: "Sofia",
      src: "/img/Busan.jpg",
      review:
        "“Excellent value for money. The pool area was quiet and relaxing. Breakfast could have more options, but overall great stay.”",
      id: "1236",
      country: "Spain",
    },
    {
      name: "Michael",
      src: "/img/Jeju.jpg",
      review:
        "“Perfect place for families. My kids loved the play area. The staff made sure we had everything we needed.”",
      id: "1237",
      country: "USA",
    },
    {
      name: "Lea",
      src: "/img/Tokyo.jpg",
      review:
        "“I really liked the modern design of the rooms. It’s close to the beach and local shops. Will definitely come back!”",
      id: "1238",
      country: "Germany",
    },
    {
      name: "Kevin",
      src: "/img/Seoul.jpg",
      review: "Fucking Bitch ass this hotel is",
      id: "1238",
      country: "Uzbekistan",
    },
  ];

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <Stack className="container" mt={"50px !important"} gap={1.5}>
      <Stack>
        <Typography className="bold-text">
          Guests who stayed here loved
        </Typography>
      </Stack>
      <Stack flexDirection={"row"} gap={3} flexWrap={"wrap"}>
        {reviews.map((review) => {
          return (
            <ReviewCard
              name={review.name}
              src={review.src}
              review={review.review}
              id={review.id}
              country={review.country}
            />
          );
        })}
      </Stack>
      <Stack>
        <Button
          onClick={handleOpen}
          variant="outlined"
          sx={{
            width: 155,
            textTransform: "capitalize",
            color: "primary.main",
            height: 45,
            fontWeight: 700,
          }}
        >
          Read all reviews
        </Button>
        <Drawer
          anchor="right" // 👈 this positions it to the right
          open={open}
          onClose={handleClose}
          PaperProps={{
            sx: {
              width: 900,
              borderTopLeftRadius: 20,
              borderBottomLeftRadius: 20,
              overflow: "hidden",
            },
          }}
        >
          <GuestReviewMenu
            handleClose={handleClose}
            hotelReviewInput={hotelReviewInput}
          />
        </Drawer>
      </Stack>
    </Stack>
  );
};

export default ReviewsList;
