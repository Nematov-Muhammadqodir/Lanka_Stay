import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import TimelapseIcon from "@mui/icons-material/Timelapse";
import CloseIcon from "@mui/icons-material/Close";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CustomMap from "../../HotelDetail/CustomMap";
import { Attraction } from "../../../types/attraction/attraction";
import { useTranslation } from "next-i18next";

interface TourHighlightsProps {
  attraction?: Attraction | null;
}

const TourHighlights = ({ attraction }: TourHighlightsProps) => {
  const { t } = useTranslation("common");
  return (
    <Stack gap={2}>
      {attraction?.freeCancellation && (
        <Stack flexDirection={"row"} alignItems={"center"} gap={1}>
          <CheckIcon sx={{ color: "#018233" }} />
          <Stack>
            <Typography className="bold-text-medium" color={"#018233"}>
              {t("attraction.freeCancellation")}
            </Typography>
            <Typography className="small-text">
              {t("attraction.cancelBefore")}
            </Typography>
          </Stack>
        </Stack>
      )}
      {attraction?.attractionDuration && (
        <Stack flexDirection={"row"} alignItems={"center"} gap={1}>
          <TimelapseIcon />
          <Stack>
            <Typography className="bold-text-medium">
              {t("attraction.duration")}: {attraction.attractionDuration}
            </Typography>
          </Stack>
        </Stack>
      )}
      {attraction?.attractionDescription && (
        <Stack>
          <Typography>{attraction.attractionDescription}</Typography>
        </Stack>
      )}
      {attraction?.attractionHighlights &&
        attraction.attractionHighlights.length > 0 && (
          <Stack gap={0.5}>
            <Typography className="bold-text-medium">{t("attraction.whyVisit")}</Typography>
            <Stack>
              {attraction.attractionHighlights.map((highlight, i) => (
                <Stack
                  key={i}
                  flexDirection={"row"}
                  alignItems={"center"}
                  gap={1}
                >
                  <CheckIcon sx={{ color: "#018233" }} />
                  <Typography className="small-text">{highlight}</Typography>
                </Stack>
              ))}
            </Stack>
          </Stack>
        )}
      {attraction?.attractionIncludes &&
        attraction.attractionIncludes.length > 0 && (
          <Stack gap={0.5}>
            <Typography className="bold-text-medium">
              {t("attraction.whatsIncluded")}
            </Typography>
            <Stack>
              {attraction.attractionIncludes.map((item, i) => (
                <Stack
                  key={i}
                  flexDirection={"row"}
                  alignItems={"center"}
                  gap={1}
                >
                  <CheckIcon sx={{ color: "#018233" }} />
                  <Typography className="small-text">{item}</Typography>
                </Stack>
              ))}
            </Stack>
          </Stack>
        )}
      {attraction?.attractionExcludes &&
        attraction.attractionExcludes.length > 0 && (
          <Stack gap={0.5}>
            <Typography className="bold-text-medium">{t("attraction.restrictions")}</Typography>
            <Stack>
              {attraction.attractionExcludes.map((item, i) => (
                <Stack
                  key={i}
                  flexDirection={"row"}
                  alignItems={"center"}
                  gap={1}
                >
                  <CloseIcon />
                  <Typography className="small-text">{item}</Typography>
                </Stack>
              ))}
            </Stack>
          </Stack>
        )}
      <Stack gap={1}>
        <Typography className="bold-text-medium">{t("attraction.location")}</Typography>
        <Stack gap={1}>
          <Box width={"100%"} height={245}>
            <CustomMap
              propertyName={attraction?.attractionName}
              city={attraction?.attractionCity}
              region={attraction?.attractionRegion}
              country={attraction?.attractionCountry}
            />
          </Box>
          <Stack flexDirection={"row"} alignItems={"center"} gap={1}>
            <LocationOnIcon color="primary" />
            <Stack>
              <Typography className="bold-text-medium">
                {attraction?.attractionName}
              </Typography>
              <Typography color="text.secondary">
                {[
                  attraction?.attractionCity,
                  attraction?.attractionRegion,
                  attraction?.attractionCountry,
                ]
                  .filter(Boolean)
                  .join(", ")}
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default TourHighlights;
