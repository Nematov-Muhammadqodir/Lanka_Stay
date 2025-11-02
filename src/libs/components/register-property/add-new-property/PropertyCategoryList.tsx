import React, { useState } from "react";
import { Button, Stack, Typography } from "@mui/material";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { useRouter } from "next/router";

const PropertyCategoryList = () => {
  const router = useRouter();
  const [category, setCategory] = useState("");
  const propertyCategories = [
    {
      type: "Hotel",
      describtion:
        "Accommodation for travellers often offering restaurants, meeting rooms and other guest services",
    },
    {
      type: "Guest house",
      describtion:
        "Private home with separate living facilities for host and guest",
    },
    {
      type: "Bed and breakfast",
      describtion: "Private home offering overnight stays and breakfast",
    },
    {
      type: "Homestay",
      describtion:
        "Private home with shared living facilities for host and guest",
    },
    {
      type: "Hostel",
      describtion:
        "Budget accommodation with mostly dorm-style bedding and a social atmosphere",
    },
    {
      type: "Aparthotel",
      describtion:
        "A self-catering apartment with some hotel facilities like a reception desk",
    },
    {
      type: "Capsule hotel",
      describtion:
        "Extremely small units or capsules offering cheap and basic overnight accommodation",
    },
    {
      type: "Country house",
      describtion: "Private home with simple accommodation in the countryside",
    },
    {
      type: "Farm stay",
      describtion: "Private farm with simple accommodation",
    },
    {
      type: "Inn",
      describtion: "Small and basic accommodation with a rustic feel",
    },
    {
      type: "Love hotel",
      describtion: "Adult-only accommodation rented per hour or night",
    },
    {
      type: "Motel",
      describtion:
        "Roadside hotel usually for motorists, with direct access to parking and little to no amenities",
    },
    {
      type: "Resort",
      describtion:
        "A place for relaxation with onsite restaurants, activities and often with a luxury feel",
    },
    {
      type: "Riad",
      describtion:
        "Traditional Moroccan accommodation with a courtyard and luxury feel",
    },
    {
      type: "Ryokan",
      describtion: "Traditional Japanese-style accommodation with meal options",
    },
    {
      type: "Lodge",
      describtion:
        "Private home with accommodation surrounded by nature, such as mountains or forest",
    },
  ];
  return (
    <Stack className="container">
      <Stack py={10} gap={5}>
        <Typography variant="h3" sx={{ fontWeight: 700 }}>
          From the list below, which property category is most similar to your
          place?
        </Typography>

        <Stack
          width={"100%"}
          sx={{
            backgroundColor: "white",
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 2,
            py: 6,
            px: 3,
            justifyContent: "center",
          }}
        >
          {propertyCategories.map((propertyCategory) => {
            return (
              <Button
                sx={{ textTransform: "capitalize" }}
                onClick={() => setCategory(propertyCategory.type)}
              >
                <Stack
                  sx={{
                    width: 305,
                    height: "auto",
                    border:
                      category === propertyCategory.type
                        ? "3px solid"
                        : "1px solid",
                    borderColor:
                      category === propertyCategory.type
                        ? "primary.main"
                        : "text.disabled",
                    borderRadius: 3,
                    p: 2,
                    textAlign: "left",
                    boxSizing: "border-box",
                  }}
                >
                  <Typography className="bold-text-medium">
                    {propertyCategory.type}
                  </Typography>
                  <Typography>{propertyCategory.describtion}</Typography>
                </Stack>
              </Button>
            );
          })}
        </Stack>

        <Stack
          flexDirection={"row"}
          width={"100%"}
          justifyContent={"space-between"}
        >
          <Button
            variant="outlined"
            sx={{ height: 50, width: "20%" }}
            onClick={() => router.push("/register-property/create-account")}
          >
            <KeyboardArrowLeftIcon />
          </Button>
          <Button
            variant="contained"
            sx={{
              height: 50,
              width: "79%",
              fontWeight: 700,
              textTransform: "capitalize",
              fontSize: 20,
              color: "white",
            }}
          >
            Continue
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default PropertyCategoryList;
