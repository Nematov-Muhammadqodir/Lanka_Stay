import { Stack, Typography, CircularProgress } from "@mui/material";
import React from "react";
import AttractionsReviewCard from "./Menu/AttractionsReviewCard";
import { useQuery } from "@apollo/client";
import { GET_COMMENTS } from "@/apollo/user/query";
import { useTranslation } from "next-i18next";

interface AttractionsReviewsListProps {
  attractionId?: string;
}

const AttractionsReviewsList = ({ attractionId }: AttractionsReviewsListProps) => {
  const { t } = useTranslation("common");
  const { data, loading } = useQuery(GET_COMMENTS, {
    variables: {
      input: {
        page: 1,
        limit: 4,
        direction: "DESC",
        search: { commentRefId: attractionId },
      },
    },
    skip: !attractionId,
  });

  const comments = data?.getComments?.list ?? [];

  if (loading) {
    return (
      <Stack alignItems="center" py={4}>
        <CircularProgress size={24} />
      </Stack>
    );
  }

  if (comments.length === 0) return null;

  return (
    <Stack mt={5} gap={1}>
      <Stack>
        <Typography className="bold-text">{t("attraction.whatGuestsLovedMost")}</Typography>
      </Stack>
      <Stack flexDirection={"row"} flexWrap={"wrap"} gap={2}>
        {comments.map((comment: any) => (
          <AttractionsReviewCard key={comment._id} comment={comment} />
        ))}
      </Stack>
    </Stack>
  );
};

export default AttractionsReviewsList;
