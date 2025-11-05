import React from "react";
import withLayoutCreateAccountMain from "@/src/libs/components/layout/registerProperty/create-account/CreateAccountMainLayout";
import { Button, Stack, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { useRouter } from "next/router";

const PropertyDetailsComplete = () => {
  const router = useRouter();
  return (
    <Stack sx={{ backgroundColor: "#FAF8FA", height: "87vh" }}>
      <Stack className="container">
        <Stack width={"100%"} alignItems={"center"} gap={4} mt={10}>
          <Stack
            width={800}
            height={100}
            border={"1px solid black"}
            sx={{ flexDirection: "row", backgroundColor: "white" }}
            alignItems={"center"}
            p={2}
            gap={1.5}
            borderRadius={2}
            borderColor={"#E7E7E7"}
          >
            <CheckCircleIcon sx={{ fontSize: 50, color: "#018233" }} />
            <Stack>
              <Typography className="small-text">Step 1</Typography>
              <Typography className="bold-text-medium">
                Property details
              </Typography>
              <Typography className="small-text">
                The basics. Add your property name, address, facilities and
                more.
              </Typography>
            </Stack>
          </Stack>

          <Stack
            width={800}
            height={100}
            border={"1px solid black"}
            sx={{ flexDirection: "row", backgroundColor: "white" }}
            alignItems={"center"}
            p={2}
            gap={1.5}
            borderRadius={2}
            borderColor={"#E7E7E7"}
            justifyContent={"space-between"}
          >
            <Stack flexDirection={"row"} alignItems={"center"} gap={1.5}>
              <AddBusinessIcon sx={{ fontSize: 50 }} />
              <Stack>
                <Typography className="small-text">Step 2</Typography>
                <Typography className="bold-text-medium">Rooms</Typography>
                <Typography className="small-text">
                  Tell us about your first room. Once you’ve set one up you can
                  add more.
                </Typography>
              </Stack>
            </Stack>
            <Button
              variant="contained"
              sx={{
                textTransform: "capitalize",
                height: 40,
                borderWidth: 2,
                color: "white",
                fontWeight: 700,
              }}
              onClick={() =>
                router.push(
                  "/register-property/add-new-property/add-property-rooms/room-details"
                )
              }
            >
              Add room
            </Button>
          </Stack>

          <Stack
            width={800}
            height={100}
            border={"1px solid black"}
            sx={{
              flexDirection: "row",
              backgroundColor: "white",
              justifyContent: "space-between",
            }}
            alignItems={"center"}
            p={2}
            gap={1.5}
            borderRadius={2}
            borderColor={"#E7E7E7"}
          >
            <Stack flexDirection={"row"} alignItems={"center"} gap={1.5}>
              <AddAPhotoIcon sx={{ fontSize: 50 }} />
              <Stack>
                <Typography className="small-text">Step 3</Typography>
                <Typography className="bold-text-medium">Photos</Typography>
                <Typography className="small-text">
                  Share some photos of your property so guests know what to
                  expect.
                </Typography>
              </Stack>
            </Stack>
            <Button
              variant="outlined"
              sx={{
                textTransform: "capitalize",
                height: 40,
                borderColor: "primary.main",
                borderWidth: 2,
                color: "primary.main",
                fontWeight: 700,
              }}
            >
              Add photos
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default withLayoutCreateAccountMain(PropertyDetailsComplete);
