import {
  Button,
  Drawer,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ReviewCard from "./ReviewCard";
import GuestReviewMenu from "./GuestReviewMenu";
import { HotelReviewsProps } from "@/src/pages/hotels/hotelDetail/[id]";
import { GET_COMMENTS } from "@/apollo/user/query";
import { useQuery } from "@apollo/client";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { setComments } from "@/src/slices/commentSlice";

const ReviewsList = ({
  hotelReviewInput,
}: {
  hotelReviewInput: HotelReviewsProps;
}) => {
  const dispatch = useDispatch();
  const id = useSelector((state: RootState) => state.partnerProperty.data?._id);
  const {
    data: commentsData,
    loading: commentsLoading,
    refetch: commentsRefetch,
  } = useQuery(GET_COMMENTS, {
    variables: {
      input: {
        page: 1,
        limit: 6,
        direction: "DESC",
        search: {
          commentRefId: id,
        },
      },
    },
  });

  const reviews = useSelector((state: RootState) => state.comments.data?.list);

  console.log("commentsData", reviews);

  useEffect(() => {
    if (commentsData?.getComments) {
      const result = commentsData?.getComments;

      dispatch(setComments(result));
    }
  }, [commentsData]);

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
        {reviews?.map((review: any) => {
          return (
            <ReviewCard
              name={review.memberData.guestName}
              src={review.memberData.guestImage}
              review={review.commentContent}
              id={review._id}
              country={review.memberData.guestCountry}
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
