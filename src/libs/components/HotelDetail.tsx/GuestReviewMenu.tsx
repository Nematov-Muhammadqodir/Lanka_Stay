import { Box, Button, Stack, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import InfoIcon from "@mui/icons-material/Info";
import GuestReviewsForMenu from "./GuestReviewsForMenu";
import GuestReviewListForMenu from "./GuestReviewListForMenu";
import GuestReviewItemMenu from "./GuestReviewItemMenu";
import { HotelReviewsProps } from "@/src/pages/hotels/hotelDetail/[id]";

interface GuestReviewMenuProps {
  handleClose: () => void;
  hotelReviewInput: HotelReviewsProps;
}
const GuestReviewMenu = ({
  handleClose,
  hotelReviewInput,
}: GuestReviewMenuProps) => {
  const {
    staffRating,
    facilitiesRating,
    cleanlessRating,
    comfortRating,
    valueOfMoneyRating,
    locationRating,
    freeWiFiRating,
    totalReviews,
  } = hotelReviewInput;

  const ratings = [
    staffRating,
    facilitiesRating,
    cleanlessRating,
    comfortRating,
    valueOfMoneyRating,
    locationRating,
    freeWiFiRating,
  ];

  // Calculate average score
  const totalScore =
    ratings.reduce((sum, val) => sum + (val || 0), 0) / ratings.length;

  // Round to 1 decimal place
  const formattedTotalScore = Number(totalScore.toFixed(1));
  return (
    <Stack
      height={"100vh"}
      width={900}
      alignSelf={"flex-end"}
      sx={{ borderTopLeftRadius: 20, borderBottomLeftRadius: 20, p: 2 }}
      overflow={"auto"}
    >
      <Stack gap={1}>
        <Stack
          flexDirection={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
          mb={5}
        >
          <Typography
            className="bold-text"
            sx={{ fontWeight: 700, fontSize: 20 }}
          >
            Guest reviews for The Grand Sumorum
          </Typography>
          <Button onClick={handleClose}>
            <CloseIcon />
          </Button>
        </Stack>
        <Stack
          flexDirection={"row"}
          justifyContent={"space-between"}
          sx={{
            borderBottom: "1px solid",
            pb: 2,
            borderColor: "text",
          }}
        >
          <Stack flexDirection={"row"} gap={1}>
            <Box
              sx={{
                backgroundColor: "primary.main",
                color: "secondary.contrastText",
                fontSize: 15,
                padding: 1,
                borderRadius: 1,
                fontWeight: 700,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {formattedTotalScore}
            </Box>
            <Stack>
              <Typography sx={{ fontWeight: 700, fontSize: 15 }}>
                Fabulous
              </Typography>
              <Typography className="small-text">
                {totalReviews} reviews
              </Typography>
            </Stack>
          </Stack>
          <Stack flexDirection={"row"} gap={1} alignItems={"center"}>
            <Typography color={"primary"}>We aim 100% real reviews</Typography>
            <InfoIcon color="primary" />
          </Stack>
          <Button
            variant="outlined"
            sx={{
              borderColor: "primary",
              color: "primary.main",
              fontWeight: "bold",
            }}
          >
            Write a Review
          </Button>
        </Stack>
        <Stack borderBottom={"1px solid"} pb={3} borderColor={"text"}>
          <GuestReviewsForMenu hotelReviewInput={hotelReviewInput} />
        </Stack>
        <Stack>
          <GuestReviewListForMenu />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default GuestReviewMenu;
