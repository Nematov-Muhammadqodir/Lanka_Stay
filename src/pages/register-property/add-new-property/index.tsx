import PropertyCategoryList from "@/src/libs/components/register-property/add-new-property/PropertyCategoryList";
import { Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import LayoutCreateAccountMain from "@/src/libs/components/layout/registerProperty/create-account/CreateAccountMainLayout";
import { useRouter } from "next/router";
import { useQuery, useReactiveVar } from "@apollo/client";
import { partnerVar } from "@/apollo/store";
import { GET_PARTNER_PROPERTY_BY_HOTEL_OWNER } from "@/apollo/user/query";
import { T } from "@/src/libs/types/common";

const AddNewProperty = () => {
  const router = useRouter();
  const partner = useReactiveVar(partnerVar);
  const [propertyExists, setPropertyExists] = useState(false);

  /** APOLLO REQUESTS **/
  const {
    loading: getPartnerPropertyByHotelOwnerLoading,
    data: getPartnerPropertyByHotelOwnerData,
    error: getPartnerPropertyByHotelOwnerError,
    refetch: getPartnerPropertyByHotelOwnerRefetch,
  } = useQuery(GET_PARTNER_PROPERTY_BY_HOTEL_OWNER, {
    fetchPolicy: "network-only",
    variables: { input: partner?._id },
    skip: !partner._id,
    notifyOnNetworkStatusChange: true,
    onCompleted: (data: T) => {
      console.log(
        "data.getPartnerPropertyByHotelOwner",
        data.getPartnerPropertyByHotelOwner._id
      );
      if (data.getPartnerPropertyByHotelOwner._id) {
        router.push(
          "/register-property/add-new-property/property-details-complete"
        );
      }
    },
  });

  useEffect(() => {
    if (partner?._id) {
      getPartnerPropertyByHotelOwnerRefetch();
    }
  }, [partner]);
  return (
    <LayoutCreateAccountMain>
      <PropertyCategoryList />
    </LayoutCreateAccountMain>
  );
};

export default AddNewProperty;
