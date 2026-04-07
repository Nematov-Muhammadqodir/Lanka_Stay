import { Box, Button, Chip, Stack, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import InfoIcon from "@mui/icons-material/Info";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useTranslation } from "next-i18next";
import GuestReviewsForMenu from "./GuestReviewsForMenu";
import GuestReviewListForMenu from "./GuestReviewListForMenu";
import React from "react";
import { HotelReviewsProps } from "@/src/pages/hotels/hotelDetail/[id]";
import { WriteReviewMenu } from "./WriteReview";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useReactiveVar } from "@apollo/client";
import { userVar } from "@/apollo/store";

// Drawer component for writing review

interface GuestReviewMenuProps {
  handleClose: () => void;
  hotelReviewInput: HotelReviewsProps;
  commentsRefetch?: () => void;
}

const GuestReviewMenu = ({
  handleClose,
  hotelReviewInput,
  commentsRefetch,
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

  const totalScore =
    ratings.reduce((sum, val) => sum + (val || 0), 0) / ratings.length;

  const formattedTotalScore = Number(totalScore.toFixed(1));

  const { t } = useTranslation("common");
  const user = useReactiveVar(userVar);
  const comments = useSelector(
    (state: RootState) => state.comments.data?.list
  );
  const hasReviewed = comments?.some(
    (c: any) => c.memberId === user?._id
  );

  // State for review writing menu
  const [openWriteMenu, setOpenWriteMenu] = React.useState(false);

  return (
    <>
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
            <Typography sx={{ fontWeight: 700, fontSize: 20 }}>
              {t("hotel.guestReviews")}
            </Typography>
            <Button onClick={handleClose}>
              <CloseIcon />
            </Button>
          </Stack>

          <Stack
            flexDirection={"row"}
            justifyContent={"space-between"}
            sx={{ borderBottom: "1px solid", pb: 2, borderColor: "text" }}
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
                  {formattedTotalScore >= 9
                    ? t("hotel.superb")
                    : formattedTotalScore >= 8
                    ? t("hotel.fabulous")
                    : formattedTotalScore >= 7
                    ? t("hotel.veryGood")
                    : formattedTotalScore >= 6
                    ? t("hotel.good")
                    : t("hotel.pleasant")}
                </Typography>
                <Typography className="small-text">
                  {totalReviews} {t("hotel.reviews")}
                </Typography>
              </Stack>
            </Stack>

            <Stack flexDirection={"row"} gap={1} alignItems={"center"}>
              <Typography color={"primary"}>
                {t("hotel.weAimReal")}
              </Typography>
              <InfoIcon color="primary" />
            </Stack>

            {hasReviewed ? (
              <Chip
                icon={<CheckCircleIcon />}
                label={t("hotel.alreadyReviewed")}
                color="success"
                variant="outlined"
              />
            ) : (
              <Button
                variant="outlined"
                sx={{
                  borderColor: "primary",
                  color: "primary.main",
                  fontWeight: "bold",
                }}
                onClick={() => setOpenWriteMenu(true)}
              >
                {t("hotel.leaveReview")}
              </Button>
            )}
          </Stack>

          <Stack borderBottom={"1px solid"} pb={3} borderColor={"text"}>
            <GuestReviewsForMenu hotelReviewInput={hotelReviewInput} />
          </Stack>

          <Stack>
            <GuestReviewListForMenu />
          </Stack>
        </Stack>
      </Stack>

      {/* Review Writing Drawer */}
      <WriteReviewMenu
        open={openWriteMenu}
        onClose={() => setOpenWriteMenu(false)}
        onSubmit={(value) => {
          console.log("Review submitted:", value);
          setOpenWriteMenu(false);
          commentsRefetch?.();
          // Later call GraphQL mutation here
        }}
      />
    </>
  );
};

export default GuestReviewMenu;
