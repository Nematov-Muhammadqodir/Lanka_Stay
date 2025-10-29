import React from "react";
import withLayoutAttractionsReserve from "@/src/libs/components/layout/attractions/AttractionReserveLayout";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import Image from "next/image";

const MyAccount = () => {
  return (
    <Stack className="container" alignItems={"center"}>
      <Stack px={10} py={5} width={900} mb={10}>
        <Stack
          flexDirection={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
          borderBottom={"1px solid"}
          pb={2}
          borderColor={"text.disabled"}
        >
          <Stack>
            <Typography variant="h3" fontWeight={699}>
              Personal details
            </Typography>
            <Typography variant="h6">
              Update your information and find out how it's used.
            </Typography>
          </Stack>
          <Image
            src="/img/logo/uniface.jpg"
            alt="user-image"
            width={70}
            height={70}
            style={{
              borderRadius: "50%",
              border: "2px solid",
              borderColor: "#FFB700",
            }}
          />
        </Stack>
        <Stack mt={1} px={2}>
          <Grid
            container
            spacing={2}
            borderBottom={"1px solid"}
            pb={2}
            borderColor={"text.disabled"}
            mt={1}
          >
            <Grid item xs={4}>
              <Typography className="bold-text-medium">Name</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography>Muhammadqodir Nematov</Typography>
            </Grid>
            <Grid item xs={2} textAlign="right">
              <Button>
                <Typography
                  className="bold-text-medium"
                  sx={{ color: "primary.main", textTransform: "capitalize" }}
                >
                  Edit
                </Typography>
              </Button>
            </Grid>
          </Grid>

          <Grid
            container
            spacing={2}
            borderBottom={"1px solid"}
            pb={2}
            borderColor={"text.disabled"}
            mt={1}
          >
            <Grid item xs={4}>
              <Typography className="bold-text-medium">
                Email address
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography>nematovmuhammadqodir68@gmail.com</Typography>
            </Grid>
            <Grid item xs={2} textAlign="right">
              <Button>
                <Typography
                  className="bold-text-medium"
                  sx={{ color: "primary.main", textTransform: "capitalize" }}
                >
                  Edit
                </Typography>
              </Button>
            </Grid>
          </Grid>

          <Grid
            container
            spacing={2}
            borderBottom={"1px solid"}
            pb={2}
            borderColor={"text.disabled"}
            mt={1}
          >
            <Grid item xs={4}>
              <Typography className="bold-text-medium">Phone number</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography>Add your phone number</Typography>
              <Typography className="small-text" color={"primary.main"}>
                Properties or attractions you book will use this number if they
                need to contact you.
              </Typography>
            </Grid>
            <Grid item xs={2} textAlign="right">
              <Button>
                <Typography
                  className="bold-text-medium"
                  sx={{ color: "primary.main", textTransform: "capitalize" }}
                >
                  Edit
                </Typography>
              </Button>
            </Grid>
          </Grid>

          <Grid
            container
            spacing={2}
            borderBottom={"1px solid"}
            pb={2}
            borderColor={"text.disabled"}
            mt={1}
          >
            <Grid item xs={4}>
              <Typography className="bold-text-medium">
                Date of birth
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography>Enter your date of birth</Typography>
            </Grid>
            <Grid item xs={2} textAlign="right">
              <Button>
                <Typography
                  className="bold-text-medium"
                  sx={{ color: "primary.main", textTransform: "capitalize" }}
                >
                  Edit
                </Typography>
              </Button>
            </Grid>
          </Grid>

          <Grid
            container
            spacing={2}
            borderBottom={"1px solid"}
            pb={2}
            borderColor={"text.disabled"}
            mt={1}
          >
            <Grid item xs={4}>
              <Typography className="bold-text-medium">Nationality</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography>Select the country/region you're from</Typography>
            </Grid>
            <Grid item xs={2} textAlign="right">
              <Button>
                <Typography
                  className="bold-text-medium"
                  sx={{ color: "primary.main", textTransform: "capitalize" }}
                >
                  Edit
                </Typography>
              </Button>
            </Grid>
          </Grid>

          <Grid
            container
            spacing={2}
            borderBottom={"1px solid"}
            pb={2}
            borderColor={"text.disabled"}
            mt={1}
          >
            <Grid item xs={4}>
              <Typography className="bold-text-medium">Gender</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography>Select your gender</Typography>
            </Grid>
            <Grid item xs={2} textAlign="right">
              <Button>
                <Typography
                  className="bold-text-medium"
                  sx={{ color: "primary.main", textTransform: "capitalize" }}
                >
                  Edit
                </Typography>
              </Button>
            </Grid>
          </Grid>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default withLayoutAttractionsReserve(MyAccount);
