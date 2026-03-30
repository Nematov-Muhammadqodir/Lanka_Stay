import { Box, Button, Stack, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import InfoIcon from "@mui/icons-material/Info";
import GuestReviewListForMenu from "../../HotelDetail/GuestReviewListForMenu";
import GuestReviewsForMenu from "../../HotelDetail/GuestReviewsForMenu";
import StarIcon from "@mui/icons-material/Star";
import TourReviewsForMenu from "./Menu/TourReviewsForMenu";
import TourReviewListForMenu from "./Menu/TourReviewsListForMenu";

interface TourReviewMenuProps {
  handleClose: () => void;
}
const TourReviewMenu = ({ handleClose }: TourReviewMenuProps) => {
  return (
    <Stack
      height={"100vh"}
      width={900}
      alignSelf={"flex-end"}
      sx={{ borderTopLeftRadius: 20, borderBottomLeftRadius: 20, p: 3 }}
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
            Reviews
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
          <Stack flexDirection={"row"} gap={1} alignItems={"center"}>
            <StarIcon sx={{ color: "#FEBB05" }} />
            <Stack>
              <Typography sx={{ fontWeight: 700, fontSize: 15 }}>
                Fabulous
              </Typography>
              <Typography className="small-text">1,309 reviews</Typography>
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
        <Stack pb={3} borderColor={"text"}>
          <TourReviewsForMenu />
        </Stack>
        <Stack>
          <TourReviewListForMenu />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default TourReviewMenu;
