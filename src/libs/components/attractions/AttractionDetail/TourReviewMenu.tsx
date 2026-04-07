import { Box, Button, Chip, Rating, Stack, TextField, Typography, colors } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import InfoIcon from "@mui/icons-material/Info";
import StarIcon from "@mui/icons-material/Star";
import TourReviewsForMenu from "./Menu/TourReviewsForMenu";
import TourReviewListForMenu from "./Menu/TourReviewsListForMenu";
import React, { useState } from "react";
import { Attraction } from "../../../types/attraction/attraction";
import { useMutation, useReactiveVar } from "@apollo/client";
import { CREATE_COMMENT } from "@/apollo/user/mutation";
import { GET_COMMENTS, GET_ATTRACTION } from "@/apollo/user/query";
import { userVar } from "@/apollo/store";
import {
  sweetBasicAlert,
  sweetMixinErrorAlert,
  sweetTopSuccessAlert,
} from "../../../sweetAlert";
import { useTranslation } from "next-i18next";

interface TourReviewMenuProps {
  handleClose: () => void;
  attraction?: Attraction | null;
}

const TourReviewMenu = ({ handleClose, attraction }: TourReviewMenuProps) => {
  const { t } = useTranslation("common");
  const user = useReactiveVar(userVar);
  const [writeOpen, setWriteOpen] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const [ratings, setRatings] = useState({
    value: 0,
    facilities: 0,
    quality: 0,
    access: 0,
  });
  const [createComment] = useMutation(CREATE_COMMENT);
  const [comments, setComments] = useState<any[]>([]);

  const totalReviews = attraction?.totalReviews ?? 0;
  const avgRating = attraction?.averageRating ?? 0;

  const ratingLabel =
    avgRating >= 4.5
      ? t("attraction.ratingSuperb")
      : avgRating >= 4
      ? t("attraction.ratingFabulous")
      : avgRating >= 3.5
      ? t("attraction.ratingVeryGood")
      : avgRating >= 3
      ? t("attraction.ratingGood")
      : t("attraction.ratingPleasant");

  const hasReviewed = comments?.some(
    (c: any) => c.memberId === user?._id
  );

  const handleSubmitReview = async () => {
    if (!user?._id) {
      await sweetMixinErrorAlert("Please login first");
      return;
    }
    if (!reviewText.trim()) return;

    try {
      const avgScore =
        [ratings.value, ratings.facilities, ratings.quality, ratings.access].filter(
          (r) => r > 0
        ).length > 0
          ? Math.round(
              [ratings.value, ratings.facilities, ratings.quality, ratings.access]
                .filter((r) => r > 0)
                .reduce((sum, val) => sum + val, 0) /
                [ratings.value, ratings.facilities, ratings.quality, ratings.access].filter(
                  (r) => r > 0
                ).length
            )
          : 0;

      await createComment({
        variables: {
          input: {
            commentContent: reviewText,
            commentRefId: attraction?._id,
            commentScore: avgScore,
            valueRating: ratings.value || undefined,
            facilitiesRating: ratings.facilities || undefined,
            qualityRating: ratings.quality || undefined,
            accessRating: ratings.access || undefined,
          },
        },
        refetchQueries: [
          "GetComments",
          {
            query: GET_ATTRACTION,
            variables: { input: attraction?._id },
          },
        ],
        awaitRefetchQueries: true,
      });
      sweetTopSuccessAlert("Review submitted successfully!");
      setReviewText("");
      setRatings({ value: 0, facilities: 0, quality: 0, access: 0 });
      setWriteOpen(false);
    } catch (error: any) {
      if (error.graphQLErrors?.length) {
        sweetBasicAlert(error.graphQLErrors[0].message);
      } else {
        sweetMixinErrorAlert("Something went wrong");
      }
    }
  };

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
          mb={3}
        >
          <Typography sx={{ fontWeight: 700, fontSize: 20 }}>
            {t("attraction.reviews")}
          </Typography>
          <Button onClick={handleClose}>
            <CloseIcon />
          </Button>
        </Stack>

        {/* Header */}
        <Stack
          flexDirection={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
          sx={{ borderBottom: "1px solid", pb: 2, borderColor: "divider" }}
        >
          <Stack flexDirection={"row"} gap={1} alignItems={"center"}>
            <StarIcon sx={{ color: "#FEBB05" }} />
            <Stack>
              <Typography sx={{ fontWeight: 700, fontSize: 15 }}>
                {ratingLabel}
              </Typography>
              <Typography className="small-text">
                {totalReviews} {totalReviews === 1 ? t("attraction.review") : t("attraction.reviews")}
              </Typography>
            </Stack>
          </Stack>
          <Stack flexDirection={"row"} gap={1} alignItems={"center"}>
            <Typography color={"primary"}>{t("attraction.weAimRealReviews")}</Typography>
            <InfoIcon color="primary" />
          </Stack>
          {hasReviewed ? (
            <Chip
              label={t("attraction.alreadyReviewed")}
              color="success"
              variant="outlined"
              size="small"
            />
          ) : (
            <Button
              variant="outlined"
              sx={{
                borderColor: "primary",
                color: "primary.main",
                fontWeight: "bold",
                textTransform: "none",
              }}
              onClick={() => {
                if (!user?._id) {
                  sweetMixinErrorAlert("Please login first");
                  return;
                }
                setWriteOpen(!writeOpen);
              }}
            >
              {t("attraction.leaveAReview")}
            </Button>
          )}
        </Stack>

        {/* Write Review Section */}
        {writeOpen && (
          <Stack
            gap={2}
            p={2.5}
            mt={1}
            sx={{
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 2,
              backgroundColor: "background.paper",
            }}
          >
            <Typography fontWeight={700} fontSize={16}>
              {t("attraction.writeYourReview")}
            </Typography>

            {/* Star Ratings */}
            <Stack gap={1.5}>
              {[
                { key: "value", label: t("attraction.goodValue") },
                { key: "facilities", label: t("attraction.facilities") },
                { key: "quality", label: t("attraction.qualityOfService") },
                { key: "access", label: t("attraction.easeOfAccess") },
              ].map((item) => (
                <Stack
                  key={item.key}
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Typography fontSize={14} fontWeight={500} width={160}>
                    {item.label}
                  </Typography>
                  <Rating
                    value={ratings[item.key as keyof typeof ratings]}
                    onChange={(_, newValue) =>
                      setRatings((prev) => ({
                        ...prev,
                        [item.key]: newValue ?? 0,
                      }))
                    }
                    size="medium"
                  />
                </Stack>
              ))}
            </Stack>

            <textarea
              placeholder={t("attraction.shareExperience")}
              rows={4}
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              style={{
                width: "100%",
                padding: "12px",
                fontSize: "14px",
                fontFamily: "inherit",
                borderRadius: "8px",
                border: "1px solid #c4c4c4",
                resize: "vertical",
                outline: "none",
                boxSizing: "border-box",
              }}
            />
            <Stack direction="row" gap={1} justifyContent="flex-end">
              <Button
                onClick={() => setWriteOpen(false)}
                sx={{ textTransform: "none" }}
              >
                {t("common.cancel")}
              </Button>
              <Button
                variant="contained"
                onClick={handleSubmitReview}
                disabled={!reviewText.trim()}
                sx={{
                  fontWeight: 700,
                  color: colors.common.white,
                  textTransform: "none",
                }}
              >
                {t("attraction.submitReview")}
              </Button>
            </Stack>
          </Stack>
        )}

        {/* Ratings */}
        <Stack pb={3} borderColor={"text"}>
          <TourReviewsForMenu attraction={attraction} />
        </Stack>

        {/* Reviews List */}
        <Stack>
          <TourReviewListForMenu
            attractionId={attraction?._id}
            onCommentsLoaded={setComments}
          />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default TourReviewMenu;
