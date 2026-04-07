import {
  filterSliceValue,
  setDates,
  setAdults,
  setChildren,
  setLocation,
  setPage,
  setLimit,
  setPropertyCity,
  setPropertyType,
  setPropertyStars,
  setBreakfastIncluded,
  setParkingIncluded,
  setAllowChildren,
  setAllowPets,
  setPriceMin,
  setPriceMax,
} from "@/src/slices/filteringSlice";
import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Stack,
  Typography,
} from "@mui/material";
import Slider from "@mui/material/Slider";
import React from "react";
import { useTranslation } from "next-i18next";
import { useDispatch, useSelector } from "react-redux";

const MAX = 400000;
const MIN = 30000;

const Filter = () => {
  const { t } = useTranslation("common");
  const filterSliceInput = useSelector(filterSliceValue);
  const [priceRange, setPriceRange] = React.useState<number[]>([MIN, MAX]);
  const dispatch = useDispatch();

  const handlePriceChange = (_: any, newValue: number | number[]) => {
    const val = newValue as number[];
    setPriceRange(val);
    dispatch(setPriceMin(val[0] > MIN ? val[0] : undefined));
    dispatch(setPriceMax(val[1] < MAX ? val[1] : undefined));
  };
  return (
    <Stack width={"100%"}>
      <Stack>
        <Box width={"100%"} height={200} borderRadius={4}>
          <iframe
            width="100%"
            height="180"
            style={{ border: 0, borderRadius: 7 }}
            loading="lazy"
            src="https://www.openstreetmap.org/export/embed.html?bbox=126.563%2C33.247%2C126.580%2C33.256&layer=mapnik"
          ></iframe>
        </Box>
      </Stack>
      <Stack
        border={"1px solid"}
        borderColor={"text.disabled"}
        borderRadius={2}
        alignItems={"center"}
        gap={1}
      >
        <Box pt={1} pl={1} alignSelf={"start"} justifyContent={"center"}>
          <Typography className="bold-text-medium" alignSelf={"start"}>
            {t("filter.filterBy")}
          </Typography>
        </Box>
        <Box
          border={"1px solid"}
          width={"100%"}
          borderColor={"text.disabled"}
        ></Box>
        <Stack gap={1}>
          <Typography className="small-bold-text">
            {t("filter.yourBudget")}
          </Typography>
          <Stack flexDirection={"row"} justifyContent={"space-around"}>
            <Typography fontSize={13}>
              ₩{priceRange[0].toLocaleString()}
            </Typography>
            <Typography fontSize={13}>-</Typography>
            <Typography fontSize={13}>
              ₩{priceRange[1].toLocaleString()}
              {priceRange[1] >= MAX ? "+" : ""}
            </Typography>
          </Stack>
          <Box sx={{ width: 270 }}>
            <Slider
              value={priceRange}
              valueLabelDisplay="auto"
              min={MIN}
              max={MAX}
              step={10000}
              onChange={handlePriceChange}
            />
          </Box>
        </Stack>

        <Box
          border={"1px solid"}
          width={"100%"}
          borderColor={"secondary.main"}
        ></Box>

        <Stack gap={1} py={1} px={2} sx={{ width: "100%" }}>
          <Typography className="small-bold-text">{t("filter.popularFilters")}</Typography>
          <FormGroup>
            {[
              { value: "Hotel", labelKey: "filter.propertyHotel" },
              { value: "Guest House", labelKey: "filter.propertyGuestHouse" },
              { value: "Bed and Breakfast", labelKey: "filter.propertyBnB" },
              { value: "Homestay", labelKey: "filter.propertyHomestay" },
              { value: "Hostel", labelKey: "filter.propertyHostel" },
              { value: "Aparthotel", labelKey: "filter.propertyAparthotel" },
              { value: "Capsule Hotel", labelKey: "filter.propertyCapsuleHotel" },
              { value: "Country House", labelKey: "filter.propertyCountryHouse" },
              { value: "Farm Stay", labelKey: "filter.propertyFarmStay" },
              { value: "Inn", labelKey: "filter.propertyInn" },
              { value: "Love Hotel", labelKey: "filter.propertyLoveHotel" },
              { value: "Motel", labelKey: "filter.propertyMotel" },
              { value: "Riad", labelKey: "filter.propertyRiad" },
              { value: "Ryokan", labelKey: "filter.propertyRyokan" },
              { value: "Lodge", labelKey: "filter.propertyLodge" },
            ].map((type) => (
              <FormControlLabel
                key={type.value}
                control={
                  <Checkbox
                    checked={
                      filterSliceInput.propertyType?.includes(type.value) || false
                    }
                    onChange={() => dispatch(setPropertyType(type.value))}
                  />
                }
                label={t(type.labelKey)}
              />
            ))}
          </FormGroup>
        </Stack>

        <Box
          border={"1px solid"}
          width={"100%"}
          borderColor={"secondary.main"}
        ></Box>

        <Stack gap={1} py={1} px={2} sx={{ width: "100%" }}>
          <Typography className="small-bold-text">{t("filter.reviewScore")}</Typography>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox />}
              label={`${t("hotel.superb")}: 9+`}
              value={"9"}
              onChange={(e: any) => {
                console.log("e", e.target.value);
              }}
            />
            <FormControlLabel
              control={<Checkbox />}
              label={`${t("hotel.veryGood")}: 8+`}
              value={"8"}
              onChange={(e: any) => {
                console.log("e", e.target.value);
              }}
            />
            <FormControlLabel
              value={"7"}
              control={<Checkbox />}
              label={`${t("hotel.good")}: 7+`}
              onChange={(e: any) => {
                console.log("e", e.target.value);
              }}
            />
            <FormControlLabel
              value={"6"}
              control={<Checkbox />}
              label={`${t("hotel.pleasant")}: 6+`}
              onChange={(e: any) => {
                console.log("e", e.target.value);
              }}
            />
          </FormGroup>
        </Stack>

        <Box
          border={"1px solid"}
          width={"100%"}
          borderColor={"secondary.main"}
        ></Box>

        <Stack gap={1} py={1} px={2} sx={{ width: "100%" }}>
          <Typography className="small-bold-text">{t("filter.beachAccess")}</Typography>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox />}
              label={t("filter.beachFront")}
              value={true}
              onChange={(e: any) => {
                console.log("e", e.target.value);
              }}
            />
          </FormGroup>
        </Stack>

        <Box
          border={"1px solid"}
          width={"100%"}
          borderColor={"secondary.main"}
        ></Box>

        <Stack gap={1} py={1} px={2} sx={{ width: "100%" }}>
          <Stack>
            <Typography className="small-bold-text">
              {t("filter.highlyRated")}
            </Typography>
            <Typography className="small-text">
              {t("Based on guest reviews")}
            </Typography>
          </Stack>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={filterSliceInput.breakfastIncluded || false}
                  onChange={(e) =>
                    dispatch(setBreakfastIncluded(e.target.checked))
                  }
                />
              }
              label={t("filter.tastyBreakfast")}
            />
          </FormGroup>
        </Stack>

        <Box
          border={"1px solid"}
          width={"100%"}
          borderColor={"secondary.main"}
        ></Box>

        <Stack gap={1} py={1} px={2} sx={{ width: "100%" }}>
          <Typography className="small-bold-text">{t("filter.travelGroup")}</Typography>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={filterSliceInput.allowPets || false}
                  onChange={(e) => dispatch(setAllowPets(e.target.checked))}
                />
              }
              label={t("filter.petsAllowed")}
              value={true}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={!filterSliceInput.allowChildren}
                  onChange={(e) =>
                    dispatch(setAllowChildren(!e.target.checked))
                  }
                />
              }
              label={t("filter.adultsOnly")}
              value={true}
            />
          </FormGroup>
        </Stack>

        <Box
          border={"1px solid"}
          width={"100%"}
          borderColor={"secondary.main"}
        ></Box>

        <Stack gap={1} py={1} px={2} sx={{ width: "100%" }}>
          <Typography className="small-bold-text">{t("Brands")}</Typography>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox />}
              label="L7 Hotels"
              value={"L7 Hotels"}
              onChange={(e: any) => {
                console.log("e", e.target.value);
              }}
            />
            <FormControlLabel
              control={<Checkbox />}
              label="Signiel"
              value={"Signiel"}
              onChange={(e: any) => {
                console.log("e", e.target.value);
              }}
            />
          </FormGroup>
        </Stack>

        <Box
          border={"1px solid"}
          width={"100%"}
          borderColor={"secondary.main"}
        ></Box>

        <Stack gap={1} py={1} px={2} sx={{ width: "100%" }}>
          <Typography className="small-bold-text">{t("filter.facilities")}</Typography>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={filterSliceInput.parkingIncluded || false}
                  onChange={(e) =>
                    dispatch(setParkingIncluded(e.target.checked))
                  }
                />
              }
              label={t("filter.parking")}
            />
            <FormControlLabel
              control={<Checkbox />}
              label={t("filter.restaurant")}
              value={true}
              onChange={(e: any) => {
                console.log("e", e.target.value);
              }}
            />
            <FormControlLabel
              control={<Checkbox />}
              label={t("filter.roomService")}
              value={true}
              onChange={(e: any) => {
                console.log("e", e.target.value);
              }}
            />
            <FormControlLabel
              control={<Checkbox />}
              label={t("filter.frontDesk")}
              value={true}
              onChange={(e: any) => {
                console.log("e", e.target.value);
              }}
            />
            <FormControlLabel
              control={<Checkbox />}
              label={t("filter.fitnessCenter")}
              value={true}
              onChange={(e: any) => {
                console.log("e", e.target.value);
              }}
            />
            <FormControlLabel
              control={<Checkbox />}
              label={t("filter.airportShuttle")}
              value={true}
              onChange={(e: any) => {
                console.log("e", e.target.value);
              }}
            />
            <FormControlLabel
              control={<Checkbox />}
              label={t("filter.hotTub")}
              value={true}
              onChange={(e: any) => {
                console.log("e", e.target.value);
              }}
            />
          </FormGroup>
        </Stack>

        <Box
          border={"1px solid"}
          width={"100%"}
          borderColor={"secondary.main"}
        ></Box>

        <Stack gap={1} py={1} px={2} sx={{ width: "100%" }}>
          <Typography className="small-bold-text">
            {t("filter.swimmingPoolType")}
          </Typography>
          <FormGroup>
            <FormControlLabel control={<Checkbox />} label={t("filter.swimmingPool")} />
            <FormControlLabel control={<Checkbox />} label={t("filter.heatedPool")} />
            <FormControlLabel control={<Checkbox />} label={t("filter.indoorPool")} />
            <FormControlLabel control={<Checkbox />} label={t("filter.outdoorPool")} />
            <FormControlLabel control={<Checkbox />} label={t("filter.privatePool")} />
            <FormControlLabel control={<Checkbox />} label={t("filter.infinityPool")} />
          </FormGroup>
        </Stack>

        <Box
          border={"1px solid"}
          width={"100%"}
          borderColor={"secondary.main"}
        ></Box>

        <Stack gap={1} py={1} px={2} sx={{ width: "100%" }}>
          <Typography className="small-bold-text">{t("filter.meals")}</Typography>
          <FormGroup>
            <FormControlLabel control={<Checkbox />} label={t("filter.selfCatering")} />
            <FormControlLabel control={<Checkbox />} label={t("filter.breakfastIncluded")} />
          </FormGroup>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Filter;
