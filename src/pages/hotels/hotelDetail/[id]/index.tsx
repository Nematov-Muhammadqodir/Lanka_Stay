import { GET_PARTNER_PROPERTY } from "@/apollo/user/query";
import AboutThisHotel from "@/src/libs/components/HotelDetail.tsx/AboutThisHotel";
import AllAvailableRooms from "@/src/libs/components/HotelDetail.tsx/AllAvailableRooms";
import FAQ from "@/src/libs/components/HotelDetail.tsx/FAQ/FAQ";
import GreatForYourStay from "@/src/libs/components/HotelDetail.tsx/GreatForYourStay";
import GuestReviews from "@/src/libs/components/HotelDetail.tsx/GuestReviews";
import HotelInfoSection from "@/src/libs/components/HotelDetail.tsx/HotelInfoSection";
import HouseRules from "@/src/libs/components/HotelDetail.tsx/HouseRules/HouseRules";
import LegalInformation from "@/src/libs/components/HotelDetail.tsx/Legal_Information/LegalInformation";
import PropertyOverview from "@/src/libs/components/HotelDetail.tsx/PropertyOverview";
import ReviewsList from "@/src/libs/components/HotelDetail.tsx/ReviewsList";
import withLayoutSecondary from "@/src/libs/components/layout/LayoutSecondary";
import { T } from "@/src/libs/types/common";
import { PartnerProperty } from "@/src/libs/types/partnerInput/partnerProperty";
import { useQuery } from "@apollo/client";
import { Stack } from "@mui/material";
import { useRouter } from "next/router";
import React, { useState } from "react";

const HotelDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [partnerProperty, setPartnerProperty] = useState<PartnerProperty>();

  /** APOLLO REQUESTS **/
  const {
    loading: getPartnerPropertyLoading,
    data: getPartnerPropertyData,
    error: getPartnerPropertyError,
    refetch: getPartnerPropertyRefetch,
  } = useQuery(GET_PARTNER_PROPERTY, {
    fetchPolicy: "network-only",
    variables: { input: id },
    skip: !id,
    notifyOnNetworkStatusChange: true,
    onCompleted: (data: T) => {
      console.log("data.getPartnerProperty", data.getPartnerProperty);
      setPartnerProperty(data.getPartnerProperty);
    },
  });
  return (
    <Stack>
      <PropertyOverview
        partnerProperty={partnerProperty}
        loading={getPartnerPropertyLoading}
      />
      <HotelInfoSection
        partnerProperty={partnerProperty}
        loading={getPartnerPropertyLoading}
      />
      <AboutThisHotel
        partnerProperty={partnerProperty}
        loading={getPartnerPropertyLoading}
      />
      <GreatForYourStay />
      <AllAvailableRooms />
      <GuestReviews />
      <ReviewsList />
      <HouseRules />
      <LegalInformation />
      <FAQ />
    </Stack>
  );
};

export default withLayoutSecondary(HotelDetail);
