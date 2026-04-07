import {
  Box,
  Button,
  Stack,
  Typography,
  TextField,
  colors,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import InfoIcon from "@mui/icons-material/Info";
import { useTranslation } from "next-i18next";
import GuestReviewsForMenu from "./GuestReviewsForMenu";
import GuestReviewListForMenu from "./GuestReviewListForMenu";
import React from "react";
import { HotelReviewsProps } from "@/src/pages/hotels/hotelDetail/[id]";
import { CREATE_COMMENT } from "@/apollo/user/mutation";
import { GET_COMMENTS } from "@/apollo/user/query";
import { useMutation } from "@apollo/client";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { sweetBasicAlert, sweetTopSuccessAlert } from "../../sweetAlert";
import { useRouter } from "next/router";

export const WriteReviewMenu = ({
  open,
  onClose,
  onSubmit,
}: {
  open: boolean;
  onClose: () => void;
  onSubmit: (value: string) => void;
}) => {
  const [text, setText] = React.useState("");
  const { t } = useTranslation("common");
  const router = useRouter();

  const [createComment] = useMutation(CREATE_COMMENT);
  const id = useSelector((state: RootState) => state.partnerProperty.data?._id);
  console.log("id in WriteReviewMenu:", id);

  const handleCreateComment = async () => {
    try {
      const { data } = await createComment({
        variables: {
          input: {
            commentContent: text,
            commentRefId: id,
          },
        },
        refetchQueries: [
          {
            query: GET_COMMENTS,
            variables: {
              input: {
                page: 1,
                limit: 6,
                direction: "DESC",
                search: { commentRefId: id },
              },
            },
          },
        ],
        awaitRefetchQueries: true,
      });

      console.log("Writing comment success:", data);
      if (data) {
        sweetTopSuccessAlert("Commenting completed successfully!");
        // router.push(`/myPage/${user._id}/reservations`);
      }
    } catch (error: any) {
      console.error("Writing comment error:", error);

      // If GraphQL validation error:
      if (error.graphQLErrors?.length) {
        sweetBasicAlert(error.graphQLErrors[0].message);
      }
      // If network/server error:
      else if (error.networkError) {
        alert("Server error — please try again.");
      } else {
        alert("Something went wrong.");
      }
    }
  };

  if (!open) return null;

  return (
    <Stack
      position="fixed"
      right={0}
      top={0}
      height="100vh"
      width={500}
      p={3}
      bgcolor="white"
      boxShadow={4}
      zIndex={2000}
      spacing={3}
    >
      <Stack direction="row" justifyContent="space-between">
        <Typography sx={{ fontSize: 20, fontWeight: 700 }}>
          {t("hotel.writeReview")}
        </Typography>
        <Button onClick={onClose}>
          <CloseIcon />
        </Button>
      </Stack>

      <TextField
        label={t("hotel.yourReview")}
        multiline
        rows={2}
        fullWidth
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <Button
        variant="contained"
        fullWidth
        sx={{ fontWeight: 700, color: colors.common.white }}
        onClick={async () => {
          await handleCreateComment();
          onSubmit(text);
          setText("");
        }}
        disabled={!text.trim()}
      >
        {t("hotel.submitComment")}
      </Button>
    </Stack>
  );
};
