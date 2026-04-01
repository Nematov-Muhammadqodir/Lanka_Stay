import { Box, Button, IconButton, Rating, Stack, Typography } from "@mui/material";
import Image from "next/image";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import { useState } from "react";
import { useMutation, useReactiveVar } from "@apollo/client";
import { LIKE_COMMENT, DISLIKE_COMMENT } from "@/apollo/user/mutation";
import { userVar } from "@/apollo/store";
import { sweetMixinErrorAlert } from "../../../../sweetAlert";

interface TourReviewItemForMenuProps {
  comment: any;
  refetchComments?: () => void;
}

const TourReviewItemForMenu = ({
  comment,
  refetchComments,
}: TourReviewItemForMenuProps) => {
  const user = useReactiveVar(userVar);
  const [expanded, setExpanded] = useState(false);
  const [likes, setLikes] = useState(comment.commentLikes ?? 0);
  const [dislikes, setDislikes] = useState(comment.commentDislikes ?? 0);
  const [likedByMe, setLikedByMe] = useState(
    comment.likedBy?.includes(user?._id) ?? false
  );
  const [dislikedByMe, setDislikedByMe] = useState(
    comment.dislikedBy?.includes(user?._id) ?? false
  );

  const [likeComment] = useMutation(LIKE_COMMENT);
  const [dislikeComment] = useMutation(DISLIKE_COMMENT);

  const memberData = comment.memberData;
  const avatarUrl = memberData?.guestImage
    ? `${process.env.NEXT_PUBLIC_API_URL}/${memberData.guestImage}`
    : "/img/logo/uniface.jpg";

  const createdAt = comment.createdAt
    ? new Date(comment.createdAt).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "";

  const content = comment.commentContent ?? "";
  const isLong = content.length > 200;

  const handleLike = async () => {
    if (!user?._id) {
      await sweetMixinErrorAlert("Please login first");
      return;
    }
    try {
      const { data } = await likeComment({
        variables: { commentId: comment._id },
      });
      setLikes(data.likeComment.commentLikes);
      setDislikes(data.likeComment.commentDislikes);
      setLikedByMe(data.likeComment.likedBy?.includes(user._id));
      setDislikedByMe(data.likeComment.dislikedBy?.includes(user._id));
    } catch (err: any) {
      console.error(err);
    }
  };

  const handleDislike = async () => {
    if (!user?._id) {
      await sweetMixinErrorAlert("Please login first");
      return;
    }
    try {
      const { data } = await dislikeComment({
        variables: { commentId: comment._id },
      });
      setLikes(data.dislikeComment.commentLikes);
      setDislikes(data.dislikeComment.commentDislikes);
      setLikedByMe(data.dislikeComment.likedBy?.includes(user._id));
      setDislikedByMe(data.dislikeComment.dislikedBy?.includes(user._id));
    } catch (err: any) {
      console.error(err);
    }
  };

  return (
    <Stack
      width={"auto"}
      height={"auto"}
      gap={"10px"}
      p={2}
      py={3}
      mt={2}
      border={"1px solid"}
      borderColor={"divider"}
      borderRadius={3}
    >
      <Stack flexDirection={"row"} justifyContent={"space-between"}>
        <Stack flexDirection={"row"} gap={1.5} alignItems={"center"}>
          <Image
            src={avatarUrl}
            alt="user-image"
            width={40}
            height={40}
            style={{ objectFit: "cover", borderRadius: 200 }}
          />
          <Stack>
            <Typography fontWeight={700} fontSize={14}>
              {memberData?.guestName ?? "Guest"}
            </Typography>
            <Typography fontSize={12} color="text.secondary">
              {memberData?.guestCountry ?? ""}
            </Typography>
          </Stack>
        </Stack>
        <Rating
          name="read-only"
          value={comment.commentScore ?? 5}
          readOnly
          size="small"
        />
      </Stack>

      <Stack gap={1}>
        <Typography fontSize={14}>
          {isLong && !expanded ? content.slice(0, 200) + "..." : content}
        </Typography>
        {isLong && (
          <Button
            onClick={() => setExpanded(!expanded)}
            sx={{
              textTransform: "none",
              p: 0,
              minWidth: "auto",
              alignSelf: "flex-start",
              fontSize: 13,
            }}
          >
            {expanded ? "Show less" : "Read more"}
          </Button>
        )}

        <Stack
          flexDirection={"row"}
          gap={1}
          alignItems={"center"}
          mt={0.5}
        >
          <CalendarMonthIcon sx={{ fontSize: 16, color: "text.secondary" }} />
          <Typography fontSize={12} color="text.secondary">
            Posted {createdAt} on LankaStay.com
          </Typography>
        </Stack>

        {/* Like / Dislike */}
        <Stack flexDirection={"row"} gap={2} alignItems={"center"} mt={1}>
          <Stack flexDirection={"row"} alignItems={"center"} gap={0.5}>
            <IconButton size="small" onClick={handleLike}>
              {likedByMe ? (
                <ThumbUpIcon sx={{ fontSize: 18, color: "primary.main" }} />
              ) : (
                <ThumbUpOffAltIcon sx={{ fontSize: 18 }} />
              )}
            </IconButton>
            <Typography fontSize={13}>{likes}</Typography>
          </Stack>
          <Stack flexDirection={"row"} alignItems={"center"} gap={0.5}>
            <IconButton size="small" onClick={handleDislike}>
              {dislikedByMe ? (
                <ThumbDownAltIcon sx={{ fontSize: 18, color: "error.main" }} />
              ) : (
                <ThumbDownOffAltIcon sx={{ fontSize: 18 }} />
              )}
            </IconButton>
            <Typography fontSize={13}>{dislikes}</Typography>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default TourReviewItemForMenu;
