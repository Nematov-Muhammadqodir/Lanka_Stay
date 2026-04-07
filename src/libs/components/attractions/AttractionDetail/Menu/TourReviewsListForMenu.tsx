import {
  Button,
  CircularProgress,
  Menu,
  MenuItem,
  Pagination,
  Stack,
  Typography,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useEffect, useState } from "react";
import TourReviewItemForMenu from "./TourReviewItemForMenu";
import { useQuery } from "@apollo/client";
import { GET_COMMENTS } from "@/apollo/user/query";
import { useTranslation } from "next-i18next";

interface TourReviewListForMenuProps {
  attractionId?: string;
  onCommentsLoaded?: (comments: any[]) => void;
}

const TourReviewListForMenu = ({
  attractionId,
  onCommentsLoaded,
}: TourReviewListForMenuProps) => {
  const { t } = useTranslation("common");

  const SORT_OPTIONS = [
    { label: t("attraction.newestFirst"), sort: "createdAt", direction: "DESC" },
    { label: t("attraction.oldestFirst"), sort: "createdAt", direction: "ASC" },
    { label: t("attraction.highestScore"), sort: "commentScore", direction: "DESC" },
    { label: t("attraction.lowestScore"), sort: "commentScore", direction: "ASC" },
  ];

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [selectedSort, setSelectedSort] = useState(SORT_OPTIONS[0]);
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, loading, refetch } = useQuery(GET_COMMENTS, {
    variables: {
      input: {
        page,
        limit,
        sort: selectedSort.sort,
        direction: selectedSort.direction,
        search: { commentRefId: attractionId },
      },
    },
    skip: !attractionId,
    fetchPolicy: "network-only",
  });

  const comments = data?.getComments?.list ?? [];
  const total = data?.getComments?.metaCounter?.[0]?.total ?? 0;
  const totalPages = Math.max(1, Math.ceil(total / limit));

  useEffect(() => {
    if (onCommentsLoaded && comments.length >= 0) {
      onCommentsLoaded(comments);
    }
  }, [comments]);

  const handleSortSelect = (option: (typeof SORT_OPTIONS)[number]) => {
    setSelectedSort(option);
    setAnchorEl(null);
    setPage(1);
  };

  if (loading) {
    return (
      <Stack alignItems="center" py={4}>
        <CircularProgress size={30} />
      </Stack>
    );
  }

  return (
    <Stack>
      {/* Sort */}
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
        <Typography fontWeight={600} fontSize={14}>
          {total} {total === 1 ? t("attraction.review") : t("attraction.reviews")}
        </Typography>
        <Button
          onClick={(e) => setAnchorEl(e.currentTarget)}
          endIcon={<KeyboardArrowDownIcon />}
          sx={{ textTransform: "none", fontWeight: 600 }}
        >
          {selectedSort.label}
        </Button>
        <Menu anchorEl={anchorEl} open={open} onClose={() => setAnchorEl(null)}>
          {SORT_OPTIONS.map((option) => (
            <MenuItem
              key={option.label}
              selected={option.label === selectedSort.label}
              onClick={() => handleSortSelect(option)}
            >
              {option.label}
            </MenuItem>
          ))}
        </Menu>
      </Stack>

      {/* Reviews */}
      <Stack>
        {comments.length === 0 ? (
          <Typography color="text.secondary" textAlign="center" py={4}>
            {t("attraction.noReviewsYet")}
          </Typography>
        ) : (
          comments.map((comment: any) => (
            <TourReviewItemForMenu
              key={comment._id}
              comment={comment}
              refetchComments={refetch}
            />
          ))
        )}
      </Stack>

      {/* Pagination */}
      {totalPages > 1 && (
        <Stack mt={2} alignItems={"center"}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={(_, v) => setPage(v)}
            variant="outlined"
            shape="rounded"
          />
        </Stack>
      )}
    </Stack>
  );
};

export default TourReviewListForMenu;
