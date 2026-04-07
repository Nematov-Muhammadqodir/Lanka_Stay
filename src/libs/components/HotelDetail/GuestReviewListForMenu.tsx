import { Button, Menu, MenuItem, Stack, Typography } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useState } from "react";
import { useTranslation } from "next-i18next";
import GuestReviewItemMenu from "./GuestReviewItemMenu";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { GET_COMMENTS } from "@/apollo/user/query";
import { useQuery } from "@apollo/client";
import { setComments } from "@/src/slices/commentSlice";

interface SortOption {
  labelKey: string;
  sort: string;
  direction: "ASC" | "DESC";
}

const sortOptions: SortOption[] = [
  { labelKey: "hotel.newestFirst", sort: "createdAt", direction: "DESC" },
  { labelKey: "hotel.oldestFirst", sort: "createdAt", direction: "ASC" },
  { labelKey: "hotel.highestScore", sort: "commentScore", direction: "DESC" },
  { labelKey: "hotel.lowestScore", sort: "commentScore", direction: "ASC" },
];

const GuestReviewListForMenu = () => {
  const { t } = useTranslation("common");
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedSort, setSelectedSort] = useState<SortOption>(sortOptions[0]);
  const open = Boolean(anchorEl);

  const id = useSelector((state: RootState) => state.partnerProperty.data?._id);
  const reviews = useSelector((state: RootState) => state.comments.data?.list);

  const { refetch } = useQuery(GET_COMMENTS, {
    variables: {
      input: {
        page: 1,
        limit: 100,
        sort: selectedSort.sort,
        direction: selectedSort.direction,
        search: { commentRefId: id },
      },
    },
    skip: !id,
    onCompleted: (data) => {
      if (data?.getComments) {
        dispatch(setComments(data.getComments));
      }
    },
  });

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSortSelect = (option: SortOption) => {
    setSelectedSort(option);
    refetch({
      input: {
        page: 1,
        limit: 100,
        sort: option.sort,
        direction: option.direction,
        search: { commentRefId: id },
      },
    });
    handleClose();
  };

  return (
    <Stack mt={2}>
      <Stack
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography sx={{ fontWeight: 700, fontSize: 20 }}>
          {t("hotel.guestReviews")}
        </Typography>
        <Stack flexDirection="row" gap={1} alignItems="center">
          <Typography className="small-bold-text">{t("hotel.sortReviewsBy")}</Typography>
          <Button
            variant="outlined"
            sx={{ borderColor: "text.primary" }}
            onClick={handleClick}
          >
            <Stack flexDirection="row" gap={1}>
              <Typography textTransform="capitalize">
                {t(selectedSort.labelKey)}
              </Typography>
              <KeyboardArrowDownIcon />
            </Stack>
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            slotProps={{
              paper: {
                elevation: 0,
                sx: {
                  overflow: "visible",
                  mt: 1.5,
                  borderRadius: 1,
                  border: "1px solid #ddd",
                  boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
                  "& .MuiMenuItem-root": {
                    fontSize: 14,
                    color: "#333",
                    "&:hover": { backgroundColor: "#f5f5f5" },
                  },
                },
              },
            }}
          >
            {sortOptions.map((option) => (
              <MenuItem
                key={`${option.sort}-${option.direction}`}
                onClick={() => handleSortSelect(option)}
                selected={
                  option.sort === selectedSort.sort &&
                  option.direction === selectedSort.direction
                }
              >
                {t(option.labelKey)}
              </MenuItem>
            ))}
          </Menu>
        </Stack>
      </Stack>
      <Stack>
        {reviews?.map((review: any) => (
          <GuestReviewItemMenu key={review._id} comment={review} />
        ))}
      </Stack>
    </Stack>
  );
};

export default GuestReviewListForMenu;
