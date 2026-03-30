import { GET_PARTNER_PROPERTY } from "@/apollo/user/query";
import AboutThisHotel from "@/src/libs/components/HotelDetail/AboutThisHotel";
import AllAvailableRooms from "@/src/libs/components/HotelDetail/AllAvailableRooms";
import FAQ from "@/src/libs/components/HotelDetail/FAQ/FAQ";
import GreatForYourStay from "@/src/libs/components/HotelDetail/GreatForYourStay";
import GuestReviews from "@/src/libs/components/HotelDetail/GuestReviews";
import HotelInfoSection from "@/src/libs/components/HotelDetail/HotelInfoSection";
import HouseRules from "@/src/libs/components/HotelDetail/HouseRules/HouseRules";
import LegalInformation from "@/src/libs/components/HotelDetail/Legal_Information/LegalInformation";
import PropertyOverview from "@/src/libs/components/HotelDetail/PropertyOverview";
import ReviewsList from "@/src/libs/components/HotelDetail/ReviewsList";
import withLayoutSecondary from "@/src/libs/components/layout/LayoutSecondary";
import { T } from "@/src/libs/types/common";
import { PartnerProperty } from "@/src/libs/types/partnerInput/partnerProperty";
import { setPartnerProperty } from "@/src/slices/partnerPropertySlice";
import { RootState } from "@/store";
import { useQuery } from "@apollo/client";
import { Stack } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export interface HotelReviewsProps {
  staffRating: number;
  facilitiesRating: number;
  cleanlessRating: number;
  comfortRating: number;
  valueOfMoneyRating: number;
  locationRating: number;
  freeWiFiRating: number;
  totalReviews: number;
}

const HotelDetail = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const dispatch = useDispatch();
  const partnerProperty = useSelector(
    (state: RootState) => state.partnerProperty.data
  );

  const router = useRouter();
  const { id } = router.query;

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
  });

  console.log("getPartnerPropertyData", getPartnerPropertyData);

  const data = getPartnerPropertyData?.getPartnerProperty;

  const hotelReviewInput: HotelReviewsProps = {
    staffRating: data?.staffRating,
    facilitiesRating: data?.facilitiesRating,
    cleanlessRating: data?.cleanlessRating,
    comfortRating: data?.comfortRating,
    valueOfMoneyRating: data?.valueOfMoneyRating,
    locationRating: data?.locationRating,
    freeWiFiRating: data?.freeWiFiRating,
    totalReviews: data?.totalReviews,
  };

  useEffect(() => {
    if (getPartnerPropertyData?.getPartnerProperty) {
      const result = getPartnerPropertyData.getPartnerProperty;

      dispatch(setPartnerProperty(result)); // <-- SAVE TO REDUX
    }
  }, [getPartnerPropertyData]);

  if (!isMounted) return null;

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
      <AllAvailableRooms
        partnerProperty={partnerProperty}
        loading={getPartnerPropertyLoading}
      />
      <GuestReviews hotelReviewInput={hotelReviewInput} />
      <ReviewsList hotelReviewInput={hotelReviewInput} />
      <HouseRules partnerProperty={partnerProperty} />
      <LegalInformation />
      <FAQ />
    </Stack>
  );
};

export default withLayoutSecondary(HotelDetail);
