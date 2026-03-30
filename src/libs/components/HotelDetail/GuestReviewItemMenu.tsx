import { Box, Button, Stack, Typography } from "@mui/material";
import Image from "next/image";
import BedIcon from "@mui/icons-material/Bed";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PersonIcon from "@mui/icons-material/Person";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { useState } from "react";
import { Comment } from "../../types/comment/comment";
import { formatShortDate } from "../../utils";

interface GuestReviewItemMenuProps {
  comment: Comment;
}

const GuestReviewItemMenu = (props: GuestReviewItemMenuProps) => {
  const { comment } = props;
  const [expanded, setExpanded] = useState(false);
  const MAX_LENGTH = 250;

  // Safe nights calculation
  const startRaw = comment?.reservationData?.startDate;
  const endRaw = comment?.reservationData?.endDate;
  const start = startRaw ? new Date(startRaw) : null;
  const end = endRaw ? new Date(endRaw) : null;
  const hasValidDates =
    start && end && !isNaN(start.getTime()) && !isNaN(end.getTime());
  const nights = hasValidDates
    ? Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
    : null;

  // Guest image
  const guestImage = comment?.memberData?.guestImage
    ? `${process.env.NEXT_PUBLIC_API_URL}/${comment.memberData.guestImage}`
    : "/img/Villa.jpg";

  // Guest type
  const guestType = comment?.memberData?.guestType;
  const guestTypeLabel = guestType
    ? guestType.charAt(0).toUpperCase() + guestType.slice(1).toLowerCase()
    : null;

  return (
    <Stack
      width="auto"
      height="auto"
      flexDirection="row"
      gap="10px"
      p={1}
      pb={2}
      mt={3}
      borderBottom="1px solid"
      borderColor="divider"
    >
      {/* Left: user info */}
      <Stack width={215} gap={2}>
        <Stack flexDirection="row" gap={1} alignItems="center">
          <Image
            src={guestImage}
            alt="user-image"
            width={40}
            height={40}
            style={{ objectFit: "cover", borderRadius: 200 }}
          />
          <Stack>
            <Typography fontWeight={700}>
              {comment?.memberData?.guestName ?? "Guest"}
            </Typography>
            <Typography className="small-text" color="text.secondary">
              {comment?.memberData?.guestCountry ?? ""}
            </Typography>
          </Stack>
        </Stack>
        <Stack gap={1}>
          {comment?.roomData?.roomType && (
            <Stack flexDirection="row" gap={1} alignItems="center">
              <BedIcon sx={{ fontSize: 20, color: "text.secondary" }} />
              <Typography className="small-text">
                {comment.roomData.roomType}
              </Typography>
            </Stack>
          )}
          {hasValidDates && (
            <Stack flexDirection="row" gap={1} alignItems="center">
              <CalendarMonthIcon
                sx={{ fontSize: 20, color: "text.secondary" }}
              />
              <Typography className="small-text">
                {nights} {nights === 1 ? "night" : "nights"} &middot;{" "}
                {formatShortDate(endRaw!)}
              </Typography>
            </Stack>
          )}
          {guestTypeLabel && (
            <Stack flexDirection="row" gap={1} alignItems="center">
              <PersonIcon sx={{ fontSize: 20, color: "text.secondary" }} />
              <Typography className="small-text">{guestTypeLabel}</Typography>
            </Stack>
          )}
        </Stack>
      </Stack>

      {/* Right: review content */}
      <Stack flex={1} px={2} gap={1} pb={2}>
        <Stack
          flexDirection="row"
          p={1}
          justifyContent="space-between"
          alignItems="center"
        >
          <Stack>
            <Typography className="small-text" color="text.secondary">
              Reviewed: {formatShortDate(comment.createdAt)}
            </Typography>
          </Stack>
        </Stack>
        <Stack flexDirection="row" alignItems="flex-start" gap={1}>
          <SentimentSatisfiedAltIcon
            sx={{ fontSize: 20, color: "success.main", mt: "2px", flexShrink: 0 }}
          />
          <Stack>
            <Typography
              fontSize={14}
              lineHeight={1.6}
              sx={{ wordBreak: "break-word" }}
            >
              {expanded || (comment?.commentContent?.length ?? 0) <= MAX_LENGTH
                ? comment?.commentContent
                : `${comment?.commentContent?.slice(0, MAX_LENGTH)}...`}
            </Typography>
            {(comment?.commentContent?.length ?? 0) > MAX_LENGTH && (
              <Button
                onClick={() => setExpanded(!expanded)}
                sx={{
                  textTransform: "none",
                  color: "primary.main",
                  p: 0,
                  minWidth: "auto",
                  justifyContent: "flex-start",
                  fontWeight: 600,
                  fontSize: 13,
                  mt: 0.5,
                }}
                endIcon={expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              >
                {expanded ? "Show less" : "Read more"}
              </Button>
            )}
          </Stack>
        </Stack>

        {/* Actions */}
        <Stack
          flexDirection="row"
          gap={2}
          mt={2}
          justifyContent="flex-end"
          color="text.secondary"
        >
          <Stack
            flexDirection="row"
            gap={0.5}
            alignItems="center"
            sx={{ cursor: "pointer", "&:hover": { color: "primary.main" } }}
          >
            <ThumbUpOffAltIcon fontSize="small" />
            <Typography fontSize={13}>Helpful</Typography>
          </Stack>
          <Stack
            flexDirection="row"
            gap={0.5}
            alignItems="center"
            sx={{ cursor: "pointer", "&:hover": { color: "error.main" } }}
          >
            <ThumbDownOffAltIcon fontSize="small" />
            <Typography fontSize={13}>Not helpful</Typography>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default GuestReviewItemMenu;
