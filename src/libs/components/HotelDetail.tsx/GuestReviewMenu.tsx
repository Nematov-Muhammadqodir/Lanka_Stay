import { Box, Button, Stack, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import InfoIcon from "@mui/icons-material/Info";
import GuestReviewsForMenu from "./GuestReviewsForMenu";

const GuestReviewMenu = () => {
  return (
    <Stack
      height={"100vh"}
      width={900}
      border={"1px solid black"}
      alignSelf={"flex-end"}
      sx={{ borderTopLeftRadius: 20, borderBottomLeftRadius: 20, p: 2 }}
    >
      <Stack gap={1}>
        <Stack
          flexDirection={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
          mb={5}
        >
          <Typography className="bold-text">
            Guest reviews for The Grand Sumorum
          </Typography>
          <Button>
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
              8.9
            </Box>
            <Stack>
              <Typography className="small-bold-text">Fabulous</Typography>
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
        <Stack borderBottom={"1px solid"} pb={3} borderColor={"text"}>
          <GuestReviewsForMenu />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default GuestReviewMenu;
